from django.contrib import admin
from .models import Activity, WeddingInfo

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'donated_amount', 'donation_percentage', 'order']
    list_editable = ['order']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']
    
    def donation_percentage(self, obj):
        return f"{obj.donation_percentage:.1f}%"
    donation_percentage.short_description = 'Progress'

@admin.register(WeddingInfo)
class WeddingInfoAdmin(admin.ModelAdmin):
    list_display = ['bride_name', 'groom_name', 'wedding_date', 'venue_name']
    
    def has_add_permission(self, request):
        return not WeddingInfo.objects.exists()
