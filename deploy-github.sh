#!/bin/bash

echo "🚀 Mise à jour GitHub Pages WebAR"
echo "================================="

# Vérifier si on est dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Ce n'est pas un repository Git"
    echo "💡 Initialisez d'abord avec : git init"
    exit 1
fi

# Ajouter tous les fichiers modifiés
echo "📦 Ajout des fichiers modifiés..."
git add .

# Créer un commit avec timestamp
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
echo "💾 Création du commit..."
git commit -m "🔧 Fix caméra WebAR - $timestamp

- Correction accès caméra pour GitHub Pages
- Vérification permissions avant démarrage AR
- Amélioration gestion d'erreurs
- Logs de debug ajoutés"

# Pousser vers GitHub
echo "🚀 Push vers GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Mise à jour réussie!"
    echo ""
    echo "🌐 Votre site sera mis à jour dans 1-2 minutes sur :"
    echo "   https://hugohl-pommgo.github.io/WebAR_BNV/"
    echo ""
    echo "📱 Ensuite, testez :"
    echo "1. Ouvrez le site sur mobile"
    echo "2. Cliquez 'Démarrer AR'"
    echo "3. Autorisez la caméra quand demandé"
    echo "4. Pointez vers le marqueur Hiro"
else
    echo "❌ Erreur lors du push"
    echo "💡 Vérifiez vos credentials Git"
fi 