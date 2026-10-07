# 📊 Como Conectar o Google Planilhas no ConectaLead (Passo a Passo)

Com esta configuração gratuita de 1 minuto, **toda vez que um cliente mandar o WhatsApp no Facebook, uma nova linha aparecerá instantaneamente na sua planilha do Google Drive**, sem que você precise baixar arquivos nem atualizar páginas.

---

### Passo 1: Crie sua Planilha no Google
1. Acesse [sheets.new](https://sheets.new) ou abra o Google Drive e crie uma **Planilha em branco**.
2. Dê o nome que preferir para a planilha (ex: `Leads - Facebook Marketplace`).

---

### Passo 2: Abra o Apps Script
1. No menu superior da planilha, clique em **Extensões** > **Apps Script**;
2. Uma nova aba será aberta com um editor de código.

---

### Passo 3: Cole o Código Pronto
1. Apague tudo o que estiver escrito no editor;
2. Copie e cole todo o conteúdo do arquivo [google-sheets-script.js](google-sheets-script.js);
3. Clique no ícone de **Salvar** (ícone de disquete ou `Ctrl + S`).

---

### Passo 4: Gere o Link do Webhook
1. No canto superior direito da tela do Apps Script, clique no botão azul **Implantar** > **Nova implantação**;
2. Na engrenagem ao lado de "Selecione o tipo", escolha **App da Web**;
3. Preencha os campos:
   * **Descrição:** `ConectaLead`
   * **Executar como:** `Eu (seu e-mail)`
   * **Quem pode acessar:** `Qualquer pessoa` *(essencial para a extensão conseguir enviar os dados)*
4. Clique em **Implantar**;
5. O Google pedirá autorização na primeira vez:
   * Clique em **Autorizar acesso** e escolha sua conta do Google;
   * Se aparecer *"O Google não verificou este app"*, clique em **Avançado** (no rodapé) e depois em **Acessar ConectaLead (não seguro)**;
   * Clique em **Permitir**.
6. Copie o **URL do app da Web** que terminará com `/exec` (ex: `https://script.google.com/macros/s/.../exec`).

---

### Passo 5: Cole no ConectaLead
1. Abra o ícone do **ConectaLead** na barra do seu navegador;
2. No campo **Webhook do Google Sheets**, cole o link copiado;
3. Clique em **Testar Conexão** para ver uma linha de teste aparecer na sua planilha;
4. Clique em **Salvar Configurações**.

Pronto! A partir de agora, tudo funciona no piloto automático.
