from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def save(self, *args, **kwargs):
        # 🔒 HARD SAFETY: prevent accidental admin assignment
        if not self.is_superuser:
            self.is_staff = False

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username