# backend/budget_tracker/urls.py

from django.contrib import admin
from django.urls import path, include
from finances.views import home

urlpatterns = [
    path('admin/', admin.site.urls),        # Django admin interface
    path('', home, name='home'),            # Home view
    path('api/', include('finances.urls')), # Include all API routes from finances/urls.py
]
