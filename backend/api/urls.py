from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'annonces', views.AnnonceViewSet, basename='annonce')

urlpatterns = [
    path('', include(router.urls)),
    
    # Statistiques
    path('prix-moyen/ville/', views.prix_moyen_par_ville, name='prix-moyen-ville'),
    path('quartiers/chers/', views.quartiers_chers, name='quartiers-chers'),
    path('quartiers/accessibles/', views.quartiers_accessibles, name='quartiers-accessibles'),
    path('evolution-prix/', views.evolution_prix, name='evolution-prix'),
    path('prix/m2/', views.prix_au_m2, name='prix-m2'),
    path('statistiques/', views.statistiques_globales, name='statistiques'),
    path('chat/', views.chat_api, name='chat'),
    # Filtres
    path('filtres/', views.filtres_disponibles, name='filtres'),
]