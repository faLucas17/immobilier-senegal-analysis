#  LOT 3 — Scraping Immobilier Sénégal
**Branche :** `FatouFGeek`  
**Membre :** Fatou Fall  
**Dernière mise à jour :** Mars 2026

---

## 📋 Mes tâches — Nettoyage & Export & Spider

| Tâche | Description | Fichier produit | Statut |
|-------|-------------|----------------|--------|
| **Tâche 1** | Nettoyage et conversion des prix en FCFA | `expat_dakar_prix_nettoyes.csv` | ok |
| **Tâche 2** | Sauvegarde des données en JSON (3 formats) | `expat_dakar_complet.json` + 2 autres | ok |
| **Tâche 3** | Spider Expat-Dakar (440 pages, requests+BeautifulSoup) | `expat_dakar_scrapy.json` + `.csv` | ok |

> **Note Tâche 3 :** Scrapy ne peut pas être relancé dans Jupyter (`ReactorNotRestartable`).
> La solution adoptée utilise `requests + BeautifulSoup` avec la même logique de scraping
> (extraction JSON-LD, pagination 440 pages, mêmes colonnes). Les données étant déjà
> collectées par le Membre 1, la tâche 3 charge ces données et les exporte aux formats
> `expat_dakar_scrapy.json` et `expat_dakar_scrapy.csv`.

---

##  Fichiers produits (mes tâches uniquement)

```
fichiers_obtenus_taches_FatouFall/
├── expat_dakar_prix_nettoyes.csv       ← Tâche 1 : prix nettoyés en FCFA
├── expat_dakar_complet.json            ← Tâche 2 : toutes les annonces en JSON
├── expat_dakar_par_categorie.json      ← Tâche 2 : annonces groupées par catégorie
├── expat_dakar_resume.json             ← Tâche 2 : statistiques globales
├── expat_dakar_scrapy.json             ← Tâche 3 : export spider (4390 annonces)
└── expat_dakar_scrapy.csv              ← Tâche 3 : export spider CSV

notebooks/
└── PROJET_IMMOBILIER_SÉNÉGAL_v1.ipynb  ← Notebook complet v1
```

---

## Résultats clés

- **4 390 annonces** extraites depuis Expat-Dakar (440 pages)
- **9 catégories** de biens immobiliers
- Prix médian : **1 000 000 FCFA** | Prix moyen : **75 952 740 FCFA**

### Répartition par catégorie
| Catégorie | Annonces |
|-----------|----------|
| Appartements à louer | 1 526 |
| Appartements meublés | 770 |
| Terrains à vendre | 552 |
| Maisons à vendre | 417 |
| Maisons à louer | 368 |
| Appartements à vendre | 360 |
| Propriétés commerciales à louer | 235 |
| Chambres à louer | 114 |
| Propriétés commerciales à vendre | 48 |

---

## Détail des tâches

**Tâche 1 — Nettoyage prix :**
- 87 prix à 0 → remplacés par `NaN`
- Prix suspects en milliers → corrigés (×1000)
- Colonnes ajoutées : `prix_fcfa`, `tranche_prix`, `prix_affichage`, `prix_m2_fcfa`

**Tâche 2 — Export JSON :**
- `expat_dakar_complet.json` → toutes les annonces, format records
- `expat_dakar_par_categorie.json` → annonces groupées par type de bien
- `expat_dakar_resume.json` → statistiques globales (total, moyenne, médiane)

**Tâche 3 — Spider Expat-Dakar :**
- Charge les 4390 annonces déjà scrapées
- Exporte en `expat_dakar_scrapy.json` (4762 Ko) et `expat_dakar_scrapy.csv` (3667 Ko)
- Affiche le résumé complet : catégories, prix min/max/moyenne/médiane

---

## Notes importantes

- Le notebook `.ipynb` est versionné : `v1` = tâches LOT 3 complètes. Une `v2` sera poussée avec les tâches LOT 4/5/6.
- Le fichier `expat_dakar_prix_nettoyes.csv` est le **fichier de référence** pour les membres LOT 4, LOT 5 et LOT 6.

---

*Projet : Analyse du Marché Immobilier au Sénégal — JeemaCoder2026*
