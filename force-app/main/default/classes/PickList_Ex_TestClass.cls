@isTest
public class PickList_Ex_TestClass {
    
    public static testmethod  void test1(){
        AddRecordAndDisplaySamePage__c obj = new AddRecordAndDisplaySamePage__c();
        
        obj.Email__c='santimoychel99@gmail.com';
        obj.FirstName__c='santimoy';
        obj.LastName__c='Chel';
        obj.Profile__c='Administrator';
        obj.Username__c='santimoychel99@gmail.com';
        
        PickList_Ex_Class.insertRecord(obj);
    }
    public static testmethod  void test2(){
     //   AddRecordAndDisplaySamePage__c obj = new AddRecordAndDisplaySamePage__c();
        PickList_Ex_Class.dispRecord();
            PickList_Ex_Class.getIndustry();
    }  
}