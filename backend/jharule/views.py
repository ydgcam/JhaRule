from django.shortcuts import render
from .serializers import JhaSerializer 
from rest_framework import viewsets      
from .models import JobHazardDocuments                 

class JhaView(viewsets.ModelViewSet):  
    serializer_class = JhaSerializer   
    queryset = JobHazardDocuments.objects.all()   