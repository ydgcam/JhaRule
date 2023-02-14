from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from os.path import join

#!! Documentation for the data type definitions
#!! of these models are contained in /src/types

class JobHazardDocument(models.Model):
    uid = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=100)
    department = models.CharField(null=True, blank=True, max_length=40)
    activity = models.CharField(max_length=255)
    author_first = models.CharField(max_length=35)
    author_last = models.CharField(max_length=35)
    supervisor_first = models.CharField(blank=True, null=True, max_length=35)
    supervisor_last = models.CharField(blank=True, null=True, max_length=35)
    date_reported = models.DateField()
    last_updated = models.DateField(blank=True, auto_now=True)
    required_training = models.JSONField(blank=True, null=True) # JSONField supports list types
    required_ppe = models.JSONField(blank=True, null=True)
    signatures = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.title
    def get_id(self):
        return self.uid

class Step(models.Model):

    #Used to determine where to store an uploaded photo in database
    def get_photo_path(instance, filename):
        return join('photos', 'doc_%s' % instance.jha_id, 
                    'step_%s' % instance.uid, filename)

    uid = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=255)
    jha_id = models.ForeignKey('JobHazardDocument', on_delete=models.CASCADE)
    step_num = models.PositiveSmallIntegerField(blank=True, validators=[MaxValueValidator(100), MinValueValidator(1)])
    description = models.TextField(blank=True, null=True, max_length=500)
    photo = models.ImageField(blank=True, null=True, upload_to=get_photo_path)

    def __str__(self):
        return self.title
    def get_id(self):
        return self.uid


class Hazard(models.Model):

    uid = models.UUIDField(primary_key=True)
    step_id = models.ForeignKey('Step', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    risk = models.TextField(max_length=500)
    control = models.TextField(max_length=500)

    def __str__(self):
        return self.title
    def get_id(self):
        return self.uid