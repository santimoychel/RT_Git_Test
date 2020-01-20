public class AddRecordAndDispInSamePage{
 @AuraEnabled
    public static void insertRecord(AddRecordAndDisplaySamePage__c candidate){
        
     //  System.debug('candidate'+candidate);
          
                INSERT candidate;
              
    }    
    
     @AuraEnabled
    public static List<AddRecordAndDisplaySamePage__c> dispRecord(){
        
        return [select Email__c,Username__c,FirstName__c,LastName__c,Profile__c from AddRecordAndDisplaySamePage__c];
         
    }    
    @AuraEnabled
    public static List<String> getPicklistvalues(String objectName, String field_apiname,Boolean nullRequired){
        //  System.debug('<<<<<<<>>>>>>>');
        //  System.debug('objectName'+objectName);
       //  System.debug('field_apiname'+field_apiname);
       //  System.debug('nullRequired'+nullRequired);
        List<String> optionlist = new List<String>();
        
        Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Map<String, Schema.SObjectField> field_map = gd.get(objectName.toLowerCase()).getDescribe().fields.getMap(); 
        
        List<Schema.PicklistEntry> picklistValues = field_map.get(field_apiname).getDescribe().getPickListValues();
        
        if(nullRequired == true){
            optionlist.add('--None--');
        }
        
        for (Schema.PicklistEntry pv : picklistValues) {
            optionlist.add(pv.getValue());
        }
        System.debug('optionlist'+optionlist);
        return optionlist;
    }

}