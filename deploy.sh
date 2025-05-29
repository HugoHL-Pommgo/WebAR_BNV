#!/bin/bash

# 🚀 Script de déploiement WebAR Plant Project
# Supporte GitHub Pages, Netlify, et Vercel

echo "🌱 Déploiement WebAR Plant Project"
echo "=================================="

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez installer Node.js d'abord."
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Construire le projet
echo "🔨 Construction du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction"
    exit 1
fi

echo "✅ Construction réussie!"
echo ""

# Menu de choix de plateforme
echo "Choisissez votre plateforme de déploiement :"
echo "1) GitHub Pages (automatique)"
echo "2) Netlify (manuel - ouvrir le dossier)"
echo "3) Vercel CLI"
echo "4) Firebase Hosting"
echo "5) Test local seulement"

read -p "Votre choix (1-5): " choice

case $choice in
    1)
        echo "🚀 Déploiement sur GitHub Pages..."
        npm run deploy
        if [ $? -eq 0 ]; then
            echo "✅ Déployé sur GitHub Pages!"
            echo "🔗 Votre site sera disponible à :"
            echo "https://$(git config user.name | tr '[:upper:]' '[:lower:]').github.io/$(basename $(pwd))"
        else
            echo "❌ Erreur lors du déploiement GitHub Pages"
        fi
        ;;
    2)
        echo "📁 Préparation pour Netlify..."
        echo "1. Allez sur https://netlify.com"
        echo "2. Connectez-vous et cliquez 'New site from Git'"
        echo "3. Ou glissez-déposez le dossier 'dist/' dans Netlify"
        if command -v open &> /dev/null; then
            open dist/
        elif command -v xdg-open &> /dev/null; then
            xdg-open dist/
        fi
        echo "📂 Dossier dist/ ouvert"
        ;;
    3)
        echo "🚀 Déploiement sur Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installation de Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    4)
        echo "🔥 Déploiement sur Firebase..."
        if ! command -v firebase &> /dev/null; then
            echo "📦 Installation de Firebase CLI..."
            npm install -g firebase-tools
        fi
        firebase login
        firebase init hosting
        firebase deploy
        ;;
    5)
        echo "🔧 Test local..."
        python3 server.py &
        SERVER_PID=$!
        echo "🌐 Serveur démarré sur https://localhost:8443"
        echo "📱 Mobile: https://$(hostname -I | awk '{print $1}'):8443"
        echo ""
        echo "Appuyez sur Entrée pour arrêter le serveur..."
        read
        kill $SERVER_PID
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "🎉 Déploiement terminé!"
echo ""
echo "📱 N'oubliez pas de :"
echo "1. Tester sur mobile avec HTTPS"
echo "2. Générer un QR code avec qr-generator.html"
echo "3. Vérifier la détection du marqueur Hiro"
echo ""
echo "🔗 URL du générateur QR : [votre-url]/qr-generator.html" 