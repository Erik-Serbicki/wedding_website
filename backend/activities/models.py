from django.db import models

class Activity(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    donated_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Activities'
    
    def __str__(self):
        return self.name
    
    @property
    def donation_percentage(self):
        if self.price == 0:
            return 0
        return min(100, (float(self.donated_amount) / float(self.price)) * 100)
    
    @property
    def remaining_amount(self):
        return max(0, self.price - self.donated_amount)

class WeddingInfo(models.Model):
    bride_name = models.CharField(max_length=100)
    groom_name = models.CharField(max_length=100)
    wedding_date = models.DateField()
    venue_name = models.CharField(max_length=200)
    venue_address = models.TextField()
    ceremony_time = models.TimeField()
    reception_time = models.TimeField(null=True, blank=True)
    description = models.TextField(blank=True)
    hero_image_url = models.URLField(blank=True, null=True)
    
    class Meta:
        verbose_name_plural = 'Wedding Information'
    
    def __str__(self):
        return f"{self.bride_name} & {self.groom_name}'s Wedding"
    
    def save(self, *args, **kwargs):
        if not self.pk and WeddingInfo.objects.exists():
            existing = WeddingInfo.objects.first()
            self.pk = existing.pk
        super().save(*args, **kwargs)
