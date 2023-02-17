"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from jha import views

router = routers.DefaultRouter()                   
router.register(r'jhas', views.JhasView)
router.register(r'steps', views.StepsView)   
router.register(r'hazards', views.HazardsView) 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),   
    path('jhas/<str:jha_id>/steps', views.getStepsForJha, name='getStepsForJha'),
    path('jhas/<str:column_name>/<str:value>', views.queryJhasByCol, name='queryJhasByCol'),
    path('steps/<str:step_id>/hazards', views.getHazardsForStep, name='getHazardsForStep'),          
]