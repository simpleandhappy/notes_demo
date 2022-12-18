from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.CharField(max_length=50, null=True, blank=True) #can set empty notes just for the demo
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True) #auto_now_add only takes creation time

    def __str__(self):
        return self.body
