# Créer d'abord les dossiers:
# backend/api/management/
# backend/api/management/commands/
# puis ce fichier

import pandas as pd
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from api.models import Ville, Quartier, TypeBien, Annonce
import os

class Command(BaseCommand):
    help = 'Importe les données depuis les fichiers CSV nettoyés'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, help='Fichier CSV à importer')

    def handle(self, *args, **options):
        file_path = options.get('file', 'expat_dakar_pieces_traite.csv')
        
        self.stdout.write(f"📂 Import depuis {file_path}...")
        
        # Charger le CSV
        df = pd.read_csv(file_path, encoding='utf-8-sig')
        self.stdout.write(f"📊 {len(df)} lignes chargées")
        
        # Créer les villes uniques
        villes = df['ville'].dropna().unique()
        for ville_nom in villes:
            Ville.objects.get_or_create(nom=ville_nom)
        self.stdout.write(f"✅ {len(villes)} villes créées")
        
        # Créer les types de biens
        types = ['APPARTEMENT', 'VILLA', 'TERRAIN', 'COMMERCIAL', 'AUTRE']
        for type_nom in types:
            TypeBien.objects.get_or_create(nom=type_nom)
        
        # Importer les annonces
        count = 0
        for _, row in df.iterrows():
            try:
                # Récupérer ou créer la ville
                ville = None
                if pd.notna(row.get('ville')):
                    ville, _ = Ville.objects.get_or_create(nom=row['ville'])
                
                # Récupérer ou créer le quartier
                quartier = None
                if pd.notna(row.get('quartier')) and ville:
                    quartier, _ = Quartier.objects.get_or_create(
                        nom=row['quartier'],
                        ville=ville
                    )
                
                # Récupérer le type de bien
                type_bien = None
                cat = str(row.get('categorie', '')).lower()
                if 'appartement' in cat:
                    type_bien = TypeBien.objects.get(nom='APPARTEMENT')
                elif 'villa' in cat or 'maison' in cat:
                    type_bien = TypeBien.objects.get(nom='VILLA')
                elif 'terrain' in cat:
                    type_bien = TypeBien.objects.get(nom='TERRAIN')
                elif 'commercial' in cat:
                    type_bien = TypeBien.objects.get(nom='COMMERCIAL')
                else:
                    type_bien = TypeBien.objects.get(nom='AUTRE')
                
                # Date de publication
                date_pub = None
                if pd.notna(row.get('date_publication')):
                    try:
                        date_pub = parse_date(str(row['date_publication']))
                    except:
                        pass
                
                # Créer l'annonce
                annonce = Annonce(
                    id_original=str(row.get('id', ''))[:50],
                    titre=str(row.get('titre', ''))[:500],
                    ville=ville,
                    quartier=quartier,
                    type_bien=type_bien,
                    type_operation=str(row.get('type_operation', ''))[:20],
                    prix_fcfa=int(row['prix_fcfa']) if pd.notna(row.get('prix_fcfa')) else 0,
                    prix_m2_fcfa=int(row['prix_m2_fcfa']) if pd.notna(row.get('prix_m2_fcfa')) else None,
                    tranche_prix=str(row.get('tranche_prix', ''))[:50],
                    surface_m2=float(row['surface_m2']) if pd.notna(row.get('surface_m2')) else None,
                    nb_chambres=int(row['nb_chambres']) if pd.notna(row.get('nb_chambres')) else None,
                    nb_salons=int(row['nb_salons']) if pd.notna(row.get('nb_salons')) else None,
                    nb_sdb=int(row['nb_sdb']) if pd.notna(row.get('nb_sdb')) else None,
                    date_publication=date_pub,
                    annee_pub=int(row['annee_pub']) if pd.notna(row.get('annee_pub')) else None,
                    mois_pub=int(row['mois_pub']) if pd.notna(row.get('mois_pub')) else None,
                    url=str(row.get('url', ''))[:500],
                    image_url=str(row.get('image_url', ''))[:500],
                )
                annonce.save()
                count += 1
                
                if count % 500 == 0:
                    self.stdout.write(f"  ... {count} annonces importées")
                    
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"❌ Erreur: {e}"))
        
        self.stdout.write(self.style.SUCCESS(f"✅ {count} annonces importées avec succès!"))