// ConectaLead - Background Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    aiProvider: 'gemini',
    geminiApiKey: '',
    openaiApiKey: '',
    defaultDdd: '11',
    whatsappMessageTemplate: 'Olá! Está disponível sim. Qual o seu WhatsApp com DDD para eu te passar fotos em alta resolução e combinarmos por lá?',
    autoDetectPhone: true,
    leads: []
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
    return true; // Keep channel open for async response
  }

  if (message.type === 'SAVE_LEAD') {
    handleSaveLead(message.payload)
      .then(result => {
        updateBadge();
        sendResponse({ success: true, lead: result });
      })
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === 'UPDATE_BADGE') {
    updateBadge().then(() => sendResponse({ success: true }));
    return true;
  }
});

async function handleSaveLead(leadData) {
  const { leads = [] } = await chrome.storage.local.get('leads');
  
  // Prevent duplicate phones
  const cleanPhone = leadData.phone.replace(/\D/g, '');
  const existingIndex = leads.findIndex(l => l.phone.replace(/\D/g, '') === cleanPhone);

  const newLead = {
    id: leadData.id || `lead_${Date.now()}`,
    name: leadData.name || 'Interessado Marketplace',
    phone: cleanPhone,
    formattedPhone: leadData.formattedPhone || leadData.phone,
    product: leadData.product || 'Produto Marketplace',
    timestamp: new Date().toISOString(),
    sourceUrl: leadData.sourceUrl || ''
  };

  if (existingIndex >= 0) {
    leads[existingIndex] = { ...leads[existingIndex], ...newLead };
  } else {
    leads.unshift(newLead);
  }

  await chrome.storage.local.set({ leads });
  return newLead;
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
Você é um especialista em vendas no Facebook Marketplace no Brasil.
Crie um anúncio de alta conversão para o seguinte item:
Produto/Item: "${product}"
Preço sugerido: "R$ ${price}"
Localização/Bairro: "${location}"

Instruções fundamentais:
1. Crie um título direto, magnético e atraente (máximo 70 caracteres), sem clichês.
2. Crie uma descrição estruturada, amigável, clara e vendedora com:
   - Destaque das principais características e estado de conservação
   - Condições de pagamento aceitas (PIX, Dinheiro, Cartão)
   - Forma de entrega/retirada segura na região informada (${location})
   - Chamada final educada convidando a pessoa a chamar para tirar dúvidas ou fechar.
3. Responda ESTRITAMENTE em formato JSON com as chaves:
   {
     "title": "título aqui",
     "description": "descrição completa aqui com quebras de linha"
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
          content: 'Você é um redator de anúncios de alta conversão para Facebook Marketplace no Brasil. Responda em JSON com chaves title e description.'
        },
        {
          role: 'user',
          content: `Crie um anúncio magnético para:\nProduto: ${product}\nPreço: R$ ${price}\nLocal: ${location}`
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
  const title = `${cleanProduct} - Impecável na Região`;
  
  const descLines = [
    `💎 ${cleanProduct}`,
    '',
    '✔️ Produto em excelente estado, testado e pronto para uso.',
    '✔️ Fotos reais do item.',
    '',
    `💰 Valor: R$ ${price || 'A combinar'}`,
    '💳 Aceito PIX e cartão de crédito/débito.',
    '',
    `📍 Retirada ou entrega combinada na região de ${location || 'local a combinar'}.`,
    '',
    '👉 Interessados, enviem mensagem com o WhatsApp para combinarmos a entrega ou tirar dúvidas!'
  ];

  return {
    title: title.slice(0, 90),
    description: descLines.join('\n')
  };
}
