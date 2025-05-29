# Test de Sauvegarde - Modèles 3D

## 🧪 Procédure de Test

### Test 1 : Chargement et Sauvegarde d'un Modèle 3D
1. **Ouvrir l'éditeur** : `http://localhost:8000/editor.html`
2. **Créer un nouveau projet** : Cliquer sur "+ Nouveau"
3. **Charger un modèle 3D** : 
   - Cliquer sur "📁 Charger" 
   - Sélectionner le fichier `assets/topfpflanze_final.glb`
4. **Modifier le modèle** :
   - Déplacer le modèle avec les contrôles
   - Modifier sa rotation ou échelle
   - Vérifier que les propriétés s'affichent dans le panneau de droite
5. **Sauvegarder** : Cliquer sur "💾 Sauvegarder"
6. **Vérifier la sauvegarde automatique** : Observer le message "💾 Auto-sauvegardé"

### Test 2 : Changement de Projet
1. **Créer un second projet** : Cliquer sur "+ Nouveau"
2. **Charger une image** : Depuis le dossier `assets/`
3. **Revenir au premier projet** : Cliquer dessus dans la liste
4. **Vérifier** : Le modèle 3D doit réapparaître avec sa position/rotation exacte

### Test 3 : Rechargement de Page (CORRIGÉ ✅)
1. **Créer un projet avec un modèle 3D** : Suivre les étapes 1-4 du Test 1
2. **Modifier le modèle** : Déplacer, tourner, redimensionner
3. **Attendre la sauvegarde automatique** : Observer "💾 Auto-sauvegardé"
4. **Rafraîchir la page** (F5)
5. **Vérifier le chargement automatique** : 
   - Le projet doit se charger automatiquement
   - Le modèle doit réapparaître avec sa position/rotation exacte
   - Le projet doit être marqué comme actif (surligné en vert)
   - Le statut doit afficher "Auto-loaded: [nom du projet]"

### Test 4 : Chargement du Dernier Projet Utilisé
1. **Créer plusieurs projets** avec différents contenus
2. **Travailler sur le projet B** (le modifier, le sauvegarder)
3. **Rafraîchir la page** (F5)
4. **Vérifier** : Le projet B (le dernier utilisé) doit se charger automatiquement

## ✅ Résultats Attendus

### Fonctionnalités qui doivent marcher :
- ✅ **Chargement de modèles GLB/GLTF**
- ✅ **Sauvegarde automatique** lors des modifications
- ✅ **Sauvegarde manuelle** avec animation de confirmation
- ✅ **Changement de projet** sans perte de données
- ✅ **Rechargement de page** avec persistance des données
- ✅ **Position, rotation, échelle** sauvegardées précisément
- ✅ **Nom du modèle** sauvegardé
- ✅ **Position de caméra** restaurée

### Indicateurs de Succès :
- 🟢 **Barre de statut** : "💾 Auto-sauvegardé" apparaît après modifications
- 🟢 **Bouton de sauvegarde** : Devient vert "✅ Sauvegardé" lors de la sauvegarde manuelle
- 🟢 **Projet actif** : Surligné en vert dans la liste
- 🟢 **Nombre d'objets** : Affiché correctement dans la barre de statut

## 🐛 Problèmes Potentiels et Solutions

### Problème : Modèle ne se recharge pas
**Solution** : 
- Vérifier la console du navigateur (F12) pour les erreurs
- S'assurer que le fichier GLB/GLTF est valide
- Vérifier que le localStorage n'est pas plein

### Problème : Position du modèle incorrecte
**Solution** :
- Vérifier que la sauvegarde automatique s'est bien déclenchée
- Essayer une sauvegarde manuelle
- Vérifier les valeurs dans le panneau des propriétés

### Problème : Performance lente
**Solution** :
- Les gros modèles 3D peuvent ralentir la sauvegarde
- Privilégier des modèles optimisés (< 5MB)
- Utiliser des formats GLB plutôt que GLTF+bin

## 📊 Tests de Performance

### Taille des Modèles Testés :
- ✅ **Petit modèle** (< 1MB) : Très rapide
- ✅ **Modèle moyen** (1-5MB) : Rapide
- ⚠️ **Gros modèle** (5-10MB) : Plus lent mais fonctionnel
- ❌ **Très gros modèle** (> 10MB) : Peut dépasser les limites du localStorage

---

🎯 **Objectif** : Zéro perte de données pour les modèles 3D lors du travail sur plusieurs projets ! 