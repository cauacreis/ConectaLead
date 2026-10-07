// ConectaLead - Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const providerSelect = document.getElementById('ai-provider');
  const apiKeyInput = document.getElementById('api-key');
  const apiKeyGroup = document.getElementById('api-key-group');
  const dddInput = document.getElementById('default-ddd');
  const saveBtn = document.getElementById('btn-save');
  const saveStatus = document.getElementById('save-status');
  const leadsCountEl = document.getElementById('leads-count');
  const apiHint = document.getElementById('api-hint');

  // Load current settings
  const settings = await chrome.storage.local.get([
    'aiProvider',
    'geminiApiKey',
    'openaiApiKey',
    'defaultDdd',
    'leads'
  ]);

  const currentProvider = settings.aiProvider || 'gemini';
  providerSelect.value = currentProvider;
  dddInput.value = settings.defaultDdd || '11';

  const leads = settings.leads || [];
  leadsCountEl.innerText = String(leads.length);

  updateKeyField(currentProvider, settings);

  providerSelect.addEventListener('change', async () => {
    const freshSettings = await chrome.storage.local.get(['geminiApiKey', 'openaiApiKey']);
    updateKeyField(providerSelect.value, freshSettings);
  });

  saveBtn.addEventListener('click', async () => {
    const selectedProvider = providerSelect.value;
    const keyValue = apiKeyInput.value.trim();
    const dddValue = dddInput.value.replace(/\D/g, '').slice(0, 2) || '11';

    const updateObj = {
      aiProvider: selectedProvider,
      defaultDdd: dddValue
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
