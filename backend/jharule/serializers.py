from rest_framework import serializers
from .models import JobHazardDocuments, Steps, Hazards

class JhaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobHazardDocuments
        fields = ('id' ,'title', 'author', 'dateRecorded', 'datePosted')

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = ('id', 'jha', 'title', 'stepNum', 'description')

class HazardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hazards
        fields = ('id' ,'step', 'risk', 'control')