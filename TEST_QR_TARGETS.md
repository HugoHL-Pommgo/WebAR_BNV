# Test des Nouvelles Fonctionnalités

## Tests à Effectuer

### ✅ Test 1 : Interface Sous-onglets
1. Ouvrir `http://localhost:8001/editor.html`
2. Créer un nouveau projet
3. Aller dans l'onglet "Objects" (panneau de droite)
4. **Vérifier** : Présence des sous-onglets "🎲 Objets" et "🎯 Targets"

### ✅ Test 2 : Bouton Générer QR
1. **Vérifier** : Bouton "📱 Générer QR" dans le header
2. **Position** : À gauche du bouton "📦 Télécharger ZIP"
3. Cliquer sans projet → **Attendu** : Message "Aucun projet sélectionné"

### ✅ Test 3 : Ajout d'Image Target
1. Créer un nouveau projet "Test QR"
2. Glisser une image JPG/PNG dans la zone 3D
3. **Vérifier** : Dialogue "Ajouter comme TARGET AR" ou "OBJET 3D"
4. Choisir "TARGET AR"
5. **Vérifier** : Message "✅ Target added: nom_image"
6. Aller dans sous-onglet "🎯 Targets"
7. **Vérifier** : Image listée avec icône 🎯

### ✅ Test 4 : Gestion des Targets
1. Dans la liste des targets :
   - **Renommer** : Cliquer ✏️ → Nouveau nom
   - **Supprimer** : Cliquer 🗑️ → Confirmation
2. **Vérifier** : Sauvegarde automatique

### ✅ Test 5 : Génération QR Code
1. Projet avec 1 target + 1 modèle 3D
2. Cliquer "📱 Générer QR"
3. **Vérifier Modal QR** :
   - QR code 256x256px visible
   - URL format : `http://localhost:8001/viewer.html?project=UNIQUE_ID`
   - 3 boutons : Copier, Télécharger, Fermer

### ✅ Test 6 : Fonctions QR
1. **Copier URL** : Vérifier presse-papiers
2. **Télécharger QR** : Fichier PNG sauvegardé
3. **ID Unique** : Même URL après modification du projet

### ✅ Test 7 : Viewer WebAR
1. Copier l'URL du QR code
2. Ouvrir dans nouvel onglet
3. **Vérifier** :
   - Page de chargement
   - Chargement du projet correct
   - Message d'instructions

### ✅ Test 8 : Persistance
1. Fermer l'éditeur
2. Rouvrir → Charger le projet
3. **Vérifier** :
   - Targets conservées
   - Même ID unique pour QR
   - Sous-onglet targets fonctionne

### ✅ Test 9 : Export/Import
1. Exporter projet en ZIP
2. Importer dans nouvel environnement
3. **Vérifier** :
   - Targets importées
   - QR code re-générable
   - Nouveau ID unique créé

## Scénarios d'Erreur

### ❌ Test E1 : QR sans Target
1. Projet avec seulement des modèles 3D
2. Générer QR → **Attendu** : Erreur "Aucune image cible"

### ❌ Test E2 : QR sans Objet
1. Projet avec seulement des targets
2. Générer QR → **Attendu** : Erreur "Aucun objet 3D"

### ❌ Test E3 : Viewer Project Inexistant
1. URL avec project=FAKE_ID
2. **Attendu** : Page erreur "Projet non trouvé"

## Résultats Attendus

### Interface
- [x] Sous-onglets visibles et fonctionnels
- [x] Bouton QR bien placé
- [x] Modal QR attractif et complet

### Fonctionnalité
- [x] Ajout targets via dialogue
- [x] Gestion complète des targets
- [x] QR code généré correctement
- [x] URL unique et persistante

### WebAR
- [x] Viewer charge les projets
- [x] Gestion d'erreurs appropriée
- [x] Interface mobile adaptée

### Sauvegarde
- [x] Targets sauvegardées
- [x] ID unique persistant
- [x] Export/Import fonctionnel

## Notes de Test

- **Navigateur recommandé** : Chrome (meilleur support WebAR)
- **Test mobile** : Scanner QR avec smartphone réel
- **Assets test** : Utiliser images contrastées pour targets
- **Modèles test** : GLB < 5MB pour éviter problèmes localStorage 