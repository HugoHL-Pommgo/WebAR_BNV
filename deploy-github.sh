#!/bin/bash

echo "🚀 Updating GitHub Pages WebAR"
echo "================================="

# Vérifier si on est dans un repo git
if [ ! -d ".git" ]; then
    echo "❌ Ce n'est pas un repository Git"
    echo "💡 Initialisez d'abord avec : git init"
    exit 1
fi

echo "📦 Adding modified files..."
git add .
echo "💾 Creating commit..."
git commit -m "🔧 Clean WebAR project - $(date '+%Y-%m-%d %H:%M:%S')"
echo "🚀 Pushing to GitHub..."
git push origin main
echo "✅ Update successful!"
echo ""
echo "🌐 Your site will be updated in 1-2 minutes:"
echo "   https://hugohl-pommgo.github.io/WebAR_BNV/" 