from django.db import models
from projects.models import Project


class Task(models.Model):

    STATUS_CHOICES = [
        ('Todo', 'Todo'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done'),
    ]

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )

    PRIORITY_CHOICES = (
    ("Low", "Low"),
    ("Medium", "Medium"),
    ("High", "High"),
    )

    

    priority = models.CharField(
        max_length=10,
        choices=PRIORITY_CHOICES,
        default="Medium"
    )
    title = models.CharField(max_length=200)

    description = models.TextField(
        blank=True
    )

    due_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Todo'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title