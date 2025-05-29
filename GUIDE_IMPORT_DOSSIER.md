# 📁 Guide Import de Dossier

## 🎯 **Nouveau Système v3.1**

Maintenant vous pouvez importer un dossier de projet décompressé directement !

## 📦 **Workflow Complet**

### ✅ **Étape 1 : Export ZIP**
1. **Créez** votre projet avec modèles/images/vidéos
2. **Cliquez** "📦 Télécharger ZIP"
3. **Fichier téléchargé** : `MonProjet_2024-01-15_15-30-45.zip`

### ✅ **Étape 2 : Décompression**
1. **Double-cliquez** sur le fichier ZIP téléchargé
2. **Dossier créé** automatiquement :
   ```
   MonProjet_2024-01-15_15-30-45/
   ├── project.json
   └── assets/
       ├── topfpflanze_final.glb
       ├── image1.jpg
       └── video1.mp4
   ```

### ✅ **Étape 3 : Import Dossier**
1. **Rafraîchissez** la page de l'éditeur
2. **Cliquez** "📁 Dossier" dans la sidebar
3. **Sélectionnez** le dossier décompressé
4. **Tous les fichiers** sont automatiquement lus

## 🔍 **Ce qui se passe lors de l'import**

### **Lecture automatique** :
1. **project.json** → Métadonnées du projet
2. **assets/** → Fichiers de modèles/images/vidéos
3. **Reconstruction** → Objets replacés aux bonnes positions

### **Logs console** :
```
📁 Folder selected with 4 files
📄 Found project.json: project.json
📊 Project data loaded: Mon Super Projet
🔍 Found asset: assets/topfpflanze_final.glb
✅ Loaded model: assets/topfpflanze_final.glb
🔍 Found asset: assets/image1.jpg
✅ Loaded image: assets/image1.jpg
✅ Folder imported: Mon Super Projet (2 objects)
```

## 📋 **Options d'Import**

### 📁 **Import Dossier** (Recommandé)
- ✅ **Plus pratique** - décompressez et sélectionnez
- ✅ **Lecture directe** - aucune conversion
- ✅ **Structure visible** - vous voyez les fichiers

### 📦 **Import ZIP** 
- ✅ **Un seul fichier** - pas de décompression
- ✅ **Automatique** - traitement interne
- ⚠️ **Plus complexe** - peut avoir des bugs

### 📄 **Import JSON**
- ⚠️ **Métadonnées seulement** - pas de modèles 3D
- ✅ **Léger** - pour la structure du projet

## 🛠️ **Instructions Détaillées**

### **Sur Mac** :
1. **Double-clic** sur le ZIP → Dossier créé automatiquement
2. **Dans l'éditeur** → "📁 Dossier" 
3. **Dialog** → Sélectionnez le dossier décompressé
4. **Cliquez** "Upload" ou "Sélectionner"

### **Sur Windows** :
1. **Clic droit** → "Extraire tout" 
2. **Dossier créé** dans le même répertoire
3. **Dans l'éditeur** → "📁 Dossier"
4. **Sélectionnez** le dossier extrait

## ✅ **Vérifications**

### **Structure requise** :
```
MonProjet/
├── project.json ← OBLIGATOIRE
└── assets/      ← OBLIGATOIRE si modèles/images
    ├── model.glb
    ├── image.jpg
    └── video.mp4
```

### **Résultats attendus** :
- ✅ **Tous les objets** rechargés
- ✅ **Positions exactes** conservées
- ✅ **Noms d'objets** conservés
- ✅ **Onglet "Objects"** fonctionnel
- ✅ **Modification** possible immédiatement

## 🚨 **Troubleshooting**

### **Problème : "project.json not found"**
**Solution** : Vérifiez que le fichier est à la racine du dossier

### **Problème : "Asset not found"**
**Solution** : Vérifiez que le dossier `assets/` contient tous les fichiers

### **Problème : "Invalid project.json"**
**Solution** : Le fichier JSON est corrompu, retentez l'export

### **Problème : Objets non visibles**
**Solution** : Vérifiez la console pour les erreurs de chargement

## 🎯 **Cas d'Usage**

### **Partage de Projets** :
1. **Exportez** ZIP
2. **Envoyez** par email/drive
3. **Réception** → Décompressez → Importez dossier

### **Sauvegarde** :
1. **Décompressez** vos ZIPs d'export
2. **Sauvegardez** les dossiers sur disque dur
3. **Réimportez** quand nécessaire

### **Collaboration** :
1. **Modifiez** directement les fichiers dans le dossier
2. **Réimportez** pour voir les changements
3. **Versionning** manuel possible

---

🚀 **Maintenant vous avez 3 moyens d'importer : ZIP, Dossier, JSON !** 

Le plus pratique : **📁 Dossier** pour une utilisation quotidienne. 📂 