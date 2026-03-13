# FATOU FALL — Secondes tâches (LOT 4)

## TÂCHE 1 — Traitement des prix manquants
**Déjà réalisé dans la Tâche 1 du LOT 3**
- 87 prix à 0 convertis en NaN
- Suppression des 87 annonces sans prix
- Fichier produit : `expat_dakar_prix_traite.csv`

---

## TÂCHE 2 — Traitement des surfaces manquantes
**Fichier d'entrée :** `expat_dakar_prix_traite.csv`
**Fichier de sortie :** `expat_dakar_surfaces_traite.csv`

- 4313 annonces analysées
- Surfaces valides : 1381 annonces (525 m² en moyenne)
- Surfaces manquantes : 2932 annonces
- **Option choisie :** Laisser NaN (pas d'imputation hasardeuse)
- Aucune modification des données existantes

---

## TÂCHE 3 — Traitement des pièces manquantes
**Fichier d'entrée :** `expat_dakar_surfaces_traite.csv`
**Fichier de sortie :** `expat_dakar_pieces_traite.csv`

- 4313 annonces analysées
- Chambres valides : 2580 annonces (moyenne 3.0)
- Chambres manquantes : 1733 annonces
- Salons manquants : 1764 annonces
- SDB manquantes : 2430 annonces
- **Option choisie :** Laisser NaN (pas d'estimation)

---

## RÉSUMÉ DES DONNÉES FINALES
- Total annonces : 4313 (après suppression prix manquants)
- Surfaces renseignées : 1381
- Chambres renseignées : 2580
- Taux de couverture : surface 32%, chambres 60%