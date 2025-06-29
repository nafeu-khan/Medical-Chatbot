from urllib import request
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
import os

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'profile_picture', 'address', 'phone_number', 'bio']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture'),
            address=validated_data.get('address'),
            phone_number=validated_data.get('phone_number'),
            bio=validated_data.get('bio'),
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            raise serializers.ValidationError("Both username and password are required.")

        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password.")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        if not getattr(user, 'is_verified', True):  # If `is_verified` exists, check it.
            raise serializers.ValidationError("Email not verified.")

        data['user'] = user
        return data




class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()  

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username', 'email',
            'profile_picture', 'address', 'phone_number',
            'bio', 'is_verified'
        ]
        read_only_fields = ['is_verified', 'email']

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return '/media/profile_pictures/default/default.png'

    def update(self, instance, validated_data):
        request = self.context.get('request')
        profile_picture = request.FILES.get('profile_picture') if request else None

        if (
            profile_picture and 
            instance.profile_picture and 
            hasattr(instance.profile_picture, 'path') and
            os.path.exists(instance.profile_picture.path) and
            'default.png' not in instance.profile_picture.name
        ):
            try:
                os.remove(instance.profile_picture.path)
            except Exception as e:
                raise serializers.ValidationError({
                    "error": f"Failed to delete old profile picture: {str(e)}"
                })

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if profile_picture:
            instance.profile_picture = profile_picture

        instance.save()
        return instance

      
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError("Old password is not correct")
        return data

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()