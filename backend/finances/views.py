from rest_framework import generics, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum
from django.utils.timezone import now
import logging

from .models import Transaction, Budget, Category
from .serializers import TransactionSerializer, BudgetSerializer, CategorySerializer

# Home endpoint to welcome users to the API
def home(request):
    return HttpResponse("Welcome to the Budget Tracker API!")

# --- AUTH --- 
class RegisterView(APIView):
    def post(self, request):
        # Handle registration logic here
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '').strip()
        print("=== RAW REQUEST DATA ===")
        print(request.data)
        print(f"Username: '{username}'")
        print(f"Password: '{password}'")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=status.HTTP_200_OK)
        
        print("Authentication failed.")
        return Response({'detail': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

# Protected view
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected route."})

# --- TRANSACTIONS ---
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# --- BUDGET ---
class BudgetView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        month = self.request.data.get('month')
        year = self.request.data.get('year')
        if Budget.objects.filter(month=month, year=year, user=self.request.user).exists():
            raise serializers.ValidationError("Budget for this month already exists.")
        serializer.save(user=self.request.user)

class BudgetDetail(generics.RetrieveUpdateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

# --- CATEGORY ---
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

# --- SUMMARY VIEWS ---
class FinancialSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        income = Transaction.objects.filter(user=request.user, type='income').aggregate(Sum('amount'))['amount__sum'] or 0
        expenses = Transaction.objects.filter(user=request.user, type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
        balance = income - expenses
        return Response({
            "income": income,
            "expenses": expenses,
            "balance": balance
        })

class BudgetSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        summary = []
        current_year = now().year

        for month in range(1, 13):
            month_transactions = Transaction.objects.filter(user=user, date__year=current_year, date__month=month)
            income = month_transactions.filter(type='income').aggregate(Sum('amount'))['amount__sum'] or 0
            expenses = month_transactions.filter(type='expense').aggregate(Sum('amount'))['amount__sum'] or 0
            budget_qs = Budget.objects.filter(user=user, month=month, year=current_year).first()
            budget_amount = budget_qs.amount if budget_qs else 0

            summary.append({
                'month': now().replace(month=month).strftime('%b'),
                'income': income,
                'expenses': expenses,
                'budget': budget_amount
            })

        return Response(summary)
