from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Activity, WeddingInfo
from .serializers import ActivitySerializer, WeddingInfoSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    @action(detail=True, methods=['post'])
    def update_donation(self, request, pk=None):
        activity = self.get_object()
        amount = request.data.get('amount')
        
        if amount is None:
            return Response(
                {'error': 'Amount is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            amount = float(amount)
            if amount < 0:
                return Response(
                    {'error': 'Amount must be positive'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid amount format'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        activity.donated_amount += amount
        activity.save()
        
        serializer = self.get_serializer(activity)
        return Response(serializer.data)

class WeddingInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WeddingInfo.objects.all()
    serializer_class = WeddingInfoSerializer
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        wedding_info = WeddingInfo.objects.first()
        if wedding_info:
            serializer = self.get_serializer(wedding_info)
            return Response(serializer.data)
        return Response(
            {'message': 'Wedding info not configured yet'},
            status=status.HTTP_404_NOT_FOUND
        )
