# ConectaLead — Chrome Web Store Information

## 1. Informações Básicas da Loja

- **Nome da Extensão:** ConectaLead - Co-piloto para Facebook Marketplace
- **Versão:** 1.0.0
- **Categoria:** Produtividade / Vendas
- **Resumo Curto (máx 132 caracteres):**
  Agilize a criação de anúncios no Marketplace e converta interessados diretamente para o WhatsApp com 1 clique.

## 2. Descrição Detalhada

O **ConectaLead** é um co-piloto de produtividade feito para quem vende no Facebook Marketplace.

### Principais Benefícios:
- **Criação Ágil de Anúncios:** Selecione suas fotos diretamente do seu computador, informe o produto, valor e localização. O ConectaLead gera o título magnético e descrição persuasiva estruturada, preenchendo os campos do formulário para você.
- **Atendimento Focado no WhatsApp:** Responda mensagens de leads rapidamente com sugestões focadas em conduzir o cliente para o seu WhatsApp particular.
- **Detecção Inteligente de Números:** Ao receber o telefone ou WhatsApp do cliente na conversa, o ConectaLead identifica o número e cria um botão direto para você abrir o WhatsApp com 1 clique.
- **Gestão de Leads:** Salve e exporte contatos capturados em formato CSV para manter o controle total dos seus potenciais compradores.

---

## 3. Justificativa de Permissões (Permissions Justification)

- **`storage`**: Necessária para salvar com segurança as preferências do usuário (DDD regional, opção de IA preferida) e o histórico local de leads capturados.
- **`host_permissions` (`*://*.facebook.com/*`)**: Necessária para injetar o painel co-piloto nas telas do Facebook Marketplace e do Messenger, permitindo o preenchimento de campos e a leitura das mensagens para detecção de contato.
- **`host_permissions` (`https://generativelanguage.googleapis.com/*`, `https://api.openai.com/*`)**: Necessárias para permitir que a extensão se conecte às APIs de inteligência artificial configuradas pelo usuário para a geração de títulos e descrições.

---

## 4. Política de Privacidade e Uso de Dados

- **Dados Coletados:** Nenhuma informação pessoal ou credencial de login é enviada para servidores externos não autorizados. Todas as configurações e listas de leads ficam salvas localmente no navegador do usuário via `chrome.storage.local`.
- **Comunicação com IA:** Apenas os dados descritivos informados no formulário do anúncio (nome do item, preço e local) são enviados para o provedor de IA configurado pelo usuário quando a geração de anúncio é solicitada.

---

## 5. Histórico de Versões

- **1.0.0 (07/10/2026):**
  - Lançamento inicial da extensão.
  - Injeção de painel retrátil no Facebook Marketplace.
  - Seletor de imagens via Windows Explorer com autopreenchimento de formulário.
  - Respostas rápidas orientadas para captura de WhatsApp.
  - Detecção automática de números de telefone e exportação de leads em CSV.
