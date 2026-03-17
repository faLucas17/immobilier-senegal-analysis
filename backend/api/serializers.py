from rest_framework import serializers
from .models import Ville, Quartier, TypeBien, Annonce

class VilleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ville
        fields = ['id', 'nom']

class QuartierSerializer(serializers.ModelSerializer):
    ville_nom = serializers.CharField(source='ville.nom', read_only=True)
    
    class Meta:
        model = Quartier
        fields = ['id', 'nom', 'ville', 'ville_nom']

class TypeBienSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeBien
        fields = ['id', 'nom']

class AnnonceListSerializer(serializers.ModelSerializer):
    """Serializer léger pour les listes d'annonces"""
    ville_nom = serializers.CharField(source='ville.nom', read_only=True)
    quartier_nom = serializers.CharField(source='quartier.nom', read_only=True)
    type_bien_nom = serializers.CharField(source='type_bien.get_nom_display', read_only=True)
    
    class Meta:
        model = Annonce
        fields = [
            'id', 'titre', 'ville_nom', 'quartier_nom', 'type_bien_nom',
            'type_operation', 'prix_fcfa', 'surface_m2', 'nb_chambres',
            'date_publication', 'image_url'
        ]

class AnnonceDetailSerializer(serializers.ModelSerializer):
    """Serializer détaillé pour une annonce"""
    ville_nom = serializers.CharField(source='ville.nom', read_only=True)
    quartier_nom = serializers.CharField(source='quartier.nom', read_only=True)
    type_bien_nom = serializers.CharField(source='type_bien.get_nom_display', read_only=True)
    
    class Meta:
        model = Annonce
        fields = '__all__'

# Serializers pour les KPIs
class PrixMoyenVilleSerializer(serializers.Serializer):
    ville = serializers.CharField()
    prix_moyen = serializers.FloatField()
    nb_annonces = serializers.IntegerField()

class QuartierStatSerializer(serializers.Serializer):
    quartier = serializers.CharField()
    ville = serializers.CharField()
    prix_moyen = serializers.FloatField()
    nb_annonces = serializers.IntegerField()
    classement = serializers.IntegerField(required=False)

class EvolutionPrixSerializer(serializers.Serializer):
    date = serializers.CharField()
    annee = serializers.IntegerField()
    mois = serializers.IntegerField()
    prix_moyen = serializers.FloatField()
    nb_annonces = serializers.IntegerField()

class StatistiquesGlobalesSerializer(serializers.Serializer):
    total_annonces = serializers.IntegerField()
    prix_moyen_global = serializers.FloatField()
    prix_max = serializers.FloatField()
    prix_min = serializers.FloatField()
    quartier_plus_cher = serializers.DictField(required=False)