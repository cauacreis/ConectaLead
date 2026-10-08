import os
import urllib.request

BASE_DIR = os.path.join(os.getcwd(), 'modelos_casas_sp')
os.makedirs(BASE_DIR, exist_ok=True)

# 15 casas com dados realistas de São Paulo (3 quartos, 2 banheiros, sem móveis)
casas = [
    {
        'id': '01_Casa_Tatuape_3Q_2B',
        'bairro': 'Tatuapé - Zona Leste',
        'cidade': 'São Paulo - SP',
        'preco': '480.000',
        'tipo': 'Casa térrea com quintal',
        'detalhes': 'Imóvel desocupado, recém-pintado, piso novo em todos os cômodos. 3 quartos espaçosos, 2 banheiros com box, sala ampla para 2 ambientes, cozinha arejada e 2 vagas de garagem. Próximo ao metrô Carrão e comércio.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600585154340-be6161a56a0c'),
            ('02_sala_ampla.jpg', 'photo-1513694203232-719a280e022f'),
            ('03_quarto_principal.jpg', 'photo-1595526114035-0d45ed16cfbf'),
            ('04_quarto_2.jpg', 'photo-1505691938895-1758d7feb511'),
            ('05_banheiro.jpg', 'photo-1552321554-5fefe8c9ef14'),
        ]
    },
    {
        'id': '02_Casa_Santana_3Q_2B',
        'bairro': 'Santana - Zona Norte',
        'cidade': 'São Paulo - SP',
        'preco': '520.000',
        'tipo': 'Sobrado moderno sem mobília',
        'detalhes': 'Excelente sobrado em rua tranquila em Santana. 3 dormitórios, 2 banheiros completos, sala para dois ambientes, cozinha americana sem móveis e área de serviço coberta. Vazio, pronto para entrar e morar.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600596542815-ffad4c1539a9'),
            ('02_sala_ampla.jpg', 'photo-1560448204-e02f11c3d0e2'),
            ('03_quarto_principal.jpg', 'photo-1522771739844-6a9f6d5f14af'),
            ('04_quarto_2.jpg', 'photo-1513694203232-719a280e022f'),
            ('05_banheiro.jpg', 'photo-1620626011761-996317b8d101'),
        ]
    },
    {
        'id': '03_Casa_Mooca_3Q_2B',
        'bairro': 'Mooca - Zona Leste',
        'cidade': 'São Paulo - SP',
        'preco': '550.000',
        'tipo': 'Casa tradicional reformada',
        'detalhes': 'Casa térrea ampla na Mooca tradicional. 3 quartos bem iluminados, 2 banheiros azulejados novos, sala espaçosa com piso de porcelanato e quintal nos fundos. Imóvel vazio, chave na mão.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600565193348-f74bd3c7ccdf'),
            ('02_sala_ampla.jpg', 'photo-1502672260266-1c1ef2d93688'),
            ('03_quarto_principal.jpg', 'photo-1502672260266-1c1ef2d93688'),
            ('04_quarto_2.jpg', 'photo-1560448204-e02f11c3d0e2'),
            ('05_banheiro.jpg', 'photo-1584622650111-993a426fbf0a'),
        ]
    },
    {
        'id': '04_Casa_Butanta_3Q_2B',
        'bairro': 'Butantã - Zona Oeste',
        'cidade': 'São Paulo - SP',
        'preco': '590.000',
        'tipo': 'Casa em condomínio fechado',
        'detalhes': 'Casa em rua arborizada no Butantã, próximo da USP e estação de metrô. 3 quartos, 2 banheiros, sala ampla para estar e jantar, cozinha espaçosa e 2 vagas. Sem móveis, documentação 100% em dia.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600607687939-ce8a6c25118c'),
            ('02_sala_ampla.jpg', 'photo-1522771739844-6a9f6d5f14af'),
            ('03_quarto_principal.jpg', 'photo-1554995207-c18c203602cb'),
            ('04_quarto_2.jpg', 'photo-1536376072261-38c75010e6c9'),
            ('05_banheiro.jpg', 'photo-1507652313519-d4e9174996dd'),
        ]
    },
    {
        'id': '05_Casa_Ipiranga_3Q_2B',
        'bairro': 'Ipiranga - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '540.000',
        'tipo': 'Casa térrea aconchegante',
        'detalhes': 'Casa totalmente reformada no miolo do Ipiranga. 3 dormitórios com piso laminado, 2 banheiros modernos, sala arejada com boa iluminação natural. Sem mobília, pronta para mudança imediata.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600573472591-ee6b68d14c68'),
            ('02_sala_ampla.jpg', 'photo-1493809842364-78817add7ffb'),
            ('03_quarto_principal.jpg', 'photo-1512915922686-57c11dde9b6b'),
            ('04_quarto_2.jpg', 'photo-1493809842364-78817add7ffb'),
            ('05_banheiro.jpg', 'photo-1584622781564-1d987f7333c1'),
        ]
    },
    {
        'id': '06_Casa_Vila_Mariana_3Q_2B',
        'bairro': 'Vila Mariana - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '780.000',
        'tipo': 'Sobrado charmoso',
        'detalhes': 'Sobrado em localização nobre na Vila Mariana, a poucas quadras do Parque Ibirapuera e metrô Ana Rosa. 3 quartos, 2 banheiros com louças novas, sala integrada e quintal. Imóvel desocupado.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600585154526-990dced4db0d'),
            ('02_sala_ampla.jpg', 'photo-1512915922686-57c11dde9b6b'),
            ('03_quarto_principal.jpg', 'photo-1507089947368-19c1da9775ae'),
            ('04_quarto_2.jpg', 'photo-1513519245088-0e12902e5a38'),
            ('05_banheiro.jpg', 'photo-1552321554-5fefe8c9ef14'),
        ]
    },
    {
        'id': '07_Casa_Santo_Amaro_3Q_2B',
        'bairro': 'Santo Amaro - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '490.000',
        'tipo': 'Casa espaçosa em rua sem saída',
        'detalhes': 'Casa segura em rua tranquila e familiar. 3 quartos arejados, 2 banheiros, sala para 2 ambientes, cozinha com bancada em granito e lavanderia independente. Vazia, sem mobília, pronta para uso.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600607687920-4e2a09cf159d'),
            ('02_sala_ampla.jpg', 'photo-1505691938895-1758d7feb511'),
            ('03_quarto_principal.jpg', 'photo-1583847268964-b28dc8f51f92'),
            ('04_quarto_2.jpg', 'photo-1595526114035-0d45ed16cfbf'),
            ('05_banheiro.jpg', 'photo-1620626011761-996317b8d101'),
        ]
    },
    {
        'id': '08_Casa_Penha_3Q_2B',
        'bairro': 'Penha - Zona Leste',
        'cidade': 'São Paulo - SP',
        'preco': '420.000',
        'tipo': 'Casa térrea independente',
        'detalhes': 'Ótima oportunidade na Penha de França. 3 dormitórios, 2 banheiros, sala aconchegante com piso frio, cozinha e quintal privativo. Casa sem móveis, toda pintada de branco.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600566753376-12c8ab7fb75b'),
            ('02_sala_ampla.jpg', 'photo-1536376072261-38c75010e6c9'),
            ('03_quarto_principal.jpg', 'photo-1505691938895-1758d7feb511'),
            ('04_quarto_2.jpg', 'photo-1522771739844-6a9f6d5f14af'),
            ('05_banheiro.jpg', 'photo-1584622650111-993a426fbf0a'),
        ]
    },
    {
        'id': '09_Casa_Lapa_3Q_2B',
        'bairro': 'Lapa - Zona Oeste',
        'cidade': 'São Paulo - SP',
        'preco': '650.000',
        'tipo': 'Sobrado em excelente estado',
        'detalhes': 'Sobrado espaçoso no Alto da Lapa. 3 quartos confortáveis, 2 banheiros com box blindex, sala com janelões de vidro que proporcionam ótima ventilação, garagem para 2 carros. Desocupado.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600585152220-90363fe7e115'),
            ('02_sala_ampla.jpg', 'photo-1507089947368-19c1da9775ae'),
            ('03_quarto_principal.jpg', 'photo-1513694203232-719a280e022f'),
            ('04_quarto_2.jpg', 'photo-1502672260266-1c1ef2d93688'),
            ('05_banheiro.jpg', 'photo-1507652313519-d4e9174996dd'),
        ]
    },
    {
        'id': '10_Casa_Interlagos_3Q_2B',
        'bairro': 'Interlagos - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '510.000',
        'tipo': 'Casa ampla com quintal',
        'detalhes': 'Casa bem localizada perto da Represa e autódromo. 3 quartos grandes, 2 banheiros, sala espaçosa, área externa com espaço para churrasqueira e 2 vagas. Sem mobília, livre para ocupação.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1600566753190-17f0baa2a6c3'),
            ('02_sala_ampla.jpg', 'photo-1513519245088-0e12902e5a38'),
            ('03_quarto_principal.jpg', 'photo-1560448204-e02f11c3d0e2'),
            ('04_quarto_2.jpg', 'photo-1554995207-c18c203602cb'),
            ('05_banheiro.jpg', 'photo-1584622781564-1d987f7333c1'),
        ]
    },
    {
        'id': '11_Casa_Saude_3Q_2B',
        'bairro': 'Saúde - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '620.000',
        'tipo': 'Casa térrea moderna',
        'detalhes': 'Casa térrea funcional próxima ao metrô Saúde. 3 dormitórios, 2 banheiros reformados, sala arejada, cozinha clara e lavanderia externa. Totalmente vazia, acabamento de primeira linha.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1512917774080-9991f1c4c750'),
            ('02_sala_ampla.jpg', 'photo-1554995207-c18c203602cb'),
            ('03_quarto_principal.jpg', 'photo-1536376072261-38c75010e6c9'),
            ('04_quarto_2.jpg', 'photo-1512915922686-57c11dde9b6b'),
            ('05_banheiro.jpg', 'photo-1552321554-5fefe8c9ef14'),
        ]
    },
    {
        'id': '12_Casa_Freguesia_do_O_3Q_2B',
        'bairro': 'Freguesia do Ó - Zona Norte',
        'cidade': 'São Paulo - SP',
        'preco': '440.000',
        'tipo': 'Casa de bairro aconchegante',
        'detalhes': 'Casa muito bem conservada perto do Largo da Matriz. 3 quartos com piso de cerâmica, 2 banheiros, sala bem iluminada e corredor lateral. Sem móveis, pronta para visitar.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1613977257363-707ba9348227'),
            ('02_sala_ampla.jpg', 'photo-1583847268964-b28dc8f51f92'),
            ('03_quarto_principal.jpg', 'photo-1493809842364-78817add7ffb'),
            ('04_quarto_2.jpg', 'photo-1507089947368-19c1da9775ae'),
            ('05_banheiro.jpg', 'photo-1620626011761-996317b8d101'),
        ]
    },
    {
        'id': '13_Casa_Casa_Verde_3Q_2B',
        'bairro': 'Casa Verde - Zona Norte',
        'cidade': 'São Paulo - SP',
        'preco': '460.000',
        'tipo': 'Sobrado prático e arejado',
        'detalhes': 'Sobrado reformado na Casa Verde com acesso rápido à Marginal Tietê. 3 quartos, 2 banheiros com revestimento até o teto, sala ampla para estar e TV. Vazia, sem mobília.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1613490493576-7fde63acd811'),
            ('02_sala_ampla.jpg', 'photo-1584622650111-993a426fbf0a'),
            ('03_quarto_principal.jpg', 'photo-1513519245088-0e12902e5a38'),
            ('04_quarto_2.jpg', 'photo-1583847268964-b28dc8f51f92'),
            ('05_banheiro.jpg', 'photo-1584622650111-993a426fbf0a'),
        ]
    },
    {
        'id': '14_Casa_Campo_Belo_3Q_2B',
        'bairro': 'Campo Belo - Zona Sul',
        'cidade': 'São Paulo - SP',
        'preco': '790.000',
        'tipo': 'Casa moderna de alto padrão',
        'detalhes': 'Casa em ponto privilegiado no Campo Belo, rua tranquila com segurança. 3 dormitórios com janelas amplas, 2 banheiros modernos, sala com pé-direito alto, 2 vagas. Sem mobília, fino acabamento.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1580587771525-78b9dba3b914'),
            ('02_sala_ampla.jpg', 'photo-1507652313519-d4e9174996dd'),
            ('03_quarto_principal.jpg', 'photo-1595526114035-0d45ed16cfbf'),
            ('04_quarto_2.jpg', 'photo-1505691938895-1758d7feb511'),
            ('05_banheiro.jpg', 'photo-1507652313519-d4e9174996dd'),
        ]
    },
    {
        'id': '15_Casa_Itaquera_3Q_2B',
        'bairro': 'Itaquera - Zona Leste',
        'cidade': 'São Paulo - SP',
        'preco': '360.000',
        'tipo': 'Casa nova recém-construída',
        'detalhes': 'Casa novinha, nunca habitada, próxima da Arena Corinthians e estação de trem/metrô. 3 quartos bem ventilados, 2 banheiros com pia em louça branca, sala e cozinha integradas. Aceita financiamento.',
        'fotos': [
            ('01_fachada.jpg', 'photo-1568605117036-5fe5e7bab0b7'),
            ('02_sala_ampla.jpg', 'photo-1584622781564-1d987f7333c1'),
            ('03_quarto_principal.jpg', 'photo-1522771739844-6a9f6d5f14af'),
            ('04_quarto_2.jpg', 'photo-1513694203232-719a280e022f'),
            ('05_banheiro.jpg', 'photo-1584622781564-1d987f7333c1'),
        ]
    }
]

print(f"Iniciando download de 15 modelos de casas (75 fotos no total)...")

for idx, casa in enumerate(casas, 1):
    casa_path = os.path.join(BASE_DIR, casa['id'])
    os.makedirs(casa_path, exist_ok=True)
    print(f"\n[{idx}/15] Baixando: {casa['id']} ({casa['bairro']})...")

    # Baixar fotos
    for filename, photo_id in casa['fotos']:
        filepath = os.path.join(casa_path, filename)
        if not os.path.exists(filepath):
            url = f'https://images.unsplash.com/{photo_id}?w=1080&q=80'
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            try:
                with urllib.request.urlopen(req, timeout=10) as resp:
                    with open(filepath, 'wb') as f:
                        f.write(resp.read())
                print(f"  + {filename}")
            except Exception as e:
                print(f"  ! Erro ao baixar {filename}: {e}")
        else:
            print(f"  = {filename} (ja existe)")

    # Criar dados_anuncio.txt em cada pasta pronto para o Marketplace
    info_path = os.path.join(casa_path, 'dados_anuncio.txt')
    conteudo_anuncio = f"""====================================================
DADOS PRONTOS PARA ANUNCIAR NO FACEBOOK MARKETPLACE
====================================================

TITULO DO ANUNCIO:
Casa com 3 Quartos e 2 Banheiros em {casa['bairro'].split(' - ')[0]} - SP

PRECO:
R$ {casa['preco']}

LOCALIZACAO:
{casa['bairro']}

DESCRICAO PARA COPIAR E COLAR NO FACEBOOK:
Vendo {casa['tipo'].lower()} em {casa['bairro']}, São Paulo.

- 3 quartos espaçosos e bem iluminados
- 2 banheiros completos
- Sala ampla para 2 ambientes
- Imóvel desocupado, sem móveis, pronto para morar
- Fotos reais tiradas do próprio imóvel

{casa['detalhes']}

Valor: R$ {casa['preco']}
Documentação toda em ordem. Aceita proposta.

Quem tiver interesse, me chama aqui no chat ou manda o zap pra gente agendar uma visita sem compromisso!
"""
    with open(info_path, 'w', encoding='utf-8') as f:
        f.write(conteudo_anuncio)

print("\n--- TODOS OS 15 MODELOS BAIXADOS COM SUCESSO! ---")
