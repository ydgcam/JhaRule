import json
from django.shortcuts import render
from .serializers import JhaSerializer, StepSerializer, HazardSerializer 
from rest_framework import viewsets      
from .models import JobHazardDocument, Step, Hazard         
from django.http import JsonResponse        

class JhaView(viewsets.ModelViewSet):  
    serializer_class = JhaSerializer 
    queryset = JobHazardDocument.objects.all()
class StepView(viewsets.ModelViewSet):  
    serializer_class = StepSerializer   
    queryset = Step.objects.all() 
class HazardView(viewsets.ModelViewSet):  
    serializer_class = HazardSerializer   
    queryset = Hazard.objects.all() 

def getStepsForJha(request, jha_id):
    step_list = list(Step.objects.all().filter(jha_id=jha_id).order_by('step_num').values())
    return JsonResponse(step_list, safe=False)

def getHazardsForStep(request, step_id):
    hazard_list = list(Hazard.objects.all().filter(step_id=step_id).values())
    return JsonResponse(hazard_list, safe=False)