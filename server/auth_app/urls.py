from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView
from django.urls import path

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('forgot-password/', PasswordResetRequestView.as_view(), name='forgot_password'),
    path('reset-password/', PasswordResetConfirmView.as_view(), name='reset_password'),
    path('verify_token/', verify_token, name='verify_token'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),  
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('test/', TestView.as_view(), name='test'),  # Example test view
]
