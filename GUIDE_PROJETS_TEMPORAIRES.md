# ⚡ Projets Temporaires - Guide Complet

## 🎯 **Nouvelle Fonctionnalité**

Maintenant, **tous les projets importés apparaissent** dans la liste, même les gros fichiers ! 

## 🏷️ **Indicateurs Visuels**

### **📁 Projet Normal** :
```
📁 Mon Projet
Description du projet
2024-05-29
```
- **Icône** : 📁 (dossier)
- **Couleur** : Blanche normale
- **Persistance** : ✅ Sauvé dans localStorage

### **📥 Projet Importé** :
```
📥 Mon Projet (importé)
Description du projet
2024-05-29
```
- **Icône** : 📥 (import)
- **Badge** : **(importé)** en vert
- **Persistance** : ✅ Sauvé dans localStorage (si < 5MB)

### **⚡ Projet Temporaire** :
```
⚡ Mon Gros Projet (temporaire 47.2MB)
Description du projet
2024-05-29
```
- **Icône** : ⚡ (éclair)
- **Badge** : **(temporaire XXmb)** en orange
- **Couleur titre** : Orange
- **Persistance** : ⚠️ Session seulement

## 🔄 **Comportement par Type**

### **Projets Normaux/Importés** :
- ✅ **Apparaissent** dans la liste
- ✅ **Persistent** entre les sessions
- ✅ **Sauvegarde automatique** fonctionnelle
- ✅ **Bouton "Continuer"** disponible

### **Projets Temporaires** :
- ✅ **Apparaissent** dans la liste pendant la session
- ✅ **Fonctionnement complet** (édition, export, etc.)
- ⚠️ **Disparaissent** au rafraîchissement
- ⚠️ **Pas de sauvegarde** localStorage

## 💡 **Workflow Optimisé**

### **Pour Gros Projets** :
1. **📁 Importer Projet** → Apparaît en ⚡ temporaire
2. **🎨 Modifier** normalement 
3. **📦 Export ZIP** → Sauvegarde complète
4. **🔄 Répéter** → Import dossier pour reprendre

### **Pour Petits Projets** :
1. **📁 Importer Projet** → Apparaît en 📥 importé
2. **💾 Sauvegarde auto** → Devient persistant
3. **📂 Continuer** → Disponible lors des prochaines sessions

## 🎯 **Avantages**

### **Visibilité** :
- ✅ **Tous les projets** visibles
- ✅ **Indication claire** du type
- ✅ **Pas de confusion** sur la persistance

### **Fonctionnalité** :
- ✅ **Accès complet** aux projets temporaires
- ✅ **Workflow identique** pour tous types
- ✅ **Export/import** fonctionne parfaitement

### **Performance** :
- ✅ **Pas de plantage** localStorage
- ✅ **Chargement rapide** des gros projets
- ✅ **Interface réactive**

## 🚀 **Messages Système**

### **Import Réussi** :
- **Petit projet** : "✅ Folder imported: Mon Projet (2 objects)"
- **Gros projet** : "✅ Folder imported: Mon Projet (3 objects) - Too large for localStorage"

### **Console Logs** :
```
📊 Estimated project size: 47.2MB
⚡ Project too large for localStorage, displaying as temporary
✅ Project displayed in list as temporary session
```

## ⚙️ **Technique**

### **Détection** :
```javascript
if (estimatedSizeMB >= 5) {
    importedProject.isTemporary = true;
    importedProject.sizeMB = estimatedSizeMB.toFixed(1);
}
```

### **Affichage** :
```javascript
if (project.isTemporary) {
    icon = '⚡';
    badge = `(temporaire ${project.sizeMB}MB)`;
    titleStyle = 'color: #ff9800;';
}
```

---

🎉 **Résultat** : Plus de confusion ! Tous vos projets sont visibles et utilisables ! ⚡📁📥 