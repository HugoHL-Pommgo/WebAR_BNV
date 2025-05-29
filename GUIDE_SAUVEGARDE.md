# Guide de Sauvegarde - Éditeur AR

## 🎯 Nouvelles Fonctionnalités de Sauvegarde

L'éditeur AR dispose maintenant d'un système de sauvegarde complet qui résout le problème de perte de données lors du changement de projet.

## 📁 Gestion des Projets

### Créer un nouveau projet
1. Cliquez sur le bouton **"+ Nouveau"** dans la sidebar
2. Entrez un nom et une description pour votre projet
3. Cliquez sur **"Create"**

### Changer de projet
- Cliquez simplement sur un projet dans la liste de gauche
- ⚠️ **Votre projet actuel sera automatiquement sauvegardé avant le changement**

### Supprimer un projet
- Survolez un projet dans la liste pour voir apparaître le bouton **"×"**
- Cliquez sur le bouton de suppression
- Confirmez la suppression (action irréversible)

## 💾 Système de Sauvegarde

### Sauvegarde Automatique
- **Auto-sauvegarde** : Vos modifications sont automatiquement sauvegardées 1 seconde après chaque changement
- **Changement de projet** : Sauvegarde automatique avant de charger un autre projet
- **Chargement automatique** : Le dernier projet utilisé se charge automatiquement lors du rafraîchissement de page
- **Feedback visuel** : "💾 Auto-sauvegardé" apparaît dans la barre de statut

### Sauvegarde Manuelle
- Cliquez sur le bouton **"💾 Sauvegarder"** dans la toolbar
- Animation de confirmation : le bouton devient vert "✅ Sauvegardé"

### Ce qui est sauvegardé
- ✅ **Images** : Position, rotation, échelle + données de l'image
- ✅ **Vidéos** : Position, rotation, échelle + données de la vidéo
- ✅ **Modèles 3D GLB/GLTF** : Position, rotation, échelle + données du modèle
- ✅ **Position de la caméra** : Angle de vue et position restaurés
- ✅ **Propriétés des objets** : Nom, transformations

## 🎮 Utilisation

### Workflow recommandé
1. **Créez un projet** avec un nom descriptif
2. **Ajoutez vos fichiers** (images, vidéos, modèles 3D)
3. **Modifiez vos objets** (position, rotation, échelle)
4. **Changez de projet** sans souci - tout est sauvegardé automatiquement
5. **Revenez à vos projets** précédents quand vous voulez

### Indicateurs visuels
- **Barre de statut** : Affiche le projet actuel et le nombre d'objets
- **Project actif** : Surligné en vert dans la liste
- **Bouton de sauvegarde** : 
  - Grisé si aucun projet n'est ouvert
  - Vert avec animation lors de la sauvegarde

## 🔧 Données Techniques

- **Stockage** : Utilise le `localStorage` du navigateur
- **Format** : JSON avec données en base64 pour les médias
- **Limites** : Dépend de la limite du localStorage (généralement 5-10MB)
- **Persistance** : Les données persistent entre les sessions

## 🚀 Conseils d'Utilisation

1. **Nommez vos projets** de manière descriptive
2. **Utilisez la sauvegarde manuelle** avant des modifications importantes
3. **Exportez vos projets** régulièrement (bouton "📤 Exporter")
4. **Surveillez la barre de statut** pour les confirmations

## ❓ Résolution de Problèmes

### Projet ne se charge pas
- Vérifiez que le localStorage n'est pas plein
- Essayez de rafraîchir la page

### Données perdues
- Les données sont sauvegardées automatiquement
- Vérifiez que vous êtes dans le bon projet
- Utilisez l'export pour faire des sauvegardes externes

---

🎨 **Bon travail avec l'éditeur AR ! Vos créations ne disparaîtront plus !** 