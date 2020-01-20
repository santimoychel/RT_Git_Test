public class FindLeadDuplication {
    public static void leadDuplicatePreventer(List<Lead> lead){
        
        set<string> nameSet=new set<string>();
        set<string> emailSet=new set<string>();
        set<Id> idSet=new set<Id>();
        
        set<string> phoneSet=new set<string>();
        
        List<Lead>leadList=new List<Lead>();
        system.debug('>>>>'+lead);
        for(Lead l:lead){
            nameSet.add(l.LastName);
            // system.debug('>>>'+l.LastName);
            idSet.add(l.Id);
            emailSet.add(l.Email);
            phoneSet.add(l.Phone);
            // system.debug('>>>cell'+l.Phone);
        }
        Boolean status =true;
        Lead newleadList=[select LastName,Email,Phone,MobilePhone
                          from Lead 
                          where LastName IN:nameSet OR Phone IN:phoneSet 
                          order by CreatedDate desc limit 1];
        system.debug('>>sObj'+newleadList);
        
        leadList=[select LastName,Email,Phone,MobilePhone 
                  from Lead 
                  where id not IN:idSet AND (LastName IN:nameSet OR Email IN:emailSet OR Phone IN:phoneSet)
                 limit 1 ];
        System.debug('leadList'+leadList);
        
         
        list<Lead> ConvertLeadToContact = [SELECT id, phone,lastname,IsConverted 
                                               FROM lead 
                                               where phone IN:phoneSet];
        LeadStatus convertStatus = [SELECT Id, MasterLabel 
                                    FROM LeadStatus
                                    WHERE IsConverted=true ];
        
        for( Lead l1:leadList){
         
            if(l1.email==newleadList.email && l1.email!=null){
                System.debug('>>>>>>>>');
                Database.merge(newleadList,leadList, TRUE);
                // 
            }
            else if(l1.Phone==newleadList.Phone && l1.Phone!=null){
                //leadConversiontoContact(nameSet,phoneSet); 
                
                  Database.LeadConvert lc = new database.LeadConvert();
                        for(Lead objConvrtLedToContct:ConvertLeadToContact)
                        {
                            
                            if(status)
                            {
                                status=false;
                            }
                            
                            lc.setLeadId(objConvrtLedToContct.id);
                            lc.setConvertedStatus(convertStatus.MasterLabel); 
                            Database.LeadConvertResult lcr = Database.convertLead(lc);
                            System.assert(lcr.isSuccess());
                        }
                
               
            }
            else {
                
                
            }
          
       }             
    }
    public static void leadConversiontoContact(Set<String>nameSet,Set<String>phoneSet){
        
        system.debug('nameSet'+nameSet);
        system.debug('phoneSet'+phoneSet);
        system.debug('coming');
        Lead convertLeadToContact =[SELECT ID,lastname, Email,Phone
                                    FROM LEAD 
                                    WHERE lastname in:nameSet OR phone in :phoneSet limit 1];
        
        
        System.debug('<<< Database lquery>>>>>>>'+convertLeadToContact.Email);
        
        // Create dummy conversion
        
        Database.LeadConvert lc = new database.LeadConvert();
        //get the lead status from the LeadStatus obejct
        LeadStatus convertStatus = [SELECT Id, MasterLabel, IsConverted FROM LeadStatus WHERE IsConverted=true limit 1];
        lc.setConvertedStatus(convertStatus.MasterLabel);
        
        
        lc.setLeadId(convertLeadToContact.Id);
        lc.setConvertedStatus(convertStatus.MasterLabel);
        
        System.debug('<<< Database.LeadConvert >>>>>>>'+lc);
        
        Database.LeadConvertResult lcr = Database.convertLead(lc);
        // Make sure conversion was successful
        System.assert(lcr.isSuccess());
        System.debug('LeadConvertResult');
        
    }
}