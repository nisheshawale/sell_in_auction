from rest_framework import viewsets, permissions
from .serializers import AuctionItemsSerializer
from .models import AuctionItems

#from rest_framework.parsers import MultiPartParser, FormParser


class AuctionItemsViewSet(viewsets.ModelViewSet):
    #parser_classes = (MultiPartParser, FormParser)

    serializer_class = AuctionItemsSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.items.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
