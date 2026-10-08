import os
import shutil
from PIL import Image, ImageEnhance

# Path to generated artifact images
ARTIFACT_DIR = r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57"

FACADES = [
    os.path.join(ARTIFACT_DIR, "fachada_casa_simples_1791472220130.jpg"),     # F1: Azul com portão preto
    os.path.join(ARTIFACT_DIR, "fachada_casa_simples_02_1791472718016.jpg"),  # F2: Amarela com portão basculante
    os.path.join(ARTIFACT_DIR, "fachada_casa_simples_03_1791472805069.jpg"),  # F3: Branca com telhado verde
    os.path.join(ARTIFACT_DIR, "fachada_casa_simples_04_1791472864146.jpg"),  # F4: Azul claro com portão moderno marrom
    os.path.join(ARTIFACT_DIR, "fachada_casa_simples_05_1791472928400.jpg"),  # F5: Tijolinho na esquina
]

ROOMS = {
    "sala": os.path.join(ARTIFACT_DIR, "sala_vazia_simples_1791472415843.jpg"),
    "quarto_1": os.path.join(ARTIFACT_DIR, "quarto_vazio_simples_1791472165312.jpg"),
    "quarto_2": os.path.join(ARTIFACT_DIR, "quarto_vazio_02_1791472489604.jpg"),
    "quarto_3": os.path.join(ARTIFACT_DIR, "quarto_vazio_03_1791472534273.jpg"),
    "banheiro_1": os.path.join(ARTIFACT_DIR, "banheiro_simples_1791472448513.jpg"),
    "banheiro_2": os.path.join(ARTIFACT_DIR, "banheiro_simples_02_1791472657166.jpg"),
    "cozinha": os.path.join(ARTIFACT_DIR, "cozinha_vazia_simples_1791472604621.jpg"),
}

# Verify all source images exist
for f in FACADES:
    assert os.path.exists(f), f"Missing facade file: {f}"
for k, r in ROOMS.items():
    assert os.path.exists(r), f"Missing room file: {r}"

print("All 12 source images verified successfully!")

HOUSES = [
    {
        "id": "01_Casa_Itaquera_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros em Itaquera - SP",
        "price": "210000",
        "price_fmt": "R$ 210.000",
        "neighborhood": "Itaquera",
        "zone": "Zona Leste",
        "facade_idx": 0,
        "variant": 0,
        "desc": (
            "Vendo casa térrea simples em Itaquera, Zona Leste de SP.\n\n"
            "Destaques do imóvel:\n"
            "- 3 quartos bem arejados e iluminados\n"
            "- 2 banheiros completos (com chuveiro instalado)\n"
            "- Sala espaçosa com piso frio\n"
            "- Cozinha com pia em inox\n"
            "- Garagem e quintal\n"
            "- Imóvel 100% desocupado, sem mobília, entrar e morar!\n\n"
            "Ótima localização no bairro, perto de padaria, mercado, ponto de ônibus e fácil acesso à estação.\n\n"
            "Valor: R$ 210.000 (aceita proposta e estuda carro como parte do pagamento).\n\n"
            "Quem tiver interesse me chama aqui no chat ou manda o zap pra gente marcar uma visita sem compromisso!"
        )
    },
    {
        "id": "02_Casa_Sao_Mateus_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros em São Mateus - SP",
        "price": "195000",
        "price_fmt": "R$ 195.000",
        "neighborhood": "São Mateus",
        "zone": "Zona Leste",
        "facade_idx": 1,
        "variant": 0,
        "desc": (
            "Vendo casa em São Mateus, Zona Leste de São Paulo. Bairro tranquilo e familiar.\n\n"
            "Características:\n"
            "- 3 dormitórios com piso cerâmico\n"
            "- 2 banheiros azulejados\n"
            "- Sala arejada\n"
            "- Cozinha com pia e área molhada com azulejo\n"
            "- Garagem fechada com portão basculante\n"
            "- Casa vazia, sem móveis, toda pintada e limpa\n\n"
            "Fácil acesso à Avenida Ragueb Chohfi e comércios do bairro.\n\n"
            "Valor: R$ 195.000 à vista ou financiamento.\n\n"
            "Me chama no chat ou deixa seu zap que eu respondo e combinamos de ver a casa!"
        )
    },
    {
        "id": "03_Casa_Guaianases_3Q_2B",
        "title": "Casa Simples 3 Quartos e 2 Banheiros em Guaianases - SP",
        "price": "185000",
        "price_fmt": "R$ 185.000",
        "neighborhood": "Guaianases",
        "zone": "Zona Leste",
        "facade_idx": 2,
        "variant": 0,
        "desc": (
            "Excelente oportunidade de casa própria em Guaianases - SP.\n\n"
            "Informações da casa:\n"
            "- 3 quartos amplos\n"
            "- 2 banheiros (1 social e 1 na área externa/fundos)\n"
            "- Sala clara com piso de cerâmica\n"
            "- Cozinha com pia e encanamento novo\n"
            "- Portão de ferro, casa murada e segura\n"
            "- Imóvel vazio, chave na mão, sem mobília\n\n"
            "Rua tranquila, perto de escola e linha de ônibus.\n\n"
            "Valor: R$ 185.000.\n\n"
            "Interessados mandar mensagem no chat ou passar o whatsapp com DDD!"
        )
    },
    {
        "id": "04_Casa_Sapopemba_3Q_2B",
        "title": "Casa Térrea com Garagem 3Q e 2B no Sapopemba - SP",
        "price": "220000",
        "price_fmt": "R$ 220.000",
        "neighborhood": "Sapopemba",
        "zone": "Zona Leste",
        "facade_idx": 3,
        "variant": 0,
        "desc": (
            "Casa térrea com varanda no Sapopemba - Zona Leste de SP.\n\n"
            "- 3 quartos arejados\n"
            "- 2 banheiros reformados com piso frio\n"
            "- Sala de estar espaçosa\n"
            "- Cozinha com bancada e pia\n"
            "- Varanda na frente e garagem\n"
            "- Desocupada, pintura nova, sem móveis\n\n"
            "Perto de comércio, feira livre e transporte público.\n\n"
            "Valor: R$ 220.000.\n\n"
            "Chame no chat ou mande seu zap pra gente agendar de ver pessoalmente!"
        )
    },
    {
        "id": "05_Casa_Brasilandia_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros na Brasilândia - SP",
        "price": "205000",
        "price_fmt": "R$ 205.000",
        "neighborhood": "Brasilândia",
        "zone": "Zona Norte",
        "facade_idx": 4,
        "variant": 0,
        "desc": (
            "Casa de esquina aconchegante na Brasilândia - Zona Norte, São Paulo.\n\n"
            "- 3 dormitórios confortáveis com piso cerâmico\n"
            "- 2 banheiros práticos e limpos\n"
            "- Sala arejada e bem iluminada\n"
            "- Cozinha espaçosa com pia\n"
            "- Garagem com portão de ferro e quintal\n"
            "- Totalmente vazia, pronta para morar\n\n"
            "Local tranquilo, perto de ponto de ônibus e comércio local.\n\n"
            "Valor: R$ 205.000.\n\n"
            "Me chama no chat ou envia seu telefone com zap pra marcar visita!"
        )
    },
    {
        "id": "06_Casa_Campo_Limpo_3Q_2B",
        "title": "Casa de Bairro 3 Quartos e 2 Banheiros no Campo Limpo - SP",
        "price": "230000",
        "price_fmt": "R$ 230.000",
        "neighborhood": "Campo Limpo",
        "zone": "Zona Sul",
        "facade_idx": 0,
        "variant": 1,
        "desc": (
            "Casa térrea bem cuidada no Campo Limpo - Zona Sul, São Paulo.\n\n"
            "- 3 quartos espaçosos com janelas de ferro/alumínio\n"
            "- 2 banheiros azulejados\n"
            "- Sala com piso claro\n"
            "- Cozinha com pia e torneira nova\n"
            "- Portão de ferro e quintal nos fundos\n"
            "- Desocupada, sem móveis, documento em dia\n\n"
            "Fácil acesso a linhas de ônibus e comércios da região.\n\n"
            "Valor: R$ 230.000 (aceita proposta).\n\n"
            "Quem tiver interesse pode chamar no chat ou mandar o zap!"
        )
    },
    {
        "id": "07_Casa_Grajau_3Q_2B",
        "title": "Casa Simples com Quintal 3Q e 2B no Grajaú - SP",
        "price": "190000",
        "price_fmt": "R$ 190.000",
        "neighborhood": "Grajaú",
        "zone": "Zona Sul",
        "facade_idx": 1,
        "variant": 1,
        "desc": (
            "Oportunidade no Grajaú - Zona Sul de São Paulo.\n\n"
            "- 3 dormitórios arejados\n"
            "- 2 banheiros com azulejo e chuveiro\n"
            "- Sala ampla com piso frio\n"
            "- Cozinha com pia em inox\n"
            "- Garagem coberta com portão basculante\n"
            "- Imóvel 100% desocupado, sem móveis\n\n"
            "Rua residencial, boa vizinhança e ônibus próximo.\n\n"
            "Valor: R$ 190.000.\n\n"
            "Chama no chat ou deixa o seu whatsapp que entro em contato rapidinho!"
        )
    },
    {
        "id": "08_Casa_Pirituba_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros em Pirituba - SP",
        "price": "245000",
        "price_fmt": "R$ 245.000",
        "neighborhood": "Pirituba",
        "zone": "Zona Noroeste",
        "facade_idx": 2,
        "variant": 1,
        "desc": (
            "Casa térrea em Pirituba - Zona Noroeste, São Paulo.\n\n"
            "- 3 quartos bem ventilados\n"
            "- 2 banheiros completos\n"
            "- Sala espaçosa com iluminação natural\n"
            "- Cozinha arejada com balcão e pia\n"
            "- Garagem e quintal murado\n"
            "- Casa vazia, limpa e recém-pintada, sem mobília\n\n"
            "Perto de padaria, mercado e linha de ônibus direta para a estação.\n\n"
            "Valor: R$ 245.000.\n\n"
            "Manda uma mensagem no chat ou passe o seu zap pra gente combinar de ver!"
        )
    },
    {
        "id": "09_Casa_Perus_3Q_2B",
        "title": "Casa 3 Quartos e 2 Banheiros em Perus - SP",
        "price": "180000",
        "price_fmt": "R$ 180.000",
        "neighborhood": "Perus",
        "zone": "Zona Noroeste",
        "facade_idx": 3,
        "variant": 1,
        "desc": (
            "Casa simples e aconchegante em Perus - Zona Noroeste de SP.\n\n"
            "- 3 quartos com piso cerâmico\n"
            "- 2 banheiros com louças brancas\n"
            "- Sala aconchegante\n"
            "- Cozinha com pia de inox e azulejo\n"
            "- Varanda frontal e portão fechado\n"
            "- Vazia e sem mobília, pronta para mudança\n\n"
            "Bairro calmo, próximo à estação Perus da CPTM.\n\n"
            "Valor: R$ 180.000.\n\n"
            "Interessados me chamem no chat ou deixem o zap para agendar!"
        )
    },
    {
        "id": "10_Casa_Ermelino_Matarazzo_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros em Ermelino Matarazzo - SP",
        "price": "225000",
        "price_fmt": "R$ 225.000",
        "neighborhood": "Ermelino Matarazzo",
        "zone": "Zona Leste",
        "facade_idx": 4,
        "variant": 1,
        "desc": (
            "Casa de bairro em Ermelino Matarazzo - Zona Leste de São Paulo.\n\n"
            "- 3 quartos grandes\n"
            "- 2 banheiros azulejados\n"
            "- Sala com piso claro\n"
            "- Cozinha com pia e instalações prontas\n"
            "- Portão de ferro e vaga de garagem\n"
            "- Totalmente vazia, desocupada e pronta para morar\n\n"
            "Rua tranquila, próximo de mercados, farmácia e condução.\n\n"
            "Valor: R$ 225.000.\n\n"
            "Chame no chat ou mande mensagem no zap pra mais informações!"
        )
    },
    {
        "id": "11_Casa_Cidade_Tiradentes_3Q_2B",
        "title": "Casa Simples 3 Quartos e 2 Banheiros na Cidade Tiradentes - SP",
        "price": "175000",
        "price_fmt": "R$ 175.000",
        "neighborhood": "Cidade Tiradentes",
        "zone": "Zona Leste",
        "facade_idx": 0,
        "variant": 2,
        "desc": (
            "Ótima casa térrea popular na Cidade Tiradentes - Zona Leste, SP.\n\n"
            "- 3 quartos espaçosos\n"
            "- 2 banheiros com chuveiro\n"
            "- Sala arejada\n"
            "- Cozinha com pia e encanamento ok\n"
            "- Garagem com portão de grade\n"
            "- Sem móveis, desocupada, pintura nova\n\n"
            "Próxima ao terminal de ônibus e comércio da região.\n\n"
            "Valor: R$ 175.000.\n\n"
            "Manda um oi no chat ou passa o zap pra marcar de visitar!"
        )
    },
    {
        "id": "12_Casa_Capao_Redondo_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros no Capão Redondo - SP",
        "price": "215000",
        "price_fmt": "R$ 215.000",
        "neighborhood": "Capão Redondo",
        "zone": "Zona Sul",
        "facade_idx": 1,
        "variant": 2,
        "desc": (
            "Casa bem estruturada no Capão Redondo - Zona Sul de São Paulo.\n\n"
            "- 3 dormitórios com piso cerâmico\n"
            "- 2 banheiros azulejados\n"
            "- Sala espaçosa e bem iluminada\n"
            "- Cozinha ampla com pia inox\n"
            "- Garagem fechada para 1 carro\n"
            "- Casa sem mobília, pronta para entrega imediata\n\n"
            "Boa localização com comércio e transporte público próximos.\n\n"
            "Valor: R$ 215.000.\n\n"
            "Chame no chat ou mande o zap com ddd pra agendar a visita!"
        )
    },
    {
        "id": "13_Casa_Jardim_Angela_3Q_2B",
        "title": "Casa de Bairro 3 Quartos e 2 Banheiros no Jardim Ângela - SP",
        "price": "188000",
        "price_fmt": "R$ 188.000",
        "neighborhood": "Jardim Ângela",
        "zone": "Zona Sul",
        "facade_idx": 2,
        "variant": 2,
        "desc": (
            "Casa térrea no Jardim Ângela - Zona Sul de São Paulo.\n\n"
            "- 3 quartos arejados\n"
            "- 2 banheiros completos\n"
            "- Sala aconchegante com piso frio\n"
            "- Cozinha com pia e balcão\n"
            "- Muro alto com portão de ferro e quintal\n"
            "- Imóvel vazio, sem móveis, pronto para morar\n\n"
            "Rua asfaltada, vizinhança tranquila e ônibus na porta.\n\n"
            "Valor: R$ 188.000.\n\n"
            "Interessados chame no chat ou mande seu número do zap!"
        )
    },
    {
        "id": "14_Casa_Vila_Curuca_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros na Vila Curuçá - SP",
        "price": "200000",
        "price_fmt": "R$ 200.000",
        "neighborhood": "Vila Curuçá",
        "zone": "Zona Leste",
        "facade_idx": 3,
        "variant": 2,
        "desc": (
            "Casa em ótima rua na Vila Curuçá - São Miguel Paulista / Zona Leste, SP.\n\n"
            "- 3 quartos claros com janela de correr\n"
            "- 2 banheiros com louças brancas novas\n"
            "- Sala ampla de estar\n"
            "- Cozinha com pia em inox\n"
            "- Varanda e garagem coberta com portão moderno\n"
            "- Sem nenhum móvel, pronta para ocupação\n\n"
            "Perto de supermercado, posto de saúde e condução.\n\n"
            "Valor: R$ 200.000.\n\n"
            "Me chama no chat ou passa o zap pra conversarmos!"
        )
    },
    {
        "id": "15_Casa_Jaragua_3Q_2B",
        "title": "Casa Térrea 3 Quartos e 2 Banheiros no Jaraguá - SP",
        "price": "235000",
        "price_fmt": "R$ 235.000",
        "neighborhood": "Jaraguá",
        "zone": "Zona Noroeste",
        "facade_idx": 4,
        "variant": 2,
        "desc": (
            "Casa térrea com quintal no Jaraguá - Zona Noroeste, São Paulo.\n\n"
            "- 3 dormitórios arejados com piso cerâmico\n"
            "- 2 banheiros limpos e funcionais\n"
            "- Sala de estar espaçosa\n"
            "- Cozinha ventilada com pia instalada\n"
            "- Garagem com portão de correr e quintal\n"
            "- Totalmente desocupada, sem móveis\n\n"
            "Próximo à estação Jaraguá da CPTM e comércio da Estrada de Taipas.\n\n"
            "Valor: R$ 235.000.\n\n"
            "Chame no chat ou mande o zap pra marcar o melhor horário pra ver o imóvel!"
        )
    }
]

BASE_DIR = os.path.join(os.getcwd(), "modelos_casas_sp")
os.makedirs(BASE_DIR, exist_ok=True)

def process_facade(src_path, variant):
    im = Image.open(src_path)
    w, h = im.size
    if variant == 0:
        return im
    elif variant == 1:
        # Slight crop (3% inward) + slight contrast adjustment
        crop_box = (int(w * 0.03), int(h * 0.02), int(w * 0.97), int(h * 0.98))
        cropped = im.crop(crop_box).resize((w, h), Image.Resampling.LANCZOS)
        enhancer = ImageEnhance.Contrast(cropped)
        return enhancer.enhance(1.04)
    elif variant == 2:
        # Slight horizontal flip / subtle warm tone
        crop_box = (int(w * 0.02), int(h * 0.04), int(w * 0.98), int(h * 0.96))
        cropped = im.crop(crop_box).resize((w, h), Image.Resampling.LANCZOS)
        enhancer = ImageEnhance.Color(cropped)
        return enhancer.enhance(1.05)
    return im

for i, house in enumerate(HOUSES):
    house_dir = os.path.join(BASE_DIR, house["id"])
    os.makedirs(house_dir, exist_ok=True)

    # 1. Facade
    facade_src = FACADES[house["facade_idx"]]
    facade_img = process_facade(facade_src, house["variant"])
    facade_img.save(os.path.join(house_dir, "01_fachada.jpg"), quality=92)

    # 2. Sala vazia
    shutil.copyfile(ROOMS["sala"], os.path.join(house_dir, "02_sala_vazia.jpg"))

    # 3. Quarto 1
    shutil.copyfile(ROOMS["quarto_1"], os.path.join(house_dir, "03_quarto_01.jpg"))

    # 4. Quarto 2
    shutil.copyfile(ROOMS["quarto_2"], os.path.join(house_dir, "04_quarto_02.jpg"))

    # 5. Quarto 3
    shutil.copyfile(ROOMS["quarto_3"], os.path.join(house_dir, "05_quarto_03.jpg"))

    # 6. Banheiro 1
    shutil.copyfile(ROOMS["banheiro_1"], os.path.join(house_dir, "06_banheiro_01.jpg"))

    # 7. Banheiro 2
    shutil.copyfile(ROOMS["banheiro_2"], os.path.join(house_dir, "07_banheiro_02.jpg"))

    # 8. Cozinha vazia
    shutil.copyfile(ROOMS["cozinha"], os.path.join(house_dir, "08_cozinha_vazia.jpg"))

    # 9. Dados do anuncio
    txt_content = f"""===========================================================
ANÚNCIO PARA MARKETPLACE / OLX - CONECTALEAD
===========================================================

TÍTULO:
{house['title']}

PREÇO:
{house['price_fmt']} (R$ {house['price']})

CATEGORIA:
Imóveis > Venda de Casas

LOCALIZAÇÃO:
{house['neighborhood']} - {house['zone']}, São Paulo - SP

CARACTERÍSTICAS:
- Tipo: Casa térrea residencial
- Quartos: 3 quartos
- Banheiros: 2 banheiros completos
- Cozinha: 1 (com pia de inox instalada)
- Sala: 1 (sala ampla desocupada)
- Mobília: SEM MOBÍLIA (100% desocupada, vazia)
- Garagem / Quintal: Sim

FOTOS INCLUSAS NESTA PASTA ({len(os.listdir(house_dir)) + 1} fotos):
1. 01_fachada.jpg      (Fachada frontal da casa)
2. 02_sala_vazia.jpg    (Sala de estar ampla sem móveis)
3. 03_quarto_01.jpg     (Quarto 1 vazio com piso frio)
4. 04_quarto_02.jpg     (Quarto 2 vazio com janela)
5. 05_quarto_03.jpg     (Quarto 3 vazio com piso cerâmico)
6. 06_banheiro_01.jpg   (Banheiro 1 azulejado com chuveiro)
7. 07_banheiro_02.jpg   (Banheiro 2 com chuveiro e louças)
8. 08_cozinha_vazia.jpg (Cozinha vazia com pia de inox)

-----------------------------------------------------------
TEXTO PARA COPIAR E COLAR NA DESCRIÇÃO:
-----------------------------------------------------------
{house['desc']}
===========================================================
"""
    with open(os.path.join(house_dir, "dados_anuncio.txt"), "w", encoding="utf-8") as tf:
        tf.write(txt_content)

    print(f"[{i+1}/15] Criada pasta: {house['id']} com 8 fotos (todas sem móveis) + dados_anuncio.txt")

print("\nFinalizado com sucesso! Todas as 15 casas populares montadas sem móveis.")
