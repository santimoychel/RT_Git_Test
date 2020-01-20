public class DisplayContactListEveryAccountClass {
    
    @AuraEnabled
    public static List<AccountWithRelatedContacts> getAccountWithRelatedContacts() {
        Map<Id, Contact> mapOfAccIdWithContact =  new Map<Id,Contact>();
        Map<Id,Account> mapOfAccIdWithAccount =  new Map<Id,Account>();
        
        List<AccountWithRelatedContacts> lstOfRecords =  new List<AccountWithRelatedContacts>();
        
        for(Contact conObj : [SELECT Name, ACCOUNTID,PHONE,MOBILEPHONE,EMAIL
                              FROM Contact])
        {
            mapOfAccIdWithContact.put(conObj.ACCOUNTID,conObj); 
            //  System.debug('mapOfAccIdWithContact'+mapOfAccIdWithContact);   
        }
        for(Account accObj : [SELECT ID, Name
                              FROM Account])
        {
            mapOfAccIdWithAccount.put(accObj.Id,accObj);                                      
            //  System.debug('accObj'+accObj);                     
        }
     
        List<Contact> lstDataCon =  new List<Contact>();
        lstDataCon.addAll(mapOfAccIdWithContact.Values());
        System.debug('lstDataCon '+lstDataCon);
        
      /*  String accName;
        if(mapOfAccIdWithAccount.size() > 0){
            accName=String.valueOf(mapOfAccIdWithAccount);
            
        }*/
        
     //   System.debug('accName '+accName);
        
       // AccountWithRelatedContacts obj=new AccountWithRelatedContacts(accName,lstDataCon);
        lstOfRecords.add(new AccountWithRelatedContacts(lstDataCon,mapOfAccIdWithAccount));
        System.debug('lstOfRecords'+lstOfRecords);
        return lstOfRecords;
    }  
    
    Public class AccountWithRelatedContacts{
        @AuraEnabled 
        Public Map<Id,Account> accName;
        
        @AuraEnabled
        Public List<Contact> lstOfRelatedContacts;
        
        AccountWithRelatedContacts( List<Contact>lstOfRelatedContacts,Map<Id,Account> accName){
            this.accName = accName;
            this.lstOfRelatedContacts = lstOfRelatedContacts;
            
        }
    }
}