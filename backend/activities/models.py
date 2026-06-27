from django.db import models
from projects.models import Project


class Activity(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='activities'
    )

    message = models.CharField(max_length=255)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.message