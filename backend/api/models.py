from django.db import models

class Ville(models.Model):
    """Modèle pour les villes"""
    nom = models.CharField(max_length=100, unique=True)
    
    class Meta:
        verbose_name = "Ville"
        verbose_name_plural = "Villes"
        ordering = ['nom']
    
    def __str__(self):
        return self.nom

class Quartier(models.Model):
    """Modèle pour les quartiers"""
    nom = models.CharField(max_length=100)
    ville = models.ForeignKey(Ville, on_delete=models.CASCADE, related_name='quartiers')
    
    class Meta:
        verbose_name = "Quartier"
        verbose_name_plural = "Quartiers"
        unique_together = ['nom', 'ville']
        ordering = ['ville', 'nom']
    
    def __str__(self):
        return f"{self.nom} ({self.ville.nom})"

class TypeBien(models.Model):
    """Modèle pour les types de biens"""
    TYPE_CHOICES = [
        ('APPARTEMENT', 'Appartement'),
        ('VILLA', 'Villa'),
        ('TERRAIN', 'Terrain'),
        ('COMMERCIAL', 'Local commercial'),
        ('AUTRE', 'Autre'),
    ]
    nom = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    
    class Meta:
        verbose_name = "Type de bien"
        verbose_name_plural = "Types de bien"
    
    def __str__(self):
        return self.get_nom_display()

class Annonce(models.Model):
    """Modèle principal pour les annonces immobilières"""
    OPERATION_CHOICES = [
        ('VENTE', 'Vente'),
        ('LOCATION', 'Location'),
        ('LOCATION_MEUBLEE', 'Location meublée'),
    ]
    
    # Identifiants
    id_original = models.CharField(max_length=50, blank=True, null=True)
    titre = models.CharField(max_length=500)
    
    # Localisation
    ville = models.ForeignKey(Ville, on_delete=models.SET_NULL, null=True, blank=True)
    quartier = models.ForeignKey(Quartier, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Caractéristiques
    type_bien = models.ForeignKey(TypeBien, on_delete=models.SET_NULL, null=True, blank=True)
    type_operation = models.CharField(max_length=20, choices=OPERATION_CHOICES, blank=True)
    
    # Prix
    prix_fcfa = models.BigIntegerField()
    prix_m2_fcfa = models.BigIntegerField(blank=True, null=True)
    tranche_prix = models.CharField(max_length=50, blank=True)
    
    # Surface et pièces
    surface_m2 = models.FloatField(blank=True, null=True)
    nb_chambres = models.IntegerField(blank=True, null=True)
    nb_salons = models.IntegerField(blank=True, null=True)
    nb_sdb = models.IntegerField(blank=True, null=True)
    
    # Dates
    date_publication = models.DateField(blank=True, null=True)
    annee_pub = models.IntegerField(blank=True, null=True)
    mois_pub = models.IntegerField(blank=True, null=True)
    
    # Métadonnées
    url = models.URLField(max_length=500, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    date_scraping = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Annonce"
        verbose_name_plural = "Annonces"
        ordering = ['-date_publication']
        indexes = [
            models.Index(fields=['ville', 'quartier']),
            models.Index(fields=['prix_fcfa']),
            models.Index(fields=['date_publication']),
        ]
    
    def __str__(self):
        return f"{self.titre[:50]} - {self.prix_fcfa:,.0f} FCFA"