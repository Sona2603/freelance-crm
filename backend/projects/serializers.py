from rest_framework import serializers
from .models import Project
from tasks.models import Task

class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(
        source="client.name",
        read_only=True
    )

    progress = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_progress(self, obj):
        if obj.status == "Completed":
            return 100

        total_tasks = obj.tasks.count()

        if total_tasks == 0:
            return 0

        completed_tasks = obj.tasks.filter(
            status="Completed"
        ).count()

        return round(
            (completed_tasks / total_tasks) * 100
        )