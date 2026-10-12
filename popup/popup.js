// ConectaLead - Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const providerSelect = document.getElementById('ai-provider');
  const apiKeyInput = document.getElementById('api-key');
  const apiKeyGroup = document.getElementById('api-key-group');
  const dddInput = document.getElementById('default-ddd');
  const webhookInput = document.getElementById('google-sheets-webhook');
  const downloadCsvBtn = document.getElementById('btn-download-csv');
  const saveBtn = document.getElementById('btn-save');
  const saveStatus = document.getElementById('save-status');
  const leadsCountEl = document.getElementById('leads-count');
  const scheduledCountEl = document.getElementById('scheduled-count');
  const apiHint = document.getElementById('api-hint');

  // Load current settings
  const settings = await chrome.storage.local.get([
    'aiProvider',
    'geminiApiKey',
    'openaiApiKey',
    'defaultDdd',
    'googleSheetsWebhook',
    'leads',
    'scheduledAds'
  ]);

  const currentProvider = settings.aiProvider || 'gemini';
  providerSelect.value = currentProvider;
  dddInput.value = settings.defaultDdd || '11';
  webhookInput.value = settings.googleSheetsWebhook || '';

  const leads = settings.leads || [];
  leadsCountEl.innerText = String(leads.length);

  const scheduledAds = settings.scheduledAds || [];
  const pendingScheduled = scheduledAds.filter(a => a.status === 'scheduled');
  if (scheduledCountEl) scheduledCountEl.innerText = String(pendingScheduled.length);

  updateKeyField(currentProvider, settings);

  providerSelect.addEventListener('change', async () => {
    const freshSettings = await chrome.storage.local.get(['geminiApiKey', 'openaiApiKey']);
    updateKeyField(providerSelect.value, freshSettings);
  });

  // Download Spreadsheet
  downloadCsvBtn.addEventListener('click', async () => {
    const { leads = [] } = await chrome.storage.local.get('leads');
    if (leads.length === 0) {
      alert('Nenhum lead capturado para exportar ainda.');
      return;
    }

    const JUNK_KEYWORDS = [
      'não lida', 'nao lida', 'seu classificado', 'classificado', 'recebeu',
      'visualizações', 'mensagens', 'conversas', 'conversa', 'verificação',
      'verificacao', 'faça a verificação', 'cliente marketplace'
    ];
    function cleanLeadName(name, msg) {
      if (!name || typeof name !== 'string') name = '';
      const firstPart = name.split(/\s*[·•|]\s*/)[0].trim();
      const lower = firstPart.toLowerCase();
      const isJunk = JUNK_KEYWORDS.some(j => lower.includes(j)) || /\d/.test(firstPart) || lower.length < 2;
      if (isJunk && msg) {
        const m = msg.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]{2,20}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,20})?)\s*[:\-–—\s]+\(?\d{2}\)?/);
        if (m) return m[1].trim();
      }
      return isJunk ? 'Cliente Marketplace' : firstPart;
    }

    const BOM = '\uFEFF';
    let csv = BOM + 'Nome;Numero;Link Whatsapp\n';
    leads.forEach(l => {
      const cleanName = cleanLeadName(l.name, l.customerMessage);
      const numero = l.formattedPhone || l.phone || '';
      const waLink = l.waLink || `https://wa.me/55${(l.phone || '').replace(/\D/g, '')}`;
      csv += `"${cleanName}";"${numero}";"${waLink}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planilha-leads-conectalead-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Test Google Sheets Webhook
  const testWebhookBtn = document.getElementById('btn-test-webhook');
  testWebhookBtn.addEventListener('click', async () => {
    const url = webhookInput.value.trim();
    if (!url) {
      alert('Cole o URL do App da Web do Google Apps Script primeiro.');
      return;
    }

    testWebhookBtn.disabled = true;
    testWebhookBtn.innerText = 'Conectando...';

    try {
      const resp = await chrome.runtime.sendMessage({
        type: 'TEST_SHEETS_WEBHOOK',
        payload: { url }
      });

      if (resp?.success) {
        alert('✅ Conexão confirmada! A planilha está pronta com as colunas Nome, Numero e Link Whatsapp.');
      } else {
        alert('Falha ao conectar. Verifique se o URL foi gerado como "App da Web" com acesso para "Qualquer pessoa".');
      }
    } catch (err) {
      alert('Erro na conexão: ' + err.message);
    } finally {
      testWebhookBtn.disabled = false;
      testWebhookBtn.innerText = '🧪 Testar Conexão';
    }
  });

  saveBtn.addEventListener('click', async () => {
    const selectedProvider = providerSelect.value;
    const keyValue = apiKeyInput.value.trim();
    const dddValue = dddInput.value.replace(/\D/g, '').slice(0, 2) || '11';
    const webhookValue = webhookInput.value.trim();

    const updateObj = {
      aiProvider: selectedProvider,
      defaultDdd: dddValue,
      googleSheetsWebhook: webhookValue
    };

    if (selectedProvider === 'gemini') {
      updateObj.geminiApiKey = keyValue;
    } else if (selectedProvider === 'openai') {
      updateObj.openaiApiKey = keyValue;
    }

    await chrome.storage.local.set(updateObj);

    saveStatus.classList.add('show');
    setTimeout(() => {
      saveStatus.classList.remove('show');
    }, 2000);
  });

  function updateKeyField(provider, data) {
    if (provider === 'local') {
      apiKeyGroup.style.display = 'none';
    } else {
      apiKeyGroup.style.display = 'flex';
      if (provider === 'gemini') {
        apiKeyInput.value = data.geminiApiKey || '';
        apiKeyInput.placeholder = 'Chave da API do Google Gemini...';
        apiHint.innerText = 'Obtenha gratuitamente no Google AI Studio (aistudio.google.com).';
      } else {
        apiKeyInput.value = data.openaiApiKey || '';
        apiKeyInput.placeholder = 'Chave da API da OpenAI (sk-...)...';
        apiHint.innerText = 'Chave da sua conta na OpenAI platform.';
      }
    }
  }
});
