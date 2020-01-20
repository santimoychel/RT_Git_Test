trigger RecordTypeExOfAccount on Account (before insert,before update,after insert, after update) {
    
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            
        }else if(Trigger.isUpdate){
            
        }else if(Trigger.isDelete){
            
        }
    }
    
    if(Trigger.isAfter ){
        if(Trigger.isInsert || Trigger.isUpdate){
            RecordTypeExOfAccountClass.afterInsert(Trigger.new);
            
        }  
        
    }
    else if(Trigger.isDelete){
        
    }
}