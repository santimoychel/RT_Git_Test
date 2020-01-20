public class taskRecordMetaData {
    
    public static void featchTheValueOfMetaData(List<Opportunity> valueOfMeatadata){
        System.debug('>>valueOfMeatadata>>>'+valueOfMeatadata);
        List<Opp_RecordType_Metadata__mdt> listOfOppMtdata=[SELECT DeveloperName__c ,
                                                            (SELECT DueDate__c,RecordType__c,status__c,Subject__c
                                                             FROM Task_RecordType_MetaData__r
                                                            )
                                                            FROM Opp_RecordType_Metadata__mdt];
        
        Map<Id,String> mapofRecordTypeNameId=new Map<Id,String>();
        Map<String,Opp_RecordType_Metadata__mdt> mapofRecordTypeOfOppMtData=new Map<String,Opp_RecordType_Metadata__mdt>();
        
        for(RecordType rt:[SELECT ID,developerName
                           FROM RECORDTYPE
                           WHERE sOBJECTTYPE='OPPORTUNITY' AND isActive=TRUE])
        {
            mapofRecordTypeNameId.put(rt.Id,rt.developerName);
        }
        
        
        for(Opp_RecordType_Metadata__mdt obj:listOfOppMtdata){
            mapofRecordTypeOfOppMtData.put(obj.DeveloperName__c, obj);
        }
        
        List<Task> listofTask= new List<Task>();
        for (OPPORTUNITY opp:valueOfMeatadata){
            System.debug('>>opp>>>'+opp);
            String oppRecordTypeId=mapofRecordTypeNameId.get(opp.RecordTypeId);
            Opp_RecordType_Metadata__mdt obj=mapofRecordTypeOfOppMtData.get(oppRecordTypeId);
            System.debug('>>>>>'+obj);
            if(obj.Task_RecordType_MetaData__r.size()>0){
                System.debug('>>inside if >>>');
                listofTask.addAll(createTask(obj,opp));
            }
            
            
        }
        system.debug('listofTask'+listofTask);
        
        Insert listofTask;
        
    }
    private static List<Task> createTask(Opp_RecordType_Metadata__mdt oppRtmdt,Opportunity opp){
        Task newTaskObj=new Task();
        List<Task> taskList = new List<Task>();
        system.debug('Opp_RecordType_Metadata__mdt'+oppRtmdt);
        for(Task_RecordType_MetaData__mdt taskmdtObj : oppRtmdt.Task_RecordType_MetaData__r){
            system.debug('oppRtmdt.Task_RecordType_MetaData__r>>'+oppRtmdt.Task_RecordType_MetaData__r);
            Date oppCreatedDate = opp.CreatedDate.date();
            Integer taskdueDate = Integer.valueof(taskmdtObj.DueDate__c);
            newTaskObj.Subject=taskmdtObj.Subject__c;
            newTaskObj.Status=taskmdtObj.status__c;
            newTaskObj.ActivityDate=oppCreatedDate.addDays(taskdueDate);
            newTaskObj.WhatId = opp.Id;
            newTaskObj.Priority='Normal';
            taskList.add(newTaskObj);
        }
        System.debug('>>inside method >>>'+taskList);
        return taskList;
    }
}