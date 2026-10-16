# -*- coding: utf-8 -*-
"""
Distribui fotos de comodos e banheiros simples e diferentes para cada um dos 15 modelos de casas.
Utiliza as novas fotos hiper-realistas geradas estilo celular de casa popular brasileira.
"""

import os
import shutil
from pathlib import Path
from PIL import Image, ImageEnhance

BASE_DIR = Path(r"c:\Users\Cauã Felype\Documents\ConectaLead")
MODELOS_DIR = BASE_DIR / "modelos_casas"
BRAIN_DIR = Path(r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57")

# Pool de Banheiros Simples e Distintos
BATHROOMS_POOL = [
    BRAIN_DIR / "banheiro_simples_palhoca_1792179483157.jpg",
    BRAIN_DIR / "banheiro_popular_brasileiro_1792179589289.jpg",
    BRAIN_DIR / "banheiro_simples_residencial_1792179586223.jpg",
    BRAIN_DIR / "banheiro_simples_1791472448513.jpg",
    BRAIN_DIR / "banheiro_simples_02_1791472657166.jpg"
]

# Pool de Cozinhas Simples e Distintas
KITCHENS_POOL = [
    BRAIN_DIR / "cozinha_casa_popular_1792179590175.jpg",
    BRAIN_DIR / "cozinha_casa_brasileira_simples_1792179672813.jpg",
    BRAIN_DIR / "cozinha_vazia_simples_1791472604621.jpg"
]

# Pool de Salas Simples e Distintas
LIVING_ROOMS_POOL = [
    BRAIN_DIR / "sala_simples_palhoca_1792179584505.jpg",
    BRAIN_DIR / "sala_estar_casa_popular_1792179673492.jpg",
    BRAIN_DIR / "sala_vazia_palhoca_01_1791768434030.jpg",
    BRAIN_DIR / "sala_vazia_simples_1791472415843.jpg"
]

# Pool de Quartos Simples e Distintos
BEDROOMS_POOL = [
    BRAIN_DIR / "quarto_vazio_popular_1792179601012.jpg",
    BRAIN_DIR / "quarto_casal_vazio_popular_1792179672881.jpg",
    BRAIN_DIR / "quarto_vazio_simples_1791472165312.jpg",
    BRAIN_DIR / "quarto_vazio_02_1791472489604.jpg",
    BRAIN_DIR / "quarto_vazio_03_1791472534273.jpg"
]

# Fachadas adicionais autenticas de Palhoca
NEW_FACADES = [
    BRAIN_DIR / "casa_fachada_palhoca_1792179586091.jpg",
    BRAIN_DIR / "casa_terrea_palhoca_1792179673884.jpg"
]

HOUSE_FOLDERS = [
    "01_Casa_Palhoca_Pagani_3Q_2B",
    "02_Casa_Palhoca_Pedra_Branca_3Q_2B",
    "03_Casa_Palhoca_Passa_Vinte_3Q_2B",
    "04_Casa_Palhoca_Ponte_Imaruim_3Q_2B",
    "05_Casa_Palhoca_Bela_Vista_3Q_2B",
    "06_Casa_Palhoca_Aririu_3Q_2B",
    "07_Casa_Palhoca_Nova_Palhoca_3Q_2B",
    "08_Casa_Palhoca_Madri_3Q_2B",
    "09_Casa_Palhoca_Sao_Sebastiao_3Q_2B",
    "10_Casa_Palhoca_Jardim_Eldorado_3Q_2B",
    "11_Casa_Palhoca_Barra_Aririu_3Q_2B",
    "12_Casa_Palhoca_Praia_de_Fora_3Q_2B",
    "13_Casa_Palhoca_Pagani_2_3Q_2B",
    "14_Casa_Sao_Jose_Barreiros_3Q_2B",
    "15_Casa_Sao_Jose_Forquilhinhas_3Q_2B"
]

def apply_slight_mobile_grade(src_path, dst_path, variation_seed=0):
    """Garante que cada foto tenha uma variacao fotografica natural de iluminacao/enquadramento."""
    try:
        im = Image.open(src_path).convert("RGB")
        w, h = im.size
        # Variacoes sutis de enquadramento de camera de celular (1 a 4%)
        step = variation_seed % 4
        if step == 0:
            box = (int(w * 0.01), int(h * 0.01), int(w * 0.99), int(h * 0.99))
            b, c, s = 1.01, 1.02, 1.02
        elif step == 1:
            box = (int(w * 0.03), int(h * 0.02), w, int(h * 0.98))
            b, c, s = 1.02, 1.01, 1.03
        elif step == 2:
            box = (0, int(h * 0.02), int(w * 0.97), int(h * 0.98))
            b, c, s = 0.99, 1.03, 1.01
        else:
            box = (int(w * 0.02), 0, int(w * 0.98), int(h * 0.97))
            b, c, s = 1.02, 1.02, 1.04
        
        cropped = im.crop(box)
        enh_b = ImageEnhance.Brightness(cropped).enhance(b)
        enh_c = ImageEnhance.Contrast(enh_b).enhance(c)
        enh_s = ImageEnhance.Color(enh_c).enhance(s)
        enh_s.save(dst_path, "JPEG", quality=92, optimize=True)
    except Exception as e:
        print(f"Fallback copy for {src_path}: {e}")
        shutil.copy2(src_path, dst_path)

def main():
    print("Iniciando distribuicao de fotos de comodos e banheiros simples e distintos...")

    # Se a nova fachada existir, aplicamos nas pastas 07 e 11 para renovar
    if NEW_FACADES[0].exists():
        f07 = MODELOS_DIR / "07_Casa_Palhoca_Nova_Palhoca_3Q_2B" / "01_fachada.jpg"
        apply_slight_mobile_grade(NEW_FACADES[0], f07, 7)
        print("Nova fachada aplicada ao modelo 07 (Nova Palhoca)")
    
    if NEW_FACADES[1].exists():
        f11 = MODELOS_DIR / "11_Casa_Palhoca_Barra_Aririu_3Q_2B" / "01_fachada.jpg"
        apply_slight_mobile_grade(NEW_FACADES[1], f11, 11)
        print("Nova fachada aplicada ao modelo 11 (Barra do Aririu)")

    for idx, folder_name in enumerate(HOUSE_FOLDERS):
        folder_path = MODELOS_DIR / folder_name
        if not folder_path.exists():
            continue

        # 1. Sala (rotacionando entre as 4 salas simples)
        sala_src = LIVING_ROOMS_POOL[idx % len(LIVING_ROOMS_POOL)]
        apply_slight_mobile_grade(sala_src, folder_path / "02_sala_vazia.jpg", idx + 1)

        # 2. Quarto 01 (rotacionando)
        q1_src = BEDROOMS_POOL[idx % len(BEDROOMS_POOL)]
        apply_slight_mobile_grade(q1_src, folder_path / "03_quarto_01.jpg", idx + 2)

        # 3. Quarto 02 (quarto diferente do q1)
        q2_src = BEDROOMS_POOL[(idx + 1) % len(BEDROOMS_POOL)]
        apply_slight_mobile_grade(q2_src, folder_path / "04_quarto_02.jpg", idx + 3)

        # 4. Quarto 03 (quarto diferente de q1 e q2)
        q3_src = BEDROOMS_POOL[(idx + 2) % len(BEDROOMS_POOL)]
        apply_slight_mobile_grade(q3_src, folder_path / "05_quarto_03.jpg", idx + 4)

        # 5. Banheiro 01 (rotacionando entre os banheiros reais distintos)
        b1_src = BATHROOMS_POOL[idx % len(BATHROOMS_POOL)]
        apply_slight_mobile_grade(b1_src, folder_path / "06_banheiro_01.jpg", idx + 5)

        # 6. Banheiro 02 (segundo banheiro DIFERENTE do primeiro banheiro!)
        b2_src = BATHROOMS_POOL[(idx + 2) % len(BATHROOMS_POOL)]
        apply_slight_mobile_grade(b2_src, folder_path / "07_banheiro_02.jpg", idx + 6)

        # 7. Cozinha (rotacionando entre as 3 cozinhas simples)
        cozinha_src = KITCHENS_POOL[idx % len(KITCHENS_POOL)]
        apply_slight_mobile_grade(cozinha_src, folder_path / "08_cozinha_vazia.jpg", idx + 7)

        print(f"[OK] {folder_name}: Comodos, banheiros e cozinha unicos distribuidos.")

    print("Todas as 15 pastas de modelos de casas estao com comodos e banheiros simples e diferentes!")

if __name__ == "__main__":
    main()
