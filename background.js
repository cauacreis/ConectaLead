// ConectaLead - Background Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    aiProvider: 'gemini',
    geminiApiKey: '',
    openaiApiKey: '',
    defaultDdd: '11',
    whatsappMessageTemplate: 'Opa, tá disponível sim! Me passa seu zap com ddd que te mando fotos dele e a gente já combina',
    autoDetectPhone: true,
    googleSheetsWebhook: '',
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
});

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

async function handleSaveLead(leadData) {
  const { leads = [], googleSheetsWebhook = '' } = await chrome.storage.local.get(['leads', 'googleSheetsWebhook']);
  
  const cleanPhone = (leadData.phone || '').replace(/\D/g, '');
  if (!cleanPhone) throw new Error('Telefone inválido');

  const existingIndex = leads.findIndex(l => l.phone.replace(/\D/g, '') === cleanPhone);

  const newLead = {
    id: leadData.id || `lead_${Date.now()}`,
    name: leadData.name || 'Cliente Marketplace',
    phone: cleanPhone,
    formattedPhone: leadData.formattedPhone || leadData.phone,
    customerMessage: leadData.customerMessage || '',
    product: leadData.product || 'Produto Marketplace',
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
      product: newLead.product || leads[existingIndex].product
    };
  } else {
    isNew = true;
    leads.unshift(newLead);
  }

  await chrome.storage.local.set({ leads });

  // Automatic real-time forwarding to Google Sheets
  if (googleSheetsWebhook && isNew) {
    try {
      await fetch(googleSheetsWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          nome: newLead.name,
          whatsapp: newLead.formattedPhone,
          mensagem: newLead.customerMessage,
          produto: newLead.product,
          link_whatsapp: newLead.waLink,
          data: new Date(newLead.timestamp).toLocaleString('pt-BR')
        })
      });
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
