# finances/urls.py
from django.urls import path, include
from .views import (
    TransactionList,
    TransactionDetail,
    BudgetDetail,
    CategoryList,
    FinancialSummaryView,
    ProtectedView,  # Import your ProtectedView here
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('transactions/', TransactionList.as_view(), name='transaction-list'),
    path('transactions/<int:pk>/', TransactionDetail.as_view(), name='transaction-detail'),
    path('budgets/', BudgetDetail.as_view(), name='budget-detail'),
    path('categories/', CategoryList.as_view(), name='category-list'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('financial-summary/', FinancialSummaryView.as_view(), name='financial-summary'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/protected/', ProtectedView.as_view(), name='protected'),  # Protected route
]
