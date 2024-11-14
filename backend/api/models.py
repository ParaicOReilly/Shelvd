from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Review(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "reviews")
    
class Image(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    position = models.IntegerField
    image = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete = models.CASCADE)