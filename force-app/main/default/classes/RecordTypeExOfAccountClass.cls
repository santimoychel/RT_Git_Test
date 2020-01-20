public class RecordTypeExOfAccountClass {
    public static void afterInsert(List<Account> lstofacc){
        Map<Id, RecordTypeInfo> recordTypes = Account.SObjectType.getDescribe().getRecordTypeInfosById();
        System.debug('recordTypes'+recordTypes);
        List<Account> voids = new List<Account>();
        for(Account record: lstofacc) {
            if(record.RecordTypeId != null) {
                string recordTypeName = Schema.SObjectType.Account.getRecordTypeInfosById().get(record.recordtypeid).getname();
                System.debug('recordTypeName'+recordTypeName);
                if(recordTypeName == 'Brand') {
                    voids.add(record);
                } else if(recordTypeName == 'Merchant Owner') {
                    voids.add(record);
                }
            }
        }
        Set<Id> setOfAccParentId =  new Set<Id>();
     
         for(Account a:voids){
            setOfAccParentId.add(a.ParentId);
            System.debug('Id>>>>>>>'+a.Id);
            System.debug('ParentId>>>>>>>'+a.ParentId);
            System.debug('Chid Account Name>>>>>>>'+a.Name);
        }
    
       
        List<Account> acc =  [SELECT ID,Status__c,AccountManager__c, Name FROM Account 
                              WHERE Id IN: setOfAccParentId];
        System.debug('acc'+acc);
        List<Account> lstFinal=new List<Account>();
        for(Account a1:acc){
            for(Account a2:voids){
                a1.Status__c=a2.Status__c;
                a1.AccountManager__c=a2.AccountManager__c;
                lstFinal.add(a1);
            }
            
        } 
        System.debug('lstFinal'+lstFinal);
        UPDATE lstFinal;
        
    }
}