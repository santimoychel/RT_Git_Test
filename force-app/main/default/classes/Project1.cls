public class Project1 {
@AuraEnabled  
    public static List<Object> getObjRslts(String objName,String fieldSetName) {  
        String qry;
        if(objName.equals('Account')){
                qry = 'Select Name,AccountNumber,OwnerId,AnnualRevenue,BillingAddress,Industry,Phone  From ' + objName + ' Limit 7';  
          
				System.debug('Account---qry'+qry);             
        }
        else if(objName.equals('Opportunity')){
                  qry = 'Select AccountId,Amount,CloseDate,ContractId,Name,StageName  From ' + objName + ' Limit 7';    
                   System.debug('Opportunity---qry'+qry);    
        }
           List<Object> lstRcds = Database.query(qry);  
           return lstRcds; 
    }  
}