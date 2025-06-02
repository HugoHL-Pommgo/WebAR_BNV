# 🎯 AR QR Code Generator

Un générateur de QR codes pour la réalité augmentée avec détection d'images cibles.

## 🚀 Utilisation

### Démarrage rapide
```bash
# Démarrer le serveur local
./start-local.sh
# Ou manuellement :
python3 -m http.server 8080
```

### URLs principales
- **Générateur QR + AR** : http://localhost:8080/ar-target-qr-generator.html
- **Viewer AR** : http://localhost:8080/ar-viewer.html
- **Page d'accueil** : http://localhost:8080/index.html
- **Éditeur original** : http://localhost:8080/editor.html

## 📁 Structure du projet

```
project/
├── ar-target-qr-generator.html    # 🎯 Application principale
├── ar-viewer.html                 # 👁️ Viewer AR
├── qrcodegen-custom.js            # 📱 Librairie QR codes
├── index.html                     # 🏠 Page d'accueil
├── editor.html                    # ✏️ Éditeur original
├── styles.css                     # 🎨 Styles CSS
├── server.py                      # 🖥️ Serveur Python
├── start-local.sh                 # 🚀 Script de démarrage
├── AR.js-master/                  # 📚 Librairie AR.js
├── QR-Code-generator-master/      # 📚 Librairie QR codes
├── assets/                        # 🖼️ Ressources
└── docs/archives/                 # 📄 Anciens guides (archivés)
```

## ✨ Fonctionnalités

- **Génération QR codes** avec différents niveaux de complexité
- **Réalité augmentée** avec détection d'images cibles
- **Interface moderne** avec drag & drop
- **Sauvegarde locale** des projets
- **URLs stables** pour le partage
- **Responsive design** mobile-friendly

## 🛠️ Technologies

- **A-Frame + AR.js** pour la réalité augmentée
- **QR Code Generator** pour les QR codes
- **HTML5/CSS3/JavaScript** vanilla
- **Python HTTP Server** pour le développement

## 📱 Workflow

1. **Importer une image cible** dans le générateur
2. **Configurer les options QR** (complexité, taille, bordure)
3. **Générer le QR code** unique
4. **Scanner le QR** avec un smartphone
5. **Visualiser en AR** l'image cible détectée

---

**Status** : ✅ Fonctionnel et optimisé  
**Version** : 1.0.0  
**Auteur** : Projet AR QR System