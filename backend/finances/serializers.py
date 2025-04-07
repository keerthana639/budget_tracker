from rest_framework import serializers
from .models import Transaction, Budget, Category

# Transaction Serializer
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'  # Include all fields of the Transaction model

# Budget Serializer
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['month', 'total_budget']  # Only include month and total_budget

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'  # Include all fields of the Category model
