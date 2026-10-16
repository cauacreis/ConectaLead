# -*- coding: utf-8 -*-
"""
Script para atualizar os 15 modelos de casas em presets.js e nos arquivos dados_anuncio.txt
- Titulos com 'Oportunidade Real'
- Quebras reduzidas (6 quebras de linha limpas antes de 'imagens ilustrativas')
- Precos mantidos entre 9, 10, 11 e 12 mil (preco de venda/entrada)
- Descricoes variadas com informacoes completas (3Q, 2B, quintal/pets, documentada, IPTU em dia, financiamento/boleto, entrada e visita)
"""

from pathlib import Path

BLANK_REDUCED = "\n" * 6

MODELS = [
    {
        "id": "01_Casa_Palhoca_Pagani_3Q_2B",
        "title": "Oportunidade Real: Casa 3 Quartos com Quintal no Pagani (Palhoça)",
        "price": "9000",
        "location": "Avenida Atílio Pedro Pagani, Pagani, Palhoça - SC, Brasil",
        "folderName": "01_Casa_Palhoca_Pagani_3Q_2B",
        "text": """Oportunidade real de morar bem em Palhoça no bairro Pagani.

Casa térrea com 3 quartos arejados e 2 banheiros completos. Imóvel totalmente solto no terreno (sem parede com vizinho), com quintal privativo excelente para quem tem pets ou filhos pequenos.

• Imóvel 100% documentado e regularizado
• IPTU ✅ em dia
• Financiamento facilitado e opção de parcelamento no boleto
• Entrada a partir de 9mil com parcelas negociáveis que cabem no seu bolso

Localização privilegiada no Pagani, perto de comércio e serviços.
Chega de pagar aluguel! Agende sua visita hoje mesmo."""
    },
    {
        "id": "02_Casa_Palhoca_Pedra_Branca_3Q_2B",
        "title": "Oportunidade Real: Casa Térrea Solta no Terreno no Pedra Branca",
        "price": "12000",
        "location": "Avenida Pedra Branca, Pedra Branca, Palhoça - SC, 88137-270, Brasil",
        "folderName": "02_Casa_Palhoca_Pedra_Branca_3Q_2B",
        "text": """OPORTUNIDADE REAL EM PALHOÇA — BAIRRO PEDRA BRANCA

Configuração do Imóvel:
- 3 dormitórios confortáveis
- 2 banheiros
- Terreno privativo com casa 100% solta (espaço livre e seguro para animais de estimação)

Situação Financeira e Documental:
- Documentação rigorosamente em ordem
- IPTU ✅ em dia
- Aprovada para financiamento bancário e condições no boleto
- Entrada a partir de 12mil com parcelas sob medida

More em uma das regiões mais valorizadas e planejadas de Palhoça.
Saia definitivamente do aluguel. Agende sua visita!"""
    },
    {
        "id": "03_Casa_Palhoca_Passa_Vinte_3Q_2B",
        "title": "Oportunidade Real: Casa 3 Dormitórios com Pátio no Passa Vinte",
        "price": "10000",
        "location": "Passa Vinte, Palhoça - SC, Brasil",
        "folderName": "03_Casa_Palhoca_Passa_Vinte_3Q_2B",
        "text": """Oportunidade real para quem procura casa com quintal amplo e privacidade em Palhoça!

Residência no Passa Vinte com 3 quartos espaçosos, 2 banheiros e completamente descolada no terreno. Não é geminada, garantindo total liberdade para pets e lazer com a família.

Dúvidas sobre documentação e pagamento:
- Imóvel todo documentado e pronto para transferência
- IPTU ✅ quitado
- Liberado para financiamento bancário ou parcelamento no boleto
- Entrada a partir de 10mil e saldo parcelado a combinar

Perto do shopping e com acesso rápido para a BR-101.
Pare de queimar dinheiro com aluguel. Agende sua visita agora!"""
    },
    {
        "id": "04_Casa_Palhoca_Ponte_Imaruim_3Q_2B",
        "title": "Oportunidade Real: Casa com Quintal Amplo na Ponte do Imaruim",
        "price": "9000",
        "location": "Avenida Aniceto Zacchi, Ponte do Imaruim, Palhoça - SC, Brasil",
        "folderName": "04_Casa_Palhoca_Ponte_Imaruim_3Q_2B",
        "text": """Oportunidade Real: Casa Térrea na Ponte do Imaruim (Palhoça)

🏠 ESTRUTURA:
• 3 dormitórios
• 2 banheiros
• Casa solta no lote: terreno individual com espaço de sobra para seus pets

📑 CONDIÇÕES:
• Documentação completa e regular
• IPTU ✅ em dia
• Aceita financiamento bancário e negociação no boleto
• Entrada a partir de 9mil com parcelas mensais facilitadas

Localização estratégica, a poucos minutos de São José e Florianópolis.
O seu novo lar está te esperando. Agende sua visita!"""
    },
    {
        "id": "05_Casa_Palhoca_Bela_Vista_3Q_2B",
        "title": "Oportunidade Real: Casa Familiar 3 Quartos no Bela Vista (Palhoça)",
        "price": "10000",
        "location": "Bela Vista, Palhoça - SC, Brasil",
        "folderName": "05_Casa_Palhoca_Bela_Vista_3Q_2B",
        "text": """Oportunidade real para sua família e seus animais de estimação em Palhoça (Bela Vista).

Aqui você tem liberdade de verdade: casa completamente solta no terreno, com pátio privativo fechado onde seus pets podem brincar soltos e com segurança.

Detalhes da residência:
- 3 quartos iluminados
- 2 banheiros
- Construção sólida e independente
- Imóvel documentado, com IPTU ✅ pago
- Facilidade de aprovação: financiamento bancário e saldo direto no boleto
- Entrada a partir de 10mil com parcelas que se ajustam ao seu orçamento

Rua calma e excelente vizinhança.
Sua chance real de conquistar a casa própria e sair do aluguel. Agende sua visita!"""
    },
    {
        "id": "06_Casa_Palhoca_Aririu_3Q_2B",
        "title": "Oportunidade Real: Casa Térrea Solta no Terreno no Aririú",
        "price": "9000",
        "location": "Aririú, Palhoça - SC, Brasil",
        "folderName": "06_Casa_Palhoca_Aririu_3Q_2B",
        "text": """Oportunidade real para você morar no que é seu em Palhoça!

No Aririú, excelente casa térrea individual:
- 3 quartos bem dimensionados
- 2 banheiros
- Terreno exclusivo com casa 100% solta (muito espaço ao ar livre para quem tem pets ou quer fazer horta/jardim)

Tudo certinho e sem burocracia:
- Documentação 100% regularizada
- IPTU ✅ em dia
- Disponível para financiamento habitacional e parcelamento no boleto
- Entrada a partir de 9mil e parcelas a combinar

Tranquilidade, sossego e contato com a natureza.
Não adie o sonho da casa própria. Agende sua visita!"""
    },
    {
        "id": "07_Casa_Palhoca_Nova_Palhoca_3Q_2B",
        "title": "Oportunidade Real: Casa 3 Quartos com Espaço pra Pets na Nova Palhoça",
        "price": "11000",
        "location": "Nova Palhoça, Palhoça - SC, Brasil",
        "folderName": "07_Casa_Palhoca_Nova_Palhoca_3Q_2B",
        "text": """OPORTUNIDADE REAL NA NOVA PALHOÇA — PALHOÇA/SC

Destaques principais:
▪️ 3 dormitórios
▪️ 2 banheiros
▪️ Terreno privativo: imóvel totalmente solto, sem paredes compartilhadas, com ótimo quintal para pets e área gourmet

Vantagens de compra:
▪️ Imóvel documentado e escriturado
▪️ IPTU ✅
▪️ Financiamento bancário acessível + opção flexível no boleto
▪️ Entrada a partir de 11mil e parcelamento sob medida

Loteamento moderno em constante valorização.
Conquiste a chave do seu imóvel próprio e saia do aluguel. Agende sua visita!"""
    },
    {
        "id": "08_Casa_Palhoca_Madri_3Q_2B",
        "title": "Oportunidade Real: Casa Aconchegante 3 Dormitórios no Madri (Palhoça)",
        "price": "10000",
        "location": "Madri, Palhoça - SC, Brasil",
        "folderName": "08_Casa_Palhoca_Madri_3Q_2B",
        "text": """Oportunidade real de vida nova: Casa aconchegante em Palhoça no bairro Madri.

Espaço interno bem distribuído com 3 quartos e 2 banheiros, além de um quintal espaçoso com a casa totalmente solta no terreno. Perfeito para quem não abre mão de privacidade e quer conforto para seus bichinhos de estimação.

Condições comerciais imperdíveis:
• Documentação em dia e regular
• IPTU ✅ quitado
• Aceita financiamento bancário e plano facilitado no boleto
• Entrada inicial a partir de 10mil e saldo em parcelas a negociar

Bairro com comércio completo, escolas e transporte fácil.
Dê o primeiro passo para sair do aluguel. Agende já sua visita!"""
    },
    {
        "id": "09_Casa_Palhoca_Sao_Sebastiao_3Q_2B",
        "title": "Oportunidade Real: Casa Individual com Quintal no São Sebastião",
        "price": "9000",
        "location": "São Sebastião, Palhoça - SC, Brasil",
        "folderName": "09_Casa_Palhoca_Sao_Sebastiao_3Q_2B",
        "text": """Oportunidade real de moradia em Palhoça (São Sebastião)

Resumo do imóvel:
- 3 quartos
- 2 banheiros
- Casa solta no lote (terreno privativo amplo, ideal para pets)
- Toda documentada
- IPTU ✅ em dia
- Entrada a partir de 9mil
- Parcelas flexíveis a negociar
- Aceita financiamento e boleto bancário

Excelente custo-benefício e fácil acesso aos bairros vizinhos.
Pare de pagar aluguel para terceiros. Agende sua visita!"""
    },
    {
        "id": "10_Casa_Palhoca_Jardim_Eldorado_3Q_2B",
        "title": "Oportunidade Real: Casa Térrea 3 Quartos no Jardim Eldorado",
        "price": "11000",
        "location": "Jardim Eldorado, Palhoça - SC, Brasil",
        "folderName": "10_Casa_Palhoca_Jardim_Eldorado_3Q_2B",
        "text": """Oportunidade real de moradia no Jardim Eldorado em Palhoça!

Se você procura uma casa independente, essa é a escolha certa:
Imóvel totalmente solto no terreno, garantindo privacidade completa para sua família e um pátio generoso para seus pets.
São 3 quartos confortáveis e 2 banheiros completos.

Facilidades para fechar negócio:
1. Imóvel 100% documentado
2. IPTU ✅ em dia
3. Financiamento liberado e opções no boleto bancário
4. Entrada a partir de 11mil com parcelas negociáveis

Próximo ao centro, faculdades e comércios da região.
Sua família merece morar no que é próprio. Agende sua visita hoje mesmo!"""
    },
    {
        "id": "11_Casa_Palhoca_Barra_Aririu_3Q_2B",
        "title": "Oportunidade Real: Casa com Amplo Pátio na Barra do Aririú",
        "price": "10000",
        "location": "Barra do Aririú, Palhoça - SC, Brasil",
        "folderName": "11_Casa_Palhoca_Barra_Aririu_3Q_2B",
        "text": """Oportunidade Real: Casa espaçosa e arejada na Barra do Aririú (Palhoça).

Para quem busca paz e espaço de verdade:
• 3 dormitórios
• 2 banheiros
• Terreno individual com casa 100% solta (muita área verde e quintal livre para pets)
• Documentação regular e pronta para transferência
• IPTU ✅ em dia
• Entrada a partir de 10mil com parcelamento flexível no boleto
• Financiamento bancário disponível

Aproveite o clima tranquilo da região da Barra para viver com mais qualidade.
Livre-se do aluguel de uma vez por todas. Agende sua visita!"""
    },
    {
        "id": "12_Casa_Palhoca_Praia_de_Fora_3Q_2B",
        "title": "Oportunidade Real: Casa Próxima ao Mar com Quintal na Praia de Fora",
        "price": "12000",
        "location": "Praia de Fora, Palhoça - SC, Brasil",
        "folderName": "12_Casa_Palhoca_Praia_de_Fora_3Q_2B",
        "text": """Oportunidade real de morar perto da praia com espaço e conforto em Palhoça (Praia de Fora).

Casa térrea independente, completamente solta no terreno:
Conta com quintal privativo excelente para quem tem animais domésticos, quer montar churrasqueira ou ter espaço para as crianças.

Composição:
- 3 quartos amplos
- 2 banheiros
- Imóvel com documentação regular
- IPTU ✅
- Financiamento bancário facilitado e negociação no boleto
- Entrada a partir de 12mil com parcelas sob consulta

Viva a tranquilidade do litoral catarinense com economia.
Chega de pagar aluguel caro. Agende sua visita!"""
    },
    {
        "id": "13_Casa_Palhoca_Pagani_2_3Q_2B",
        "title": "Oportunidade Real: Casa Solta no Lote 3 Quartos no Pagani",
        "price": "11000",
        "location": "Avenida Atílio Pedro Pagani, Pagani, Palhoça - SC, Brasil",
        "folderName": "13_Casa_Palhoca_Pagani_2_3Q_2B",
        "text": """Oportunidade Real em Palhoça: Casa no Pagani com terreno individual.

Diferenciais da residência:
▪ 3 quartos grandes e iluminados
▪ 2 banheiros modernos
▪ Casa totalmente solta no terreno, com recuo em todas as laterais e quintal seguro para quem tem pets

Facilidades de aquisição:
▪ Imóvel documentado e regularizado
▪ IPTU ✅ em dia
▪ Liberada para financiamento habitacional e boleto parcelado
▪ Entrada a partir de 11mil e parcelas personalizadas de acordo com a sua renda

Bairro com infraestrutura completa: shopping, prefeitura e serviços essenciais a minutos de distância.
Sua oportunidade para sair do aluguel em alto estilo. Agende sua visita!"""
    },
    {
        "id": "14_Casa_Sao_Jose_Barreiros_3Q_2B",
        "title": "Oportunidade Real: Casa Térrea 3 Dormitórios em Barreiros (São José)",
        "price": "10000",
        "location": "Avenida Leoberto Leal, Barreiros, São José - SC, Brasil",
        "folderName": "14_Casa_Sao_Jose_Barreiros_3Q_2B",
        "text": """Oportunidade Real: Casa térrea individual em São José no bairro Barreiros.

Localização excelente, pertinho de tudo e com o espaço que um apartamento não oferece:
Casa totalmente solta no terreno, sem divisão de paredes, com pátio privativo para quem tem pets e quer liberdade.

Informações gerais:
• 3 dormitórios
• 2 banheiros
• Documentação 100% aprovada
• IPTU ✅ em dia
• Condições facilitadas no boleto e financiamento bancário
• Entrada a partir de 10mil com saldo parcelado direto

A poucos minutos da divisa com Florianópolis.
Não jogue mais dinheiro fora com aluguel. Agende sua visita com a gente!"""
    },
    {
        "id": "15_Casa_Sao_Jose_Forquilhinhas_3Q_2B",
        "title": "Oportunidade Real: Casa Individual com Pátio em Forquilhinhas (São José)",
        "price": "12000",
        "location": "Forquilhinhas, São José - SC, Brasil",
        "folderName": "15_Casa_Sao_Jose_Forquilhinhas_3Q_2B",
        "text": """Oportunidade Real: Casa própria em São José no bairro Forquilhinhas.

Tudo o que sua família precisa em uma casa térrea:
- 3 quartos espaçosos
- 2 banheiros
- Construção totalmente descolada no terreno (quintal privativo e livre para pets)
- Documentação impecável
- IPTU ✅ em dia
- Entrada a partir de 12mil e parcelas a negociar
- Aceita financiamento bancário e saldo no boleto

Bairro tradicional com comércio forte, escolas e fácil mobilidade.
Conquiste a sua independência e saia do aluguel hoje mesmo. Agende sua visita!"""
    }
]

def main():
    root = Path(__file__).resolve().parent.parent

    # 1. Atualizar dados_anuncio.txt em cada pasta de modelo (6 quebras de linha limpas)
    for m in MODELS:
        folder = root / "modelos_casas" / m["folderName"]
        if folder.exists():
            txt_path = folder / "dados_anuncio.txt"
            full_content = m["text"] + BLANK_REDUCED + '\n"imagens ilustrativas"\n'
            txt_path.write_text(full_content, encoding="utf-8")
            print(f"Atualizado: {txt_path}")

    # 2. Gerar presets.js com quebras reduzidas
    presets_lines = []
    presets_lines.append("// ConectaLead - Presets dos 15 Modelos de Casas (Palhoça, Pagani e Região - SC)")
    presets_lines.append("// 3 Quartos, 2 Banheiros, Casas soltas no terreno, Oportunidade Real nos Titulos")
    presets_lines.append("")
    presets_lines.append("var BLANK_LINES = '\\n'.repeat(6);")
    presets_lines.append("")
    presets_lines.append("var SP_HOUSES_PRESETS = typeof SP_HOUSES_PRESETS !== 'undefined' ? SP_HOUSES_PRESETS : [")

    for i, m in enumerate(MODELS):
        escaped_desc = m["text"]
        entry = f"""  {{
    id: '{m["id"]}',
    title: '{m["title"]}',
    price: '{m["price"]}',
    location: '{m["location"]}',
    folderName: '{m["folderName"]}',
    description: `{escaped_desc}${{BLANK_LINES}}\\n"imagens ilustrativas"`
  }}"""
        if i < len(MODELS) - 1:
            entry += ","
        presets_lines.append(entry)

    presets_lines.append("];")
    presets_lines.append("")

    presets_path = root / "presets.js"
    presets_path.write_text("\n".join(presets_lines), encoding="utf-8")
    print(f"Atualizado presets.js com {len(MODELS)} modelos com 'Oportunidade Real' e quebras reduzidas.")

if __name__ == "__main__":
    main()
