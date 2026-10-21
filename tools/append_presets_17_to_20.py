# -*- coding: utf-8 -*-
with open("presets.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "// ConectaLead - Presets dos 16 Modelos de Casas",
    "// ConectaLead - Presets dos 20 Modelos de Casas"
)

new_presets = """  },
  {
    id: '17_Casa_Palhoca_Alto_Aririu_3Q_2B',
    title: 'Oportunidade Real: Casa Térrea com Quintal Amplo no Alto Aririú',
    price: '10000',
    location: 'Alto Aririú, Palhoça - SC, Brasil',
    folderName: '17_Casa_Palhoca_Alto_Aririu_3Q_2B',
    bedrooms: '3',
    bathrooms: '2',
    description: `Oportunidade real de conquistar sua casa própria com pátio espaçoso no Alto Aririú.

Excelente residência térrea, totalmente individual e murada, perfeita para quem busca tranquilidade, segurança e espaço ao ar livre para as crianças e pets.

Destaques do Imóvel:
• 3 dormitórios arejados e bem iluminados
• 2 banheiros completos e higienizados
• Sala de estar ampla com acabamento claro
• Cozinha funcional com revestimento impecável
• Pátio privativo na frente e nos fundos com vaga de garagem
• Casa totalmente solta no terreno (sem parede com vizinho)

Facilidades de Aquisição:
• Imóvel 100% regularizado e pronto para transferência
• IPTU ✅ em dia
• Entrada a partir de 10mil com parcelas acessíveis
• Aceita financiamento bancário e condições facilitadas no boleto

More em um bairro familiar e com qualidade de vida em Palhoça.
Saia do aluguel hoje mesmo! Agende sua visita.${BLANK_LINES}\\n"imagens ilustrativas"`
  },
  {
    id: '18_Casa_Biguacu_Deltaville_2Q_2B',
    title: 'Oportunidade Real: Casa Alto Padrão no Bairro Planejado Deltaville',
    price: '19000',
    location: 'Deltaville, Biguaçu - SC, Brasil',
    folderName: '18_Casa_Biguacu_Deltaville_2Q_2B',
    bedrooms: '2',
    bathrooms: '2',
    description: `Oportunidade real de viver o luxo e a segurança de um condomínio fechado no Deltaville.

Projeto contemporâneo de alto padrão, combinando sofisticação, conforto e tecnologia em um dos bairros planejados mais valorizados de Santa Catarina.

Destaques do Imóvel:
• Fachada imponente com platibanda e acabamento em ripado nobre
• 2 dormitórios amplos com iluminação natural privilegiada
• Conceito aberto integrando sala e cozinha com piso em porcelanato polido
• 2 banheiros modernos com bancada suspensa e box em vidro
• Garagem privativa coberta e jardim com paisagismo pronto
• Área privativa nos fundos para momentos em família e pets

Infraestrutura Deltaville:
• Monitoramento 24h e portaria
• Pistas de corrida, lago contemplativo e praças arborizadas
• Salão de festas, quadras de esportes e segurança total para seus filhos

Condições Especiais:
• Documentação 100% em ordem
• IPTU ✅ em dia
• Entrada facilitada a partir de 19 mil e saldo financiado
• Parcelamento sob medida no boleto ou banco

Viva onde você sempre sonhou. Agende agora sua visita!${BLANK_LINES}\\n"imagens ilustrativas"`
  },
  {
    id: '19_Casa_Sao_Jose_Potecas_3Q_2B',
    title: 'Oportunidade Real: Casa com Garagem Coberta e Muro Alto em Potecas',
    price: '12000',
    location: 'Potecas, São José - SC, Brasil',
    folderName: '19_Casa_Sao_Jose_Potecas_3Q_2B',
    bedrooms: '3',
    bathrooms: '2',
    description: `Oportunidade real de morar com privacidade e segurança absoluta em São José.

Residência térrea impecável no bairro Potecas, totalmente murada com portão fechado de alta segurança, acabamento moderno e recém-pintada. Pronta para você se mudar imediatamente.

Destaques do Imóvel:
• 3 dormitórios arejados com excelente incidência de luz natural
• 2 banheiros reformados, limpos e com louças novas
• Sala de estar confortável com piso espelhado
• Cozinha clara e funcional
• Garagem coberta privativa com portão de correr
• Muros altos com interfone e total privacidade para sua família e pets

Vantagens e Condições:
• Imóvel 100% escriturado e pronto para cartório
• IPTU ✅ quitado
• Entrada a partir de 12mil com parcelas que cabem no seu orçamento
• Opção de financiamento bancário Caixa ou parcelamento no boleto

Localização estratégica próxima a comércios, escolas e vias de acesso rápido.
Chega de pagar aluguel. Venha conhecer sua nova casa!${BLANK_LINES}\\n"imagens ilustrativas"`
  },
  {
    id: '20_Casa_Palhoca_Guarda_Cubatao_3Q_2B',
    title: 'Oportunidade Real: Casa Térrea Espaçosa com Pátio na Guarda do Cubatão',
    price: '11000',
    location: 'Guarda do Cubatão, Palhoça - SC, Brasil',
    folderName: '20_Casa_Palhoca_Guarda_Cubatao_3Q_2B',
    bedrooms: '3',
    bathrooms: '2',
    description: `Oportunidade real para quem busca paz, ar puro e muito espaço privativo em Palhoça.

Linda casa térrea solta no terreno na Guarda do Cubatão, cercada de verde e tranquilidade, toda murada com portão branco e pátio amplo para as crianças brincarem e os pets correrem.

Destaques do Imóvel:
• 3 dormitórios confortáveis e arejados
• 2 banheiros limpos e completos
• Sala ampla com piso claro brilhante e pintura nova
• Cozinha espaçosa com azulejos impecáveis
• Pátio cimentado limpo com espaço para vários veículos
• Terreno individual amplo ideal para churrasco e momentos de lazer

Condições Facilitadas:
• Imóvel 100% regularizado com documentação em dia
• IPTU ✅ em dia
• Entrada acessível a partir de 11mil e parcelas facilitadas
• Financiamento simplificado ou plano no boleto

Conquiste a tranquilidade e a liberdade da casa própria.
Não perca essa oportunidade. Agende sua visita!${BLANK_LINES}\\n"imagens ilustrativas"`
  }
];
"""

idx = content.rfind("  }\n];")
if idx == -1:
    idx = content.rfind("  }\r\n];")

if idx != -1:
    content = content[:idx] + new_presets
    with open("presets.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("presets.js atualizado com sucesso!")
else:
    print("Padrão final não encontrado!")
