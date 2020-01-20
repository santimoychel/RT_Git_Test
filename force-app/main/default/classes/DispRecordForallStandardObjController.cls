public class DispRecordForallStandardObjController {
   /* @AuraEnabled
    public static String getOppName( String currentRecId,String sObejctName){
        
        String query1 ='SELECT '+  'NAME'+ 
            ' FROM  '+sObejctName+
            ' WHERE Id =: currentRecId'; 
     
        return query1 ;  
    }*/
    
    @AuraEnabled
    public static WrappReturn getContact(String sObejctName, String fieldSetName, String currentRecId){
        
       // System.debug('>>>>>sObejctName>>>>>'+sObejctName);
       // System.debug('>>>>>fieldSetName>>>>>'+fieldSetName);
       // System.debug('>>>currentRecId>>>>>>>'+currentRecId);
        
        //List<warpFieldsWithValue> dataBasedOnCurrentRecId =  new List<warpFieldsWithValue>();
        List<String> lstOfFieldApiNames =  new List<String>();
        Map<String, Schema.SObjectType> GlobalDescribeMap = Schema.getGlobalDescribe(); 
        // System.debug('>>>GlobalDescribeMap>>>'+GlobalDescribeMap);
        Schema.SObjectType SObjectTypeObj = GlobalDescribeMap.get(sObejctName);
        //  System.debug('>>>SObjectTypeObj>>>'+SObjectTypeObj);
        Schema.DescribeSObjectResult DescribeSObjectResultObj = SObjectTypeObj.getDescribe();
        //  System.debug('>>>DescribeSObjectResultObj>>>'+DescribeSObjectResultObj);
        List<WrapperFields> wrapFldsList = new List<WrapperFields>();
        //  System.debug('>>>wrapFldsList>>>'+wrapFldsList);
        Schema.FieldSet fieldSetObj = DescribeSObjectResultObj.FieldSets.getMap().get(fieldSetName);
        //  System.debug('>>>>>>'+fieldSetObj.getFields());
        
        
        for(Schema.FieldSetMember obj : fieldSetObj.getFields()){
            
            String fldApiName = String.valueOf(obj.getFieldPath());
            String fldLabel = obj.getLabel();
            String fldType = String.valueOf(obj.getType());
            
            if(obj.getType() == Schema.DisplayType.REFERENCE){
                if(fldApiName.endsWithIgnoreCase('Id')){ // AccountId
                    fldApiName = fldApiName.removeEndIgnoreCase('Id')+'.Name';
                }else if(fldApiName.endsWithIgnoreCase('__c')){
                    fldApiName = fldApiName.removeEndIgnoreCase('__c')+'__r.Name';
                }
            }
            lstOfFieldApiNames.add(fldApiName);
            wrapFldsList.add(new WrapperFields(fldLabel, fldApiName, fldType));
        }
        
        System.debug('<<<<<<<<<lstOfFieldApiNames>>>>>>>>'+lstOfFieldApiNames);
        String query = 'SELECT '+ String.join(lstOfFieldApiNames, ',')+ 
            ' FROM  '+sObejctName+
            ' WHERE Id =: currentRecId';
        System.debug('dataObject-->'+query);
        Sobject dataObject =  Database.query(query);
        System.debug('dataObject-->'+query);
        return new WrappReturn(dataObject, wrapFldsList);
    }
    public class WrappReturn{
        @AuraEnabled
        public sObject record;
       
        @AuraEnabled
        public List<WrapperFields> wrapFldsList;
        public  WrappReturn(sObject record, List<WrapperFields> wrapFldsList){
            this.record = record;
            this.wrapFldsList = wrapFldsList;
        }
      
    }
    public class WrapperFields{
        @AuraEnabled
        public String fieldLabel;
        @AuraEnabled
        public String fldApiName;
        @AuraEnabled
        public String fldType;
        public WrapperFields(String fieldLabel,String fldApiName, String fldType){
            this.fieldLabel = fieldLabel;
            this.fldApiName = fldApiName;
            this.fldType = fldType;
        }
    }
    
}