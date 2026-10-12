// ========================================================
// ConectaLead - Planilha Limpa (Nome | Numero | Link Whatsapp)
// ========================================================
// COMO ARRUMAR SUA PLANILHA AGORA EM 1 CLIQUE:
// 1. Na sua planilha Google, clique em: Extensões -> Apps Script
// 2. Apague tudo, cole este código e clique no ícone de Salvar (disquete)
// 3. Clique no botão "▶ Executar" no topo para arrumar todas as linhas atuais na hora!
// 4. Para os próximos leads já caírem no formato novo: clique em "Implantar" ->
//    "Gerenciar implantações" -> ícone de lápis (Editar) -> Versão: "Nova versão" -> "Implantar".
// ========================================================

function arrumarPlanilhaAgora() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  reorganizarPlanilhaPara3Colunas(sheet);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Se a planilha ainda estiver no formato antigo (ex: "Data e Hora" na coluna A) ou vazia,
    // converte automaticamente para as 3 colunas: Nome | Numero | Link Whatsapp
    var firstHeader = sheet.getLastRow() > 0 ? String(sheet.getRange(1, 1).getValue() || "").trim() : "";
    if (sheet.getLastRow() === 0 || firstHeader.toLowerCase() !== "nome") {
      reorganizarPlanilhaPara3Colunas(sheet);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // Se for apenas comando de organização/teste sem número real, encerra após organizar
    var rawPhone = String(data.numero || data.whatsapp || data.phone || "").replace(/\D/g, "");
    if (data.action === "organize" || !rawPhone || rawPhone.indexOf("999998888") !== -1) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "organized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Remove prefixo 55 se vier duplicado com 12 ou 13 dígitos
    if ((rawPhone.length === 12 || rawPhone.length === 13) && rawPhone.indexOf("55") === 0) {
      rawPhone = rawPhone.slice(2);
    }

    var nomeBruto = data.nome || data.name || "";
    var msgOriginal = data.mensagem || data.message || data.customerMessage || "";
    var nomeFinal = sanitizarNomeCliente(nomeBruto, msgOriginal);
    var zapFormatado = formatarZap(rawPhone);
    var waLink = "https://wa.me/55" + rawPhone;

    // Verifica se o número já existe na coluna B para não duplicar
    var lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      var existingPhones = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < existingPhones.length; i++) {
        var existingClean = String(existingPhones[i][0] || "").replace(/\D/g, "");
        if (existingClean === rawPhone) {
          var rowToUpdate = i + 2;
          var currentName = String(sheet.getRange(rowToUpdate, 1).getValue() || "").trim();
          if ((!currentName || currentName === "Cliente Marketplace") && nomeFinal !== "Cliente Marketplace") {
            sheet.getRange(rowToUpdate, 1).setValue(nomeFinal);
          }
          sheet.getRange(rowToUpdate, 2).setValue(zapFormatado);
          sheet.getRange(rowToUpdate, 3).setValue(waLink);
          formatarLinha3Colunas(sheet, rowToUpdate);
          return ContentService.createTextOutput(JSON.stringify({ status: "updated" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    sheet.appendRow([nomeFinal, zapFormatado, waLink]);
    var newRowIdx = sheet.getLastRow();
    formatarLinha3Colunas(sheet, newRowIdx);
    ajustarLarguras3Colunas(sheet);

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("ConectaLead Webhook Ativo (Nome | Numero | Link Whatsapp)!");
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("⚡ ConectaLead")
    .addItem("🚀 Arrumar Planilha (Nome | Numero | Link Whatsapp)", "arrumarPlanilhaAgora")
    .addToUi();
}

function reorganizarPlanilhaPara3Colunas(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var leadsLimpos = [];
  var telefonesVistos = {};

  if (lastRow >= 2 && lastCol >= 2) {
    var allValues = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    var headers = allValues[0].map(function(h) { return String(h || "").toLowerCase().trim(); });

    // Descobre onde estavam Nome e Telefone na planilha antiga
    for (var r = 1; r < allValues.length; r++) {
      var row = allValues[r];
      var foundPhone = "";
      var foundName = "";

      // Procura telefone na linha
      for (var c = 0; c < row.length; c++) {
        var cellStr = String(row[c] || "").trim();
        if (!cellStr || cellStr.indexOf("http") === 0) continue;
        // Ignora datas (ex: 11/10/2026)
        if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(cellStr)) continue;

        var digits = cellStr.replace(/\D/g, "");
        if (digits.length >= 10 && digits.length <= 13) {
          if (digits.length >= 12 && digits.indexOf("55") === 0) {
            digits = digits.slice(2);
          }
          foundPhone = digits;
          break;
        }
      }

      // Ignora linhas vazias ou linha de teste (99999-8888)
      if (!foundPhone || foundPhone.indexOf("999998888") !== -1) {
        continue;
      }

      // Procura o nome real na linha (prioriza coluna "nome" se existir, depois células com nome válido)
      var candidatosNome = [];
      var nomeHeaderIdx = headers.indexOf("nome");
      if (nomeHeaderIdx !== -1 && row[nomeHeaderIdx]) {
        candidatosNome.push(String(row[nomeHeaderIdx]));
      }
      for (var k = 0; k < row.length; k++) {
        if (row[k]) candidatosNome.push(String(row[k]));
      }

      for (var n = 0; n < candidatosNome.length; n++) {
        var candidato = candidatosNome[n].trim();
        var limpo = extrairNomeValido(candidato);
        if (limpo && limpo !== "Cliente Marketplace") {
          foundName = limpo;
          break;
        }
      }

      if (!foundName) {
        foundName = "Cliente Marketplace";
      }

      if (!telefonesVistos[foundPhone]) {
        telefonesVistos[foundPhone] = true;
        leadsLimpos.push([
          foundName,
          formatarZap(foundPhone),
          "https://wa.me/55" + foundPhone
        ]);
      }
    }
  }

  // Limpa toda a planilha (remove colunas antigas como Data, Fodase, Produto, etc.)
  sheet.clear();

  // Cria o cabeçalho de 3 colunas: Nome | Numero | Link Whatsapp
  sheet.getRange(1, 1, 1, 3).setValues([["Nome", "Numero", "Link Whatsapp"]]);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);

  var headerRange = sheet.getRange(1, 1, 1, 3);
  headerRange.setFontFamily("Segoe UI");
  headerRange.setFontSize(11);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#2563EB");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setVerticalAlignment("middle");
  headerRange.setHorizontalAlignment("left");

  // Insere todos os leads reais limpos e organizados
  if (leadsLimpos.length > 0) {
    sheet.getRange(2, 1, leadsLimpos.length, 3).setValues(leadsLimpos);
    for (var idx = 0; idx < leadsLimpos.length; idx++) {
      formatarLinha3Colunas(sheet, idx + 2);
    }
  }

  ajustarLarguras3Colunas(sheet);
}

function extrairNomeValido(texto) {
  if (!texto) return "";
  var str = String(texto).trim();
  if (!str || str.indexOf("http") === 0) return "";
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(str)) return "";

  // Se for "Orli: 48984442595", separa apenas a parte do nome
  var prefixMatch = str.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]{2,25}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,25})?)\s*[:\-–—]\s*\(?\d{2}\)?/);
  if (prefixMatch && prefixMatch[1]) {
    str = prefixMatch[1].trim();
  }

  // Se vier do título do chat do Marketplace ("Willian · Casa Disponível...")
  str = str.split(/[·•|]/)[0].trim();

  var lower = str.toLowerCase();
  var JUNK = [
    "cliente marketplace", "produto marketplace", "marketplace", "conversas", "conversa",
    "não lida", "nao lida", "seu classificado", "classificado", "recebeu",
    "faça a verificação", "faca a verificacao", "casa disponível", "casa disponivel",
    "item de teste", "teste de integração", "teste de integracao", "bate-papo", "mensagens"
  ];

  for (var i = 0; i < JUNK.length; i++) {
    if (lower.indexOf(JUNK[i]) !== -1) return "";
  }

  // Ignora se ainda tiver muitos números (como um telefone puro)
  if (/\d{4,}/.test(str)) return "";

  return capitalizarNome(str);
}

function sanitizarNomeCliente(nome, mensagem) {
  var limpo = extrairNomeValido(nome);
  if (limpo) return limpo;

  var daMsg = extrairNomeValido(mensagem);
  if (daMsg) return daMsg;

  return "Cliente Marketplace";
}

function capitalizarNome(nome) {
  return String(nome || "").trim().split(/\s+/).map(function(parte) {
    if (!parte) return "";
    return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
  }).join(" ");
}

function formatarZap(num) {
  var clean = String(num || "").replace(/\D/g, "");
  if (clean.length === 11) {
    return "(" + clean.slice(0, 2) + ") " + clean.slice(2, 7) + "-" + clean.slice(7);
  } else if (clean.length === 10) {
    return "(" + clean.slice(0, 2) + ") " + clean.slice(2, 6) + "-" + clean.slice(6);
  }
  return clean;
}

function formatarLinha3Colunas(sheet, rowIdx) {
  var range = sheet.getRange(rowIdx, 1, 1, 3);
  sheet.setRowHeight(rowIdx, 32);
  range.setFontFamily("Segoe UI");
  range.setFontSize(10);
  range.setVerticalAlignment("middle");

  if (rowIdx % 2 === 0) {
    range.setBackground("#F8FAFC");
  } else {
    range.setBackground("#FFFFFF");
  }

  sheet.getRange(rowIdx, 1).setHorizontalAlignment("left").setFontWeight("normal").setFontColor("#0F172A");
  sheet.getRange(rowIdx, 2).setHorizontalAlignment("left").setFontWeight("normal").setFontColor("#0F172A");
  sheet.getRange(rowIdx, 3).setHorizontalAlignment("left").setFontColor("#2563EB");
}

function ajustarLarguras3Colunas(sheet) {
  sheet.setColumnWidth(1, 200); // Nome
  sheet.setColumnWidth(2, 160); // Numero
  sheet.setColumnWidth(3, 280); // Link Whatsapp
}
