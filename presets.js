// ConectaLead - Presets dos 15 Modelos de Casas (Palhoça, Pagani e Região - SC)
// 3 Quartos, 2 Banheiros, Casas soltas no terreno, Sem Móveis

var BLANK_LINES = '\n'.repeat(100);

var SP_HOUSES_PRESETS = typeof SP_HOUSES_PRESETS !== 'undefined' ? SP_HOUSES_PRESETS : [
  {
    id: '01_Casa_Palhoca_Pagani_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Pagani',
    price: '9000',
    location: 'Avenida Atílio Pedro Pagani, Pagani, Palhoça - SC, Brasil',
    folderName: '01_Casa_Palhoca_Pagani_3Q_2B',
    description: `Casa Disponível em PALHOÇA no bairro Pagani.

🏡 3 quartos amplos e bem arejados
🚿 2 banheiros completos
🐶 Casa totalmente solta no terreno, quintal privativo excelente para quem tem pets ou filhos pequenos.
📄 Imóvel 100% documentado e regularizado.
IPTU ✅ em dia
💳 Aceita financiamento bancário e condições facilitadas no boleto.
🔑 Entrada a partir de 9mil e parcelas que cabem no seu bolso a combinar.

Localização privilegiada no Pagani, pertinho de tudo. Chega de pagar aluguel para os outros!
AGENDE SUA VISITA HOJE MESMO !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '02_Casa_Palhoca_Pedra_Branca_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Pedra Branca',
    price: '12000',
    location: 'Avenida Pedra Branca, Pedra Branca, Palhoça - SC, 88137-270, Brasil',
    folderName: '02_Casa_Palhoca_Pedra_Branca_3Q_2B',
    description: `Excelente Casa em PALHOÇA no bairro planejado Pedra Branca.

✨ 3 dormitórios confortáveis
🛁 2 banheiros
🐕 Terreno individual (casa totalmente solta), com pátio privativo para seus animais de estimação.
📑 Toda documentação em ordem e aprovada.
IPTU ✅
💰 Opção de financiamento facilitado e parcelamento direto no boleto.
🚀 Entrada a partir de 12mil com parcelas negociáveis.

Qualidade de vida, segurança e infraestrutura completa de lazer e comércio.
SAIA DEFINITIVAMENTE DO ALUGUEL, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '03_Casa_Palhoca_Passa_Vinte_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Passa Vinte',
    price: '10000',
    location: 'Passa Vinte, Palhoça - SC, Brasil',
    folderName: '03_Casa_Palhoca_Passa_Vinte_3Q_2B',
    description: `Oportunidade de Casa Própria em PALHOÇA no Passa Vinte.

🛏️ 3 quartos espaçosos
🚽 2 banheiros
🐾 Imóvel totalmente descolado no terreno, amplo quintal para pets e área de lazer da família.
📋 Documentação 100% regular.
IPTU em dia ✅
🤝 Financiamento bancário disponível e flexibilidade no boleto.
⭐ Entrada a partir de 10mil com saldo parcelado a negociar.

Perto do shopping, supermercados e fácil acesso para a BR-101.
PARE DE QUEIMAR DINHEIRO COM ALUGUEL, AGENDE SUA VISITA AGORA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '04_Casa_Palhoca_Ponte_Imaruim_3Q_2B',
    title: 'Casa Disponível em PALHOÇA na Ponte do Imaruim',
    price: '9000',
    location: 'Avenida Aniceto Zacchi, Ponte do Imaruim, Palhoça - SC, Brasil',
    folderName: '04_Casa_Palhoca_Ponte_Imaruim_3Q_2B',
    description: `Casa Térrea Solta no Terreno em PALHOÇA na Ponte do Imaruim.

🏠 3 dormitórios
🧼 2 banheiros
🐕‍🦺 Casa não germinada (solta no terreno), perfeita para quem busca privacidade e espaço livre para animais.
✅ Documentação completa e pronta para transferência.
IPTU quitado ✅
💵 Liberada para financiamento e plano facilitado via boleto.
🎯 Entrada a partir de apenas 9mil e parcelas mensais a combinar.

Localização estratégica, a poucos minutos de São José e Florianópolis.
O SEU NOVO LAR ESTÁ TE ESPERANDO, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '05_Casa_Palhoca_Bela_Vista_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Bela Vista',
    price: '10000',
    location: 'Bela Vista, Palhoça - SC, Brasil',
    folderName: '05_Casa_Palhoca_Bela_Vista_3Q_2B',
    description: `Linda Casa Familiar Disponível em PALHOÇA no Bela Vista.

🌿 3 quartos bem iluminados
🚿 2 banheiros
🐕 Terreno individual e privativo, casa solta dos dois lados com ótimo quintal para seus pets brincarem.
📁 Escritura e documentação em dia.
IPTU ✅
🏦 Condições facilitadas de financiamento e negociação no boleto.
🏷️ Entrada a partir de 10mil com parcelas sob medida para você.

Bairro tranquilo, rua residencial e vizinhança acolhedora.
SUA CHANCE REAL DE SAIR DO ALUGUEL AINDA ESTE MÊS, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '06_Casa_Palhoca_Aririu_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Aririú',
    price: '9000',
    location: 'Aririú, Palhoça - SC, Brasil',
    folderName: '06_Casa_Palhoca_Aririu_3Q_2B',
    description: `Casa Espaçosa Disponível em PALHOÇA no Aririú.

🌳 3 quartos
🛁 2 banheiros
🐶 Terreno amplo com casa 100% solta, muito espaço livre e segurança para quem cria animais domésticos.
📑 Documentada de ponta a ponta.
IPTU ✅
📊 Financiamento habitacional disponível e saldo em boleto bancário negociável.
🔑 Entrada a partir de 9mil e parcelamento facilitado.

Tranquilidade, contato com a natureza e sossego para a sua família.
NÃO PERCA TEMPO PAGANDO O QUE NÃO É SEU, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '07_Casa_Palhoca_Nova_Palhoca_3Q_2B',
    title: 'Casa Disponível em PALHOÇA na Nova Palhoça',
    price: '11000',
    location: 'Nova Palhoça, Palhoça - SC, Brasil',
    folderName: '07_Casa_Palhoca_Nova_Palhoca_3Q_2B',
    description: `Casa em Loteamento Planejado em PALHOÇA na Nova Palhoça.

📐 3 dormitórios
🚽 2 banheiros
🐾 Imóvel totalmente independente no terreno, quintal livre para churrasco, crianças e pets.
📜 Toda a documentação rigorosamente em dia.
IPTU ✅
💳 Financiamento acessível e possibilidade de parcelamento no boleto.
💎 Entrada a partir de 11mil e parcelas que cabem no seu orçamento.

Um dos bairros com maior valorização e crescimento de Palhoça.
CONQUISTE O SEU IMÓVEL PRÓPRIO, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '08_Casa_Palhoca_Madri_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Madri',
    price: '10000',
    location: 'Madri, Palhoça - SC, Brasil',
    folderName: '08_Casa_Palhoca_Madri_3Q_2B',
    description: `Casa Aconchegante em PALHOÇA no bairro Madri.

🛏️ 3 quartos
🚿 2 banheiros
🐩 Casa isolada no terreno (não geminada), com excelente pátio privativo para pets e lazer.
📁 Documentação limpa e regular.
IPTU ✅
🏦 Facilidade para financiamento e opção de boleto bancário.
🌟 Entrada a partir de 10mil e parcelas flexíveis a negociar.

Bairro completo com escolas, postos de saúde, praças e comércio variado.
DÊ O PRIMEIRO PASSO PARA A SUA CASA PRÓPRIA, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '09_Casa_Palhoca_Sao_Sebastiao_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no São Sebastião',
    price: '9000',
    location: 'São Sebastião, Palhoça - SC, Brasil',
    folderName: '09_Casa_Palhoca_Sao_Sebastiao_3Q_2B',
    description: `Excelente Oportunidade em PALHOÇA no São Sebastião.

🏠 3 quartos arejados
🧼 2 banheiros
🐕‍🦺 Casa solta no lote, garantindo privacidade total e área livre para quem tem animais de estimação.
✅ Imóvel documentado e regularizado.
IPTU ✅
💵 Financiamento descomplicado e saldo negociável no boleto.
⚡ Entrada a partir de apenas 9mil e parcelas a negociar direto.

Acesso rápido às principais vias e excelente custo-benefício.
LIVRE-SE DO ALUGUEL DE UMA VEZ POR TODAS, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '10_Casa_Palhoca_Jardim_Eldorado_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Jardim Eldorado',
    price: '11000',
    location: 'Jardim Eldorado, Palhoça - SC, Brasil',
    folderName: '10_Casa_Palhoca_Jardim_Eldorado_3Q_2B',
    description: `Casa Própria Disponível em PALHOÇA no Jardim Eldorado.

🌟 3 quartos confortáveis
🛁 2 banheiros
🐾 Terreno privativo com casa completamente solta, ideal para a liberdade dos seus pets.
📋 Documentação 100% pronta para transferência.
IPTU em dia ✅
💳 Disponível para financiamento habitacional e parcelamento no boleto.
🔑 Entrada a partir de 11mil com condições personalizadas de parcelas.

Bairro muito bem localizado, pertinho do centro da cidade e da universidade.
SUA FAMÍLIA MERECE ESSA CONQUISTA, AGENDE SUA VISITA AGORA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '11_Casa_Palhoca_Barra_Aririu_3Q_2B',
    title: 'Casa Disponível em PALHOÇA na Barra do Aririú',
    price: '10000',
    location: 'Barra do Aririú, Palhoça - SC, Brasil',
    folderName: '11_Casa_Palhoca_Barra_Aririu_3Q_2B',
    description: `Casa Ampla e Tranquila em PALHOÇA na Barra do Aririú.

🌊 3 dormitórios
🚽 2 banheiros
🐶 Casa totalmente solta no terreno, com pátio espaçoso e muito verde para animais e momentos em família.
📄 Imóvel regularizado e documentado.
IPTU ✅
🤝 Aceitamos financiamento bancário e negociação facilitada no boleto.
🎯 Entrada a partir de 10mil com saldo parcelado a combinar.

Paz, segurança e a brisa do litoral para você viver com qualidade.
PARE DE ALUGAR E VENHA MORAR NO QUE É SEU, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '12_Casa_Palhoca_Praia_de_Fora_3Q_2B',
    title: 'Casa Disponível em PALHOÇA na Praia de Fora',
    price: '12000',
    location: 'Praia de Fora, Palhoça - SC, Brasil',
    folderName: '12_Casa_Palhoca_Praia_de_Fora_3Q_2B',
    description: `More Perto do Mar em PALHOÇA na Praia de Fora.

🏖️ 3 quartos espaçosos
🚿 2 banheiros
🐕 Terreno privativo com casa solta dos lados, quintal amplo para pets e área gourmet.
📜 Imóvel documentado e pronto para morar.
IPTU ✅
💰 Liberada para financiamento e pagamento facilitado no boleto bancário.
🚀 Entrada a partir de 12mil e parcelas a negociar.

Desfrute da tranquilidade do litoral de Santa Catarina com conforto e economia.
CHEGA DE PAGAR ALUGUEL CARO, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '13_Casa_Palhoca_Pagani_2_3Q_2B',
    title: 'Casa Disponível em PALHOÇA no Pagani',
    price: '11000',
    location: 'Avenida Atílio Pedro Pagani, Pagani, Palhoça - SC, Brasil',
    folderName: '13_Casa_Palhoca_Pagani_2_3Q_2B',
    description: `Destaque em PALHOÇA: Casa Exclusiva no Pagani.

🏡 3 quartos grandes
🧼 2 banheiros modernos
🐾 Casa solta no terreno, privacidade total e excelente espaço externo para quem tem bichinhos de estimação.
📑 Toda documentação aprovada.
IPTU ✅
🏦 Condições especiais de financiamento e parcelamento flexível no boleto.
💎 Entrada a partir de 11mil e parcelas sob medida para a sua renda.

Bairro de alto padrão com prefeitura, fórum e shopping a poucos passos.
A OPORTUNIDADE PERFEITA PARA O SEU IMÓVEL PRÓPRIO, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '14_Casa_Sao_Jose_Barreiros_3Q_2B',
    title: 'Casa Disponível em SAO JOSE no Barreiros',
    price: '10000',
    location: 'Avenida Leoberto Leal, Barreiros, São José - SC, Brasil',
    folderName: '14_Casa_Sao_Jose_Barreiros_3Q_2B',
    description: `Casa Térrea Disponível em SÃO JOSÉ no Barreiros.

📍 3 dormitórios
🛁 2 banheiros
🐕 Imóvel individual e solto no terreno, pátio fechado ideal para pets e segurança das crianças.
✅ Documentação 100% em dia.
IPTU ✅
💳 Financiamento bancário facilitado e plano flexível no boleto.
⭐ Entrada a partir de 10mil e parcelas negociáveis direto.

Localização nobre em São José, pertinho da divisa com Florianópolis e colégios.
NÃO JOGUE MAIS DINHEIRO FORA COM ALUGUEL, AGENDE SUA VISITA !${BLANK_LINES}
"imagens ilustrativas"`
  },
  {
    id: '15_Casa_Sao_Jose_Forquilhinhas_3Q_2B',
    title: 'Casa Disponível em SAO JOSE no Forquilhinhas',
    price: '12000',
    location: 'Forquilhinhas, São José - SC, Brasil',
    folderName: '15_Casa_Sao_Jose_Forquilhinhas_3Q_2B',
    description: `Excelente Casa em SÃO JOSÉ no Forquilhinhas.

🏙️ 3 quartos amplos
🚿 2 banheiros
🐶 Casa completamente solta no terreno, quintal privativo e espaço de sobra para seus pets.
📋 Documentação impecável e pronta para transferência.
IPTU ✅
🤝 Disponível para financiamento habitacional e parcelamento no boleto.
🔑 Entrada a partir de 12mil com parcelas a negociar.

Bairro completo, comércio forte em volta, bancos, mercados e transporte fácil.
CONQUISTE SUA INDEPENDÊNCIA E SAIA DO ALUGUEL, AGENDE SUA VISITA JÁ !${BLANK_LINES}
"imagens ilustrativas"`
  }
];
