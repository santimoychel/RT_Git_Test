public class customLookUpController {
 @AuraEnabled
    public static List < String > fetchLookUpValues(String searchKeyWord) {
        //   system.debug('ObjectName-->' + ObjectName);
        String searchKey = searchKeyWord + '%';
             List < String > returnList = new List < String > ();
        Map<string,Schema.sObjectType> AllObjMap = new Map<string,Schema.sObjectType>();
        AllObjMap = Schema.getGlobalDescribe();
        for(string s : AllObjMap.keyset() ){
            if(!s.contains('__')){
                System.debug('------------>'+s);
                  returnList.add(s);
            }
        }
        return returnList;
    }
}