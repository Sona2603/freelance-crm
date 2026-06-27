from django.db import models
from clients.models import Client


class Invoice(models.Model):

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Paid', 'Paid')
    ]

    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='invoices'
    )

    title = models.CharField(max_length=200)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Pending'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title