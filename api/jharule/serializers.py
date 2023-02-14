from rest_framework import serializers
from .models import JobHazardDocument, Step, Hazard

class JhaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobHazardDocument
        fields = (
            'uid', 'title', 'company', 'department', 'activity', 
            'author_first', 'author_last', 'supervisor_first', 'supervisor_last',
            'date_reported', 'last_updated', 'required_training', 'required_ppe', 'signatures'
        )

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ('uid', 'jha_id', 'title', 'step_num', 'description', 'photo')

class HazardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hazard
        fields = ('uid' ,'step_id', 'title', 'risk', 'control')