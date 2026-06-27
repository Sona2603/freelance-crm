from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(ModelViewSet):

    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter
    ]

    search_fields = [
        'name',
        'email',
        'company'
    ]

    def get_queryset(self):
        return Client.objects.filter(
            user=self.request.user
        )
    

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )    

        Activity.objects.create(
            project=None,
            message=f"Client '{client.name}' created"
        )   