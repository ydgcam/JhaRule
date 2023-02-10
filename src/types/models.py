from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class JobHazardDocuments(models.Model):
    title = models.CharField(max_length=80)
    author = models.CharField(max_length=80)
    dateRecorded = models.DateTimeField('date last updated')
    datePosted = models.DateTimeField('date posted')
    
class Step(models.Model):
    jha = models.ForeignKey(JobHazardDocuments, on_delete=models.CASCADE)
    stepNum = models.IntegerField(default=1,validators=[MaxValueValidator(100), MinValueValidator(1)])
    title = models.CharField(max_length=80)
    description = models.TextField(max_length=500)

class Hazard(models.Model):
    step = models.ForeignKey(Step, on_delete=models.CASCADE)
    risk = models.CharField(max_length=100)
    control = models.TextField(max_length=500)
