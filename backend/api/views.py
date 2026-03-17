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
    
# ============================================
# AGENT IA - ASSISTANT CONVERSATIONNEL
# ============================================

from django.views.decorators.csrf import csrf_exempt
import json
import re

@csrf_exempt
@api_view(['POST'])
def chat_api(request):
    """
    POST /api/chat/
    Body: {"question": "votre question ici"}
    Retourne une réponse intelligente basée sur les données
    """
    try:
        data = json.loads(request.body)
        question = data.get('question', '').lower().strip()
        
        if not question:
            return Response({'answer': 'Veuillez poser une question.'}, status=400)
        
        # 1. Questions sur le prix moyen
        if 'prix moyen' in question or 'prix_moyen' in question:
            # Par ville
            if 'ville' in question or any(ville in question for ville in ['dakar', 'thies', 'saint-louis']):
                # Extraire le nom de la ville
                for ville in Ville.objects.all():
                    if ville.nom.lower() in question:
                        prix = Annonce.objects.filter(ville=ville).aggregate(Avg('prix_fcfa'))['prix_fcfa__avg']
                        if prix:
                            answer = f"Le prix moyen à {ville.nom} est de **{prix:,.0f} FCFA**"
                        else:
                            answer = f"Je n'ai pas trouvé d'annonces pour {ville.nom}"
                        return Response({'answer': answer})
            
            # Par quartier
            elif 'quartier' in question:
                for quartier in Quartier.objects.all():
                    if quartier.nom.lower() in question:
                        prix = Annonce.objects.filter(quartier=quartier).aggregate(Avg('prix_fcfa'))['prix_fcfa__avg']
                        if prix:
                            answer = f"Le prix moyen dans le quartier {quartier.nom} ({quartier.ville.nom}) est de **{prix:,.0f} FCFA**"
                        else:
                            answer = f"Je n'ai pas trouvé d'annonces pour le quartier {quartier.nom}"
                        return Response({'answer': answer})
            
            # Prix moyen global
            else:
                prix_global = Annonce.objects.aggregate(Avg('prix_fcfa'))['prix_fcfa__avg']
                answer = f"Le prix moyen global est de **{prix_global:,.0f} FCFA** sur {Annonce.objects.count()} annonces"
                return Response({'answer': answer})
        
        # 2. Quartier le plus cher
        elif 'quartier le plus cher' in question or 'quartiers chers' in question:
            top_quartier = Annonce.objects.values('quartier__nom', 'ville__nom').annotate(
                prix_moyen=Avg('prix_fcfa')
            ).filter(quartier__nom__isnull=False).order_by('-prix_moyen').first()
            
            if top_quartier:
                answer = f"Le quartier le plus cher est **{top_quartier['quartier__nom']}** ({top_quartier['ville__nom']}) avec un prix moyen de **{top_quartier['prix_moyen']:,.0f} FCFA**"
            else:
                answer = "Je n'ai pas trouvé d'information sur les quartiers"
            return Response({'answer': answer})
        
        # 3. Quartier le plus accessible
        elif 'quartier le plus accessible' in question or 'quartier moins cher' in question:
            bottom_quartier = Annonce.objects.values('quartier__nom', 'ville__nom').annotate(
                prix_moyen=Avg('prix_fcfa'),
                nb_annonces=Count('id')
            ).filter(quartier__nom__isnull=False, nb_annonces__gte=3).order_by('prix_moyen').first()
            
            if bottom_quartier:
                answer = f"Le quartier le plus accessible est **{bottom_quartier['quartier__nom']}** ({bottom_quartier['ville__nom']}) avec un prix moyen de **{bottom_quartier['prix_moyen']:,.0f} FCFA**"
            else:
                answer = "Je n'ai pas trouvé d'information sur les quartiers accessibles"
            return Response({'answer': answer})
        
        # 4. Nombre d'annonces
        elif 'nombre d\'annonces' in question or 'combien d\'annonces' in question or 'total annonces' in question:
            total = Annonce.objects.count()
            answer = f"Nous avons **{total} annonces** dans notre base de données"
            return Response({'answer': answer})
        
        # 5. Évolution des prix
        elif 'évolution' in question or 'evolution' in question:
            evolution = Annonce.objects.values('annee_pub').annotate(
                prix_moyen=Avg('prix_fcfa')
            ).order_by('annee_pub').filter(annee_pub__isnull=False)
            
            if evolution:
                annees = [f"{e['annee_pub']}: {e['prix_moyen']:,.0f} FCFA" for e in evolution]
                answer = "Évolution des prix par année :\n" + "\n".join(annees)
            else:
                answer = "Données d'évolution non disponibles"
            return Response({'answer': answer})
        
        # 6. Surface moyenne
        elif 'surface moyenne' in question:
            surface_moyenne = Annonce.objects.filter(surface_m2__isnull=False).aggregate(Avg('surface_m2'))['surface_m2__avg']
            if surface_moyenne:
                answer = f"La surface moyenne est de **{surface_moyenne:.0f} m²**"
            else:
                answer = "Données de surface non disponibles"
            return Response({'answer': answer})
        
        # 7. Nombre de chambres moyen
        elif 'nombre de chambres' in question or 'chambres moyen' in question:
            chambres_moyennes = Annonce.objects.filter(nb_chambres__isnull=False).aggregate(Avg('nb_chambres'))['nb_chambres__avg']
            if chambres_moyennes:
                answer = f"Le nombre moyen de chambres est de **{chambres_moyennes:.1f}**"
            else:
                answer = "Données de chambres non disponibles"
            return Response({'answer': answer})
        
        # 8. Prix au m²
        elif 'prix au m²' in question or 'prix au m2' in question:
            prix_m2 = Annonce.objects.filter(prix_m2_fcfa__isnull=False).aggregate(Avg('prix_m2_fcfa'))['prix_m2_fcfa__avg']
            if prix_m2:
                answer = f"Le prix moyen au m² est de **{prix_m2:,.0f} FCFA/m²**"
            else:
                answer = "Données de prix au m² non disponibles"
            return Response({'answer': answer})
        
        # 9. Par type de bien
        elif 'type de bien' in question or 'appartement' in question or 'villa' in question or 'terrain' in question:
            types_reponse = []
            for type_bien in TypeBien.objects.all():
                prix = Annonce.objects.filter(type_bien=type_bien).aggregate(Avg('prix_fcfa'))['prix_fcfa__avg']
                if prix:
                    types_reponse.append(f"{type_bien.get_nom_display()}: {prix:,.0f} FCFA")
            
            if types_reponse:
                answer = "Prix moyen par type de bien :\n" + "\n".join(types_reponse)
            else:
                answer = "Données par type non disponibles"
            return Response({'answer': answer})
        
        # 10. Réponse par défaut avec suggestions
        else:
            suggestions = [
                "• Quel est le prix moyen ?",
                "• Quel est le quartier le plus cher ?",
                "• Combien d'annonces avez-vous ?",
                "• Prix moyen à Dakar",
                "• Quelle est la surface moyenne ?",
                "• Évolution des prix"
            ]
            answer = "Je n'ai pas compris votre question. Voici ce que je peux vous dire :\n" + "\n".join(suggestions)
            return Response({'answer': answer})
    
    except Exception as e:
        return Response({'answer': f"Une erreur est survenue: {str(e)}"}, status=500)