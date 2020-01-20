@isTest()
public class FindLeadDuplicationTest {
    public static testmethod void leadConversion(){
        Lead listOfLead1= new Lead();
        listOfLead1.LastName='Roy';
        listOfLead1.Company ='abc';
        
        insert listOfLead1;
        
        Lead listOfLead2= new Lead();
        listOfLead2.LastName='Dey';
        listOfLead2.Company ='xyz';
        
        insert listOfLead2;
       
        Set<String> sid=new Set<String>();
        sid.add('gvgdvghdh');
        
        Set<String> sip=new Set<String>();
         sid.add('445555');
        
         leadConversion1(sid, sip);
      //  FindLeadDuplication.leadConversiontoContact(sid, sip);
        
    }
     public static  void leadConversion1(Set<String>sid,Set<String>sip){
      
        FindLeadDuplication.leadConversiontoContact(sid, sip);        
    }
}