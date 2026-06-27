from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from clients.models import Client
from projects.models import Project
from tasks.models import Task
from invoices.models import Invoice
from activities.models import Activity


from django.utils import timezone

class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        clients_count = Client.objects.filter(
            user=request.user
        ).count()

        projects_count = Project.objects.filter(
            client__user=request.user
        ).count()

        tasks_count = Task.objects.filter(
            project__client__user=request.user
        ).count()

        completed_tasks = Task.objects.filter(
            project__client__user=request.user,
            status='Done'
        ).count()

        recent_tasks = Task.objects.filter(
            project__client__user=request.user
        ).order_by('-created_at')[:5]

        completed_projects = Project.objects.filter(
            client__user=request.user,
            status='Completed'
        ).count()

        pending_projects = Project.objects.filter(
            client__user=request.user,
            status='Pending'
        ).count()

        high_priority = Task.objects.filter(
            project__client__user=request.user,
            priority="High"
        ).count()

        medium_priority = Task.objects.filter(
            project__client__user=request.user,
            priority="Medium"
        ).count()

        low_priority = Task.objects.filter(
            project__client__user=request.user,
            priority="Low"
        ).count()

        overdue_tasks = Task.objects.filter(
            project__client__user=request.user,
            due_date__lt=timezone.now().date()
        ).exclude(status="Done").count()

        total_revenue = Invoice.objects.filter(
            client__user=request.user,
            status='Paid'
        ).count()

        pending_invoices = Invoice.objects.filter(
            client__user=request.user,
            status='Pending'
        ).count()
        project_progress = []

        recent_activities = Activity.objects.filter(
            project__client__user=request.user
        ).order_by("-created_at")[:5]



        projects = Project.objects.filter(
            client__user=request.user
        )

        for project in projects:

            total_tasks = Task.objects.filter(
                project=project
            ).count()

            completed = Task.objects.filter(
                project=project,
                status='Done'
            ).count()

            progress = 0

            if total_tasks > 0:
                progress = round((completed / total_tasks) * 100)

            project_progress.append({
                "id": project.id,
                "name": project.title,
                "progress": progress
            })
        return Response({
            "clients": clients_count,
            "projects": projects_count,
            "tasks": tasks_count,
            "completed_tasks": completed_tasks,
            "recent_tasks": [
                {
                    "id": task.id,
                    "title": task.title,
                    "status": task.status
                }
                for task in recent_tasks
            ],
            "completed_projects": completed_projects,
            "pending_projects": pending_projects,
            "project_progress": project_progress,
            "overdue_tasks": overdue_tasks,
            "high_priority": high_priority,
            "medium_priority": medium_priority,
            "low_priority": low_priority,
            "recent_activities": [
                {
                    "id": activity.id,
                    "message": activity.message,
                    "created_at": activity.created_at,
                }
                for activity in recent_activities
            ],
        })