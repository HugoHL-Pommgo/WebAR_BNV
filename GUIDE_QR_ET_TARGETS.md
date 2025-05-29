# Guide QR Code et Gestion des Targets

## Nouvelles Fonctionnalités Ajoutées

### 🎯 Gestion des Images Targets

#### Sous-onglet "Targets" dans l'onglet "Objects"
- **Emplacement** : Panneau de droite → Onglet "Objects" → Sous-onglet "🎯 Targets"
- **Fonction** : Gérer les images cibles pour la détection AR

#### Ajout d'Images Targets
1. **Méthode 1 - Drag & Drop** :
   - Glissez une image JPG/PNG dans la zone 3D
   - Une boîte de dialogue apparaît : "Ajouter comme TARGET AR" ou "Ajouter comme OBJET 3D"
   - Choisissez "TARGET AR" pour l'ajouter aux cibles

2. **Méthode 2 - Bouton Charger** :
   - Cliquez "📁 Charger" dans la toolbar
   - Sélectionnez une image JPG/PNG
   - Même choix : Target ou Objet 3D

#### Gestion des Targets
- **Liste** : Voir toutes les images targets dans le sous-onglet
- **Renommer** : Bouton ✏️ pour modifier le nom
- **Supprimer** : Bouton 🗑️ pour retirer une target
- **Info** : Affichage de la taille du fichier

### 📱 Génération de QR Code

#### Bouton "Générer QR"
- **Emplacement** : Header, à gauche du bouton "📦 Télécharger ZIP"
- **Fonction** : Créer un QR code WebAR unique pour le projet

#### Utilisation
1. **Ouvrir un projet** avec des objets 3D et des targets
2. **Cliquer "📱 Générer QR"**
3. **Modal QR s'ouvre** avec :
   - QR code de 256x256 pixels
   - URL WebAR unique et permanente
   - Instructions d'utilisation
   - Boutons d'action

#### Actions disponibles
- **📋 Copier URL** : Copie l'URL dans le presse-papiers
- **💾 Télécharger QR** : Sauvegarde le QR code en PNG
- **Fermer** : Ferme le modal

### 🌐 Expérience WebAR (viewer.html)

#### URL Unique par Projet
- Format : `http://localhost:8001/viewer.html?project=UNIQUE_ID`
- **ID persistant** : Ne change jamais, même si le projet est modifié
- **Génération automatique** : Créé au premier QR code

#### Fonctionnement
1. **Scanner le QR** avec un smartphone
2. **Ouverture automatique** de l'expérience WebAR
3. **Chargement** des objets 3D et targets du projet
4. **Détection AR** : Pointer vers l'image cible
5. **Affichage 3D** : Modèles apparaissent en réalité augmentée

## Workflow Complet

### 1. Création d'un Projet AR
```
1. Créer un nouveau projet
2. Ajouter un modèle 3D (GLB/GLTF)
3. Ajouter une image target (JPG/PNG)
4. Positionner et ajuster les objets
5. Sauvegarder le projet
```

### 2. Génération du QR
```
1. Cliquer "📱 Générer QR"
2. QR code créé avec URL unique
3. Télécharger ou copier l'URL
4. Partager le QR code
```

### 3. Utilisation Mobile
```
1. Scanner le QR avec smartphone
2. Ouvrir l'URL WebAR dans le navigateur
3. Autoriser l'accès à la caméra
4. Pointer vers l'image target
5. Voir les objets 3D en AR
```

## Sauvegarde et Persistance

### Stockage des Targets
- **LocalStorage** : Pour projets < 5MB
- **Session temporaire** : Pour projets ≥ 5MB
- **Export ZIP** : Inclut targets et objets

### ID Unique du Projet
- **Généré une fois** : Au premier QR code
- **Permanent** : Ne change jamais
- **Format** : `timestamp_randomhash`
- **Sauvegardé** : Dans le projet JSON

## Compatibilité

### Navigateurs Supportés
- **Desktop** : Chrome, Firefox, Safari, Edge
- **Mobile** : Chrome Mobile, Safari iOS, Firefox Mobile
- **WebAR** : Tous navigateurs avec support caméra

### Formats Supportés
- **Modèles 3D** : GLB, GLTF
- **Images Targets** : JPG, PNG
- **Images Objets** : JPG, PNG
- **Vidéos** : MP4

## Dépannage

### QR Code ne fonctionne pas
- Vérifier que le projet contient des targets
- Vérifier que le projet contient des objets 3D
- S'assurer que le serveur local fonctionne

### Target non détectée
- Utiliser des images contrastées
- Éviter les images trop simples ou répétitives
- Taille recommandée : minimum 512x512 pixels

### Modèle 3D invisible
- Vérifier la position et l'échelle
- S'assurer que le modèle est au-dessus du sol
- Contrôler l'éclairage de la scène

## Améliorations Futures

### Version 4.0 (Prévue)
- **Multi-targets** : Plusieurs images cibles par projet
- **Génération automatique** : Fichiers .mind dynamiques
- **Cloud storage** : Hébergement distant des projets
- **Analyse tracking** : Statistiques d'utilisation QR 