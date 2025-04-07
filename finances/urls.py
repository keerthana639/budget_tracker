# backend/budget_tracker/urls.py
from django.urls import path
from finances.views import TransactionList, TransactionDetail, BudgetDetail, CategoryList, home, LoginView
from .views import FinancialSummaryView
urlpatterns = [
    path('', home),
    path('api/transactions/', TransactionList.as_view(), name='transaction-list'),
    path('api/transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),
    path('api/budget/', BudgetDetail.as_view(), name='budget-detail'),
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/financial-summary/', FinancialSummaryView.as_view(), name='financial-summary'),
]
