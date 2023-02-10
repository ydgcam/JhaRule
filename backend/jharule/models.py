from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class JobHazardDocuments(models.Model):
    title = models.CharField(max_length=80)
    author = models.CharField(max_length=80)
    dateRecorded = models.DateTimeField('date last updated')
    datePosted = models.DateTimeField('date posted')
    def __str__(self):
        return self.title

    
class Steps(models.Model):
    jha = models.ForeignKey(JobHazardDocuments, on_delete=models.CASCADE)
    stepNum = models.IntegerField(default=1,validators=[MaxValueValidator(100), MinValueValidator(1)])
    title = models.CharField(max_length=80)
    description = models.TextField(max_length=500)
    def __str__(self):
        return self.title


class Hazards(models.Model):
    step = models.ForeignKey(Steps, on_delete=models.CASCADE)
    risk = models.CharField(max_length=100)
    control = models.TextField(max_length=500)
    def __str__(self):
        return self.risk

