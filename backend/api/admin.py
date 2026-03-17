from django.contrib import admin
from .models import Ville, Quartier, TypeBien, Annonce

@admin.register(Ville)
class VilleAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom']
    search_fields = ['nom']

@admin.register(Quartier)
class QuartierAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom', 'ville']
    list_filter = ['ville']
    search_fields = ['nom']

@admin.register(TypeBien)
class TypeBienAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom']

@admin.register(Annonce)
class AnnonceAdmin(admin.ModelAdmin):
    list_display = ['id', 'titre', 'ville', 'prix_fcfa', 'type_operation']
    list_filter = ['ville', 'type_operation', 'type_bien']
    search_fields = ['titre', 'quartier__nom']
    readonly_fields = ['date_scraping']