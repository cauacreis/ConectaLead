// ConectaLead - Presets dos 15 Modelos de Casas de São Paulo (3 Quartos, 2 Banheiros, Sem Móveis)

const SP_HOUSES_PRESETS = [
  {
    id: '01_Casa_Tatuape_3Q_2B',
    title: 'Casa com 3 Quartos e 2 Banheiros em Tatuapé - SP',
    price: '480000',
    location: 'Tatuapé - Zona Leste, São Paulo',
    folderName: '01_Casa_Tatuape_3Q_2B',
    description: 'Vendo casa térrea com quintal em Tatuapé - Zona Leste, São Paulo.\n\n- 3 quartos espaçosos e bem iluminados\n- 2 banheiros completos com box\n- Sala ampla para 2 ambientes\n- Imóvel desocupado, sem móveis, pronto para morar\n- Fotos reais tiradas do próprio imóvel\n\nImóvel desocupado, recém-pintado, piso novo em todos os cômodos. 3 quartos espaçosos, 2 banheiros com box, sala ampla para 2 ambientes, cozinha arejada e 2 vagas de garagem. Próximo ao metrô Carrão e comércio.\n\nValor: R$ 480.000\nDocumentação toda em ordem. Aceita proposta.\n\nQuem tiver interesse, me chama aqui no chat ou manda o zap pra gente agendar uma visita sem compromisso!'
  },
  {
    id: '02_Casa_Santana_3Q_2B',
    title: 'Sobrado 3 Quartos e 2 Banheiros em Santana - SP',
    price: '520000',
    location: 'Santana - Zona Norte, São Paulo',
    folderName: '02_Casa_Santana_3Q_2B',
    description: 'Excelente sobrado em rua tranquila em Santana - Zona Norte, São Paulo.\n\n- 3 quartos confortáveis e bem arejados\n- 2 banheiros completos\n- Sala iluminada para dois ambientes\n- Cozinha americana espaçosa (sem mobília)\n- Área de serviço coberta e quintal\n\nVazio e pronto para entrar e morar. Recém-reformado com piso porcelanato.\n\nValor: R$ 520.000\nDocumentação 100% regularizada.\n\nChama no chat ou deixa seu zap com ddd pra agendarmos uma visita!'
  },
  {
    id: '03_Casa_Mooca_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros na Mooca - SP',
    price: '550000',
    location: 'Mooca - Zona Leste, São Paulo',
    folderName: '03_Casa_Mooca_3Q_2B',
    description: 'Casa térrea ampla na Mooca tradicional - Zona Leste, São Paulo.\n\n- 3 quartos grandes e bem arejados\n- 2 banheiros azulejados novos\n- Sala espaçosa com piso de porcelanato\n- Quintal nos fundos e 2 vagas\n- Imóvel vazio, chave na mão\n\nLocalização privilegiada com fácil acesso ao comércio e transporte.\n\nValor: R$ 550.000\nAceita financiamento bancário.\n\nManda mensagem no chat ou envia seu whatsapp com ddd pra mais detalhes!'
  },
  {
    id: '04_Casa_Butanta_3Q_2B',
    title: 'Casa 3 Quartos e 2 Banheiros no Butantã - SP',
    price: '590000',
    location: 'Butantã - Zona Oeste, São Paulo',
    folderName: '04_Casa_Butanta_3Q_2B',
    description: 'Casa em rua arborizada no Butantã - Zona Oeste, São Paulo. Próximo à USP e estação de metrô.\n\n- 3 quartos espaçosos\n- 2 banheiros modernos\n- Sala ampla para estar e jantar\n- Cozinha espaçosa e arejada\n- 2 vagas de garagem\n- Totalmente sem móveis, pintura nova\n\nValor: R$ 590.000\nDocumentação toda em dia.\n\nInteressados podem chamar no chat ou passar o zap pra combinar de ver pessoalmente!'
  },
  {
    id: '05_Casa_Ipiranga_3Q_2B',
    title: 'Casa Térrea Reformada 3Q 2B no Ipiranga - SP',
    price: '540000',
    location: 'Ipiranga - Zona Sul, São Paulo',
    folderName: '05_Casa_Ipiranga_3Q_2B',
    description: 'Casa totalmente reformada no miolo do Ipiranga - Zona Sul, São Paulo.\n\n- 3 dormitórios com piso laminado novo\n- 2 banheiros reformados com box blindex\n- Sala com ótima iluminação natural\n- Cozinha clara e área de serviço independente\n- Sem mobília, pronta para mudança imediata\n\nValor: R$ 540.000\nPronta para financiar.\n\nChame no chat ou mande seu zap com ddd pra gente bater um papo!'
  },
  {
    id: '06_Casa_Vila_Mariana_3Q_2B',
    title: 'Sobrado 3 Quartos e 2 Banheiros na Vila Mariana - SP',
    price: '780000',
    location: 'Vila Mariana - Zona Sul, São Paulo',
    folderName: '06_Casa_Vila_Mariana_3Q_2B',
    description: 'Sobrado em localização nobre na Vila Mariana - Zona Sul, a poucas quadras do Parque Ibirapuera e metrô Ana Rosa.\n\n- 3 quartos com piso de madeira restaurado\n- 2 banheiros com louças novas\n- Sala integrada para 2 ambientes\n- Quintal privativo nos fundos\n- Imóvel desocupado, sem móveis\n\nValor: R$ 780.000\nDocumentos 100% OK.\n\nMande mensagem ou envie seu zap pra marcar sua visita!'
  },
  {
    id: '07_Casa_Santo_Amaro_3Q_2B',
    title: 'Casa Ampla 3 Quartos e 2 Banheiros em Santo Amaro - SP',
    price: '490000',
    location: 'Santo Amaro - Zona Sul, São Paulo',
    folderName: '07_Casa_Santo_Amaro_3Q_2B',
    description: 'Casa segura em rua tranquila e familiar em Santo Amaro - Zona Sul, São Paulo.\n\n- 3 quartos arejados\n- 2 banheiros completos\n- Sala para 2 ambientes\n- Cozinha com bancada em granito\n- Lavanderia independente e 2 vagas\n- Vazia, sem mobília, pronta para uso\n\nValor: R$ 490.000\nEstuda proposta.\n\nInteressou? Manda uma mensagem no chat ou passe seu zap pra combinarmos!'
  },
  {
    id: '08_Casa_Penha_3Q_2B',
    title: 'Casa Térrea 3 Quartos e 2 Banheiros na Penha - SP',
    price: '420000',
    location: 'Penha - Zona Leste, São Paulo',
    folderName: '08_Casa_Penha_3Q_2B',
    description: 'Ótima oportunidade na Penha de França - Zona Leste, São Paulo.\n\n- 3 dormitórios bem distribuídos\n- 2 banheiros com revestimento cerâmico\n- Sala aconchegante com piso frio\n- Cozinha e quintal privativo\n- Casa sem móveis, toda pintada de branco\n\nValor: R$ 420.000\nAceita proposta e financiamento.\n\nChama aqui no chat ou manda o zap que respondo rapidinho!'
  },
  {
    id: '09_Casa_Lapa_3Q_2B',
    title: 'Sobrado Espaçoso 3Q 2B no Alto da Lapa - SP',
    price: '650000',
    location: 'Lapa - Zona Oeste, São Paulo',
    folderName: '09_Casa_Lapa_3Q_2B',
    description: 'Sobrado espaçoso no Alto da Lapa - Zona Oeste, São Paulo.\n\n- 3 quartos confortáveis e silenciosos\n- 2 banheiros com box blindex\n- Sala ampla com janelões de vidro e muita ventilação\n- Garagem para 2 carros\n- Imóvel desocupado e sem mobília\n\nValor: R$ 650.000\nDocumentação rigorosamente em dia.\n\nMande um oi no chat ou deixe seu zap com ddd pra agendar a visita!'
  },
  {
    id: '10_Casa_Interlagos_3Q_2B',
    title: 'Casa com Quintal 3 Quartos 2 Banheiros em Interlagos - SP',
    price: '510000',
    location: 'Interlagos - Zona Sul, São Paulo',
    folderName: '10_Casa_Interlagos_3Q_2B',
    description: 'Casa bem localizada perto da Represa e autódromo em Interlagos - Zona Sul, São Paulo.\n\n- 3 quartos grandes\n- 2 banheiros completos\n- Sala espaçosa e arejada\n- Área externa com espaço para churrasqueira\n- 2 vagas de garagem\n- Sem mobília, livre para ocupação imediata\n\nValor: R$ 510.000\nAceita proposta.\n\nChame no chat ou mande o zap para conversar direto com o proprietário!'
  },
  {
    id: '11_Casa_Saude_3Q_2B',
    title: 'Casa Térrea Moderna 3Q 2B na Saúde - SP',
    price: '620000',
    location: 'Saúde - Zona Sul, São Paulo',
    folderName: '11_Casa_Saude_3Q_2B',
    description: 'Casa térrea funcional próxima ao metrô Saúde - Zona Sul, São Paulo.\n\n- 3 dormitórios com ótimo acabamento\n- 2 banheiros reformados\n- Sala clara com iluminação natural\n- Cozinha arejada e lavanderia externa\n- Totalmente vazia, acabamento de primeira linha\n\nValor: R$ 620.000\nDocumentação regularizada.\n\nInteressados favor enviar mensagem ou deixar o zap no chat!'
  },
  {
    id: '12_Casa_Freguesia_do_O_3Q_2B',
    title: 'Casa 3 Quartos e 2 Banheiros na Freguesia do Ó - SP',
    price: '440000',
    location: 'Freguesia do Ó - Zona Norte, São Paulo',
    folderName: '12_Casa_Freguesia_do_O_3Q_2B',
    description: 'Casa muito bem conservada perto do Largo da Matriz na Freguesia do Ó - Zona Norte, São Paulo.\n\n- 3 quartos com piso de cerâmica novo\n- 2 banheiros azulejados\n- Sala bem iluminada\n- Corredor lateral e quintal\n- Sem móveis, pronta para visitar e mudar\n\nValor: R$ 440.000\nAceita financiamento.\n\nChama no chat ou me passa o zap pra marcar o horário da visita!'
  },
  {
    id: '13_Casa_Casa_Verde_3Q_2B',
    title: 'Sobrado Arejado 3Q 2B na Casa Verde - SP',
    price: '460000',
    location: 'Casa Verde - Zona Norte, São Paulo',
    folderName: '13_Casa_Casa_Verde_3Q_2B',
    description: 'Sobrado reformado na Casa Verde com acesso rápido à Marginal Tietê - Zona Norte, São Paulo.\n\n- 3 quartos espaçosos\n- 2 banheiros com revestimento até o teto\n- Sala ampla para estar e TV\n- Cozinha ampla e quintal nos fundos\n- Vazia, sem mobília, pintura nova\n\nValor: R$ 460.000\nDocumentação perfeita.\n\nEnvie uma mensagem no chat ou passe seu zap com ddd pra conversarmos!'
  },
  {
    id: '14_Casa_Campo_Belo_3Q_2B',
    title: 'Casa Alto Padrão 3Q 2B no Campo Belo - SP',
    price: '790000',
    location: 'Campo Belo - Zona Sul, São Paulo',
    folderName: '14_Casa_Campo_Belo_3Q_2B',
    description: 'Casa em ponto privilegiado no Campo Belo, rua tranquila com segurança - Zona Sul, São Paulo.\n\n- 3 dormitórios com janelas amplas\n- 2 banheiros modernos com cuba dupla e box\n- Sala com pé-direito alto e muita iluminação\n- 2 vagas de garagem\n- Sem mobília, fino acabamento\n\nValor: R$ 790.000\nDocumentos em dia.\n\nChama no chat ou envie seu contato de WhatsApp pra gente agendar a visita!'
  },
  {
    id: '15_Casa_Itaquera_3Q_2B',
    title: 'Casa Nova Recém-Construída 3Q 2B em Itaquera - SP',
    price: '360000',
    location: 'Itaquera - Zona Leste, São Paulo',
    folderName: '15_Casa_Itaquera_3Q_2B',
    description: 'Casa novinha, nunca habitada, próxima da Arena Corinthians e estação em Itaquera - Zona Leste, São Paulo.\n\n- 3 quartos bem ventilados\n- 2 banheiros com pia em louça branca\n- Sala e cozinha integradas em conceito aberto\n- Quintal e vaga de garagem\n- Sem mobília, pintura e pisos impecáveis\n\nValor: R$ 360.000\nAceita financiamento e FGTS.\n\nChame no chat ou mande o zap com ddd pra gente combinar de você conhecer o imóvel!'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SP_HOUSES_PRESETS };
}
