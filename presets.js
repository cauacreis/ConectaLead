// ConectaLead - Presets dos 15 Modelos de Casas Populares de São Paulo (3 Quartos, 2 Banheiros, Sem Móveis)

const SP_HOUSES_PRESETS = [
  {
    id: '01_Casa_Itaquera_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros em Itaquera - SP',
    price: '210000',
    location: 'Itaquera - Zona Leste, São Paulo',
    folderName: '01_Casa_Itaquera_3Q_2B',
    description: 'Vendo casa térrea simples em Itaquera, Zona Leste de SP.\n\n- 3 quartos bem arejados e iluminados\n- 2 banheiros completos (com chuveiro instalado)\n- Sala espaçosa com piso frio\n- Cozinha com pia em inox\n- Garagem e quintal\n- Imóvel 100% desocupado, sem mobília, entrar e morar!\n\nÓtima localização no bairro, perto de padaria, mercado, ponto de ônibus e fácil acesso à estação.\n\nValor: R$ 210.000 (aceita proposta e estuda carro como parte do pagamento).\n\nQuem tiver interesse me chama aqui no chat ou manda o zap pra gente marcar uma visita sem compromisso!'
  },
  {
    id: '02_Casa_Sao_Mateus_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros em São Mateus - SP',
    price: '195000',
    location: 'São Mateus - Zona Leste, São Paulo',
    folderName: '02_Casa_Sao_Mateus_3Q_2B',
    description: 'Vendo casa em São Mateus, Zona Leste de São Paulo. Bairro tranquilo e familiar.\n\n- 3 dormitórios com piso cerâmico\n- 2 banheiros azulejados\n- Sala arejada\n- Cozinha com pia e área molhada com azulejo\n- Garagem fechada com portão basculante\n- Casa vazia, sem móveis, toda pintada e limpa\n\nFácil acesso à Avenida Ragueb Chohfi e comércios do bairro.\n\nValor: R$ 195.000 à vista ou financiamento.\n\nMe chama no chat ou deixa seu zap que eu respondo e combinamos de ver a casa!'
  },
  {
    id: '03_Casa_Guaianases_3Q_2B',
    title: 'Casa Simples 3 Quartos e 2 Banheiros em Guaianases - SP',
    price: '185000',
    location: 'Guaianases - Zona Leste, São Paulo',
    folderName: '03_Casa_Guaianases_3Q_2B',
    description: 'Excelente oportunidade de casa própria em Guaianases - SP.\n\n- 3 quartos amplos\n- 2 banheiros (1 social e 1 na área externa/fundos)\n- Sala clara com piso de cerâmica\n- Cozinha com pia e encanamento novo\n- Portão de ferro, casa murada e segura\n- Imóvel vazio, chave na mão, sem mobília\n\nRua tranquila, perto de escola e linha de ônibus.\n\nValor: R$ 185.000.\n\nInteressados mandar mensagem no chat ou passar o whatsapp com DDD!'
  },
  {
    id: '04_Casa_Sapopemba_3Q_2B',
    title: 'Casa Térrea com Garagem 3Q e 2B no Sapopemba - SP',
    price: '220000',
    location: 'Sapopemba - Zona Leste, São Paulo',
    folderName: '04_Casa_Sapopemba_3Q_2B',
    description: 'Casa térrea com varanda no Sapopemba - Zona Leste de SP.\n\n- 3 quartos arejados\n- 2 banheiros reformados com piso frio\n- Sala de estar espaçosa\n- Cozinha com bancada e pia\n- Varanda na frente e garagem\n- Desocupada, pintura nova, sem móveis\n\nPerto de comércio, feira livre e transporte público.\n\nValor: R$ 220.000.\n\nChame no chat ou mande seu zap pra gente agendar de ver pessoalmente!'
  },
  {
    id: '05_Casa_Brasilandia_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros na Brasilândia - SP',
    price: '205000',
    location: 'Brasilândia - Zona Norte, São Paulo',
    folderName: '05_Casa_Brasilandia_3Q_2B',
    description: 'Casa de esquina aconchegante na Brasilândia - Zona Norte, São Paulo.\n\n- 3 dormitórios confortáveis com piso cerâmico\n- 2 banheiros práticos e limpos\n- Sala arejada e bem iluminada\n- Cozinha espaçosa com pia\n- Garagem com portão de ferro e quintal\n- Totalmente vazia, pronta para morar\n\nLocal tranquilo, perto de ponto de ônibus e comércio local.\n\nValor: R$ 205.000.\n\nMe chama no chat ou envia seu telefone com zap pra marcar visita!'
  },
  {
    id: '06_Casa_Campo_Limpo_3Q_2B',
    title: 'Casa de Bairro 3 Quartos e 2 Banheiros no Campo Limpo - SP',
    price: '230000',
    location: 'Campo Limpo - Zona Sul, São Paulo',
    folderName: '06_Casa_Campo_Limpo_3Q_2B',
    description: 'Casa térrea bem cuidada no Campo Limpo - Zona Sul, São Paulo.\n\n- 3 quartos espaçosos com janelas de ferro/alumínio\n- 2 banheiros azulejados\n- Sala com piso claro\n- Cozinha com pia e torneira nova\n- Portão de ferro e quintal nos fundos\n- Desocupada, sem móveis, documento em dia\n\nFácil acesso a linhas de ônibus e comércios da região.\n\nValor: R$ 230.000 (aceita proposta).\n\nQuem tiver interesse pode chamar no chat ou mandar o zap!'
  },
  {
    id: '07_Casa_Grajau_3Q_2B',
    title: 'Casa Simples com Quintal 3Q e 2B no Grajaú - SP',
    price: '190000',
    location: 'Grajaú - Zona Sul, São Paulo',
    folderName: '07_Casa_Grajau_3Q_2B',
    description: 'Oportunidade no Grajaú - Zona Sul de São Paulo.\n\n- 3 dormitórios arejados\n- 2 banheiros com azulejo e chuveiro\n- Sala ampla com piso frio\n- Cozinha com pia em inox\n- Garagem coberta com portão basculante\n- Imóvel 100% desocupado, sem móveis\n\nRua residencial, boa vizinhança e ônibus próximo.\n\nValor: R$ 190.000.\n\nChama no chat ou deixa o seu whatsapp que entro em contato rapidinho!'
  },
  {
    id: '08_Casa_Pirituba_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros em Pirituba - SP',
    price: '245000',
    location: 'Pirituba - Zona Noroeste, São Paulo',
    folderName: '08_Casa_Pirituba_3Q_2B',
    description: 'Casa térrea em Pirituba - Zona Noroeste, São Paulo.\n\n- 3 quartos bem ventilados\n- 2 banheiros completos\n- Sala espaçosa com iluminação natural\n- Cozinha arejada com balcão e pia\n- Garagem e quintal murado\n- Casa vazia, limpa e recém-pintada, sem mobília\n\nPerto de padaria, mercado e linha de ônibus direta para a estação.\n\nValor: R$ 245.000.\n\nManda uma mensagem no chat ou passe o seu zap pra gente combinar de ver!'
  },
  {
    id: '09_Casa_Perus_3Q_2B',
    title: 'Casa 3 Quartos e 2 Banheiros em Perus - SP',
    price: '180000',
    location: 'Perus - Zona Noroeste, São Paulo',
    folderName: '09_Casa_Perus_3Q_2B',
    description: 'Casa simples e aconchegante em Perus - Zona Noroeste de SP.\n\n- 3 quartos com piso cerâmico\n- 2 banheiros com louças brancas\n- Sala aconchegante\n- Cozinha com pia de inox e azulejo\n- Varanda frontal e portão fechado\n- Vazia e sem mobília, pronta para mudança\n\nBairro calmo, próximo à estação Perus da CPTM.\n\nValor: R$ 180.000.\n\nInteressados me chamem no chat ou deixem o zap para agendar!'
  },
  {
    id: '10_Casa_Ermelino_Matarazzo_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros em Ermelino Matarazzo - SP',
    price: '225000',
    location: 'Ermelino Matarazzo - Zona Leste, São Paulo',
    folderName: '10_Casa_Ermelino_Matarazzo_3Q_2B',
    description: 'Casa de bairro em Ermelino Matarazzo - Zona Leste de São Paulo.\n\n- 3 quartos grandes\n- 2 banheiros azulejados\n- Sala com piso claro\n- Cozinha com pia e instalações prontas\n- Portão de ferro e vaga de garagem\n- Totalmente vazia, desocupada e pronta para morar\n\nRua tranquila, próximo de mercados, farmácia e condução.\n\nValor: R$ 225.000.\n\nChame no chat ou mande mensagem no zap pra mais informações!'
  },
  {
    id: '11_Casa_Cidade_Tiradentes_3Q_2B',
    title: 'Casa Simples 3 Quartos e 2 Banheiros na Cidade Tiradentes - SP',
    price: '175000',
    location: 'Cidade Tiradentes - Zona Leste, São Paulo',
    folderName: '11_Casa_Cidade_Tiradentes_3Q_2B',
    description: 'Ótima casa térrea popular na Cidade Tiradentes - Zona Leste, SP.\n\n- 3 quartos espaçosos\n- 2 banheiros com chuveiro\n- Sala arejada\n- Cozinha com pia e encanamento ok\n- Garagem com portão de grade\n- Sem móveis, desocupada, pintura nova\n\nPróxima ao terminal de ônibus e comércio da região.\n\nValor: R$ 175.000.\n\nManda um oi no chat ou passa o zap pra marcar de visitar!'
  },
  {
    id: '12_Casa_Capao_Redondo_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros no Capão Redondo - SP',
    price: '215000',
    location: 'Capão Redondo - Zona Sul, São Paulo',
    folderName: '12_Casa_Capao_Redondo_3Q_2B',
    description: 'Casa bem estruturada no Capão Redondo - Zona Sul de São Paulo.\n\n- 3 dormitórios com piso cerâmico\n- 2 banheiros azulejados\n- Sala espaçosa e bem iluminada\n- Cozinha ampla com pia inox\n- Garagem fechada para 1 carro\n- Casa sem mobília, pronta para entrega imediata\n\nBoa localização com comércio e transporte público próximos.\n\nValor: R$ 215.000.\n\nChame no chat ou mande o zap com ddd pra agendar a visita!'
  },
  {
    id: '13_Casa_Jardim_Angela_3Q_2B',
    title: 'Casa de Bairro 3 Quartos e 2 Banheiros no Jardim Ângela - SP',
    price: '188000',
    location: 'Jardim Ângela - Zona Sul, São Paulo',
    folderName: '13_Casa_Jardim_Angela_3Q_2B',
    description: 'Casa térrea no Jardim Ângela - Zona Sul de São Paulo.\n\n- 3 quartos arejados\n- 2 banheiros completos\n- Sala aconchegante com piso frio\n- Cozinha com pia e balcão\n- Muro alto com portão de ferro e quintal\n- Imóvel vazio, sem móveis, pronto para morar\n\nRua asfaltada, vizinhança tranquila e ônibus na porta.\n\nValor: R$ 188.000.\n\nInteressados chame no chat ou mande seu número do zap!'
  },
  {
    id: '14_Casa_Vila_Curuca_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros na Vila Curuçá - SP',
    price: '200000',
    location: 'Vila Curuçá - Zona Leste, São Paulo',
    folderName: '14_Casa_Vila_Curuca_3Q_2B',
    description: 'Casa em ótima rua na Vila Curuçá - São Miguel Paulista / Zona Leste, SP.\n\n- 3 quartos claros com janela de correr\n- 2 banheiros com louças brancas novas\n- Sala ampla de estar\n- Cozinha com pia em inox\n- Varanda e garagem coberta com portão moderno\n- Sem nenhum móvel, pronta para ocupação\n\nPerto de supermercado, posto de saúde e condução.\n\nValor: R$ 200.000.\n\nMe chama no chat ou passa o zap pra conversarmos!'
  },
  {
    id: '15_Casa_Jaragua_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros no Jaraguá - SP',
    price: '235000',
    location: 'Jaraguá - Zona Noroeste, São Paulo',
    folderName: '15_Casa_Jaragua_3Q_2B',
    description: 'Casa térrea com quintal no Jaraguá - Zona Noroeste, São Paulo.\n\n- 3 dormitórios arejados com piso cerâmico\n- 2 banheiros limpos e funcionais\n- Sala de estar espaçosa\n- Cozinha ventilada com pia instalada\n- Garagem com portão de correr e quintal\n- Totalmente desocupada, sem móveis\n\nPróximo à estação Jaraguá da CPTM e comércio da Estrada de Taipas.\n\nValor: R$ 235.000.\n\nChame no chat ou mande o zap pra marcar o melhor horário pra ver o imóvel!'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SP_HOUSES_PRESETS };
}
