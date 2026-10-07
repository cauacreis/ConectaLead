// ========================================================
// ConectaLead - Script Automático para Google Planilhas
// ========================================================
// Como usar:
// 1. Abra uma nova planilha no Google Sheets (drive.google.com)
// 2. No menu superior, clique em: Extensões -> Apps Script
// 3. Apague qualquer código existente lá e cole este script completo
// 4. Clique em "Implantar" (canto superior direito) -> "Nova implantação"
// 5. Na engrenagem, selecione "App da Web"
// 6. Preencha:
//    - Descrição: ConectaLead
//    - Executar como: Eu (seu email)
//    - Quem pode acessar: Qualquer pessoa (Anyone)
// 7. Clique em "Implantar", autorize o acesso da sua conta e copie o "URL do app da Web"
// 8. Cole esse URL nas configurações do ConectaLead!
// ========================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Se a planilha estiver vazia, cria os cabeçalhos profissionais na primeira linha
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data e Hora",
        "Nome do Cliente",
        "WhatsApp",
        "Mensagem Original",
        "Produto",
        "Link WhatsApp"
      ]);
      // Formata o cabeçalho em negrito e cor de fundo suave
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#2563EB");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // Adiciona a nova linha com o lead capturado
    sheet.appendRow([
      data.data || new Date().toLocaleString("pt-BR"),
      data.nome || "Cliente Marketplace",
      data.whatsapp || "",
      data.mensagem || "",
      data.produto || "Produto Marketplace",
      data.link_whatsapp || ""
    ]);

    // Retorna resposta de sucesso
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
