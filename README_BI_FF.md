DOCUMENTATION DES TÂCHES DE OUMAR KANE

=======================================

Projet : Analyse du Marché Immobilier au Sénégal

Outil : Power BI Desktop



-------------------------------------------------------------------------------

RÉSUMÉ DES TÂCHES RÉALISÉES

-------------------------------------------------------------------------------



**A. j'ai réalisé les 3 tâches suivantes dans Power BI :**



1\. IMPORT DES DONNÉES CSV

2\. NETTOYAGE ET TRANSFORMATION DANS POWER QUERY

3\. CRÉATION DES RELATIONS ENTRE LES TABLES





-------------------------------------------------------------------------------

1\. IMPORT DES DONNÉES CSV

-------------------------------------------------------------------------------



Fichiers importés (6 fichiers) depuis le dossier :

C:\\Users\\Dell\\OneDrive\\Desktop\\jeemCoder\\immobilier-senegal-analysis\\powerbi\\fichiers BI\\



| # | Nom du fichier                     | Description                          |

|---|------------------------------------|--------------------------------------|

| 1 | expat\_dakar\_pieces\_traite.csv      | Table principale (4 313 annonces)   |

| 2 | kpi\_evolution\_mensuelle.csv        | Évolution mensuelle des prix        |

| 3 | statistiques\_par\_nb\_chambres.csv   | Statistiques par nombre de chambres |

| 4 | statistiques\_par\_quartier.csv      | Statistiques par quartier           |

| 5 | statistiques\_par\_type\_bien.csv     | Statistiques par type de bien       |

| 6 | statistiques\_par\_ville.csv         | Statistiques par ville              |



Procédure d'import :

\- Ouverture de Power BI Desktop

\- Obtenir des données → Texte/CSV

\- Sélection des 6 fichiers

\- Chargement dans Power Query Editor





-------------------------------------------------------------------------------

2\. NETTOYAGE ET TRANSFORMATION DANS POWER QUERY

-------------------------------------------------------------------------------



Pour chaque table, les transformations suivantes ont été appliquées :



TABLE 1 : expat\_dakar\_pieces\_traite.csv

------------------------------------------------

| Colonne            | Type appliqué      | Actions                          |

|--------------------|--------------------|----------------------------------|

| id                 | Texte              | Conservé                         |

| titre              | Texte              | Conservé                         |

| categorie          | Texte              | Conservé                         |

| type\_operation     | Texte              | Conservé                         |

| prix\_xof           | -                  | Supprimé (redondant)             |

| devise             | -                  | Supprimé (toujours XOF)          |

| description        | Texte              | Conservé                         |

| url                | Texte              | Conservé                         |

| image\_url          | Texte              | Conservé                         |

| page\_source        | Nombre entier      | Conversion vérifiée              |

| date\_scraping      | Date/Heure         | Conversion vérifiée              |

| quartier           | Texte              | Conservé                         |

| ville              | Texte              | Conservé                         |

| surface\_m2         | Nombre décimal     | Nettoyage des points → virgules |

| nb\_chambres        | Nombre entier      | Conversion                       |

| nb\_salons          | Nombre entier      | Conversion                       |

| nb\_sdb             | Nombre entier      | Conversion                       |

| date\_publication   | Date               | Conversion                       |

| annee\_pub          | Nombre entier      | Conversion                       |

| mois\_pub           | Nombre entier      | Conversion                       |

| jour\_pub           | Nombre entier      | Conversion                       |

| heure\_pub          | Texte              | Conservé                         |

| prix\_fcfa          | Nombre décimal     | ✅ Colonne essentielle            |

| tranche\_prix       | Texte              | Conservé                         |

| prix\_affichage     | -                  | Supprimé (format texte)          |

| prix\_m2\_fcfa       | Nombre décimal     | Conversion                       |



TABLE 2 : kpi\_evolution\_mensuelle.csv

------------------------------------------------

| Colonne               | Type applifié     |

|-----------------------|-------------------|

| date                  | Date              |

| prix\_moyen            | Nombre décimal    |

| variation\_pourcentage | Nombre décimal    |



TABLE 3 : statistiques\_par\_nb\_chambres.csv

------------------------------------------------

| Colonne       | Type applifié     |

|---------------|-------------------|

| nb\_chambres   | Nombre entier     |

| prix\_moyen    | Nombre décimal    |

| prix\_median   | Nombre décimal    |

| nb\_annonces   | Nombre entier     |

| ecart\_type    | Nombre décimal    |



TABLE 4 : statistiques\_par\_quartier.csv

------------------------------------------------

| Colonne            | Type applifié     |

|--------------------|-------------------|

| quartier           | Texte             |

| prix\_moyen         | Nombre décimal    |

| prix\_median        | Nombre décimal    |

| prix\_min           | Nombre décimal    |

| prix\_max           | Nombre décimal    |

| nb\_annonces        | Nombre entier     |

| surface\_moyenne    | Nombre décimal    |

| chambres\_moyennes  | Nombre décimal    |

| prix\_m2\_moyen      | Nombre décimal    |



TABLE 5 : statistiques\_par\_type\_bien.csv

------------------------------------------------

| Colonne       | Type applifié     |

|---------------|-------------------|

| type\_simple   | Texte             |

| prix\_moyen    | Nombre décimal    |

| prix\_median   | Nombre décimal    |

| nb\_annonces   | Nombre entier     |



TABLE 6 : statistiques\_par\_ville.csv

------------------------------------------------

| Colonne            | Type applifié     |

|--------------------|-------------------|

| ville              | Texte             |

| prix\_moyen         | Nombre décimal    |

| prix\_median        | Nombre décimal    |

| prix\_min           | Nombre décimal    |

| prix\_max           | Nombre décimal    |

| nb\_annonces        | Nombre entier     |

| surface\_moyenne    | Nombre décimal    |

| chambres\_moyennes  | Nombre décimal    |



Problèmes rencontrés et solutions :

\- Valeurs avec point décimal (exemple 174.0) : remplacement du point par la virgule

\- Cellules vides : conversion en null (géré automatiquement)

\- Erreurs de conversion : remplacement des erreurs par null





-------------------------------------------------------------------------------

3\. CRÉATION DES RELATIONS ENTRE LES TABLES

-------------------------------------------------------------------------------



Après chargement des données, 3 relations ont été créées dans le modèle :



| Table source                  | Colonne source        | Table cible                   | Colonne cible     |

|-------------------------------|----------------------|-------------------------------|-------------------|

| expat\_dakar\_pieces\_traite     | quartier             | statistiques\_par\_quartier     | quartier          |

| expat\_dakar\_pieces\_traite     | ville                | statistiques\_par\_ville        | ville             |

| expat\_dakar\_pieces\_traite     | date\_publication     | kpi\_evolution\_mensuelle       | date              |



Type de relations : Plusieurs-à-un (\*:1)



Tables indépendantes (sans relation) :

\- statistiques\_par\_nb\_chambres

\- statistiques\_par\_type\_bien



Ces tables sont utilisées comme tables de référence pour des visualisations spécifiques.





-------------------------------------------------------------------------------

RÉSULTAT FINAL

-------------------------------------------------------------------------------



Le modèle de données Power BI contient :

* 6 tables correctement structurées
* 3 relations fonctionnelles
* Données nettoyées et prêtes pour les analyses



Fichier Power BI sauvegardé sous : dashboard\_immobilier.pbix



-------------------------------------------------------------------------------

PROCHAINES ÉTAPES

-------------------------------------------------------------------------------



Les tâches suivantes sont à réaliser par les autres membres :



| Tâches à venir                                      |

|-----------------------------------------------------|

| Création des mesures DAX (prix moyen, médian, etc.) |

| Page "Vue d'ensemble" avec 4 KPIs                   |

| Graphiques (carte, bar chart, line chart, tableau)  |

| Filtres, mise en page finale, export .pbix          |





**B. J'ai réalises les 4 tâches suivantes:**





| # | Tâche | Statut |

|---|-------|--------|

| 1 | Créer la mesure DAX "Prix moyen" | Terminé |

| 2 | Créer la mesure DAX "Prix médian" |  Terminé |

| 3 | Créer la mesure DAX "Évolution mensuelle" | Terminé |

| 4 | Créer la mesure DAX "Prix au m²" |Terminé |



---



\### Formule DAX



Prix moyen = AVERAGE( 'expat\_dakar\_pieces\_traite'\[prix\_fcfa] )

Prix médian = MEDIAN( 'expat\_dakar\_pieces\_traite'\[prix\_fcfa] )

Évolution mensuelle = AVERAGE( 'kpi\_evolution\_mensuelle'\[variation\_pourcentage] )

Prix au m² = AVERAGE( 'expat\_dakar\_pieces\_traite'\[prix\_m2\_fcfa] )





C. j'ai réalisé ces tâches



\## Objectif

Créer une page de synthèse "Vue d'ensemble" avec les indicateurs clés du marché immobilier et un classement des quartiers.



---



\## PAGE "VUE D'ENSEMBLE"



La page contient :

\- \*\*4 cartes\*\* pour les KPIs globaux

\- \*\*1 tableau\*\* pour le classement des quartiers





\##  TABLEAU — CLASSEMENT DES QUARTIERS



| Colonne | Source | Signification |

|---------|--------|---------------|

| \*\*Quartier\*\* | `statistiques\_par\_quartier` | Nom du quartier |

| \*\*Prix moyen\*\* | `\[Prix moyen quartier]` | Prix moyen dans ce quartier |

| \*\*Classement\*\* | `\[Classement quartiers prix]` | Position du quartier (1 = plus cher) |



\*\*Interprétation :\*\*

\- Plus le chiffre du classement est petit → plus le quartier est cher

\- Plus le chiffre est grand → plus le quartier est accessible



\*\*Exemple :\*\*

\- Rufisque (270M) → Classement \*\*1\*\* (le plus cher)

\- Cité Keur Gorgui (11M) → Classement \*\*50\*\* (le plus accessible)



D. TÂCHES DE FATOU FALL (Mes tâches)



\## Tâche 1 — Carte des prix par quartier

\*\*Type :\*\* Bar chart horizontal  

\*\*Source :\*\* `statistiques\_par\_quartier` (quartier, prix\_moyen)  

\*\*Description :\*\* Ce graphique classe les quartiers du plus cher au moins cher. Plus la barre est longue, plus le prix moyen dans le quartier est élevé. Il permet d'identifier rapidement les zones les plus chères (Rufisque, Baobabs, Ngor) et les plus accessibles.



\## Tâche 2 — Prix par ville

\*\*Type :\*\* Bar chart vertical  

\*\*Source :\*\* `statistiques\_par\_ville` (ville, prix\_moyen)  

\*\*Description :\*\* Ce graphique compare les prix moyens entre les différentes villes. Il montre que Kaolack et Rufisque ont les prix les plus élevés, tandis que des villes comme Saint-Louis et Tambacounda sont plus abordables.



\## Tâche 3 — Évolution des prix

\*\*Type :\*\* Line chart  

\*\*Source :\*\* `kpi\_evolution\_mensuelle` (date, prix\_moyen)  

\*\*Description :\*\* Cette courbe illustre la tendance des prix dans le temps. Elle permet de visualiser les périodes de hausse et de baisse, avec des pics observés en novembre et des creux en mai.



\## Tâche 4 — Tableau Top quartiers

\*\*Type :\*\* Tableau  

\*\*Source :\*\* `statistiques\_par\_quartier` + `\[Classement quartiers prix]`  

\*\*Description :\*\* Ce tableau liste les 10 quartiers les plus chers avec leur prix moyen et leur classement. Il donne une vue détaillée et immédiate des zones les plus chères du marché immobilier.



E. J'ai aussi réalisé ces tâches: 

Ajouter les filtres (ville, type de bien, date)

Finaliser la mise en page (design professionnel) 

Exporter le fichier .pbix

Documenter l'utilisation du dashboard Power BI





-------------------------------------------------------------------------------

FIN DE LA DOCUMENTATION

-------------------------------------------------------------------------------

