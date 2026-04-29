from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'username',
            'email',
            'phone_number',
            'profile_image',
            'password'
        ]

    # ✅ CREATE
    def create(self, validated_data):
        password = validated_data.pop('password', None)

        user = User(**validated_data)

        if password:
            user.set_password(password)

        # 🔒 FORCE NORMAL USER (VERY IMPORTANT)
        user.is_staff = False
        user.is_superuser = False

        user.save()
        return user

    # ✅ UPDATE
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance