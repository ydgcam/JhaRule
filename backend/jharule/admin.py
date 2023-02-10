from django.contrib import admin
from .models import JobHazardDocuments

class JhaAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')
  
admin.site.register(JobHazardDocuments, JhaAdmin)