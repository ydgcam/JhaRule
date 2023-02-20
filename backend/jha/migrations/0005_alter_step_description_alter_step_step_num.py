# Generated by Django 4.1.6 on 2023-02-19 09:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jha', '0004_alter_jobhazarddocument_last_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='step',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='step',
            name='step_num',
            field=models.PositiveSmallIntegerField(validators=[django.core.validators.MaxValueValidator(25), django.core.validators.MinValueValidator(1)]),
        ),
    ]