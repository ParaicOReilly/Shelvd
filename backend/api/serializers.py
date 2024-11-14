from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Review, Image

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ["id", "username","password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
            
        return user
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields= ["id", "title", "author", "image", "user"]
        extra_kwargs = {"author": {"read_only": True}}