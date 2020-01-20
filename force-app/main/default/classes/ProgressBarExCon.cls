public class ProgressBarExCon {
    @AuraEnabled
    public static  list<Contact> showDispData()
    {
        // List<Account> name=new List<Account>([SELECT NAME FROM ACCOUNT]);
        //   System.debug('ListofContactDetails'+name);
        list<Contact> ListofContactDetails = new list<Contact>([SELECT Id,Name,PathPickList__c FROM CONTACT WHERE PathPickList__c ='Platinum']);
      
        System.debug('ListofContactDetails'+ListofContactDetails);
        return ListofContactDetails;
    }
}