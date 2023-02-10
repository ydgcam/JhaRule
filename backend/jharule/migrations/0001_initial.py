# Generated by Django 4.1.6 on 2023-02-10 12:27

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='JobHazardDocuments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('author', models.CharField(max_length=80)),
                ('dateRecorded', models.DateTimeField(verbose_name='date last updated')),
                ('datePosted', models.DateTimeField(verbose_name='date posted')),
            ],
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stepNum', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(100), django.core.validators.MinValueValidator(1)])),
                ('title', models.CharField(max_length=80)),
                ('description', models.TextField(max_length=500)),
                ('jha', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jharule.jobhazarddocuments')),
            ],
        ),
        migrations.CreateModel(
            name='Hazard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('risk', models.CharField(max_length=100)),
                ('control', models.TextField(max_length=500)),
                ('step', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jharule.step')),
            ],
        ),
    ]
