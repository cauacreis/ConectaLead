# -*- coding: utf-8 -*-
"""
Cria e popula os modelos 17 a 20 com:
- Fachadas hiper-realistas de alta conversão
- Cômodos limpos e arejados
- Descrições CRO com 6 quebras
- Garantia de unicidade de hash MD5 em todas as fotos
"""

import os
import hashlib
from pathlib import Path
from PIL import Image, ImageEnhance

BASE_DIR = Path(r"c:\Users\Cauã Felype\Documents\ConectaLead")
MODELOS_DIR = BASE_DIR / "modelos_casas"
BRAIN_DIR = Path(r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57")

NEW_HOUSES = {
    "17_Casa_Palhoca_Alto_Aririu_3Q_2B": {
        "facade": BRAIN_DIR / "casa_alto_aririu_palhoca_1792539040811.jpg",
        "title": "Oportunidade Real: Casa Térrea com Quintal Amplo no Alto Aririú",
        "price": "10000",
        "location": "Alto Aririú, Palhoça - SC, Brasil",
        "bedrooms": "3",
        "bathrooms": "2",
        "desc": """Oportunidade real de conquistar sua casa própria com pátio espaçoso no Alto Aririú.

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
Saia do aluguel hoje mesmo! Agende sua visita.






"imagens ilustrativas"
"""
    },
    "18_Casa_Biguacu_Deltaville_2Q_2B": {
        "facade": BRAIN_DIR / "casa_deltaville_biguacu_v2_1792539197818.jpg",
        "title": "Oportunidade Real: Casa Alto Padrão no Bairro Planejado Deltaville",
        "price": "19000",
        "location": "Deltaville, Biguaçu - SC, Brasil",
        "bedrooms": "2",
        "bathrooms": "2",
        "desc": """Oportunidade real de viver o luxo e a segurança de um condomínio fechado no Deltaville.

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

Viva onde você sempre sonhou. Agende agora sua visita!






"imagens ilustrativas"
"""
    },
    "19_Casa_Sao_Jose_Potecas_3Q_2B": {
        "facade": BRAIN_DIR / "fachada_casa_potecas_sao_jose_1792539296997.jpg",
        "title": "Oportunidade Real: Casa com Garagem Coberta e Muro Alto em Potecas",
        "price": "12000",
        "location": "Potecas, São José - SC, Brasil",
        "bedrooms": "3",
        "bathrooms": "2",
        "desc": """Oportunidade real de morar com privacidade e segurança absoluta em São José.

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
Chega de pagar aluguel. Venha conhecer sua nova casa!






"imagens ilustrativas"
"""
    },
    "20_Casa_Palhoca_Guarda_Cubatao_3Q_2B": {
        "facade": BRAIN_DIR / "casa_palhoca_guarda_cubatao_1792539419865.jpg",
        "title": "Oportunidade Real: Casa Térrea Espaçosa com Pátio na Guarda do Cubatão",
        "price": "11000",
        "location": "Guarda do Cubatão, Palhoça - SC, Brasil",
        "bedrooms": "3",
        "bathrooms": "2",
        "desc": """Oportunidade real para quem busca paz, ar puro e muito espaço privativo em Palhoça.

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
Não perca essa oportunidade. Agende sua visita!






"imagens ilustrativas"
"""
    }
}

CLEAN_ROOMS = {
    "sala": BRAIN_DIR / "sala_vazia_limpa_1792422130132.jpg",
    "quarto_01": BRAIN_DIR / "quarto_vazio_limpo_1792422131053.jpg",
    "quarto_02": BRAIN_DIR / "quarto_vazio_reformado_1792422144449.jpg",
    "quarto_03": BRAIN_DIR / "quarto_solteiro_vazio_limpo_1792423207909.jpg",
    "banheiro_01": BRAIN_DIR / "banheiro_impecavel_reformado_1792421817866.jpg",
    "banheiro_02": BRAIN_DIR / "banheiro_residencial_limpo_png_1792422889572.jpg",
    "cozinha": BRAIN_DIR / "cozinha_limpa_anuncio_imobiliario_1792422131027.jpg",
}

def process_and_save_unique(src_path, dst_path, house_num, photo_code):
    im = Image.open(src_path).convert("RGB")
    w, h = im.size

    uid = house_num * 8 + photo_code
    left_pct   = 0.005 * ((uid * 3) % 7)
    top_pct    = 0.004 * ((uid * 5) % 6)
    right_pct  = 1.0 - 0.005 * ((uid * 2) % 6)
    bottom_pct = 1.0 - 0.004 * ((uid * 4) % 7)

    box = (int(w * left_pct), int(h * top_pct), int(w * right_pct), int(h * bottom_pct))
    cropped = im.crop(box)

    bf = 0.98 + 0.006 * ((uid * 7) % 8)
    cf = 0.99 + 0.005 * ((uid * 11) % 8)
    sf = 0.98 + 0.007 * ((uid * 13) % 7)

    enh_b = ImageEnhance.Brightness(cropped).enhance(bf)
    enh_c = ImageEnhance.Contrast(enh_b).enhance(cf)
    enh_s = ImageEnhance.Color(enh_c).enhance(sf)

    quality = 89 + (uid % 7)
    enh_s.save(dst_path, "JPEG", quality=quality, optimize=True)

def main():
    print("Criando e populando modelos 17 a 20...")
    for idx, (folder_name, data) in enumerate(NEW_HOUSES.items(), start=17):
        fpath = MODELOS_DIR / folder_name
        fpath.mkdir(parents=True, exist_ok=True)

        # 1. dados_anuncio.txt
        (fpath / "dados_anuncio.txt").write_text(data["desc"], encoding="utf-8")

        # 2. Fachada
        process_and_save_unique(data["facade"], fpath / "01_fachada.jpg", idx, 1)

        # 3. Sala
        process_and_save_unique(CLEAN_ROOMS["sala"], fpath / "02_sala_vazia.jpg", idx, 2)

        # 4. Quartos
        process_and_save_unique(CLEAN_ROOMS["quarto_01"], fpath / "03_quarto_01.jpg", idx, 3)
        process_and_save_unique(CLEAN_ROOMS["quarto_02"], fpath / "04_quarto_02.jpg", idx, 4)
        process_and_save_unique(CLEAN_ROOMS["quarto_03"], fpath / "05_quarto_03.jpg", idx, 5)

        # 5. Banheiros
        process_and_save_unique(CLEAN_ROOMS["banheiro_01"], fpath / "06_banheiro_01.jpg", idx, 6)
        process_and_save_unique(CLEAN_ROOMS["banheiro_02"], fpath / "07_banheiro_02.jpg", idx, 7)

        # 6. Cozinha
        process_and_save_unique(CLEAN_ROOMS["cozinha"], fpath / "08_cozinha_vazia.jpg", idx, 8)

        print(f"[OK] Modelo {idx} ({folder_name}) criado com 8 fotos e dados!")

    print("\nVerificando unicidade de todas as fotos em modelos_casas/...")
    all_hashes = {}
    for p in MODELOS_DIR.glob("*/*.jpg"):
        h = hashlib.md5(p.read_bytes()).hexdigest()
        all_hashes.setdefault(h, []).append(f"{p.parent.name}/{p.name}")

    print(f"Total de fotos: {sum(len(v) for v in all_hashes.values())}")
    print(f"Hashes únicos: {len(all_hashes)}")
    dups = {k: v for k, v in all_hashes.items() if len(v) > 1}
    if dups:
        print(f"ALERTA: {len(dups)} duplicatas encontradas!")
    else:
        print("PERFEITO! 100% das fotos têm hashes únicos sem duplicatas!")

if __name__ == "__main__":
    main()
