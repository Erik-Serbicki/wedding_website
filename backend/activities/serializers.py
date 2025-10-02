from rest_framework import serializers
from .models import Activity, WeddingInfo

class ActivitySerializer(serializers.ModelSerializer):
    donation_percentage = serializers.ReadOnlyField()
    remaining_amount = serializers.ReadOnlyField()
    
    class Meta:
        model = Activity
        fields = [
            'id',
            'name',
            'description',
            'price',
            'image_url',
            'donated_amount',
            'donation_percentage',
            'remaining_amount',
            'order',
        ]
        read_only_fields = ['id', 'donation_percentage', 'remaining_amount']

class WeddingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeddingInfo
        fields = [
            'id',
            'bride_name',
            'groom_name',
            'wedding_date',
            'venue_name',
            'venue_address',
            'ceremony_time',
            'reception_time',
            'description',
            'hero_image_url',
        ]
