global class BookPlanner{
   
    /* webservice static Book_For_SoapApi_YouTube__c createBookRecord(String Name){
    Book_For_SoapApi_YouTube__c  book = new Book_For_SoapApi_YouTube__c ();
    book.Name=Name;
    insert book ;
    return book;*/
    
    webservice static Book_Plan createBookRecord(Book_Plan Plan){
    Book_For_SoapApi_YouTube__c  book = new Book_For_SoapApi_YouTube__c ();
    book.Name=Plan.bookName;
    book.price__c=Plan.price;
    book.author__c=Plan.author;
    insert book ;
    plan.book_Id=book.Id;
    return Plan;
    
    }
    global class Book_Plan{
      webservice String bookName;
      webservice Decimal price;
      webservice String author;
      webservice String book_Id;
    }

}