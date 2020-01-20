public class Opp_Record_Type {
    public static void featchTheValueOfMetaData(List<Opportunity> valueOfMeatadata){
        //  System.debug('valueOfMeatadata'+valueOfMeatadata);
        /*    List<String> stlist = new List<String>();
System.debug('rtid');

Opp_RecordType_Metadata__mdt[] oppRecordDeveloperName=[SELECT DeveloperName__c 
FROM Opp_RecordType_Metadata__mdt];
set<String> nameOfRecordType=new Set<String>();

for(Opp_RecordType_Metadata__mdt r1:oppRecordDeveloperName){
nameOfRecordType.add(r1.DeveloperName__c);
}
System.debug('nameOfRecordType'+nameOfRecordType);



Id OppId1;
for(Opportunity oppid:valueOfMeatadata)
{
OppId1=oppid.Id;
}


List<Opportunity> oppList = [Select Id, Name, RecordType.Name from Opportunity where Id =: OppId1 AND  RecordType.Name In: nameOfRecordType ];
System.debug('oppList'+oppList);

List<task> carry=New List<task>();

for(opportunity opp:oppList){
if(opp.Id!=null){
task t=new task(
whatid=opp.id, 
Status = 'Active',
Subject = 'Follow Up Test Task',
Priority='Normal'

);
carry.add(t); 
}
}
insert carry;
*/
           set<String> nameOfRecordType=new Set<String>();
           List<Task> listOfTask=new List<Task>();
           Opp_RecordType_Metadata__mdt[] oppRecordDeveloperName=[SELECT DeveloperName__c 
                                                               FROM Opp_RecordType_Metadata__mdt];
     
        
        for(Opp_RecordType_Metadata__mdt r1:oppRecordDeveloperName){
            nameOfRecordType.add(r1.DeveloperName__c);
        }
        Id OppId1;
        DateTime createdDate;
        for(Opportunity oppid:valueOfMeatadata)
        {
            OppId1=oppid.Id;
            createdDate=oppid.CreatedDate;
            
        }
        
        List<Opportunity> oppList = [Select Id, Name, RecordType.Name from Opportunity where Id =: OppId1 AND  RecordType.Name In: nameOfRecordType ];
            Set<String> setOfName=new Set<String>();
            for(Opportunity oppRecordTypeName: oppList){
                setOfName.add(oppRecordTypeName.RecordType.Name);
            }
        
        for(Task_RecordType_MetaData__mdt r1:[SELECT  DueDate__c,DeveloperName,RecordType__c,status__c,Subject__c
                                              FROM Task_RecordType_MetaData__mdt where DeveloperName In:setOfName]){
                                                  if(r1.Id!=null)
                                                  {
                                                      Task newTaskObj = new Task(whatid=OppId1 );
                                                      
                                                          DateTime dt=createdDate.addDays(Integer.valueOf(r1.DueDate__c));
                                                          Date myDate = date.newinstance(dt.year(), dt.month(), dt.day());
                                                     
                                                      newTaskObj.Subject=r1.Subject__c;
                                                      newTaskObj.Status=r1.status__c;
                                                      newTaskObj.ActivityDate=myDate;
                                                      newTaskObj.Priority='Normal';
                                                      newTaskObj.Name__c=r1.DeveloperName;
                                                      listOfTask.add(newTaskObj);
                                                   
                                                  }
                                                  
                                              }
       
            Insert listOfTask;
       
        
        
    }
}