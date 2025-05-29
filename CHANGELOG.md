# Changelog - Éditeur AR WebAR BNV

## Version 4.0 - QR Code & Targets Management (29 Mai 2025)

### 🆕 Nouvelles Fonctionnalités

#### 📱 Génération de QR Code
- **Bouton "Générer QR"** ajouté dans le header (à gauche de "Télécharger ZIP")
- **URL unique et persistante** par projet (`viewer.html?project=UNIQUE_ID`)
- **Modal QR complet** avec :
  - QR code 256x256px
  - URL affichée en texte
  - Bouton copier URL
  - Bouton télécharger QR en PNG
  - Instructions utilisateur
- **ID unique permanent** généré au premier QR et conservé à vie
- **Vérifications** : Projet doit contenir targets ET objets 3D

#### 🎯 Gestion des Images Targets
- **Sous-onglet "Targets"** dans l'onglet "Objects"
- **Dialogue de choix** lors de l'ajout d'images : "Target AR" ou "Objet 3D"
- **Import direct** : Bouton "📁 Importer Images Targets" dans le sous-onglet
- **Liste des targets** avec icône 🎯, nom, taille
- **Actions sur targets** :
  - Renommer (✏️)
  - Supprimer (🗑️)
  - Sélectionner pour infos
- **Sauvegarde automatique** des targets dans les projets

#### 🌐 Viewer WebAR (viewer.html)
- **Page dédiée** pour l'expérience AR mobile
- **Chargement dynamique** des projets via URL
- **Support projets temporaires** via sessionStorage
- **Gestion d'erreurs** complète :
  - Projet non trouvé
  - Aucune target
  - Aucun objet 3D
- **Interface de chargement** avec spinner
- **Messages d'instructions** pour utilisateur mobile

### 🔧 Améliorations Techniques

#### Interface Utilisateur
- **Sous-onglets** dans le panneau Objects (Objets/Targets)
- **Styles CSS** pour les sous-onglets et modal QR
- **Responsive design** pour l'affichage mobile du viewer
- **Feedback visuel** pour toutes les actions

#### Gestion des Données
- **Extension des projets** : Ajout du champ `targets[]`
- **Extension des projets** : Ajout du champ `uniqueUrl`
- **Sauvegarde intégrée** : Targets inclus dans les exports ZIP
- **Chargement intelligent** : Targets restaurés à l'import
- **Gestion mémoire** : Nettoyage approprié des targets

#### Bibliothèques Ajoutées
- **QRCode.js** v1.5.3 pour génération des QR codes
- **Canvas support** pour téléchargement des QR en PNG

### 📁 Nouveaux Fichiers
- `viewer.html` - Page WebAR pour mobile
- `GUIDE_QR_ET_TARGETS.md` - Documentation complète
- `TEST_QR_TARGETS.md` - Plan de tests

### 🔄 Workflow Utilisateur

#### Création d'Expérience AR
1. Créer projet → Ajouter modèle 3D → Ajouter image target
2. Positionner objets → Sauvegarder
3. Générer QR code → Partager

#### Utilisation Mobile
1. Scanner QR → Ouvrir viewer.html
2. Pointer caméra vers target → Voir objets 3D en AR

### 🎯 Compatibilité
- **Navigateurs** : Chrome, Firefox, Safari, Edge
- **Mobile** : iOS Safari, Chrome Mobile, Firefox Mobile
- **WebAR** : Tous navigateurs avec support caméra
- **Formats** : GLB/GLTF, JPG/PNG targets

### 📊 Performances
- **QR génération** : ~100ms pour codes 256x256
- **URL permanente** : Pas de re-génération nécessaire
- **Chargement viewer** : <2s pour projets <5MB
- **Détection AR** : Utilise MindAR existant

### 🐛 Corrections de Bugs (Version 4.1)

#### QR Code qui ne s'affichait pas
- **Problème** : Modal QR s'ouvrait mais aucun QR code visible
- **Cause** : Canvas mal configuré et erreurs de génération non gérées
- **Correction** :
  - Vérification du chargement de QRCode.js
  - Canvas créé correctement avec toutes les options
  - Gestion d'erreurs complète avec messages informatifs
  - Messages de progression pendant la génération

#### Viewer WebAR non fonctionnel
- **Problème** : URLs QR ne redirigeaient pas vers une page WebAR fonctionnelle
- **Cause** : Chargement des projets et modèles 3D défaillant
- **Correction** :
  - Support dual localStorage + sessionStorage
  - Validation des projets avant chargement AR
  - Chargement amélioré des assets avec timeout
  - Support multiple formats (ArrayBuffer, Array, base64)
  - Gestion d'erreurs détaillée avec fallbacks

#### Import de Targets amélioré
- **Ajout** : Bouton d'import direct dans le sous-onglet Targets
- **Fonction** : Import d'images sans dialogue de choix
- **Validation** : Vérification des types de fichiers
- **Support** : Import multiple d'images

---

## Version 3.0 - Export/Import ZIP & Gestion Taille (28 Mai 2025)

### 🆕 Export/Import ZIP
- **Export ZIP** : Projets avec assets séparés
- **Import ZIP** : Reconstruction complète des projets
- **Import Dossier** : Support dossiers décompressés
- **Gestion intelligente** : Projets <5MB localStorage, ≥5MB temporaires

### 🔧 Améliorations
- **Interface simplifiée** : 2 boutons principaux
- **Gestion quota** : Éviter erreurs localStorage
- **Messages visuels** : Indicateurs de taille et type

### 📁 Structure ZIP
```
projet_nom_date_heure.zip
├── project.json          # Métadonnées et structure
└── assets/              # Fichiers binaires
    ├── model1.glb
    ├── image1.jpg
    └── video1.mp4
```

---

## Version 2.0 - Sauvegarde & Projets (27 Mai 2025)

### 🆕 Système de Projets
- **Création projets** avec nom et description
- **Liste projets** dans sidebar gauche
- **Sauvegarde automatique** toutes les 1s après modification
- **Bouton sauvegarde manuelle** dans toolbar

### 🔧 Gestion des Objets
- **Onglet Objects** avec liste complète
- **Propriétés détaillées** position/rotation/scale
- **Sélection depuis liste** et auto-switch vers Properties
- **Renommage et suppression** depuis la liste

### 💾 Persistance
- **LocalStorage** pour stockage local
- **Gestion types fichiers** : GLB, images, vidéos
- **Restauration complète** des scènes à la recharge
- **Export JSON** pour backup externe

---

## Version 1.0 - Éditeur 3D Base (26 Mai 2025)

### 🆕 Fonctionnalités Initiales
- **Viewport 3D** avec Three.js
- **Chargement fichiers** GLB/GLTF, JPG/PNG, MP4
- **Transform controls** Move/Rotate/Scale
- **Drag & Drop** pour ajout de fichiers
- **Éclairage optimisé** pour rendu réaliste

### 🎮 Contrôles
- **OrbitControls** : Navigation caméra
- **TransformControls** : Manipulation objets
- **Sélection** : Clic pour sélectionner objets
- **Propriétés** : Panneau d'édition des transformations

### 🎨 Interface
- **Layout moderne** : Header, Sidebar, Viewport, Properties
- **Thème sombre** : Interface professionnelle
- **Toolbar complète** : Tous les outils essentiels
- **Status bar** : Informations en temps réel 