from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Transaction, Budget, Category
from .serializers import TransactionSerializer, BudgetSerializer, CategorySerializer
from django.http import HttpResponse
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import logging
from rest_framework.views import APIView
from rest_framework.response import Response

class FinancialSummaryView(APIView):
    def get(self, request):
        # your summary logic here
        return Response({
            "income": 1000,
            "expenses": 600,
            "balance": 400
        })

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        logging.info(f"Attempting to authenticate user: {username}")
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=status.HTTP_200_OK)
        logging.warning(f"Authentication failed for user: {username}")
        return Response({'detail': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
# Home endpoint to welcome users to the API
def home(request):
    return HttpResponse("Welcome to the Budget Tracker API!")

# Transaction List & Create View
class TransactionList(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter transactions for the logged-in user
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save the transaction with the authenticated user
        serializer.save(user=self.request.user)

# Transaction Detail View (Retrieve, Update, Delete)
class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter transactions for the logged-in user
        return Transaction.objects.filter(user=self.request.user)

# Budget List & Create View
class BudgetView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter budgets for the logged-in user
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure that the budget is only created for a unique month/year
        month = self.request.data.get('month')
        year = self.request.data.get('year')
        if Budget.objects.filter(month=month, year=year).exists():
            return Response({"error": "Budget for this month already exists."}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save(user=self.request.user)

# Budget Detail View (Update)
class BudgetDetail(generics.RetrieveUpdateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter budgets for the logged-in user
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Category List & Create View
class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter categories for the logged-in user
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Category Detail View (Retrieve, Update, Delete)
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter categories for the logged-in user
        return Category.objects.filter(user=self.request.user)

