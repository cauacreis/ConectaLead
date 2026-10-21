# -*- coding: utf-8 -*-
with open("content/content.js", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("🏡 16 Modelos de Casas Prontos", "🏡 20 Modelos de Casas Prontos")
text = text.replace("todos os 16 modelos com fotos reais", "todos os 20 modelos com fotos reais")
text = text.replace("Carregar os 16 Modelos na Fila", "Carregar os 20 Modelos na Fila")

with open("content/content.js", "w", encoding="utf-8") as f:
    f.write(text)

print("content.js atualizado para 20 modelos!")
