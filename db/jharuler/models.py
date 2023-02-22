from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from os.path import join

#!! Documentation for the data type definitions
#!! of these models are contained in /src/types

class JobHazardDocument(models.Model):
    uid = models.TextField(primary_key=True)
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=100)
    department = models.CharField(null=True, blank=True, max_length=40)
    activity = models.CharField(max_length=255)
    author = models.CharField(default='First Last', max_length=70)
    supervisor = models.CharField(blank=True, null=True, max_length=70)
    date_reported = models.DateField()
    last_updated = models.DateTimeField(blank=True, auto_now=True)
    required_training = models.JSONField(blank=True, null=True) # JSONField supports list types
    required_ppe = models.JSONField(blank=True, null=True)
    signatures = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.uid
    def get_title(self):
        return self.title

class Step(models.Model):

    uid = models.TextField(primary_key=True)
    title = models.CharField(max_length=255)
    jha_id = models.ForeignKey('JobHazardDocument', on_delete=models.CASCADE)
    step_num = models.PositiveSmallIntegerField(validators=[MaxValueValidator(25), MinValueValidator(1)])
    description = models.TextField(blank=True, null=True)

    #Used to determine where to store an uploaded photo in database
    def get_photo_path(instance, filename):
        return join('%s' % instance.jha_id, '%s' % instance.uid, filename)

    photo = models.ImageField(blank=True, upload_to=get_photo_path)

    def __str__(self):
        return self.uid
    def get_title(self):
        return self.title


class Hazard(models.Model):

    uid = models.TextField(primary_key=True)
    step_id = models.ForeignKey('Step', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    risk = models.TextField(max_length=500)
    control = models.TextField(max_length=500)

    def __str__(self):
        return self.uid
    def get_title(self):
        return self.title