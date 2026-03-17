from django.db.models import Avg, Count, Q, F, Value
from django.db.models.functions import Coalesce
from rest_framework import generics, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404

from .models import Annonce, Ville, Quartier, TypeBien
from .serializers import (
    AnnonceListSerializer, AnnonceDetailSerializer,
    VilleSerializer, QuartierSerializer, TypeBienSerializer,
    PrixMoyenVilleSerializer, QuartierStatSerializer,
    EvolutionPrixSerializer, StatistiquesGlobalesSerializer
)

# ============================================
# PAGINATION
# ============================================

class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

# ============================================
# VIEWSETS
# ============================================

class AnnonceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet pour les annonces (lecture seule)
    """
    queryset = Annonce.objects.select_related('ville', 'quartier', 'type_bien').all()
    pagination_class = StandardPagination
    
    def get_serializer_class(self):
        if self.action == 'list':
            return AnnonceListSerializer
        return AnnonceDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtres
        ville = self.request.query_params.get('ville')
        quartier = self.request.query_params.get('quartier')
        type_bien = self.request.query_params.get('type_bien')
        prix_min = self.request.query_params.get('prix_min')
        prix_max = self.request.query_params.get('prix_max')
        operation = self.request.query_params.get('operation')
        
        if ville:
            queryset = queryset.filter(ville__nom__icontains=ville)
        if quartier:
            queryset = queryset.filter(quartier__nom__icontains=quartier)
        if type_bien:
            queryset = queryset.filter(type_bien__nom=type_bien)
        if prix_min:
            queryset = queryset.filter(prix_fcfa__gte=prix_min)
        if prix_max:
            queryset = queryset.filter(prix_fcfa__lte=prix_max)
        if operation:
            queryset = queryset.filter(type_operation=operation.upper())
            
        return queryset

# ============================================
# ENDPOINTS POUR LES STATISTIQUES
# ============================================

@api_view(['GET'])
def prix_moyen_par_ville(request):
    """
    GET /api/prix-moyen/ville/
    Retourne le prix moyen par ville
    """
    stats = Annonce.objects.values('ville__nom').annotate(
        prix_moyen=Avg('prix_fcfa'),
        nb_annonces=Count('id')
    ).filter(
        ville__nom__isnull=False,
        nb_annonces__gte=2
    ).order_by('-prix_moyen')
    
    result = [
        {
            'ville': item['ville__nom'],
            'prix_moyen': round(item['prix_moyen']),
            'nb_annonces': item['nb_annonces']
        }
        for item in stats
    ]
    return Response(result)

@api_view(['GET'])
def quartiers_chers(request):
    """
    GET /api/quartiers/chers/
    Retourne le top 10 des quartiers les plus chers
    """
    stats = Annonce.objects.values(
        'quartier__nom', 'ville__nom'
    ).annotate(
        prix_moyen=Avg('prix_fcfa'),
        nb_annonces=Count('id')
    ).filter(
        quartier__nom__isnull=False,
        nb_annonces__gte=3
    ).order_by('-prix_moyen')[:10]
    
    result = []
    for i, item in enumerate(stats, 1):
        result.append({
            'quartier': item['quartier__nom'],
            'ville': item['ville__nom'],
            'prix_moyen': round(item['prix_moyen']),
            'nb_annonces': item['nb_annonces'],
            'classement': i
        })
    return Response(result)

@api_view(['GET'])
def quartiers_accessibles(request):
    """
    GET /api/quartiers/accessibles/
    Retourne les quartiers les moins chers
    """
    stats = Annonce.objects.values(
        'quartier__nom', 'ville__nom'
    ).annotate(
        prix_moyen=Avg('prix_fcfa'),
        nb_annonces=Count('id')
    ).filter(
        quartier__nom__isnull=False,
        nb_annonces__gte=3
    ).order_by('prix_moyen')[:10]
    
    result = [
        {
            'quartier': item['quartier__nom'],
            'ville': item['ville__nom'],
            'prix_moyen': round(item['prix_moyen']),
            'nb_annonces': item['nb_annonces']
        }
        for item in stats
    ]
    return Response(result)

@api_view(['GET'])
def evolution_prix(request):
    """
    GET /api/evolution-prix/
    Retourne l'évolution mensuelle des prix
    """
    stats = Annonce.objects.values('annee_pub', 'mois_pub').annotate(
        prix_moyen=Avg('prix_fcfa'),
        nb_annonces=Count('id')
    ).filter(
        annee_pub__isnull=False,
        mois_pub__isnull=False
    ).order_by('annee_pub', 'mois_pub')
    
    result = [
        {
            'date': f"{item['annee_pub']}-{item['mois_pub']:02d}-01",
            'annee': item['annee_pub'],
            'mois': item['mois_pub'],
            'prix_moyen': round(item['prix_moyen']),
            'nb_annonces': item['nb_annonces']
        }
        for item in stats
    ]
    return Response(result)

@api_view(['GET'])
def prix_au_m2(request):
    """
    GET /api/prix/m2/
    Retourne le prix au m² par quartier
    """
    stats = Annonce.objects.values(
        'quartier__nom', 'ville__nom'
    ).annotate(
        prix_m2_moyen=Avg('prix_m2_fcfa'),
        nb_annonces=Count('id')
    ).filter(
        quartier__nom__isnull=False,
        prix_m2_fcfa__isnull=False,
        nb_annonces__gte=2
    ).order_by('-prix_m2_moyen')[:15]
    
    result = [
        {
            'quartier': item['quartier__nom'],
            'ville': item['ville__nom'],
            'prix_m2_moyen': round(item['prix_m2_moyen']),
            'nb_annonces': item['nb_annonces']
        }
        for item in stats
    ]
    return Response(result)

@api_view(['GET'])
def statistiques_globales(request):
    """
    GET /api/statistiques/
    Retourne les statistiques globales
    """
    total = Annonce.objects.count()
    
    # Prix
    prix_stats = Annonce.objects.aggregate(
        prix_moyen=Avg('prix_fcfa'),
        prix_max=Avg('prix_fcfa'),
        prix_min=Avg('prix_fcfa')
    )
    
    # Top quartier
    top_quartier = Annonce.objects.values(
        'quartier__nom', 'ville__nom'
    ).annotate(
        prix_moyen=Avg('prix_fcfa')
    ).filter(
        quartier__nom__isnull=False
    ).order_by('-prix_moyen').first()
    
    # Stats par type
    types = Annonce.objects.values('type_bien__nom').annotate(
        count=Count('id'),
        prix_moyen=Avg('prix_fcfa')
    ).filter(type_bien__nom__isnull=False)
    
    result = {
        'total_annonces': total,
        'prix_moyen_global': round(prix_stats['prix_moyen']) if prix_stats['prix_moyen'] else 0,
        'prix_max': round(prix_stats['prix_max']) if prix_stats['prix_max'] else 0,
        'prix_min': round(prix_stats['prix_min']) if prix_stats['prix_min'] else 0,
        'quartier_plus_cher': {
            'nom': top_quartier['quartier__nom'],
            'ville': top_quartier['ville__nom'],
            'prix_moyen': round(top_quartier['prix_moyen'])
        } if top_quartier else None,
        'statistiques_par_type': [
            {
                'type': item['type_bien__nom'],
                'nb_annonces': item['count'],
                'prix_moyen': round(item['prix_moyen'])
            }
            for item in types
        ]
    }
    return Response(result)

# ============================================
# ENDPOINTS POUR LES FILTRES
# ============================================

@api_view(['GET'])
def filtres_disponibles(request):
    """
    GET /api/filtres/
    Retourne les valeurs disponibles pour les filtres
    """
    villes = Ville.objects.values_list('nom', flat=True).order_by('nom')
    types = TypeBien.objects.values_list('nom', flat=True)
    operations = [op[0] for op in Annonce.OPERATION_CHOICES]
    
    # Prix min et max
    prix_range = Annonce.objects.aggregate(
        min=Coalesce(Avg('prix_fcfa'), Value(0)),
        max=Coalesce(Avg('prix_fcfa'), Value(1000000000))
    )
    
    return Response({
        'villes': list(villes),
        'types_bien': list(types),
        'operations': operations,
        'prix_min': int(prix_range['min']),
        'prix_max': int(prix_range['max']),
    })