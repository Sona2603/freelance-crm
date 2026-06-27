from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
import csv
from django.http import HttpResponse
from rest_framework.decorators import action

from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(ModelViewSet):

    serializer_class = ProjectSerializer

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
        return Project.objects.filter(
            client__user=self.request.user
        )

    @action(detail=False, methods=["get"])
    def export(self, request):

        response = HttpResponse(
            content_type="text/csv"
        )

        response["Content-Disposition"] = (
            'attachment; filename="projects.csv"'
        )

        writer = csv.writer(response)

        writer.writerow([
            "Title",
            "Status",
            "Deadline"
        ])

        projects = self.get_queryset()

        for project in projects:
            writer.writerow([
                project.title,
                project.status,
                project.deadline,
            ])

        return response