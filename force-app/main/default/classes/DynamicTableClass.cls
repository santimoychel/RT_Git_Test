public class DynamicTableClass {
    @AuraEnabled
    public static String getFieldSet(String sObjectName, String fieldSetName) {
        String result = '';
        try{
            SObjectType objToken = Schema.getGlobalDescribe().get(sObjectName);
            Schema.DescribeSObjectResult d = objToken.getDescribe();
            Map<String, Schema.FieldSet> FsMap = d.fieldSets.getMap();
            system.debug('>>>>>>> FsMap >>> ' + FsMap);
            if(FsMap.containsKey(fieldSetName))
                for(Schema.FieldSetMember f : FsMap.get(fieldSetName).getFields()) {
                    if(result != ''){
                        result += ',';
                    }
                    String jsonPart = '{';
                    jsonPart += '"label":"' + f.getLabel() + '",';
                    jsonPart += '"required":"' + (f.getDBRequired() || f.getRequired()) + '",';
                    jsonPart += '"type":"' + (f.getType()) + '",';
                    jsonPart += '"name":"' + f.getFieldPath() + '"';
                    jsonPart += '}';
                    result += jsonPart;
                }
        }
        catch(Exception e){
            result += e.getLineNumber() + ' : ' + e.getMessage();
        }
        return '['+result+']';
    }
    
    @AuraEnabled
    public static String getRecords(String sObjectName, String fieldNameJson){
        System.debug('sObjectName'+sObjectName);
        
        System.debug('fieldNameJson'+fieldNameJson);
        List<sObject> lstResult = new List<sObject>();
        String result = '[]';
        
        List<String> fieldNames = (List<String>) JSON.deserialize(fieldNameJson, List<String>.class);
        Set<String> setFieldNames = new Set<String>();
        String query = 'SELECT ' + String.join(fieldNames, ',') + ' FROM ' + sObjectName;
        
        
        System.debug('query'+query);
        for(sObject s : Database.query(query)){
            lstResult.add(s);
            System.debug('lstResult'+lstResult);
        }
        if(lstResult.size() > 0) {
            result = JSON.serialize(lstResult);
            System.debug('result'+result);
        }
       
        return result;
    }
   
}