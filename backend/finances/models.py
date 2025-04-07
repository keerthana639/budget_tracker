from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, related_name='categories', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    INCOME = 'income'
    EXPENSE = 'expense'

    TRANSACTION_TYPES = [
        (INCOME, 'Income'),
        (EXPENSE, 'Expense'),
    ]

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='transactions', on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPES)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='transactions', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.transaction_type.capitalize()}: {self.amount} on {self.date}"

class Budget(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    user = models.ForeignKey(User, related_name='budgets', on_delete=models.CASCADE)

    def __str__(self):
        return f"Budget for {self.month}/{self.year}"

    @property
    def total_income(self):
        return Transaction.objects.filter(transaction_type='income', date__month=self.month, date__year=self.year, user=self.user).aggregate(models.Sum('amount'))['amount__sum'] or 0

    @property
    def total_expenses(self):
        return Transaction.objects.filter(transaction_type='expense', date__month=self.month, date__year=self.year, user=self.user).aggregate(models.Sum('amount'))['amount__sum'] or 0

    @property
    def balance(self):
        return self.total_income - self.total_expenses
