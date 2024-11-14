from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ReviewSerializer, ImageSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Image, Review
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status


# These calls create the Image on the shelf, which is linked to a user.
# class CreateImage(generics.ListCreateAPIView):
#     serializer_class = ImageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Image.objects.filter(author=user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)

# class ImageDelete(generics.DestroyAPIView):
#     serializer_class = ImageSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Image.objects.filter(author=user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_image(request):
    """Create a new Image linked to the authenticated user."""
    serializer = ImageSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the image with the author set to the current user
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_image(request,pk):
    try:
        image = Image.objects.get(pk=pk, author=request.user)
        serializer = ImageSerializer(image)  # Serialize the image
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Image.DoesNotExist:
        return Response({'error': 'Image not found or not authorized to delete'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_image(request, pk):
    """Delete an Image linked to the authenticated user."""
    try:
        image = Image.objects.get(pk=pk, author=request.user)
    except Image.DoesNotExist:
        return Response({'error': 'Image not found or not authorized to delete'}, status=status.HTTP_404_NOT_FOUND)

    image.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# These calls Create a Review which is linked to a user AND an Image
class ReviewCreate(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Review.objects.filter(author = user)

# Create your views here.
# Generic View, built in to django, automatically handles creating new users/objects
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
