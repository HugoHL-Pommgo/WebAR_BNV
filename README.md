# 🌱 WebAR Plant Project

Application de réalité augmentée web permettant de visualiser un modèle 3D de plante via un marqueur Hiro.

## ✅ Fonctionnalités actuelles

- **Détection de marqueur Hiro** avec zone plein écran
- **Modèle 3D statique** orienté de côté (topfpflanze_final.glb)
- **Interface responsive** avec guides visuels
- **Serveur HTTPS local** pour tests mobiles
- **Feedback multi-sensoriel** (vibration, son, animations)

## 🚀 Guide de déploiement

### Étapes pour mettre en ligne GRATUITEMENT :

1. **GitHub Pages (Recommandé)**
   ```bash
   # Installer les dépendances
   npm install
   
   # Construire le projet
   npm run build
   
   # Déployer sur GitHub Pages
   npm run deploy
   ```

2. **Solutions alternatives gratuites :**
   - **Netlify** : Drag & drop du dossier `dist/`
   - **Vercel** : Connexion GitHub automatique
   - **Firebase Hosting** : `firebase deploy`

### Configuration requise :

1. **Créer un repo GitHub** et pousser le code
2. **Modifier package.json** : Remplacer `"homepage": "https://votre-username.github.io/votre-repo-name"`
3. **Activer GitHub Pages** dans Settings > Pages

## 📱 Générateur de QR Code

Accédez à `qr-generator.html` pour créer des QR codes personnalisés :
- **Couleurs personnalisables**
- **Tailles multiples** (128px, 256px, 512px)
- **Export PNG/SVG**
- **Copie de lien** automatique

## 🔧 Développement local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur HTTPS
npm run serve
# ou directement :
python3 server.py
```

Accès : https://192.168.1.38:8443

## 📊 Prochaines étapes

### 1. Analytics et suivi
- Intégration Google Analytics 4
- Suivi des détections de marqueur
- Métriques de performance mobile

### 2. Améliorations UX
- Mode debug avancé
- Instructions interactives
- Tests A/B pour différents marqueurs

### 3. Fonctionnalités avancées
- **Interactions** : Clic pour changer de modèle
- **Sons** : Audio spatial 3D
- **Animations** : Séquences personnalisées

## 🌐 Tests multiplateformes

### Mobile :
- ✅ **Android Chrome 136+**
- ✅ **iOS Safari 14+**
- ⚠️ **Samsung Internet** (en cours)

### Desktop :
- ✅ **Chrome/Edge** (développement)
- ✅ **Firefox** (tests)

## 📂 Structure du projet

```
project/
├── index.html          # Application WebAR principale
├── marker.html         # Page d'affichage du marqueur Hiro
├── qr-generator.html   # Générateur de QR codes
├── viewer.html         # Visualiseur 3D (optionnel)
├── server.py          # Serveur HTTPS local
├── assets/            # Modèles 3D et images
│   ├── topfpflanze_final.glb
│   └── hiro-marker.png
└── dist/              # Build de production (généré)
```

## 🎯 Objectifs atteints

- ✅ **Chargement modèles 3D** : GLB supporté
- ✅ **Tracker image** : Marqueur Hiro fonctionnel  
- ✅ **Configuration caméra** : AR.js + A-Frame
- ✅ **Page web** : HTML/CSS/JS pur
- ✅ **Serveur local** : HTTPS fonctionnel
- 🔄 **Mise en ligne** : Configuration prête
- 🔄 **QR Code** : Générateur créé
- ⏳ **Analytics** : À implémenter
- ⏳ **Tests mobile** : En cours

## 📞 Support

Pour toute question ou problème :
1. Vérifiez que HTTPS est activé
2. Autorisez l'accès caméra
3. Utilisez un bon éclairage
4. Tenez le marqueur à 20-50cm

---

**Dernière mise à jour** : Détection plein écran + QR generator
**Version** : 1.0.0