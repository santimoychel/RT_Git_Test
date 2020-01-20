public class QuestionAnswerProject1Class {
 @AuraEnabled 
    public static user fetchUser(){
        // query current user information 
        User oUser = [select id,Name from User where id =: userInfo.getUserId()];
        return oUser;
    }
    // fetching record from FeedItem (Question record)
    @AuraEnabled
    public static List<FeedItem> retrieveRecord(){
        List<FeedItem> li=[Select id, LastModifiedDate, Title, Body,CommentCount,Revision,CreatedDate  From FeedItem WHERE Type ='QuestionPost' or Type = 'TextPost' LIMIT 1];
        System.debug('li'+li);
        return li;
       }
    
    // Insert Records in FeedComment
    @AuraEnabled
    public static FeedComment saveFCRecord(FeedComment fc){
        System.debug('>>> FC Records -> '+fc);
        insert fc;
        return fc;
    }
    
    // Retrieve records form FeedComment
    @AuraEnabled
    public static List<FeedComment> retrieveFCRecord(){
        // System.debug('FIId -> '+FIId);
        return [SELECT Id, FeedItemId, ParentId, CreatedDate, CreatedBy.Name, LastEditDate, CommentBody, CommentType, IsRichText 
                FROM FeedComment 
                /*WHERE FeedItemId =:FIId*/
           /*  LIMIT 1 */
               ];
    }

     // Time Calculate
   
   /*   @AuraEnabled
    public static String timeCalculate(Id id, DateTime CreateDate){
        //   Integer hours = now.hour(), minutes = now.minute(), seconds = now.second();
       //    Date myDate = system.today();
      //     Integer day1 = now.day();
     //      System.debug('CreateDate>>>>>>>>> '+day1);
   
        DateTime dT = System.now();
        Date myDate = date.newinstance(dT.year(), dT.month(), dT.day());
        Date createTime= date.newinstance(CreateDate.year(), CreateDate.month(), CreateDate.day());
        
        Integer diffOfHours=CreateDate.hour()-dt.hour();
        Integer diffOfMin=CreateDate.minute()-dt.minute();
        Integer diffOfSec=CreateDate.second()-dt.second();
 
        System.debug('diffOfHours >>>>>>>>> '+diffOfHours);        
        System.debug('diffOfMin >>>>>>>>> '+diffOfMin);
        System.debug('diffOfSec >>>>>>>>> '+diffOfSec);
        
     
        System.debug('myDate>>>>>>>>> '+dT);
       
        Integer numberDaysDue = createTime.daysBetween(myDate);//System.debug('li>>>>>> '+CreateDate-now);
        String value;
        if(numberDaysDue<1){
            if(diffOfHours<24 && diffOfHours>1){
                numberDaysDue=diffOfHours;
                value=String.valueOf(numberDaysDue)+'  Hours Ago';
                System.debug('diffOfHours>>>>>>>>> '+numberDaysDue);
         
            }
            else if (diffOfMin<60 && diffOfMin>1){
                  numberDaysDue= diffOfMin;
                  value=String.valueOf(numberDaysDue)+'  Min Ago';
                  System.debug('diffOfMin>>>>>>>>> '+numberDaysDue);
              
            }
            else{
                numberDaysDue=diffOfSec;
                  value=String.valueOf(numberDaysDue)+'  Sec Ago';
                  System.debug('diffOfSec>>>>>>>>> '+numberDaysDue);
            }
        }
        else{
                numberDaysDue=numberDaysDue;
              value=String.valueOf(numberDaysDue)+'  Days Ago';
        }
       
              return value;
    }*/
    
}