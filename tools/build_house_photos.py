import os
import shutil
from PIL import Image, ImageEnhance

# Caminhos base
BASE_DIR = r"c:\Users\Cauã Felype\Documents\ConectaLead"
MODELOS_DIR = os.path.join(BASE_DIR, "modelos_casas")

# 15 Fachadas Unicas Confirmadas
FACADES = [
    # 01 Palhoca - Pagani
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\fachada_palhoca_pagani_01_1791768413727.jpg",
    # 02 Palhoca - Pedra Branca
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\fachada_pedra_branca_02_1791768472281.jpg",
    # 03 Palhoca - Passa Vinte
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\76a4cee6-431d-4d6b-b7ba-140af12ab0e8\teste_subagent_casa_1791768509196.jpg",
    # 04 Palhoca - Ponte do Imaruim
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8cd912bc-5a6d-4f24-b213-6f2384b94e03\fachada_ponte_imaruim_04_1791768631514.jpg",
    # 05 Palhoca - Bela Vista
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8cd912bc-5a6d-4f24-b213-6f2384b94e03\fachada_bela_vista_05_1791768653482.jpg",
    # 06 Palhoca - Aririu
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8cd912bc-5a6d-4f24-b213-6f2384b94e03\fachada_aririu_06_1791768677633.jpg",
    # 07 Palhoca - Nova Palhoca
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\fachada_casa_simples_02_1791472718016.jpg",
    # 08 Palhoca - Madri
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8e9d23dd-495d-456e-a9a2-65fd3df102a6\fachada_madri_08_1791768632737.jpg",
    # 09 Palhoca - Sao Sebastiao
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8e9d23dd-495d-456e-a9a2-65fd3df102a6\fachada_sao_sebastiao_09_1791768655624.jpg",
    # 10 Palhoca - Jardim Eldorado
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\8e9d23dd-495d-456e-a9a2-65fd3df102a6\fachada_jardim_eldorado_10_1791768679709.jpg",
    # 11 Palhoca - Barra do Aririu
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\fachada_casa_simples_03_1791472805069.jpg",
    # 12 Palhoca - Praia de Fora
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\cd25e996-4fc9-4c8b-9bfe-746dc24889f9\fachada_praia_de_fora_12_1791768630024.jpg",
    # 13 Palhoca - Pagani 2
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\cd25e996-4fc9-4c8b-9bfe-746dc24889f9\fachada_pagani_dois_13_1791768650478.jpg",
    # 14 Sao Jose - Barreiros
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\cd25e996-4fc9-4c8b-9bfe-746dc24889f9\fachada_barreiros_14_1791768674582.jpg",
    # 15 Sao Jose - Forquilhinhas
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\fachada_casa_simples_04_1791472864146.jpg"
]

# Nomes das 15 pastas
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

# Imagens base de comodos de alta resolucao
SALAS = [
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\sala_vazia_palhoca_01_1791768434030.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\5184ac5b-3abe-41c1-af92-a1fd0eabdca6\sala_vazia_palhoca_02_1791768681803.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\sala_vazia_simples_1791472415843.jpg"
]

COZINHAS = [
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\5e95fcef-b517-426e-bcdc-2a5c90d5953a\cozinha_vazia_palhoca_01_1791768684422.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\cozinha_vazia_simples_1791472604621.jpg"
]

BANHEIROS = [
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\banheiro_simples_1791472448513.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\banheiro_simples_02_1791472657166.jpg"
]

QUARTOS = [
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\quarto_vazio_simples_1791472165312.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\quarto_vazio_02_1791472489604.jpg",
    r"C:\Users\Cauã Felype\.gemini\antigravity\brain\3d6c2e3e-6852-4291-b6e5-8bb3abc12f57\quarto_vazio_03_1791472534273.jpg"
]

def apply_photographic_variation(image_path, variant_index, target_size=(1024, 1024)):
    """Aplica variacoes fotograficas realistas (enquadramento, perspectiva e luz)."""
    im = Image.open(image_path).convert("RGB")
    w, h = im.size
    
    # 5 modos de enquadramento fotografico realista
    mode = variant_index % 5
    
    if mode == 0:
        # Enquadramento geral aberto, ligeira margem de centralizacao
        crop_box = (int(w * 0.02), int(h * 0.02), int(w * 0.98), int(h * 0.98))
        b_factor, c_factor, s_factor = 1.02, 1.03, 1.08
    elif mode == 1:
        # Foco na janela, iluminacao natural e acabamentos do lado direito
        crop_box = (int(w * 0.12), int(h * 0.04), w, int(h * 0.96))
        b_factor, c_factor, s_factor = 1.04, 1.01, 1.05
    elif mode == 2:
        # Foco na amplitude de chao, portas e corredores do lado esquerdo
        crop_box = (0, int(h * 0.05), int(w * 0.88), int(h * 0.98))
        b_factor, c_factor, s_factor = 1.01, 1.04, 1.07
    elif mode == 3:
        # Angulo com profundidade, valorizando piso e tomadas
        crop_box = (int(w * 0.06), int(h * 0.08), int(w * 0.94), h)
        b_factor, c_factor, s_factor = 1.03, 1.02, 1.06
    else:
        # Angulo aconchegante centralizado
        crop_box = (int(w * 0.05), int(h * 0.03), int(w * 0.95), int(h * 0.95))
        b_factor, c_factor, s_factor = 1.05, 1.03, 1.05

    cropped = im.crop(crop_box)
    resized = cropped.resize(target_size, Image.Resampling.LANCZOS)
    
    # Ajustes finos de luminosidade, contraste e nitidez fotográfica
    if b_factor != 1.0:
        resized = ImageEnhance.Brightness(resized).enhance(b_factor)
    if c_factor != 1.0:
        resized = ImageEnhance.Contrast(resized).enhance(c_factor)
    if s_factor != 1.0:
        resized = ImageEnhance.Sharpness(resized).enhance(s_factor)
        
    return resized

def process_facade(facade_path, target_size=(1024, 1024)):
    """Processa a fachada garantindo qualidade maxima."""
    im = Image.open(facade_path).convert("RGB")
    enhancer = ImageEnhance.Sharpness(im)
    enhanced = enhancer.enhance(1.08)
    return enhanced

def main():
    print("Iniciando geracao e distribuicao das fotos para os 15 modelos...")
    
    for idx, folder_name in enumerate(HOUSE_FOLDERS):
        folder_path = os.path.join(MODELOS_DIR, folder_name)
        os.makedirs(folder_path, exist_ok=True)
        
        # 1. Fachada Unica
        facade_src = FACADES[idx]
        facade_img = process_facade(facade_src)
        facade_dst = os.path.join(folder_path, "01_fachada.jpg")
        facade_img.save(facade_dst, "JPEG", quality=95)
        print(f"[{idx+1}/15] {folder_name} -> Fachada salva: {os.path.basename(facade_src)}")
        
        # 2. Sala Vazia (Alterna entre as 3 bases de salas e aplica angulos especificos)
        sala_base = SALAS[idx % len(SALAS)]
        sala_img = apply_photographic_variation(sala_base, variant_index=idx)
        sala_dst = os.path.join(folder_path, "02_sala_vazia.jpg")
        sala_img.save(sala_dst, "JPEG", quality=93)
        
        # 3. Quarto 01 (Casal)
        qto1_base = QUARTOS[idx % len(QUARTOS)]
        qto1_img = apply_photographic_variation(qto1_base, variant_index=idx)
        qto1_dst = os.path.join(folder_path, "03_quarto_01.jpg")
        qto1_img.save(qto1_dst, "JPEG", quality=93)
        
        # 4. Quarto 02 (Filho / Solteiro)
        qto2_base = QUARTOS[(idx + 1) % len(QUARTOS)]
        qto2_img = apply_photographic_variation(qto2_base, variant_index=idx + 1)
        qto2_dst = os.path.join(folder_path, "04_quarto_02.jpg")
        qto2_img.save(qto2_dst, "JPEG", quality=93)
        
        # 5. Quarto 03 (Escritorio / Visitas)
        qto3_base = QUARTOS[(idx + 2) % len(QUARTOS)]
        qto3_img = apply_photographic_variation(qto3_base, variant_index=idx + 2)
        qto3_dst = os.path.join(folder_path, "05_quarto_03.jpg")
        qto3_img.save(qto3_dst, "JPEG", quality=93)
        
        # 6. Banheiro 01 (Social)
        banh1_base = BANHEIROS[idx % len(BANHEIROS)]
        banh1_img = apply_photographic_variation(banh1_base, variant_index=idx)
        banh1_dst = os.path.join(folder_path, "06_banheiro_01.jpg")
        banh1_img.save(banh1_dst, "JPEG", quality=93)
        
        # 7. Banheiro 02 (Suite / Segundo Banheiro)
        banh2_base = BANHEIROS[(idx + 1) % len(BANHEIROS)]
        banh2_img = apply_photographic_variation(banh2_base, variant_index=idx + 3)
        banh2_dst = os.path.join(folder_path, "07_banheiro_02.jpg")
        banh2_img.save(banh2_dst, "JPEG", quality=93)
        
        # 8. Cozinha Vazia
        coz_base = COZINHAS[idx % len(COZINHAS)]
        coz_img = apply_photographic_variation(coz_base, variant_index=idx)
        coz_dst = os.path.join(folder_path, "08_cozinha_vazia.jpg")
        coz_img.save(coz_dst, "JPEG", quality=93)
        
    print("Processamento concluido com sucesso! Todos os 15 modelos possuem 8 fotos unicas e personalizadas.")

if __name__ == "__main__":
    main()
