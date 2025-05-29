# 🐛 Debug - Problèmes de Sauvegarde

## 🔍 **Diagnostic des Problèmes**

### 1. **Test de Base - Vérification des Logs**
1. Ouvrez l'éditeur : `http://localhost:8000/editor.html`
2. **Ouvrez la console du navigateur** (F12 → Console)
3. Créez un projet et ajoutez un modèle 3D
4. Observez les logs dans la console

**Logs attendus** :
```
🔄 Chargement objet: model [nom du fichier]
🎲 Chargement modèle 3D: [nom] Taille des données: [nombre]
✅ Modèle 3D chargé avec succès: [nom]
📍 Position restaurée: Vector3 {x: ..., y: ..., z: ...}
✅ Modèle 3D ajouté à la scène. Total objets: 1
```

### 2. **Test de Sauvegarde**
1. Modifiez le modèle (position, rotation)
2. Attendez "💾 Auto-sauvegardé"
3. **Dans la console, tapez** : `console.log(currentProject.scene.objects)`
4. Vérifiez que les données du modèle sont présentes

### 3. **Test de Changement de Projet**
1. Créez un second projet
2. Revenez au premier projet
3. **Vérifiez les logs** : les objets se rechargent-ils ?

### 4. **Test de LocalStorage**
1. **Dans la console, tapez** : `localStorage.getItem('arProjects')`
2. Vérifiez si les données sont sauvegardées
3. **Attention** : Si > 5MB, localStorage peut planter

## 🚨 **Problèmes Possibles**

### Problème A : LocalStorage Plein
**Symptômes** : Erreurs de sauvegarde, objets qui disparaissent
**Solution** :
```javascript
// Dans la console :
Object.keys(localStorage).forEach(key => {
    console.log(key, localStorage[key].length);
});
```

### Problème B : Modèles Trop Gros
**Symptômes** : Le modèle de 47MB ne se sauvegarde pas
**Solution** : Tester avec un modèle plus petit (< 1MB)

### Problème C : Corruption des Données
**Symptômes** : Objets présents mais pas visibles
**Solution** : Vérifier `objects.length` vs objets visibles

## 🛠️ **Solutions de Contournement**

### Solution 1 : Réduire la Taille
```javascript
// Compression simple (à ajouter dans loadGLTF)
// Réduire la qualité du modèle avant sauvegarde
```

### Solution 2 : Sauvegarde Externe
Utiliser l'export JSON au lieu du localStorage pour les gros modèles

### Solution 3 : Cache Intelligent
Ne sauvegarder que la position/rotation, pas les données complètes

## 🧪 **Commands de Debug**

Dans la console du navigateur :

```javascript
// Vérifier l'état actuel
console.log('Projet actuel:', currentProject);
console.log('Objets dans la scène:', objects.length);
console.log('Objets Three.js:', scene.children.length);

// Vérifier localStorage
console.log('Taille localStorage:', 
    Object.keys(localStorage).reduce((total, key) => 
        total + localStorage[key].length, 0
    )
);

// Forcer une sauvegarde
saveCurrentProject();
console.log('Sauvegarde forcée');

// Nettoyer localStorage
localStorage.clear();
console.log('localStorage nettoyé');
```

## 📊 **Limites Techniques**

### LocalStorage :
- **Limite** : ~5-10MB selon le navigateur
- **Modèle 47MB** : Trop gros pour localStorage
- **Solution** : Compression ou stockage externe

### Recommandations :
- ✅ **Images/Vidéos** : < 1MB chacune
- ✅ **Modèles 3D** : < 1MB chacun  
- ❌ **Gros modèles** : Utiliser export/import

---

🎯 **Objectif** : Identifier si le problème vient de la taille des fichiers ou de la logique de sauvegarde. 