global class Batch_ProjectEx  implements Database.Batchable<sObject>{
    
    global boolean status=true;
    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([SELECT Status__c,CloseDate__c,ProjectRunningDate__c
                                         FROM Batch_Project__c
                                        WHERE CloseDate__c <=: date.today()]);
        
    }
    global void execute(Database.BatchableContext BC, List<Batch_Project__c> scope){
        List<Batch_Project__c> lstToUpdate =  new List<Batch_Project__c>();
        for(Batch_Project__c obj : scope){
            if(obj.Status__c == true){
                lstToUpdate.add(new Batch_Project__c(Id = obj.Id, Status__c = false));
            }
        }
        if(lstToUpdate.size() > 0){
            database.update(lstToUpdate);
        }
    }
    global void finish(Database.BatchableContext BC){
    }
}