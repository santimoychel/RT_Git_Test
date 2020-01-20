@isTest
public class DispRecordForAllstandardObjectTest {
    @isTest static void validateTheMethod() { 
        Account acc = new Account();
        acc.Name='test001';
        insert acc;    
        DispRecordForallStandardObjController.getContact('Account', 'AccountFieldset',acc.Id);
        }      
    }