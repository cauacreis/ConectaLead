// ========================================================
// ConectaLead - Script Profissional e Inteligente para Google Planilhas
// ========================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. Inicializa cabeçalhos e colunas se a planilha estiver totalmente vazia
    if (sheet.getLastRow() === 0) {
      criarCabecalhoEConfigurarColunas(sheet);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // 2. Higienizacao estrita de Nome contra textos de sistema do Facebook
    var nomeFinal = data.nome || data.name || "";
    var msgOriginal = data.mensagem || data.message || data.customerMessage || "";
    nomeFinal = sanitizarNomeCliente(nomeFinal, msgOriginal);

    // 3. Higienizacao estrita de Produto
    var produtoFinal = data.produto || data.product || "";
    if (!produtoFinal || produtoFinal.toLowerCase().trim() === "marketplace" || produtoFinal.toLowerCase().indexOf("não lida") !== -1) {
      produtoFinal = "Casa Disponível em PALHOÇA";
    }

    // 4. Links formatados
    var rawPhone = (data.whatsapp || data.phone || "").replace(/\D/g, '');
    var waLink = data.link_whatsapp || data.waLink || (rawPhone ? "https://wa.me/55" + rawPhone : "");
    var formulaLink = waLink ? '=HYPERLINK("' + waLink + '"; "📲 Chamar no WhatsApp")' : "";

    var adLink = data.link_anuncio || data.ad_link || data.adLink || "";
    var formulaAdLink = adLink ? '=HYPERLINK("' + adLink + '"; "🔗 Ver Anúncio")' : produtoFinal;

    var dataHora = data.data || data.date || new Date().toLocaleString("pt-BR");
    var zapFormatado = data.whatsapp || data.phone || (rawPhone ? formatarZap(rawPhone) : "");

    // 5. Insercao inteligente baseada nos cabecalhos existentes da planilha
    var lastCol = Math.max(sheet.getLastColumn(), 7);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0] || [];
    
    var colMap = mapearColunas(headers);
    var novaLinha = [];

    if (colMap.nome && colMap.whatsapp) {
      // Preenche respeitando a ordem exata das colunas do usuario
      for (var c = 1; c <= lastCol; c++) {
        if (colMap.data === c) novaLinha.push(dataHora);
        else if (colMap.nome === c) novaLinha.push(nomeFinal);
        else if (colMap.whatsapp === c) novaLinha.push(zapFormatado);
        else if (colMap.mensagem === c) novaLinha.push(msgOriginal);
        else if (colMap.produto === c) novaLinha.push(produtoFinal);
        else if (colMap.adLink === c) novaLinha.push(formulaAdLink);
        else if (colMap.waLink === c) novaLinha.push(formulaLink);
        else novaLinha.push("");
      }
    } else {
      // Ordem padrao recomendada
      novaLinha = [
        dataHora,
        nomeFinal,
        zapFormatado,
        msgOriginal,
        produtoFinal,
        formulaAdLink,
        formulaLink
      ];
    }

    sheet.appendRow(novaLinha);
    var rowIdx = sheet.getLastRow();

    formatarLinha(sheet, rowIdx);
    ajustarLarguras(sheet);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("ConectaLead Webhook Ativo e Operante!");
}

// Menu personalizado no Google Sheets
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ ConectaLead')
    .addItem('🎨 Reformatar e Organizar Tudo', 'formatarTodaPlanilha')
    .addItem('🔧 Corrigir Nomes e Linhas Antigas', 'corrigirLinhasAntigas')
    .addToUi();
}

function mapearColunas(headers) {
  var map = {};
  for (var i = 0; i < headers.length; i++) {
    var h = String(headers[i] || "").toLowerCase().trim();
    if (h.indexOf("data") !== -1 || h.indexOf("hora") !== -1) map.data = i + 1;
    else if (h.indexOf("nome") !== -1 || h.indexOf("cliente") !== -1) map.nome = i + 1;
    else if (h.indexOf("whats") !== -1 || h.indexOf("telefone") !== -1 || h.indexOf("zap") !== -1) map.whatsapp = i + 1;
    else if (h.indexOf("mensagem") !== -1 || h.indexOf("texto") !== -1) map.mensagem = i + 1;
    else if (h.indexOf("produto") !== -1 || h.indexOf("casa") !== -1 || h.indexOf("imóvel") !== -1 || h.indexOf("imovel") !== -1) map.produto = i + 1;
    else if (h.indexOf("anúncio") !== -1 || h.indexOf("anuncio") !== -1) map.adLink = i + 1;
    else if (h.indexOf("ação") !== -1 || h.indexOf("acao") !== -1 || h.indexOf("chamar") !== -1 || h.indexOf("link") !== -1) map.waLink = i + 1;
  }
  return map;
}

function sanitizarNomeCliente(nome, mensagem) {
  var JUNK = ["não lida", "nao lida", "seu classificado", "classificado", "recebeu", "visualizações", "mensagens", "marketplace"];
  var lower = String(nome || "").toLowerCase().trim();
  var isJunk = !nome || nome.length < 2 || /\d/.test(nome);
  
  for (var j = 0; j < JUNK.length; j++) {
    if (lower.indexOf(JUNK[j]) !== -1) {
      isJunk = true;
      break;
    }
  }

  if (isJunk && mensagem) {
    // Tenta extrair da mensagem (ex: "Orli: 48984442595" -> "Orli")
    var m = mensagem.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]{2,20}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,20})?)\s*[:\-–—\s]+\(?\d{2}\)?/);
    if (m && m[1]) return m[1].trim();
  }

  return isJunk ? "Cliente Marketplace" : nome.trim();
}

function formatarZap(num) {
  if (num.length === 11) {
    return "(" + num.slice(0, 2) + ") " + num.slice(2, 7) + "-" + num.slice(7);
  } else if (num.length === 10) {
    return "(" + num.slice(0, 2) + ") " + num.slice(2, 6) + "-" + num.slice(6);
  }
  return num;
}

function criarCabecalhoEConfigurarColunas(sheet) {
  sheet.appendRow([
    "Data e Hora",
    "Nome do Cliente",
    "WhatsApp",
    "Mensagem Original",
    "Produto / Casa",
    "Link do Anúncio",
    "Ação Rápida"
  ]);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 42);

  var header = sheet.getRange(1, 1, 1, 7);
  header.setFontFamily("Segoe UI");
  header.setFontSize(11);
  header.setFontWeight("bold");
  header.setBackground("#0F172A");
  header.setFontColor("#FFFFFF");
  header.setVerticalAlignment("middle");
  header.setHorizontalAlignment("center");
}

function ajustarLarguras(sheet) {
  sheet.setColumnWidth(1, 160); // Data e Hora
  sheet.setColumnWidth(2, 190); // Nome do Cliente
  sheet.setColumnWidth(3, 150); // WhatsApp
  sheet.setColumnWidth(4, 300); // Mensagem Original
  sheet.setColumnWidth(5, 220); // Produto / Casa
  sheet.setColumnWidth(6, 170); // Link do Anúncio
  sheet.setColumnWidth(7, 170); // Ação Rápida WhatsApp
}

function formatarLinha(sheet, rowIdx) {
  var lastCol = Math.max(sheet.getLastColumn(), 7);
  var range = sheet.getRange(rowIdx, 1, 1, lastCol);
  sheet.setRowHeight(rowIdx, 36);

  range.setFontFamily("Segoe UI");
  range.setFontSize(10);
  range.setVerticalAlignment("middle");

  if (rowIdx % 2 === 0) {
    range.setBackground("#F8FAFC");
  } else {
    range.setBackground("#FFFFFF");
  }

  range.setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
}

// Corrige linhas antigas corrompidas (como o caso do "Não lidaSeu classificado...")
function corrigirLinhasAntigas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1) return;

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0] || [];
  var colMap = mapearColunas(headers);

  var nomeCol = colMap.nome || 2;
  var msgCol = colMap.mensagem || 4;
  var prodCol = colMap.produto || 5;

  for (var r = 2; r <= lastRow; r++) {
    var nomeVal = String(sheet.getRange(r, nomeCol).getValue() || "");
    var msgVal = String(sheet.getRange(r, msgCol).getValue() || "");
    var prodVal = String(sheet.getRange(r, prodCol).getValue() || "");

    var nomeLimpo = sanitizarNomeCliente(nomeVal, msgVal);
    if (nomeLimpo !== nomeVal) {
      sheet.getRange(r, nomeCol).setValue(nomeLimpo);
    }

    if (prodVal.toLowerCase().trim() === "marketplace") {
      sheet.getRange(r, prodCol).setValue("Casa Disponível em PALHOÇA");
    }
  }

  SpreadsheetApp.getUi().alert("✅ Pronto! Todas as linhas da planilha foram corrigidas e organizadas.");
}

function formatarTodaPlanilha() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow === 0) {
    criarCabecalhoEConfigurarColunas(sheet);
    ajustarLarguras(sheet);
    return;
  }

  corrigirLinhasAntigas();
  ajustarLarguras(sheet);
}
