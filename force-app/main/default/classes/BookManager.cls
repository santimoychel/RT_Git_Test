@RestResource(UrlMapping='/v1/Bookmanagement/')
global class BookManager {
    @httpGet
    global static Book_For_SoapApi_YouTube__c doGetBook(){
        Book_For_SoapApi_YouTube__c book=new Book_For_SoapApi_YouTube__c();
        Map<String,String> paramsMap=RestContext.request.params;
        
        System.debug('paramsMap'+paramsMap);
        String bookId=paramsMap.get('Id');
        
        System.debug('bookId'+bookId);
        book=[select Id,Name,price__c  
              from Book_For_SoapApi_YouTube__c 
              where id=:bookId];
        
        return book;
    }
    @httpDelete
    global static String doDeleteBook(){
        Book_For_SoapApi_YouTube__c book=new Book_For_SoapApi_YouTube__c();
        Map<String,String> paramsMap=RestContext.request.params;
        
        System.debug('paramsMap'+paramsMap);
        String bookId=paramsMap.get('Id');
        
        System.debug('bookId'+bookId);
        book=[select Id,Name,price__c  
              from Book_For_SoapApi_YouTube__c 
              where id=:bookId];
        delete book;
        return 'Record Deleted!';
    }
    //Only one method can be defined as post method
    /* @httpPost
global static Book_For_SoapApi_YouTube__c doCreateRecord(String Name){
Book_For_SoapApi_YouTube__c book=new Book_For_SoapApi_YouTube__c(Name=Name);
insert book;
return book;
}*/
    @httpPut
    global  static Book_For_SoapApi_YouTube__c doUpdate(String name){
        Map<String,String> paramsMap=RestContext.request.params;
        System.debug('paramsMap'+paramsMap);
        String bookId=paramsMap.get('Id');
        
        Book_For_SoapApi_YouTube__c booknameChange=new Book_For_SoapApi_YouTube__c(Name=name,Id=bookId);
        System.debug('booknameChange'+booknameChange);
        update booknameChange; 
        return booknameChange;
    }
    
    @httpPost
    global  static Book_For_SoapApi_YouTube__c doCreateRecordRequest(BookInfo bookInfo){
       // System.debug('bookInfo'+bookInfo);
      Book_For_SoapApi_YouTube__c  bookObj=bookInfo.bookObj;
        insert bookObj;
        return bookObj;
    }
   global class BookInfo{
      global Book_For_SoapApi_YouTube__c bookObj{ get; set;}
            
            }
    
}