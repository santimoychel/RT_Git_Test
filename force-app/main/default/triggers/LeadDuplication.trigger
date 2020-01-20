trigger LeadDuplication on Lead (after insert) {
  
            // FindLeadDuplication.leadDuplicatePreventer(Trigger.new);
          
             LeadConversion.leadDuplicatePreventer(Trigger.new);
    
}