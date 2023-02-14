from django.shortcuts import render
from .serializers import JhaSerializer, StepSerializer, HazardSerializer 
from rest_framework import viewsets      
from .models import JobHazardDocument, Step, Hazard         
from django.http import HttpResponse, HttpRequest        

class JhaView(viewsets.ModelViewSet):  
    serializer_class = JhaSerializer   
    queryset = JobHazardDocument.objects.all()   
class StepView(viewsets.ModelViewSet):  
    serializer_class = StepSerializer   
    queryset = Step.objects.all() 
class HazardView(viewsets.ModelViewSet):  
    serializer_class = HazardSerializer   
    queryset = Hazard.objects.all() 

def getStepsForJha(request, jha):
    step_list = Step.objects.all().filter(jha_id=jha).order_by('step_num').values()
    output = list(step_list)
    return HttpResponse(output)