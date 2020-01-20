@istest
public class BookManager_UnitTest {
    static  testmethod void insertRecord_PostMethod(){
        
        RestRequest request=new RestRequest();
        request.requestURI='/services/apexrest/v1/Bookmanagement/';
        request.httpMethod='post';
        
        request.addHeader('Content-Type', 'application/json');
        request.addHeader('Accept', 'application/json');
        
        BookManager.BookInfo bInfo=new BookManager.BookInfo();
        bInfo.bookObj= new Book_For_SoapApi_YouTube__c( Name='AnotherBook',Price__c=234);
        String str=JSON.serialize(bInfo);
        
        request.requestBody=Blob.valueOf(str);
        
        TEST.startTest();
        Book_For_SoapApi_YouTube__c book=  BookManager.doCreateRecordRequest(bInfo);
        System.assertEquals('AnotherBook',book.Name);
        System.assertNotEquals(null, book.Id);
        Test.stopTest();
        
        
        
    }
    
    static  testmethod void updateRecord_PutMethod(){
        Id bookId=createRecord();
        RestRequest request=new RestRequest();
        request.requestURI='/services/apexrest/v1/Bookmanagement/';
        request.httpMethod='post';
        
        request.addHeader('Content-Type', 'application/json');
        request.addHeader('Accept', 'application/json');
        
        /*   BookManager.BookInfo bInfo=new BookManager.BookInfo();
bInfo.bookObj= new Book_For_SoapApi_YouTube__c( Name='AnotherBook',Price__c=234);
String str=JSON.serialize(bInfo);*/
        
        request.requestBody=Blob.valueOf('Book006');
        request.addParameter('Id', bookId);
        
        RestContext.request=request;
        
        TEST.startTest();
        Book_For_SoapApi_YouTube__c book=  BookManager.doUpdate('Book006');
        System.assertEquals('AnotherBook',book.Name);
        System.assertNotEquals(null, book.Id);
        Test.stopTest();
        
    }
    
    static  testmethod void getRecord_GetMethod(){
        Id bookId=createRecord();
        RestRequest request=new RestRequest();
        request.requestURI='/services/apexrest/v1/Bookmanagement/';
        request.httpMethod='get';
        
        request.addHeader('Content-Type', 'application/json');
        request.addHeader('Accept', 'application/json');
        
        /*   BookManager.BookInfo bInfo=new BookManager.BookInfo();
bInfo.bookObj= new Book_For_SoapApi_YouTube__c( Name='AnotherBook',Price__c=234);
String str=JSON.serialize(bInfo);*/
        
        // request.requestBody=Blob.valueOf('Book006');
        request.addParameter('Id', bookId);
        
        RestContext.request=request;
        
        TEST.startTest();
        Book_For_SoapApi_YouTube__c book=  BookManager.doGetBook();
        System.assertEquals('AnotherBook',book.Name);
        System.assertNotEquals(null, book.Id);
        Test.stopTest();
        
    }
    
    static  testmethod void deleteRecord_GetMethod(){
        Id bookId=createRecord();
        RestRequest request=new RestRequest();
        request.requestURI='/services/apexrest/v1/Bookmanagement/';
        request.httpMethod='delete';
        
        request.addHeader('Content-Type', 'application/json');
        request.addHeader('Accept', 'application/json');
        
        /*   BookManager.BookInfo bInfo=new BookManager.BookInfo();
bInfo.bookObj= new Book_For_SoapApi_YouTube__c( Name='AnotherBook',Price__c=234);
String str=JSON.serialize(bInfo);*/
        
        // request.requestBody=Blob.valueOf('Book006');
        request.addParameter('Id', bookId);
        
        RestContext.request=request;
        
        TEST.startTest();
        String message=  BookManager.doDeleteBook();
        System.assertEquals('Deleted Record',message);
        
        Test.stopTest();
        
    }
    public static Id createRecord(){
        Book_For_SoapApi_YouTube__c book=new Book_For_SoapApi_YouTube__c(Name='Book006');
        insert book;
        return book.Id;
    }
}