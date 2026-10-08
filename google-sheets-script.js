// ========================================================
// ConectaLead - Script Profissional para Google Planilhas
// ========================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // 1. Inicializa cabeçalhos e colunas se a planilha estiver vazia ou com 1 linha
    if (sheet.getLastRow() === 0) {
      criarCabecalhoEConfigurarColunas(sheet);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var waLink = data.link_whatsapp || (data.whatsapp ? "https://wa.me/55" + data.whatsapp.replace(/\D/g, '') : "");
    var formulaLink = waLink ? '=HYPERLINK("' + waLink + '"; "📲 Chamar no WhatsApp")' : "";

    var novaLinha = [
      data.data || new Date().toLocaleString("pt-BR"),
      data.nome || "Cliente Marketplace",
      data.whatsapp || "",
      data.mensagem || "",
      data.produto || "Produto Marketplace",
      formulaLink
    ];

    sheet.appendRow(novaLinha);
    var rowIdx = sheet.getLastRow();

    // 2. Aplica formatação de design profissional na nova linha
    formatarLinha(sheet, rowIdx);

    // 3. Garante largura ideal das colunas
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

// Menu personalizado no Google Sheets para o usuário organizar com 1 clique se quiser
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ ConectaLead')
    .addItem('🎨 Reformatar e Organizar Tudo', 'formatarTodaPlanilha')
    .addToUi();
}

function criarCabecalhoEConfigurarColunas(sheet) {
  sheet.appendRow([
    "Data e Hora",
    "Nome do Cliente",
    "WhatsApp",
    "Mensagem Original",
    "Produto",
    "Ação Rápida"
  ]);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 42);

  var header = sheet.getRange(1, 1, 1, 6);
  header.setFontFamily("Segoe UI");
  header.setFontSize(11);
  header.setFontWeight("bold");
  header.setBackground("#0F172A"); // Dark Slate elegante
  header.setFontColor("#FFFFFF");
  header.setVerticalAlignment("middle");
  header.setHorizontalAlignment("center");
}

function ajustarLarguras(sheet) {
  // Define larguras confortáveis para nunca truncar o texto
  sheet.setColumnWidth(1, 160); // Data e Hora
  sheet.setColumnWidth(2, 190); // Nome do Cliente
  sheet.setColumnWidth(3, 150); // WhatsApp
  sheet.setColumnWidth(4, 320); // Mensagem Original
  sheet.setColumnWidth(5, 220); // Produto
  sheet.setColumnWidth(6, 170); // Ação Rápida WhatsApp
}

function formatarLinha(sheet, rowIdx) {
  var range = sheet.getRange(rowIdx, 1, 1, 6);
  sheet.setRowHeight(rowIdx, 36);

  range.setFontFamily("Segoe UI");
  range.setFontSize(10);
  range.setVerticalAlignment("middle");

  // Cor de fundo alternada (zebra)
  if (rowIdx % 2 === 0) {
    range.setBackground("#F8FAFC");
  } else {
    range.setBackground("#FFFFFF");
  }

  // Bordas suaves
  range.setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);

  // Alinhamentos específicos
  sheet.getRange(rowIdx, 1).setHorizontalAlignment("center"); // Data
  sheet.getRange(rowIdx, 2).setHorizontalAlignment("left");   // Nome
  
  // WhatsApp: em destaque verde escuro
  var zapCell = sheet.getRange(rowIdx, 3);
  zapCell.setHorizontalAlignment("center");
  zapCell.setFontWeight("bold");
  zapCell.setFontColor("#065F46");

  // Mensagem Original: quebra de linha ativada para não estourar a tela
  var msgCell = sheet.getRange(rowIdx, 4);
  msgCell.setWrap(true);
  msgCell.setHorizontalAlignment("left");

  // Produto
  sheet.getRange(rowIdx, 5).setHorizontalAlignment("left");

  // Botão/Link WhatsApp: Verde, negrito e centralizado
  var linkCell = sheet.getRange(rowIdx, 6);
  linkCell.setHorizontalAlignment("center");
  linkCell.setFontWeight("bold");
  linkCell.setFontColor("#059669");
}

// Função para formatar a planilha inteira existente (inclusive linhas antigas)
function formatarTodaPlanilha() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow === 0) {
    criarCabecalhoEConfigurarColunas(sheet);
    ajustarLarguras(sheet);
    return;
  }

  // Refaz cabeçalho
  sheet.getRange(1, 1, 1, 6).setValues([[
    "Data e Hora",
    "Nome do Cliente",
    "WhatsApp",
    "Mensagem Original",
    "Produto",
    "Ação Rápida"
  ]]);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 42);
  var header = sheet.getRange(1, 1, 1, 6);
  header.setFontFamily("Segoe UI");
  header.setFontSize(11);
  header.setFontWeight("bold");
  header.setBackground("#0F172A");
  header.setFontColor("#FFFFFF");
  header.setVerticalAlignment("middle");
  header.setHorizontalAlignment("center");

  ajustarLarguras(sheet);

  // Formata todas as linhas de dados
  for (var r = 2; r <= lastRow; r++) {
    // Corrige link para fórmula bonita se for URL crua
    var linkVal = sheet.getRange(r, 6).getValue();
    if (typeof linkVal === 'string' && linkVal.indexOf("http") === 0) {
      sheet.getRange(r, 6).setValue('=HYPERLINK("' + linkVal + '"; "📲 Chamar no WhatsApp")');
    }
    formatarLinha(sheet, r);
  }
}
