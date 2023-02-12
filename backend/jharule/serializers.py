from rest_framework import serializers
from .models import JobHazardDocuments, Steps, Hazards

class JhaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobHazardDocuments
        fields = (
            'uid', 'title', 'company', 'department', 'activity', 
            'author_first', 'author_last', 'supervisor_first', 'supervisor_last',
            'date_reported', 'last_updated', 'required_training', 'required_ppe', 'signatures'
        )

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steps
        fields = ('uid', 'jha_id', 'title', 'step_num', 'description', 'photo')

class HazardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hazards
        fields = ('uid' ,'step_id', 'title', 'risk', 'control')