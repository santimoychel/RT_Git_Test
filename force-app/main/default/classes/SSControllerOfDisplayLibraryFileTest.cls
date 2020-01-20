@isTest
public class SSControllerOfDisplayLibraryFileTest {
    public static  testMethod void test1(){
        List<ContentWorkspace> listofCw=new List<ContentWorkspace>();
        ContentWorkspace cw=new ContentWorkspace();
        cw.Name='Demo098';
        listofCw.add(cw);
        insert listofCw;
       
    }
}