// ConectaLead - Background Service Worker (Manifest V3)
try {
  importScripts('presets.js');
} catch (e) {
  console.warn('Aviso: presets.js não pôde ser carregado via importScripts', e);
}

chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    aiProvider: 'gemini',
    geminiApiKey: '',
    openaiApiKey: '',
    defaultDdd: '11',
    whatsappMessageTemplate: 'Opa, tá disponível sim! Me passa seu zap com ddd que te mando fotos dele e a gente já combina',
    autoDetectPhone: true,
    googleSheetsWebhook: '',
    leads: [],
    adLinks: [],
    scheduledAds: [],
    pendingAdToFill: null,
    autoPublishScheduled: true,
    processedPhones: {},
    processedChatIds: {}
  };

  const current = await chrome.storage.local.get(Object.keys(defaults));
  const toSet = {};
  for (const [key, val] of Object.entries(defaults)) {
    if (current[key] === undefined) {
      toSet[key] = val;
    }
  }
  if (Object.keys(toSet).length > 0) {
    await chrome.storage.local.set(toSet);
  }
});

// Update badge with leads count
async function updateBadge() {
  try {
    const { leads = [] } = await chrome.storage.local.get('leads');
    if (leads.length > 0) {
      await chrome.action.setBadgeText({ text: String(leads.length) });
      await chrome.action.setBadgeBackgroundColor({ color: '#10B981' });
    } else {
      await chrome.action.setBadgeText({ text: '' });
    }
  } catch (err) {
    console.error('Erro ao atualizar badge:', err);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GENERATE_AI_COPY') {
    handleGenerateCopy(message.payload)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'SAVE_LEAD' || message.type === 'AUTO_SAVE_LEAD') {
    handleSaveLead(message.payload)
      .then(result => {
        updateBadge();
        sendResponse({ success: true, lead: result.lead, isNew: result.isNew });
      })
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'TEST_SHEETS_WEBHOOK') {
    handleTestSheetsWebhook(message.payload?.url)
      .then(result => sendResponse(result))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'UPDATE_BADGE') {
    updateBadge().then(() => sendResponse({ success: true }));
    return true;
  }

  if (message.type === 'GET_SP_HOUSES_PRESETS') {
    const presets = (typeof SP_HOUSES_PRESETS !== 'undefined') ? SP_HOUSES_PRESETS : [];
    sendResponse({ success: true, presets });
    return true;
  }

  if (message.type === 'SCHEDULE_AD') {
    handleScheduleAd(message.payload)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'SCHEDULE_BATCH_ADS') {
    handleScheduleBatchAds(message.payload)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'CANCEL_SCHEDULED_AD') {
    handleCancelScheduledAd(message.payload?.id)
      .then(result => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'TRIGGER_AD_NOW') {
    handleTriggerAdNow(message.payload?.id)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'CLEAR_COMPLETED_SCHEDULED') {
    handleClearCompletedScheduled()
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'GET_AD_LINKS') {
    chrome.storage.local.get('adLinks')
      .then(data => sendResponse({ success: true, adLinks: data.adLinks || [] }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'SAVE_AD_LINK') {
    handleSaveAdLink(message.payload)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'DELETE_AD_LINK') {
    handleDeleteAdLink(message.payload?.id)
      .then(result => sendResponse({ success: true }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

// Alarm Listener for Scheduled Ads
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (!alarm.name.startsWith('sched_')) return;

  try {
    const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
    const adIndex = scheduledAds.findIndex(a => a.id === alarm.name);
    if (adIndex === -1) return;

    const ad = scheduledAds[adIndex];
    if (ad.status !== 'scheduled') return;

    // Set ad ready to fill
    ad.status = 'ready_to_fill';
    await chrome.storage.local.set({ scheduledAds, pendingAdToFill: ad });

    // Show desktop notification
    try {
      chrome.notifications.create(`notif_${ad.id}`, {
        type: 'basic',
        iconUrl: 'icons/icon-128.png',
        title: 'ConectaLead - Hora do Anúncio!',
        message: `Abrindo Marketplace para preencher: ${ad.title}`,
        priority: 2
      });
    } catch (e) {
      console.warn('Notificação desktop não suportada:', e);
    }

    // Open Marketplace Create Rental / Real Estate page
    chrome.tabs.create({ url: 'https://www.facebook.com/marketplace/create/rental' });
  } catch (err) {
    console.error('Erro ao processar disparo de alarme agendado:', err);
  }
});

async function handleScheduleAd(adData) {
  const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
  const id = adData.id || `sched_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const scheduledTimeMs = new Date(adData.scheduledTime).getTime();

  if (isNaN(scheduledTimeMs)) {
    throw new Error('Data ou horário de agendamento inválido.');
  }

  const newAd = {
    id,
    title: adData.title,
    price: adData.price || '',
    location: adData.location || '',
    description: adData.description || '',
    folderName: adData.folderName || '',
    hideFromFriends: adData.hideFromFriends !== false,
    autoPublish: adData.autoPublish !== false,
    scheduledTime: adData.scheduledTime,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };

  scheduledAds.push(newAd);
  scheduledAds.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
  await chrome.storage.local.set({ scheduledAds });

  // Schedule alarm (if time is in future; if past/now, fires almost immediately)
  const when = Math.max(Date.now() + 500, scheduledTimeMs);
  await chrome.alarms.create(id, { when });

  return newAd;
}

function calculateMarketPeakSlots(count, startFromDate = new Date()) {
  const slots = [];
  const cursor = new Date(startFromDate.getTime());
  
  // Janelas de pico de engajamento imobiliário no Brasil (Palhoça / SC / Brasil):
  // Dias úteis: Almoço (12:15, 13:10), Volta do trabalho (18:15), Horário Nobre Noturno (19:45, 20:45)
  // Sábado: Café da manhã / pesquisa familiar (09:30, 11:00), Tarde (15:00, 17:30)
  // Domingo: Manhã (10:30), Tarde (16:00), Noite de planejamento familiar (19:30, 20:30)
  const weekdaySlots = [
    [12, 15],
    [13, 10],
    [18, 15],
    [19, 45],
    [20, 45]
  ];
  const saturdaySlots = [
    [9, 30],
    [11, 0],
    [15, 0],
    [17, 30]
  ];
  const sundaySlots = [
    [10, 30],
    [16, 0],
    [19, 30],
    [20, 30]
  ];

  let checkDate = new Date(cursor.getTime());
  const minValidTime = cursor.getTime() + 5 * 60 * 1000;

  while (slots.length < count) {
    const dayOfWeek = checkDate.getDay();
    let daySlotTemplates = weekdaySlots;
    if (dayOfWeek === 6) daySlotTemplates = saturdaySlots;
    else if (dayOfWeek === 0) daySlotTemplates = sundaySlots;

    for (const [hour, min] of daySlotTemplates) {
      const candidate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate(), hour, min, 0, 0);
      if (candidate.getTime() >= minValidTime) {
        slots.push(candidate);
        if (slots.length === count) break;
      }
    }

    checkDate.setDate(checkDate.getDate() + 1);
    checkDate.setHours(0, 0, 0, 0);
  }

  return slots;
}

async function handleScheduleBatchAds({ ads, startTime, intervalMinutes = 'market_peak' }) {
  if (!Array.isArray(ads) || ads.length === 0) {
    throw new Error('Nenhum anúncio informado para agendamento em lote.');
  }

  const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
  const startMs = startTime ? new Date(startTime).getTime() : (Date.now() + 5 * 60 * 1000);
  
  const isMarketPeak = intervalMinutes === 'market_peak';
  const peakSlots = isMarketPeak ? calculateMarketPeakSlots(ads.length, new Date(startMs)) : [];
  const stepMs = isMarketPeak ? 0 : Math.max(1, Number(intervalMinutes) || 30) * 60 * 1000;

  const addedAds = [];

  for (let i = 0; i < ads.length; i++) {
    const raw = ads[i];
    const adTimeMs = isMarketPeak ? peakSlots[i].getTime() : (startMs + (i * stepMs));
    const id = `sched_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 4)}`;

    const adObj = {
      id,
      title: raw.title,
      price: raw.price || '',
      location: raw.location || '',
      description: raw.description || '',
      folderName: raw.folderName || '',
      hideFromFriends: raw.hideFromFriends !== false,
      autoPublish: raw.autoPublish !== false,
      scheduledTime: new Date(adTimeMs).toISOString(),
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    scheduledAds.push(adObj);
    addedAds.push(adObj);

    await chrome.alarms.create(id, { when: adTimeMs });
  }

  scheduledAds.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
  await chrome.storage.local.set({ scheduledAds });

  return { count: addedAds.length, ads: addedAds };
}

async function handleCancelScheduledAd(adId) {
  if (!adId) return;
  const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
  const updated = scheduledAds.filter(a => a.id !== adId);
  await chrome.alarms.clear(adId);
  await chrome.storage.local.set({ scheduledAds: updated });
  return true;
}

async function handleTriggerAdNow(adId) {
  const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
  const ad = scheduledAds.find(a => a.id === adId);
  if (!ad) throw new Error('Anúncio não encontrado na fila.');

  await chrome.alarms.clear(adId);
  ad.status = 'ready_to_fill';
  await chrome.storage.local.set({ scheduledAds, pendingAdToFill: ad });

  chrome.tabs.create({ url: 'https://www.facebook.com/marketplace/create/rental' });
  return ad;
}

async function handleClearCompletedScheduled() {
  const { scheduledAds = [] } = await chrome.storage.local.get('scheduledAds');
  const remaining = scheduledAds.filter(a => a.status === 'scheduled');
  await chrome.storage.local.set({ scheduledAds: remaining });
  return { count: remaining.length };
}

async function handleTestSheetsWebhook(webhookUrl) {
  if (!webhookUrl) throw new Error('URL do Webhook não informada');

  const testPayload = {
    nome: 'Teste de Integração (ConectaLead)',
    whatsapp: '(11) 99999-8888',
    mensagem: 'Mensagem de teste automático para verificar a planilha.',
    produto: 'Item de Teste',
    link_whatsapp: 'https://wa.me/5511999998888',
    data: new Date().toLocaleString('pt-BR')
  };

  await fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(testPayload)
  });

  return { success: true };
}

async function handleSaveAdLink(adLinkData) {
  if (!adLinkData || !adLinkData.url) throw new Error('URL do anúncio obrigatória');
  const { adLinks = [] } = await chrome.storage.local.get('adLinks');
  
  const cleanUrl = adLinkData.url.trim();
  const existingIdx = adLinks.findIndex(a => a.url === cleanUrl);

  const adObj = {
    id: adLinkData.id || `adlink_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    title: adLinkData.title || 'Anúncio Marketplace',
    price: adLinkData.price || '',
    location: adLinkData.location || '',
    url: cleanUrl,
    folderName: adLinkData.folderName || '',
    createdAt: adLinkData.createdAt || new Date().toISOString()
  };

  if (existingIdx >= 0) {
    adLinks[existingIdx] = { ...adLinks[existingIdx], ...adObj };
  } else {
    adLinks.unshift(adObj);
  }

  await chrome.storage.local.set({ adLinks });
  return adObj;
}

async function handleDeleteAdLink(idOrUrl) {
  if (!idOrUrl) return false;
  const { adLinks = [] } = await chrome.storage.local.get('adLinks');
  const updated = adLinks.filter(a => a.id !== idOrUrl && a.url !== idOrUrl);
  await chrome.storage.local.set({ adLinks: updated });
  return true;
}

async function handleSaveLead(leadData) {
  const { leads = [], googleSheetsWebhook = '' } = await chrome.storage.local.get(['leads', 'googleSheetsWebhook']);
  
  const cleanPhone = (leadData.phone || '').replace(/\D/g, '');
  if (!cleanPhone) throw new Error('Telefone inválido');

  const adLink = leadData.adLink || leadData.sourceUrl || '';
  const existingIndex = leads.findIndex(l => l.phone.replace(/\D/g, '') === cleanPhone);

  const newLead = {
    id: leadData.id || `lead_${Date.now()}`,
    name: leadData.name || 'Cliente Marketplace',
    phone: cleanPhone,
    formattedPhone: leadData.formattedPhone || leadData.phone,
    customerMessage: leadData.customerMessage || '',
    product: leadData.product || 'Produto Marketplace',
    adLink: adLink,
    waLink: `https://wa.me/55${cleanPhone}`,
    timestamp: leadData.timestamp || new Date().toISOString(),
    sourceUrl: leadData.sourceUrl || ''
  };

  let isNew = false;
  if (existingIndex >= 0) {
    // Update existing lead if there is new message content
    leads[existingIndex] = {
      ...leads[existingIndex],
      customerMessage: newLead.customerMessage || leads[existingIndex].customerMessage,
      product: newLead.product || leads[existingIndex].product,
      adLink: newLead.adLink || leads[existingIndex].adLink
    };
  } else {
    isNew = true;
    leads.unshift(newLead);
  }

  const { processedPhones = {} } = await chrome.storage.local.get('processedPhones');
  processedPhones[cleanPhone] = {
    phone: cleanPhone,
    formatted: newLead.formattedPhone,
    name: newLead.name,
    product: newLead.product,
    adLink: newLead.adLink,
    timestamp: newLead.timestamp
  };

  await chrome.storage.local.set({ leads, processedPhones });

  // Auto-record ad link if present
  if (adLink) {
    handleSaveAdLink({
      url: adLink,
      title: newLead.product,
      createdAt: newLead.timestamp
    }).catch(err => console.warn('Erro ao registrar link de anúncio:', err));
  }

  // Automatic real-time forwarding to Google Sheets
  const cleanWebhook = (googleSheetsWebhook || '').trim();
  if (cleanWebhook && isNew) {
    try {
      await fetch(cleanWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nome: newLead.name,
          whatsapp: newLead.formattedPhone,
          mensagem: newLead.customerMessage,
          produto: newLead.product,
          link_anuncio: newLead.adLink || '',
          link_whatsapp: newLead.waLink,
          data: new Date(newLead.timestamp).toLocaleString('pt-BR')
        })
      });
      console.log('[ConectaLead] Lead exportado automaticamente para o Google Sheets:', newLead.formattedPhone);
    } catch (webhookErr) {
      console.warn('Aviso: Não foi possível sincronizar com a planilha do Google:', webhookErr);
    }
  }

  return { lead: newLead, isNew };
}

async function handleGenerateCopy({ prompt, product, price, location }) {
  const { aiProvider, geminiApiKey, openaiApiKey } = await chrome.storage.local.get([
    'aiProvider',
    'geminiApiKey',
    'openaiApiKey'
  ]);

  if (aiProvider === 'gemini' && geminiApiKey) {
    return await callGemini(geminiApiKey, product, price, location);
  } else if (aiProvider === 'openai' && openaiApiKey) {
    return await callOpenAI(openaiApiKey, product, price, location);
  }

  // Built-in intelligent local generator fallback
  return generateLocalCopy(product, price, location);
}

async function callGemini(apiKey, product, price, location) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const promptText = `
Você é uma pessoa comum vendendo um item usado/pessoal no Facebook Marketplace no Brasil.
NÃO use linguagem corporativa nem jargões de agência. NÃO exagere em emojis. NÃO use palavras como "imperdível", "oportunidade única", "garanta já".
Escreva de forma simples, direta, natural e confiável — exatamente como uma pessoa real anuncia desapegos ou produtos no Marketplace.

Item anunciado: "${product}"
Preço: "R$ ${price}"
Local de entrega/retirada: "${location}"

Instruções:
1. Título: direto e limpo, focado em busca (máximo 60 caracteres). Sem emojis no título.
2. Descrição:
   - Comece natural (ex: "Vendo ${product}, funcionando perfeitamente e bem cuidado").
   - Detalhes rápidos e sinceros do estado de conservação.
   - Valor e pagamento (PIX ou dinheiro em mãos).
   - Retirada ou entrega na região de ${location}.
   - Fechamento humano convidando a mandar o zap pra combinar.
3. Responda ESTRITAMENTE em formato JSON com as chaves:
   {
     "title": "título aqui",
     "description": "descrição aqui com quebras de linha"
   }
Não inclua crases de markdown além do bloco JSON puro.
`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Falha na IA: ${response.status}`);
  }

  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return generateLocalCopy(product, price, location);
  }

  try {
    const parsed = JSON.parse(text);
    return {
      title: parsed.title || product,
      description: parsed.description || product
    };
  } catch {
    return generateLocalCopy(product, price, location);
  }
}

async function callOpenAI(apiKey, product, price, location) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Você é uma pessoa comum vendendo um item no Facebook Marketplace no Brasil. Fale de forma simples, natural, humana e sem jargões ou exageros de marketing. Responda em JSON com chaves title e description.'
        },
        {
          role: 'user',
          content: `Crie um anúncio simples e humano para:\nItem: ${product}\nValor: R$ ${price}\nLocal: ${location}`
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Falha na OpenAI: ${response.status}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  const parsed = JSON.parse(content);
  return {
    title: parsed.title || product,
    description: parsed.description || product
  };
}

function generateLocalCopy(product, price, location) {
  const cleanProduct = (product || '').trim();
  const title = `${cleanProduct} - Muito bem cuidado`;
  
  const descLines = [
    `Vendo ${cleanProduct}, aparelho/item em ótimo estado e funcionando 100%.`,
    'Fotos reais tiradas do próprio produto.',
    '',
    `Valor: R$ ${price || 'a combinar'}`,
    'Pagamento no PIX ou dinheiro em mãos.',
    '',
    `Pode retirar comigo em ${location || 'local a combinar'} ou combinamos entrega na região.`,
    '',
    'Quem tiver interesse chama no chat ou já manda o zap com ddd pra gente combinar certinho!'
  ];

  return {
    title: title.slice(0, 70),
    description: descLines.join('\n')
  };
}
