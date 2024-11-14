from django.urls import path
from .views import create_image, delete_image, get_image


urlpatterns = [
    path('images/create/', create_image, name='create_image'),  # URL for creating an image
    path('images/<int:pk>/', delete_image, name='delete_image'), # URL for deleting an image
    path('images/<int:pk>/', get_image, name="get_image")
]