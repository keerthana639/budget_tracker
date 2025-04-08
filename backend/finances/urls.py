# finances/urls.py
from django.urls import path, include
from .views import (
    TransactionList,
    TransactionDetail,
    BudgetDetail,
    CategoryList,
    FinancialSummaryView,
    ProtectedView,
     home, 
)
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import LoginView, BudgetView,CategoryDetail
from .views import CustomTokenObtainPairView

urlpatterns = [
    path('', home, name='home'),
    path('api/financial-summary/', FinancialSummaryView.as_view(), name='financial-summary'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/protected/', ProtectedView.as_view(), name='protected'),  # The protected route
    path('api/transactions/', TransactionList.as_view(), name='transaction-list'),
    path('api/transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),
    path('api/budget/', BudgetView.as_view(), name='budget-list'),
    path('api/budget/<int:pk>/', BudgetDetail.as_view(), name='budget-detail'),
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
