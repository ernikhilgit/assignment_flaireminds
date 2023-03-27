# Generated by Django 4.1.7 on 2023-03-25 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=10)),
                ('weekday', models.CharField(max_length=10)),
                ('quantity', models.IntegerField()),
            ],
        ),
    ]
