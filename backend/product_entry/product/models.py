from django.db import models

class Product(models.Model):
    product = models.CharField(max_length=10)
    weekday = models.CharField(max_length=10)
    quantity = models.IntegerField()



