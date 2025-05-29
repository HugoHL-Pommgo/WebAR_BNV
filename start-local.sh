#!/bin/bash

# 🚀 Script de lancement local WebAR
# Lance le serveur HTTPS et ouvre toutes les URLs importantes

echo "🌟 Démarrage du serveur WebAR local..."

# Vérifier si Python3 est disponible
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 n'est pas installé"
    exit 1
fi

# Obtenir l'IP locale
LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)
if [ -z "$LOCAL_IP" ]; then
    LOCAL_IP="127.0.0.1"
fi

# Tuer les processus existants sur le port 8443
echo "🔄 Nettoyage des processus existants..."
lsof -ti:8443 | xargs kill -9 2>/dev/null || true

# Démarrer le serveur en arrière-plan
echo "🔧 Lancement du serveur HTTPS sur port 8443..."
python3 server.py &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 3

# URLs avec IP locale
BASE_URL="https://$LOCAL_IP:8443"
WEBVR_URL="$BASE_URL/"
EDITOR_URL="$BASE_URL/editor.html"
QR_EDITOR_URL="$BASE_URL/qr-editor.html"
TARGET_URL="$BASE_URL/flower-target.html"

echo ""
echo "✅ Serveur démarré ! PID: $SERVER_PID"
echo "🌐 Adresse IP: $LOCAL_IP"
echo ""
echo "📱 URLs disponibles :"
echo "   🌿 WebAR App:     $WEBVR_URL"
echo "   🎨 Éditeur AR:    $EDITOR_URL"
echo "   📱 Éditeur QR:    $QR_EDITOR_URL"
echo "   🎯 Image Cible:   $TARGET_URL"
echo ""

# Ouvrir automatiquement dans le navigateur
echo "🌐 Ouverture automatique dans le navigateur..."
sleep 1

# Ouvrir les URLs principales
open "$WEBVR_URL"
sleep 1
open "$EDITOR_URL"
sleep 1
open "$QR_EDITOR_URL"

echo ""
echo "🎉 Tout est prêt ! Serveur en cours d'exécution..."
echo ""
echo "💡 Commandes utiles :"
echo "   • Pour arrêter : Ctrl+C ou kill $SERVER_PID"
echo "   • URLs localhost: https://localhost:8443/"
echo ""

# Fonction pour arrêter proprement
cleanup() {
    echo ""
    echo "🛑 Arrêt du serveur..."
    kill $SERVER_PID 2>/dev/null
    echo "✅ Serveur arrêté"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

echo "📱 Pour partage mobile :"
echo "   🌿 WebAR:  $WEBVR_URL"
echo "   🎨 Éditeur: $EDITOR_URL"
echo ""

# Garder le script en vie
echo "⏳ Serveur en cours... (Ctrl+C pour arrêter)"
wait $SERVER_PID 