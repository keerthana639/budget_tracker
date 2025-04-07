from django.contrib import admin
from django.urls import path, include
from finances import views  # Import the views from your finances app
from finances.views import LoginView,TransactionList, TransactionDetail, BudgetView, BudgetDetail, CategoryList, CategoryDetail, home


urlpatterns = [
    path('', home, name='home'),  # Home endpoint
    path('api/transactions/', TransactionList.as_view(), name='transaction-list'),  # List and create transactions
    path('api/transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),  # Retrieve, update, delete a transaction
    path('api/budgets/', BudgetView.as_view(), name='budget-list-create'),  # List and create budgets
    path('api/budgets/<int:pk>/', BudgetDetail.as_view(), name='budget-detail'),  # Retrieve and update budget
    path('api/categories/', CategoryList.as_view(), name='category-list-create'),  # List and create categories
    path('api/categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),  # Retrieve, update, delete category
    path('api/login/', LoginView.as_view(), name='login'),  # Add this line
]
