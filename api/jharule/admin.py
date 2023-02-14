from django.contrib import admin
from .models import JobHazardDocument

class JhaAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')
  
admin.site.register(JobHazardDocument, JhaAdmin)