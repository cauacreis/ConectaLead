# ⚡ ConectaLead — Co-piloto para Facebook Marketplace

O **ConectaLead** é uma extensão de navegador desenvolvida para automatizar e acelerar a rotina de quem vende no **Facebook Marketplace**, com foco em duas etapas cruciais:
1. **Criar anúncios irresistíveis em segundos** com seleção de fotos direto do seu computador.
2. **Atendimento com objetivo único de capturar o WhatsApp do cliente**, detectando números automaticamente para você chamar com 1 clique.

---

## 🚀 Como Instalar no Google Chrome / Edge (30 segundos)

Como a extensão foi gerada diretamente na sua máquina, você pode carregá-la imediatamente sem precisar de instalação complexa:

1. Abra o **Google Chrome** ou **Microsoft Edge**;
2. Digite na barra de endereços: `chrome://extensions` (ou `edge://extensions`) e pressione **Enter**;
3. No canto superior direito, ative a chave **Modo do desenvolvedor**;
4. Clique no botão **Carregar sem compactação** (ou *Load unpacked*);
5. Selecione a pasta deste projeto:
   ```text
   C:\Users\Cauã Felype\Documents\ConectaLead
   ```
6. Pronto! O ícone do **ConectaLead** aparecerá na barra de ferramentas do seu navegador.

---

## 🛠️ Como Usar no Dia a Dia

### 1. Criando Anúncios no Marketplace
1. Acesse o Facebook na tela de criação de anúncios: [facebook.com/marketplace/create/item](https://www.facebook.com/marketplace/create/item);
2. Um botão flutuante **`⚡ ConectaLead`** aparecerá no canto inferior direito;
3. Ao clicar nele, o painel lateral é aberto:
   * **Fotos do Produto:** Clique na caixa de fotos para abrir o **Windows Explorer** e selecione as fotos do item no seu computador;
   * **O que você está vendendo:** Digite o nome ou detalhes rápidos (ex: `iPhone 13 128GB bateria 88%`);
   * **Preço:** Informe o valor em reais (ex: `2800`);
   * **Local / Bairro:** Informe onde está o produto (ex: `Centro - SP`);
4. Clique em **`⚡ Preencher Anúncio no Facebook`**;
5. O ConectaLead gera o título de alto impacto, a descrição completa e persuasiva e injeta todos os dados e fotos diretamente no formulário do Facebook. Basta revisar e publicar!

---

### 2. Atendendo no Chat & Captura Automática na Planilha
1. Ao abrir qualquer conversa com um cliente no Facebook Messenger ou Marketplace:
2. No painel do ConectaLead, clique na aba **💬 Atendimento**;
3. Use as **Respostas Rápidas**:
   * *Padrão (Fotos & Detalhes):* Pergunta se o cliente pode passar o WhatsApp para enviar fotos em alta resolução;
   * *Entrega & Retirada:* Solicita o WhatsApp para combinar ponto de entrega ou retirada;
   * *Proposta & PIX:* Confirma a negociação e pede o WhatsApp para acertar o pagamento;
4. Clique em **Inserir no Chat** para enviar com rapidez;
5. **Captura Instantânea na Planilha:**
   * Assim que o cliente responder informando o número de WhatsApp, o robô captura automaticamente:
     * **Nome do cliente**
     * **Número do WhatsApp** (formatado e limpo)
     * **Mensagem original do cliente** (ex: *"meu whats é 11987654321 quero retirar no sábado"*)
     * **Produto** anunciado
     * **Data e Hora**
     * **Link direto do WhatsApp** (`https://wa.me/55...`)
   * O contato é salvo na **Planilha Interna** e você recebe o aviso instantâneo com o botão **`📲 Chamar no WhatsApp`**.

---

### 3. Planilhas e Integração com Google Sheets
* **Baixar Planilha (Excel/CSV):** Tanto no painel do Facebook quanto no popup da extensão, clique em **Planilha** ou **Exportar** para baixar seu arquivo `.csv` já formatado com acentos (UTF-8) e compatível com Excel e Google Planilhas.
* **Google Sheets em Tempo Real (Opcional):** Nas configurações do popup, você pode informar um **Webhook do Google Sheets** (via Google Apps Script, Make ou Zapier) para que cada lead capturado seja gravado automaticamente na sua planilha na nuvem no mesmo segundo em que a mensagem chegar.

---

## ⚙️ Configurações de IA

Ao clicar no ícone do ConectaLead na barra superior do navegador (popup):
* **Modo Inteligente Integrado:** Funciona imediatamente sem precisar de nenhuma chave de API externa.
* **Google Gemini (Recomendado):** Obtenha uma chave gratuita no [Google AI Studio](https://aistudio.google.com) e cole no campo para ter cópias 100% personalizadas por inteligência artificial avançada.
* **DDD Padrão:** Configure o DDD da sua região (ex: `11`, `21`, `31`) para formatar automaticamente números enviados sem DDD pelo cliente.

---

## 📁 Estrutura do Projeto

```text
ConectaLead/
├── manifest.json         # Manifesto Manifest V3 da extensão
├── background.js         # Service Worker para comunicação segura com IA e storage
├── icons/                # Ícones da extensão (16px, 32px, 48px, 128px)
├── content/              # Scripts e estilos injetados no Facebook
│   ├── content.js        # Lógica de preenchimento, captura de fotos e detecção de chat
│   └── content.css       # Estilos da interface flutuante
├── popup/                # Interface de configurações e popup da barra do navegador
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── CHROMEWEBSTORE.md     # Documentação para publicação na Chrome Web Store
└── README.md             # Instruções de instalação e uso
```
