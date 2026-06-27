from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import Task
from activities.models import Activity
from .serializers import TaskSerializer


class TaskViewSet(ModelViewSet):

    serializer_class = TaskSerializer

    permission_classes = [IsAuthenticated]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter
    ]

    filterset_fields = ['status']

    search_fields = [
        'title',
        'description'
    ]

    def get_queryset(self):
        return Task.objects.filter(
            project__client__user=self.request.user
        )

    def perform_create(self, serializer):
        task = serializer.save()

        Activity.objects.create(
            project=task.project,
            message=f"Task '{task.title}' created"
        )

    def perform_update(self, serializer):
        old_task = self.get_object()

        task = serializer.save()

        if old_task.status != task.status:
            Activity.objects.create(
                project=task.project,
                message=f"Task '{task.title}' marked as {task.status}"
            )