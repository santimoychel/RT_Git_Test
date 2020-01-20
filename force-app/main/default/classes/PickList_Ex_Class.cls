public class PickList_Ex_Class {
 @AuraEnabled
    public static void insertRecord(AddRecordAndDisplaySamePage__c candidate){
        
     //  System.debug('candidate'+candidate);
          
                INSERT candidate;
              
    }    
    
     @AuraEnabled
    public static List<AddRecordAndDisplaySamePage__c> dispRecord(){
        //system.debug('>>>>>values>>>>>'+ [select Email__c,Username__c,FirstName__c,LastName__c,Profile__c from AddRecordAndDisplaySamePage__c]);
        return [select Email__c,Username__c,FirstName__c,LastName__c,Profile__c from AddRecordAndDisplaySamePage__c];
         
    }    
    
     @AuraEnabled
    //get Account Industry Picklist Values
    public static Map<String, String> getIndustry(){
             System.debug('options');
        Map<String, String> options = new Map<String, String>();
        //get Account Industry Field Describe
        Schema.DescribeFieldResult fieldResult = AddRecordAndDisplaySamePage__c.Profile__c.getDescribe();
        //get Account Industry Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
           System.debug('options'+options);
        return options;
    }    
}