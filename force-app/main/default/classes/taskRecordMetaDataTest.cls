@isTest
public class taskRecordMetaDataTest {

    public static testMethod void  test1(){
  
        List<Opportunity> opplist=new List<Opportunity>{
                                                      new Opportunity( Name='Test900', StageName='Prospecting', closedate=System.now().date().addDays(6),Amount=345676,Type='vfgrgrr'),
                                                      new Opportunity( Name='Test800', StageName='Prospecting', closedate=System.now().date().addDays(6),Amount=345676,Type='vfgrgrr'),
                                                      new Opportunity( Name='Test990', StageName='Prospecting', closedate=System.now().date().addDays(6),Amount=345676,Type='vfgrgrr'),
                                                      new Opportunity( Name='Test890', StageName='Prospecting', closedate=System.now().date().addDays(6),Amount=345676,Type='vfgrgrr')
                                                 } ;
       
     Insert opplist;
        
        System.assertEquals(2+2,[SELECT COUNT() FROM TASK]);
    }
       
}