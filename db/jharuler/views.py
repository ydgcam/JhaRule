import json
from django.shortcuts import render
from .serializers import JhaSerializer, StepSerializer, HazardSerializer 
from rest_framework import viewsets      
from .models import JobHazardDocument, Step, Hazard         
from django.http import JsonResponse    
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


class JhasView(viewsets.ModelViewSet):  
    serializer_class = JhaSerializer 
    queryset = JobHazardDocument.objects.all().order_by('-last_updated')
class StepsView(viewsets.ModelViewSet):  
    serializer_class = StepSerializer   
    queryset = Step.objects.all() 
    parser_classes = (MultiPartParser, FormParser, JSONParser)
class HazardsView(viewsets.ModelViewSet):  
    serializer_class = HazardSerializer   
    queryset = Hazard.objects.all() 

def allJhaUids(request): 
    uids = list(JobHazardDocument.objects.values_list('uid', flat=True))
    return JsonResponse(uids, safe=False)

## Dates and List types are not supported
def queryJhasByCol(request, column_name, value):
    query = {column_name: value}
    jha_list = list(JobHazardDocument.objects.all().filter(**query).values())
    return JsonResponse(jha_list, safe=False)
    
def getStepsForJha(request, jha_id):
    step_list = list(Step.objects.all().filter(jha_id=jha_id).order_by('step_num').values())
    return JsonResponse(step_list, safe=False)

def getHazardsForStep(request, step_id):
    hazard_list = list(Hazard.objects.all().filter(step_id=step_id).values())
    return JsonResponse(hazard_list, safe=False)