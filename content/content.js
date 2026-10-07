// ConectaLead - Content Script Injetado no Facebook
(() => {
  'use strict';

  // State
  let selectedFiles = [];
  let isPanelOpen = false;
  let activeTab = 'ad';
  let defaultDdd = '11';
  let lastDetectedPhone = null;

  // Initialize
  init();

  async function init() {
    // Prevent duplicate injection
    if (document.getElementById('conectalead-launcher')) return;

    // Load settings
    const settings = await chrome.storage.local.get(['defaultDdd']);
    if (settings.defaultDdd) defaultDdd = settings.defaultDdd;

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

          <!-- Quick Request WhatsApp Messages -->
          <div class="cl-form-group">
            <label class="cl-label">Respostas Rápidas (Pedir WhatsApp)</label>
            <div class="cl-replies-list">
              <div class="cl-reply-item" data-template="default">
                <strong>👉 Padrão (Fotos & Detalhes)</strong>
                <span>"Olá! Está disponível sim. Me passa seu WhatsApp com DDD para eu te enviar mais detalhes e combinarmos certinho?"</span>
              </div>
              <div class="cl-reply-item" data-template="delivery">
                <strong>👉 Entrega & Retirada</strong>
                <span>"Oi! Está disponível e testado. Qual seu WhatsApp com DDD para combinarmos a entrega/retirada agora?"</span>
              </div>
              <div class="cl-reply-item" data-template="offer">
                <strong>👉 Proposta & PIX</strong>
                <span>"Olá! Consigo fechar nesse valor no PIX. Me passa seu WhatsApp com DDD para acertarmos os detalhes?"</span>
              </div>
            </div>
          </div>

          <!-- Custom Message Box -->
          <div class="cl-form-group">
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

    // Send to Facebook Chat
    sendChatBtn.addEventListener('click', () => {
      const text = customChatMsg.value.trim();
      if (!text) {
        showToast('Selecione ou digite uma mensagem primeiro.');
        return;
      }
      const inserted = insertTextIntoFacebookChat(text);
      if (inserted) {
        showToast('Mensagem inserida no chat!');
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
    // Look for active messenger input
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

  // Scan current open chat for phone number
  function scanCurrentChatForPhone() {
    const textNodes = [];
    // Search message bubbles in Facebook Messenger
    const messages = document.querySelectorAll('div[dir="auto"], span[dir="auto"]');
    for (const msg of messages) {
      const text = msg.innerText || '';
      if (text.length >= 8 && text.length <= 150) {
        const detected = extractBrazilianPhone(text, defaultDdd);
        if (detected) {
          handlePhoneDetected(detected);
          return;
        }
      }
    }
  }

  function handlePhoneDetected(phoneData) {
    lastDetectedPhone = phoneData;
    const card = document.getElementById('cl-detected-card');
    const textEl = document.getElementById('cl-detected-phone-text');
    if (card && textEl) {
      textEl.innerText = phoneData.formatted;
      card.style.display = 'flex';
    }
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
      name: 'Lead Marketplace',
      product: document.getElementById('cl-product-input')?.value || 'Item Marketplace'
    };
    await chrome.runtime.sendMessage({ type: 'SAVE_LEAD', payload: lead });
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
          <div class="cl-lead-name">${escapeHtml(lead.name || 'Lead')}</div>
          <div class="cl-lead-phone">${escapeHtml(lead.formattedPhone || lead.phone)}</div>
          <div class="cl-lead-date">${new Date(lead.timestamp).toLocaleDateString('pt-BR')} ${new Date(lead.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <button class="cl-btn cl-btn-success cl-btn-sm cl-open-lead-wa" data-phone="${lead.phone}">
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

    let csv = 'Nome,Telefone,Data,Produto\n';
    leads.forEach(l => {
      csv += `"${l.name}","${l.phone}","${l.timestamp}","${l.product}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-conectalead-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Leads exportados com sucesso!');
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
