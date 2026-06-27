from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Invoice
from .serializers import InvoiceSerializer


class InvoiceViewSet(ModelViewSet):

    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invoice.objects.filter(
            client__user=self.request.user
        )