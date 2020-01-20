public class DisplayAllObjectInPickListClass {
    @AuraEnabled
    public static List<String> getObjectOptions(){
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
        List<String> lObj=new List<String>();
        for(Schema.SObjectType thisObj : gd.values()) {
            
            lObj.add(String.valueOf(thisObj) );
            lObj.sort();
        }
        System.debug(lObj);
        return lObj;
    }
    @AuraEnabled
    public static List<wrapAccount> getApiName(String sobj){
        
        
        System.debug('>>>sobj>>>>'+sobj);
        // Creating List for Wrapper class
        List<wrapAccount> lstw = new List<wrapAccount>();
        
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Schema.SObjectType leadSchema = schemaMap.get(sobj);
        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
     
        for (String fieldName: fieldMap.keySet()) {
            System.debug('>>>>>>>'+fieldMap.get(fieldName).getDescribe().getLabel());
            System.debug('>>>>>>>'+fieldMap.get(fieldName).getDescribe().getType());
            System.debug('##Field API Name='+fieldName);
            lstw.add(new wrapAccount(fieldMap.get(fieldName).getDescribe()));
             // lstw.sort();
        }
        
        return lstw;
    }
    
    public class wrapAccount{
        @AuraEnabled
        public String sLabel;
        @AuraEnabled
        public String sLabelApi;
        @AuraEnabled
        public String sLabelType;
        @AuraEnabled
        public Boolean required;
        // Wrapper class constructor
        
        public wrapAccount(Schema.DescribeFieldResult dfr){
            this.sLabel = dfr.getLabel();
            this.sLabelApi = dfr.getName();
            this.sLabelType = String.valueOF(dfr.getType());
            this.required = dfr.isNillable();
        }
        
    }
}