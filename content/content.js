// ConectaLead - Content Script Injetado no Facebook
(() => {
  'use strict';

  // State
  let selectedFiles = [];
  let isPanelOpen = false;
  let activeTab = 'ad';
  let defaultDdd = '11';
  let lastDetectedPhone = null;
  let autoPilotEnabled = false;
  let autoRepliedChatIds = new Set();
  let autoPilotTimer = null;

  // Initialize
  init();

  async function init() {
    // Prevent duplicate injection
    if (document.getElementById('conectalead-launcher')) return;

    // Load settings
    const settings = await chrome.storage.local.get(['defaultDdd', 'autoPilotEnabled']);
    if (settings.defaultDdd) defaultDdd = settings.defaultDdd;
    autoPilotEnabled = !!settings.autoPilotEnabled;

    buildUI();
    setupListeners();
    setupChatObserver();
    updateBadgeCount();
  }

  function buildUI() {
    // 1. Floating Launcher Button
    const launcher = document.createElement('div');
    launcher.id = 'conectalead-launcher';
    launcher.innerHTML = `
      <span>⚡ ConectaLead</span>
      <span class="cl-badge" id="cl-launcher-badge" style="display: none;">0</span>
    `;
    document.body.appendChild(launcher);

    // 2. Sliding Panel
    const panel = document.createElement('div');
    panel.id = 'conectalead-panel';
    panel.className = 'cl-hidden';
    panel.innerHTML = `
      <!-- Header -->
      <div class="cl-header">
        <div class="cl-header-title">
          <span class="cl-icon">⚡</span>
          <span>ConectaLead Co-piloto</span>
        </div>
        <button class="cl-close-btn" id="cl-close-panel" title="Fechar">&times;</button>
      </div>

      <!-- Tabs Navigation -->
      <div class="cl-tabs">
        <button class="cl-tab-btn cl-active" data-tab="ad">📢 Anunciar</button>
        <button class="cl-tab-btn" data-tab="chat">💬 Atendimento</button>
        <button class="cl-tab-btn" data-tab="leads">👥 Leads (<span id="cl-tab-leads-count">0</span>)</button>
        <button class="cl-tab-btn" data-tab="sheets">⚙️ Planilha</button>
      </div>

      <!-- Panel Body -->
      <div class="cl-body">

        <!-- TAB 1: ANUNCIAR -->
        <div class="cl-tab-content cl-active" id="cl-tab-ad">
          <!-- File Upload Zone -->
          <div class="cl-form-group">
            <label class="cl-label">Fotos do Produto</label>
            <input type="file" id="cl-file-input" multiple accept="image/*" style="display: none;">
            <div class="cl-upload-dropzone" id="cl-dropzone">
              <div class="cl-upload-icon">📁</div>
              <div class="cl-upload-text">Selecionar fotos do computador</div>
              <div class="cl-upload-hint">Clique para abrir o Windows Explorer</div>
            </div>
            <div class="cl-images-preview" id="cl-images-preview"></div>
          </div>

          <!-- Product Details -->
          <div class="cl-form-group">
            <label class="cl-label">O que você está vendendo?</label>
            <input type="text" class="cl-input" id="cl-product-input" placeholder="Ex: iPhone 13 128GB Azul impecável bateria 89%">
          </div>

          <div style="display: flex; gap: 10px;">
            <div class="cl-form-group" style="flex: 1;">
              <label class="cl-label">Preço (R$)</label>
              <input type="text" class="cl-input" id="cl-price-input" placeholder="Ex: 2800">
            </div>
            <div class="cl-form-group" style="flex: 1.2;">
              <label class="cl-label">Local / Bairro</label>
              <input type="text" class="cl-input" id="cl-location-input" placeholder="Ex: Centro - SP">
            </div>
          </div>

          <!-- Fill Button -->
          <button class="cl-btn cl-btn-primary" id="cl-btn-fill-ad">
            <span>⚡ Preencher Anúncio no Facebook</span>
          </button>
          
          <div id="cl-marketplace-tip" style="font-size: 11px; color: #64748B; text-align: center;">
            Abra a tela <a href="https://www.facebook.com/marketplace/create/item" target="_blank" style="color: #2563EB; text-decoration: underline;">Criar Anúncio</a> para preenchimento direto.
          </div>
        </div>

        <!-- TAB 2: ATENDIMENTO / CHAT -->
        <div class="cl-tab-content" id="cl-tab-chat">
          
          <!-- Detected Phone Card (Hidden initially) -->
          <div class="cl-whatsapp-card" id="cl-detected-card" style="display: none;">
            <div class="cl-whatsapp-card-title">
              <span>🎯 WhatsApp do Cliente Detectado!</span>
            </div>
            <div class="cl-whatsapp-phone" id="cl-detected-phone-text">--</div>
            <div style="display: flex; gap: 8px;">
              <button class="cl-btn cl-btn-success cl-btn-sm" id="cl-btn-open-wa" style="flex: 1;">
                <span>📲 Chamar no WhatsApp</span>
              </button>
              <button class="cl-btn cl-btn-outline cl-btn-sm" id="cl-btn-save-lead">
                <span>💾 Salvar</span>
              </button>
            </div>
          </div>

          <!-- Aviso interno de que o zap já foi pego -->
          <div id="cl-chat-paused-banner" style="display: none; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 12px; padding: 12px; color: #065F46; font-size: 12px; line-height: 1.4;">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; margin-bottom: 4px; color: #047857;">
              <span>✅ Contato Salvo!</span>
            </div>
            <span>O zap do cliente já foi guardado. O bot pausou nesta conversa para você chamar direto no WhatsApp como uma pessoa normal.</span>
          </div>

          <!-- Piloto Automático & Ação Imediata de Conversão -->
          <div id="cl-autopilot-container" style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 14px;">
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 13px; font-weight: 700; color: #1E293B;">🤖 Piloto Automático</span>
                <span style="font-size: 11px; color: #64748B;">Mandou msg, pede o zap sozinho</span>
              </div>
              <label class="cl-switch">
                <input type="checkbox" id="cl-toggle-autopilot">
                <span class="cl-slider"></span>
              </label>
            </div>

            <!-- Botão 1-Clique Destaque -->
            <button class="cl-btn cl-btn-success" id="cl-btn-ask-wa-now" style="width: 100%; padding: 13px; font-size: 13px; font-weight: 700;">
              <span>⚡ Pedir WhatsApp no Chat (1-Clique)</span>
            </button>
          </div>

          <!-- Quick Request WhatsApp Messages (Casual e 100% Humano) -->
          <div class="cl-form-group" id="cl-quick-replies-group">
            <label class="cl-label">Respostas Rápidas (Pede o Zap no natural)</label>
            <div class="cl-replies-list">
              <div class="cl-reply-item" data-template="default">
                <strong>👉 Simples & Direto (Fotos)</strong>
                <span>"Opa, tá disponível sim! Me passa seu zap com ddd que te mando fotos dele e a gente já combina"</span>
              </div>
              <div class="cl-reply-item" data-template="delivery">
                <strong>👉 Pra combinar retirada</strong>
                <span>"Opa, beleza? Tá disponível e funcionando 100%. Me manda seu zap com ddd pra combinarmos de vc ver ou retirar"</span>
              </div>
              <div class="cl-reply-item" data-template="offer">
                <strong>👉 Negociação / PIX</strong>
                <span>"Fechado, no pix dá pra fazer sim! Me passa seu zap com ddd pra gente acertar os detalhes"</span>
              </div>
              <div class="cl-reply-item" data-template="confirm">
                <strong>👉 Confirmar que vai chamar</strong>
                <span>"Show, já vou te chamar lá no whats!"</span>
              </div>
            </div>
          </div>

          <!-- Custom Message Box -->
          <div class="cl-form-group" id="cl-custom-chat-group">
            <label class="cl-label">Mensagem para o Chat</label>
            <textarea class="cl-textarea" id="cl-chat-custom-message" rows="3" placeholder="Clique em uma opção acima ou digite aqui..."></textarea>
            <button class="cl-btn cl-btn-primary cl-btn-sm" id="cl-btn-send-chat">
              <span>Inserir no Chat do Facebook</span>
            </button>
          </div>
        </div>

        <!-- TAB 3: LEADS CAPTURADOS -->
        <div class="cl-tab-content" id="cl-tab-leads">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label class="cl-label">Contatos Capturados</label>
            <button class="cl-btn cl-btn-outline cl-btn-sm" id="cl-btn-export-leads" style="padding: 4px 8px; font-size: 11px;">
              📥 Exportar
            </button>
          </div>
          <div class="cl-leads-container" id="cl-leads-list">
            <div style="text-align: center; color: #94A3B8; font-size: 13px; padding: 20px;">
              Nenhum lead capturado ainda.
            </div>
          </div>
        <!-- TAB 4: PLANILHA & CONFIG -->
        <div class="cl-tab-content" id="cl-tab-sheets">
          <div class="cl-form-group">
            <label class="cl-label">Webhook do Google Sheets</label>
            <input type="text" class="cl-input" id="cl-sheets-webhook-input" placeholder="https://script.google.com/macros/s/.../exec">
            <div style="font-size: 11px; color: #64748B; margin-top: 4px;">
              Cole o link do seu Google Apps Script para salvar cada lead em tempo real na sua planilha online.
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="cl-btn cl-btn-primary cl-btn-sm" id="cl-btn-save-sheets" style="flex: 1;">
              <span>💾 Salvar Link</span>
            </button>
            <button class="cl-btn cl-btn-outline cl-btn-sm" id="cl-btn-test-sheets">
              <span>🧪 Testar Planilha</span>
            </button>
          </div>

          <div class="cl-form-group" style="margin-top: 8px;">
            <label class="cl-label">DDD Padrão da sua Região</label>
            <input type="text" class="cl-input" id="cl-ddd-input" placeholder="Ex: 11" maxlength="2">
            <div style="font-size: 11px; color: #64748B; margin-top: 4px;">
              Usado quando o cliente enviar o telefone sem o DDD.
            </div>
          </div>

          <div style="background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; font-size: 11px; color: #334155; line-height: 1.5; margin-top: 4px;">
            <strong>Como pegar o link da sua planilha:</strong><br>
            1. Abra o Google Sheets (<a href="https://sheets.new" target="_blank" style="color: #2563EB;">sheets.new</a>);<br>
            2. Vá em <em>Extensões &gt; Apps Script</em>;<br>
            3. Cole o código de <code>google-sheets-script.js</code>;<br>
            4. Clique em <em>Implantar &gt; Nova implantação &gt; App da Web</em>;<br>
            5. Copie o URL gerado e cole no campo acima!
          </div>
        </div>

      </div>

      <!-- Toast Notification -->
      <div class="cl-toast" id="cl-toast">Mensagem</div>
    `;

    document.body.appendChild(panel);
  }

  function setupListeners() {
    const launcher = document.getElementById('conectalead-launcher');
    const panel = document.getElementById('conectalead-panel');
    const closeBtn = document.getElementById('cl-close-panel');
    const dropzone = document.getElementById('cl-dropzone');
    const fileInput = document.getElementById('cl-file-input');
    const fillAdBtn = document.getElementById('cl-btn-fill-ad');
    const tabBtns = document.querySelectorAll('.cl-tab-btn');
    const replyItems = document.querySelectorAll('.cl-reply-item');
    const sendChatBtn = document.getElementById('cl-btn-send-chat');
    const customChatMsg = document.getElementById('cl-chat-custom-message');
    const openWaBtn = document.getElementById('cl-btn-open-wa');
    const saveLeadBtn = document.getElementById('cl-btn-save-lead');
    const exportLeadsBtn = document.getElementById('cl-btn-export-leads');

    // Toggle Panel
    launcher.addEventListener('click', () => {
      isPanelOpen = !isPanelOpen;
      panel.classList.toggle('cl-hidden', !isPanelOpen);
      if (isPanelOpen) {
        if (activeTab === 'leads') renderLeadsList();
        scanCurrentChatForPhone();
      }
    });

    closeBtn.addEventListener('click', () => {
      isPanelOpen = false;
      panel.classList.add('cl-hidden');
    });

    // Tab Switching
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('cl-active'));
        btn.classList.add('cl-active');
        activeTab = btn.dataset.tab;

        document.querySelectorAll('.cl-tab-content').forEach(c => c.classList.remove('cl-active'));
        const activeContent = document.getElementById(`cl-tab-${activeTab}`);
        if (activeContent) activeContent.classList.add('cl-active');

        if (activeTab === 'leads') renderLeadsList();
        if (activeTab === 'chat') scanCurrentChatForPhone();
      });
    });

    // File Dropzone & Explorer
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files);
        selectedFiles = [...selectedFiles, ...newFiles];
        renderImagePreviews();
        showToast(`${newFiles.length} foto(s) selecionada(s).`);
      }
    });

    // Preencher Anúncio no Facebook
    fillAdBtn.addEventListener('click', handleFillAd);

    // Click on quick replies
    replyItems.forEach(item => {
      item.addEventListener('click', () => {
        const span = item.querySelector('span');
        if (span) {
          const text = span.innerText.replace(/^"|"$/g, '');
          customChatMsg.value = text;
          showToast('Mensagem pronta. Clique em inserir no chat.');
        }
      });
    });

    // Piloto Automático Toggle
    const autoPilotToggle = document.getElementById('cl-toggle-autopilot');
    if (autoPilotToggle) {
      autoPilotToggle.checked = autoPilotEnabled;
      autoPilotToggle.addEventListener('change', async (e) => {
        autoPilotEnabled = e.target.checked;
        await chrome.storage.local.set({ autoPilotEnabled });
        showToast(autoPilotEnabled ? '🤖 Piloto Automático ativado!' : 'Piloto Automático desativado');
        if (autoPilotEnabled) scanCurrentChatForPhone();
      });
    }

    // Botão 1-Clique para pedir o zap imediatamente no chat
    const askWaBtn = document.getElementById('cl-btn-ask-wa-now');
    if (askWaBtn) {
      askWaBtn.addEventListener('click', () => {
        const defaultMsg = 'Opa, tá disponível sim! Me passa seu zap com ddd que te mando fotos dele e a gente já combina';
        const sent = sendTextMessageToFacebookChat(defaultMsg);
        if (sent) {
          showToast('Mensagem enviada no chat!');
        } else {
          showToast('Abra a conversa do cliente no Facebook.');
        }
      });
    }

    // Send to Facebook Chat
    sendChatBtn.addEventListener('click', () => {
      const text = customChatMsg.value.trim();
      if (!text) {
        showToast('Selecione ou digite uma mensagem primeiro.');
        return;
      }
      const inserted = sendTextMessageToFacebookChat(text);
      if (inserted) {
        showToast('Mensagem enviada no chat!');
      } else {
        showToast('Abra uma conversa no Messenger para inserir a mensagem.');
      }
    });

    // Open WhatsApp
    openWaBtn.addEventListener('click', () => {
      if (lastDetectedPhone) {
        const url = `https://wa.me/55${lastDetectedPhone.phone}`;
        window.open(url, '_blank');
      }
    });

    // Save Lead manually from detected card
    saveLeadBtn.addEventListener('click', async () => {
      if (lastDetectedPhone) {
        await saveLeadContact(lastDetectedPhone);
        showToast('Lead salvo na lista!');
        updateBadgeCount();
      }
    });

    // Export Leads
    exportLeadsBtn.addEventListener('click', exportLeadsAsCsv);

    // Planilha / Google Sheets tab controls
    const webhookInput = document.getElementById('cl-sheets-webhook-input');
    const dddInput = document.getElementById('cl-ddd-input');
    const saveSheetsBtn = document.getElementById('cl-btn-save-sheets');
    const testSheetsBtn = document.getElementById('cl-btn-test-sheets');

    // Populate saved settings
    chrome.storage.local.get(['googleSheetsWebhook', 'defaultDdd']).then(data => {
      if (data.googleSheetsWebhook && webhookInput) webhookInput.value = data.googleSheetsWebhook;
      if (data.defaultDdd && dddInput) dddInput.value = data.defaultDdd;
    });

    // Save sheets settings
    saveSheetsBtn.addEventListener('click', async () => {
      const url = webhookInput.value.trim();
      const ddd = (dddInput.value || '').replace(/\D/g, '').slice(0, 2) || '11';
      defaultDdd = ddd;
      await chrome.storage.local.set({ googleSheetsWebhook: url, defaultDdd: ddd });
      showToast('Configurações da planilha salvas!');
    });

    // Test sheets connection
    testSheetsBtn.addEventListener('click', async () => {
      const url = webhookInput.value.trim();
      if (!url) {
        showToast('Cole o link da planilha no campo acima.');
        return;
      }
      testSheetsBtn.disabled = true;
      testSheetsBtn.innerHTML = '<span>Enviando...</span>';
      try {
        const resp = await chrome.runtime.sendMessage({
          type: 'TEST_SHEETS_WEBHOOK',
          payload: { url }
        });
        if (resp?.success) {
          showToast('✅ Linha de teste adicionada na sua planilha!');
        } else {
          showToast('Erro ao conectar com o link informado.');
        }
      } catch (err) {
        showToast('Erro: ' + err.message);
      } finally {
        testSheetsBtn.disabled = false;
        testSheetsBtn.innerHTML = '<span>🧪 Testar Planilha</span>';
      }
    });
  }

  function renderImagePreviews() {
    const container = document.getElementById('cl-images-preview');
    container.innerHTML = '';

    selectedFiles.forEach((file, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'cl-image-thumb-wrapper';

      const img = document.createElement('img');
      img.className = 'cl-image-thumb';
      img.src = URL.createObjectURL(file);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'cl-remove-thumb';
      removeBtn.innerHTML = '&times;';
      removeBtn.title = 'Remover foto';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFiles.splice(index, 1);
        renderImagePreviews();
      });

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      container.appendChild(wrapper);
    });
  }

  async function handleFillAd() {
    const product = document.getElementById('cl-product-input').value.trim();
    const price = document.getElementById('cl-price-input').value.trim();
    const location = document.getElementById('cl-location-input').value.trim();
    const fillBtn = document.getElementById('cl-btn-fill-ad');

    if (!product) {
      showToast('Informe o produto para continuar.');
      return;
    }

    fillBtn.disabled = true;
    fillBtn.innerHTML = '<span>Processando...</span>';

    try {
      // 1. Generate Title & Copy
      const response = await chrome.runtime.sendMessage({
        type: 'GENERATE_AI_COPY',
        payload: { product, price, location }
      });

      const copyData = response?.data || {
        title: product,
        description: `${product}\nValor: R$ ${price}\nRetirada em ${location}`
      };

      // 2. Locate Facebook Marketplace elements
      const result = fillFacebookMarketplaceFields(copyData.title, price, copyData.description, location, selectedFiles);

      if (result.success) {
        showToast('Anúncio preenchido com sucesso!');
      } else {
        showToast('Campos do Facebook não encontrados. Verifique se está em "Criar Anúncio".');
      }
    } catch (err) {
      console.error(err);
      showToast('Erro ao processar dados.');
    } finally {
      fillBtn.disabled = false;
      fillBtn.innerHTML = '<span>⚡ Preencher Anúncio no Facebook</span>';
    }
  }

  function fillFacebookMarketplaceFields(title, price, description, location, files) {
    let filledCount = 0;

    // Helper: Find element by various attributes
    function findInputByLabelOrPlaceholder(keywords) {
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea'));
      for (const el of inputs) {
        const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
        const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
        const name = (el.getAttribute('name') || '').toLowerCase();

        // Check closest label text
        let labelText = '';
        const parentLabel = el.closest('label');
        if (parentLabel) labelText = parentLabel.innerText.toLowerCase();

        for (const kw of keywords) {
          const lkw = kw.toLowerCase();
          if (ariaLabel.includes(lkw) || placeholder.includes(lkw) || name.includes(lkw) || labelText.includes(lkw)) {
            return el;
          }
        }
      }
      return null;
    }

    // 1. Título
    const titleInput = findInputByLabelOrPlaceholder(['Título', 'Title', 'O que você está vendendo']);
    if (titleInput) {
      setReactInputValue(titleInput, title);
      filledCount++;
    }

    // 2. Preço
    const priceInput = findInputByLabelOrPlaceholder(['Preço', 'Price', 'Valor']);
    if (priceInput && price) {
      setReactInputValue(priceInput, price);
      filledCount++;
    }

    // 3. Descrição
    const descEl = document.querySelector('textarea[aria-label*="Descrição"], textarea[placeholder*="Descrição"]') ||
                   document.querySelector('div[role="textbox"][aria-label*="Descrição"]') ||
                   findInputByLabelOrPlaceholder(['Descrição', 'Description']);
    if (descEl) {
      if (descEl.tagName.toLowerCase() === 'textarea') {
        setReactTextareaValue(descEl, description);
      } else {
        setReactContentEditable(descEl, description);
      }
      filledCount++;
    }

    // 4. Injetar Fotos
    if (files && files.length > 0) {
      const fileInput = document.querySelector('input[type="file"][accept*="image"]') ||
                        document.querySelector('input[type="file"]');
      if (fileInput) {
        try {
          const dt = new DataTransfer();
          files.forEach(f => dt.items.add(f));
          fileInput.files = dt.files;
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));
          filledCount++;
        } catch (err) {
          console.error('Erro ao injetar fotos:', err);
        }
      }
    }

    return { success: filledCount > 0, count: filledCount };
  }

  function setReactInputValue(input, val) {
    input.focus();
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    if (setter) {
      setter.call(input, val);
    } else {
      input.value = val;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setReactTextareaValue(textarea, val) {
    textarea.focus();
    const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
    if (setter) {
      setter.call(textarea, val);
    } else {
      textarea.value = val;
    }
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setReactContentEditable(el, val) {
    el.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Chat Messenger interaction
  function insertTextIntoFacebookChat(text) {
    const chatInput = document.querySelector('div[role="textbox"][contenteditable="true"]') ||
                      document.querySelector('div[aria-label*="Mensagem"][contenteditable="true"]') ||
                      document.querySelector('div[aria-label*="Message"][contenteditable="true"]');

    if (chatInput) {
      chatInput.focus();
      document.execCommand('selectAll', false, null);
      document.execCommand('insertText', false, text);
      chatInput.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    }
    return false;
  }

  function sendTextMessageToFacebookChat(text) {
    const inserted = insertTextIntoFacebookChat(text);
    if (!inserted) return false;

    // Small delay to simulate natural human typing before dispatching enter/send
    setTimeout(() => {
      const chatInput = document.querySelector('div[role="textbox"][contenteditable="true"]') ||
                        document.querySelector('div[aria-label*="Mensagem"][contenteditable="true"]') ||
                        document.querySelector('div[aria-label*="Message"][contenteditable="true"]');

      const sendBtn = document.querySelector('div[aria-label="Pressione Enter para enviar"]') ||
                      document.querySelector('div[aria-label*="Enviar"]') ||
                      document.querySelector('div[aria-label*="Send"]');

      if (sendBtn) {
        sendBtn.click();
      } else if (chatInput) {
        const enterEvt = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true,
          cancelable: true
        });
        chatInput.dispatchEvent(enterEvt);
      }
    }, 200);

    return true;
  }

  // Scan current open chat for phone number and message context
  function scanCurrentChatForPhone() {
    // 1. Find participant name in chat header
    let detectedName = 'Cliente Marketplace';
    const headerEl = document.querySelector('header h1, header h2, div[role="main"] header span[dir="auto"], div[aria-label*="Bate-papo"] h2');
    if (headerEl && headerEl.innerText.trim()) {
      detectedName = headerEl.innerText.trim().split('\n')[0];
    }

    // 2. Find product in conversation banner if available
    let detectedProduct = document.getElementById('cl-product-input')?.value || 'Produto Marketplace';
    const bannerEl = document.querySelector('a[href*="/marketplace/item/"] span[dir="auto"], div[aria-label*="Marketplace"] h3');
    if (bannerEl && bannerEl.innerText.trim()) {
      detectedProduct = bannerEl.innerText.trim();
    }

    const chatId = `${detectedName}_${detectedProduct}`;

    // 3. Search message bubbles in Facebook Messenger
    const messages = document.querySelectorAll('div[dir="auto"], span[dir="auto"]');
    let phoneFound = false;

    for (const msg of messages) {
      const text = msg.innerText || '';
      if (text.length >= 8 && text.length <= 250) {
        const detected = extractBrazilianPhone(text, defaultDdd);
        if (detected) {
          phoneFound = true;
          if (autoPilotTimer) {
            clearTimeout(autoPilotTimer);
            autoPilotTimer = null;
          }
          handlePhoneDetected(detected, text.trim(), detectedName, detectedProduct);
          return;
        }
      }
    }

    // If no phone found in current conversation, reset to active reply mode
    if (!phoneFound) {
      resetChatToActiveMode();

      // Piloto Automático: Se ativado, responde pedindo o zap com delay humano
      if (autoPilotEnabled && messages.length > 0 && !autoPilotTimer && !autoRepliedChatIds.has(chatId)) {
        autoPilotTimer = setTimeout(() => {
          autoPilotTimer = null;
          // Confirma se o telefone ainda não foi enviado e se ainda não respondemos
          if (!lastDetectedPhone && !autoRepliedChatIds.has(chatId)) {
            const defaultMsg = 'Opa, tá disponível sim! Me passa seu zap com ddd que te mando fotos dele e a gente já combina';
            const sent = sendTextMessageToFacebookChat(defaultMsg);
            if (sent) {
              autoRepliedChatIds.add(chatId);
              showToast('⚡ Resposta enviada pelo Piloto Automático!');
            }
          }
        }, 2500); // 2.5 segundos para parecer digitação humana e respeitar anti-bot
      }
    }
  }

  async function handlePhoneDetected(phoneData, fullMessage = '', clientName = 'Cliente Marketplace', product = 'Produto Marketplace') {
    lastDetectedPhone = {
      ...phoneData,
      customerMessage: fullMessage,
      name: clientName,
      product: product
    };

    const card = document.getElementById('cl-detected-card');
    const textEl = document.getElementById('cl-detected-phone-text');
    const pausedBanner = document.getElementById('cl-chat-paused-banner');
    const repliesGroup = document.getElementById('cl-quick-replies-group');
    const customGroup = document.getElementById('cl-custom-chat-group');

    if (card && textEl) {
      textEl.innerText = phoneData.formatted;
      card.style.display = 'flex';
    }

    // PAUSE BOT: Hide request options and show paused alert
    if (pausedBanner) pausedBanner.style.display = 'block';
    if (repliesGroup) repliesGroup.style.display = 'none';
    if (customGroup) customGroup.style.display = 'none';

    // Automatically save to spreadsheet / storage without waiting
    await saveLeadContact(lastDetectedPhone);
  }

  function resetChatToActiveMode() {
    lastDetectedPhone = null;
    const card = document.getElementById('cl-detected-card');
    const pausedBanner = document.getElementById('cl-chat-paused-banner');
    const repliesGroup = document.getElementById('cl-quick-replies-group');
    const customGroup = document.getElementById('cl-custom-chat-group');

    if (card) card.style.display = 'none';
    if (pausedBanner) pausedBanner.style.display = 'none';
    if (repliesGroup) repliesGroup.style.display = 'flex';
    if (customGroup) customGroup.style.display = 'flex';
  }

  function setupChatObserver() {
    // Lightweight debounce observer on message containers
    let timer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        scanCurrentChatForPhone();
      }, 800);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function extractBrazilianPhone(text, defaultDdd = '11') {
    if (!text) return null;
    const clean = text.replace(/[\u00a0\u2000-\u200b]/g, ' ');

    // 1. (XX) 9XXXX-XXXX or XX 9XXXXXXXX
    const fullRegex = /(?:(?:\+|00)?55\s?)?(?:\(?([1-9]{2})\)?\s?)(?:(9\s?[0-9]{4})[-.\s]?([0-9]{4}))/;
    let match = fullRegex.exec(clean);
    if (match) {
      const ddd = match[1] || defaultDdd;
      const numPart = (match[2] + match[3]).replace(/\D/g, '');
      return {
        raw: match[0],
        ddd: ddd,
        phone: ddd + numPart,
        formatted: `(${ddd}) ${numPart.slice(0, 5)}-${numPart.slice(5)}`
      };
    }

    // 2. Continuous 11 digits: 11987654321
    const digitsRegex = /(?:(?:\+|00)?55\D*)?([1-9]{2})\D*(9\d{8})/;
    match = digitsRegex.exec(clean);
    if (match) {
      const ddd = match[1];
      const num = match[2];
      return {
        raw: match[0],
        ddd: ddd,
        phone: ddd + num,
        formatted: `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`
      };
    }

    // 3. 9 digits without DDD (e.g. 98765-4321)
    const nineDigitsRegex = /(?:^|\D)(9\s?[0-9]{4})[-.\s]?([0-9]{4})(?:$|\D)/;
    match = nineDigitsRegex.exec(clean);
    if (match) {
      const num = (match[1] + match[2]).replace(/\D/g, '');
      return {
        raw: match[0].trim(),
        ddd: defaultDdd,
        phone: defaultDdd + num,
        formatted: `(${defaultDdd}) ${num.slice(0, 5)}-${num.slice(5)}`
      };
    }

    return null;
  }

  async function saveLeadContact(phoneData) {
    const lead = {
      phone: phoneData.phone,
      formattedPhone: phoneData.formatted,
      name: phoneData.name || 'Cliente Marketplace',
      customerMessage: phoneData.customerMessage || '',
      product: phoneData.product || 'Produto Marketplace'
    };
    const response = await chrome.runtime.sendMessage({ type: 'AUTO_SAVE_LEAD', payload: lead });
    if (response?.isNew) {
      showToast('🎯 Telefone detectado e salvo na planilha!');
    }
    await updateBadgeCount();
  }

  async function updateBadgeCount() {
    const { leads = [] } = await chrome.storage.local.get('leads');
    const badge = document.getElementById('cl-launcher-badge');
    const tabCount = document.getElementById('cl-tab-leads-count');

    if (tabCount) tabCount.innerText = String(leads.length);
    if (badge) {
      if (leads.length > 0) {
        badge.innerText = String(leads.length);
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  async function renderLeadsList() {
    const { leads = [] } = await chrome.storage.local.get('leads');
    const container = document.getElementById('cl-leads-list');
    if (!container) return;

    if (leads.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: #94A3B8; font-size: 13px; padding: 20px;">
          Nenhum lead capturado ainda.
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    leads.forEach(lead => {
      const row = document.createElement('div');
      row.className = 'cl-lead-row';
      row.innerHTML = `
        <div class="cl-lead-info">
          <div class="cl-lead-name">${escapeHtml(lead.name || 'Cliente')}</div>
          <div class="cl-lead-phone">${escapeHtml(lead.formattedPhone || lead.phone)}</div>
          ${lead.customerMessage ? `<div style="font-size: 11px; color: #475569; font-style: italic; margin-top: 2px;">💬 "${escapeHtml(lead.customerMessage.slice(0, 75))}${lead.customerMessage.length > 75 ? '...' : ''}"</div>` : ''}
          <div class="cl-lead-date">${new Date(lead.timestamp).toLocaleDateString('pt-BR')} ${new Date(lead.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <button class="cl-btn cl-btn-success cl-btn-sm cl-open-lead-wa" data-phone="${lead.phone}" style="white-space: nowrap;">
          <span>📲 Chamar</span>
        </button>
      `;

      row.querySelector('.cl-open-lead-wa').addEventListener('click', () => {
        window.open(`https://wa.me/55${lead.phone}`, '_blank');
      });

      container.appendChild(row);
    });
  }

  async function exportLeadsAsCsv() {
    const { leads = [] } = await chrome.storage.local.get('leads');
    if (leads.length === 0) {
      showToast('Nenhum lead para exportar.');
      return;
    }

    // CSV format with UTF-8 BOM so Excel opens with proper accents and formatting
    const BOM = '\uFEFF';
    let csv = BOM + 'Nome;WhatsApp Formatado;Telefone Limpo;Mensagem do Cliente;Produto;Link WhatsApp;Data e Hora\n';
    
    leads.forEach(l => {
      const msg = (l.customerMessage || '').replace(/"/g, '""').replace(/\n/g, ' ');
      const dateFormatted = new Date(l.timestamp).toLocaleString('pt-BR');
      csv += `"${l.name}";"${l.formattedPhone}";"${l.phone}";"${msg}";"${l.product}";"${l.waLink}";"${dateFormatted}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planilha-leads-conectalead-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Planilha baixada com sucesso!');
  }

  function showToast(msg) {
    const toast = document.getElementById('cl-toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('cl-show');
    setTimeout(() => {
      toast.classList.remove('cl-show');
    }, 2800);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }
})();
