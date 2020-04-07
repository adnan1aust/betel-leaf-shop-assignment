public with sharing class BetelLeavesController {
    @AuraEnabled
    public static List<paan__c> getRecords() {
        List<paan__c> records =
                [SELECT Id, Name, origin__c, price_per_leaf__c, quality__c, sold_quantity__c, stock_quantity__c, Description__c, cumilitive_quantity__c FROM paan__c];
        return records;
    }

    @AuraEnabled
    public static paan__c createBetelLeafType(paan__c betelLeafType){
        if(betelLeafType.cumilitive_quantity__c == 0 && betelLeafType.stock_quantity__c  > 0){
            betelLeafType.cumilitive_quantity__c = betelLeafType.stock_quantity__c ;
        }
        insert betelLeafType;
        return betelLeafType;
    }

    @AuraEnabled
    public static List<paan__c> searchRecords(String searchText){
        searchText = searchText + '%';
        List<paan__c> records = new List<paan__c>([SELECT Id, Name, origin__c, price_per_leaf__c, quality__c, sold_quantity__c, stock_quantity__c, Description__c, cumilitive_quantity__c FROM paan__c Where 
        Name like :searchText]);   
        return records;
    }

    @AuraEnabled
    public static List<paan__c> getRecordsById(List<String> idList){
        List<paan__c> records = new List<paan__c>([SELECT Id, Name, origin__c, price_per_leaf__c, quality__c, sold_quantity__c, stock_quantity__c, Description__c, cumilitive_quantity__c FROM paan__c where Id in : idList]);
        return records;
    }

 
    @AuraEnabled
    public static shopping_cart__c saveShoppingCart(shopping_cart__c shoppingCart){
        List<String> Ids = shoppingCart.Name.split(',');
        List<paan__c> records = getRecordsById(Ids);
        List<String> amounts = shoppingCart.amount__c.split(',');

        for(Integer i= 0; i< records.size(); i++){
            records[i].sold_quantity__c = Integer.valueof(amounts[i]);
            records[i].stock_quantity__c -= Integer.valueof(amounts[i]);
        }
        update records;
        insert shoppingCart;
        return shoppingCart;
    }   
}
