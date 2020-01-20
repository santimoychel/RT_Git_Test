public with sharing class CommunityTitlePageApx {
    @AuraEnabled 
    public static user fetchUser(){
     // query current user information  
      User oUser = [select id,Name from User where id =: userInfo.getUserId()];
        return oUser;
    }
    public class wrappResult{
        @AuraEnabled public FeedItem FeedItemObj; 
        @AuraEnabled public List<FeedComment> FeedCommentList; 
        @AuraEnabled public Map<Id, User> userById;
        public wrappResult(FeedItem FeedItemObj, List<FeedComment> FeedCommentList, Map<Id, User> userById ){
            this.FeedCommentList = FeedCommentList;
            this.FeedItemObj = FeedItemObj;
            this.userById = userById;
        }        
    }
    // fetching record from FeedItem (Question record)
    @AuraEnabled
    public static wrappResult retrieveRecord(){
        Set<Id> userId = new Set<Id>();
        Id userRecId =  userInfo.getUserId();
        FeedItem feedItemRec = [Select id, LastModifiedDate, Title, Body,CreatedById, CreatedBy.Name,CreatedDate ,LikeCount,Revision, CommentCount,BestCommentId,
                                (select CreatedById,Id, FeedItemId,FeedEntityId, InsertedById
                                From FeedLikes where CreatedById =:userRecId or InsertedById =: userRecId )
                                From FeedItem 
                                WHERE Type ='QuestionPost' LIMIT 1];
                  
        userId.add(feedItemRec.CreatedById);
        List<FeedComment> feedCommentList  = [SELECT Id, FeedItemId, ParentId,CreatedById, CreatedDate, CreatedBy.Name, Revision, LastEditDate, CommentBody, CommentType, IsRichText 
                                                FROM FeedComment 
                                                WHERE FeedItemId =: feedItemRec.Id ];
        for(FeedComment obj : feedCommentList ){
            userId.add(obj.CreatedById);
        }
        Map<Id, User> userById = new Map<Id, User>([SELECT Id, SmallPhotoUrl, FullPhotoUrl  FROM USER WHERE ID =:userId]);
        return new wrappResult(feedItemRec, feedCommentList, userById);
    }

    // Insert Records in FeedComment
    @AuraEnabled
    public static FeedComment saveFCRecord(String fcId,String fcBody){
         System.debug('>>> FC Records -> ');
        FeedComment fc = new FeedComment();
        fc.FeedItemId = fcId;
        fc.CommentBody = fcBody;
         System.debug('>>> FC Records -> '+fcId);
         System.debug('>>> FC Records -> '+fcBody);
        insert fc;
        return fc;
    }

    // Retrieve records form FeedComment
    @AuraEnabled
    public static List<FeedComment> retrieveFCRecord(){
       // System.debug('FIId -> '+FIId);
        return [SELECT Id, FeedItemId, ParentId, CreatedDate, CreatedBy.Name, Revision, LastEditDate, CommentBody, CommentType, IsRichText 
                FROM FeedComment 
                Order By CreatedById
                /*WHERE FeedItemId =:FIId*/
                /*LIMIT 1*/
              ];
    }
     @AuraEnabled
    public static void updateBestAnswer(String questionId,String answerId){
        
        ConnectApi.QuestionAndAnswersCapabilityInput qaInput = new ConnectApi.QuestionAndAnswersCapabilityInput();
        qaInput.bestAnswerId = answerId;
        ConnectApi.QuestionAndAnswersCapability qa = ConnectApi.QuestionAndAnswers.updateQuestionAndAnswers(Network.getNetworkId(),questionId, qaInput);
    }
    @AuraEnabled
    public static void removeBestAnswer(){
        System.debug('>>>>>>>>>>>>> Remove best Answer from Apex >>>>');
        ConnectApi.QuestionAndAnswersCapabilityInput qaInput = new ConnectApi.QuestionAndAnswersCapabilityInput();
        qaInput.bestAnswerId = null;
        ConnectApi.QuestionAndAnswersCapability qa = ConnectApi.QuestionAndAnswers.updateQuestionAndAnswers(Network.getNetworkId(),null, qaInput);
    }

    @AuraEnabled
    public static void updateLikes(String quesId){ 
        System.debug('>>>>>>>>>>>>>> Update like >>>'+quesId);
        Id userRecId =  userInfo.getUserId();
        FeedItem feedItemRec = [Select id, LikeCount,
                                (select ID, CreatedById
                                From FeedLikes where CreatedById =:userRecId or InsertedById =: userRecId )                                
                                From FeedItem  
                                WHERE id =: quesId ];
        Id likeOrunlikeId;                       
        if(feedItemRec.FeedLikes.size() > 0){
            // need to delete
              FeedLike Obj = feedItemRec.FeedLikes[0];
              DELETE Obj;
        }else{
            // need to insert
            FeedLike fl = new FeedLike(feedItemId = feedItemRec.id);
            fl.createdById = UserInfo.getUserId();
            insert fl;
        } 
    }
	
    // for deleting we have to pass userId and Id of the current record
     @AuraEnabled
    public static void deleteRecords(String deletedId, String Id){ 
        System.debug('>>>>> deletedId >>>>>>'+deletedId);
    	Id uId = userInfo.getUserId();
        FeedComment feedCommentRec = [SELECT id,CreatedById From FeedComment WHERE CreatedById =:uId and id = : Id];
        DELETE feedCommentRec;  
    }
    // for deleting we have to pass userId and Id of the current record from FeedItem
     @AuraEnabled
    public static void deleteFIRecords(String deletedId, String Id){ 
        System.debug('>>>>> deletedId >>>>>>'+deletedId);
    	Id uId = userInfo.getUserId();
        FeedItem feedItemRec = [SELECT id,CreatedById From FeedItem WHERE CreatedById =:uId and id = : Id];
        DELETE feedItemRec;
    }

    // @AuraEnabled
    // public static List<String> groupByFeedCommentRecord(){
       
    //    Map<Id,List<FeedComment>> mapObj = new  Map<Id,List<FeedComment>>();
    //    for(List<FeedComment> lstfc :[SELECT Id, FeedItemId, ParentId, CreatedDate,CreatedById , CreatedBy.Name, Revision, LastEditDate, CommentBody, CommentType, IsRichText 
    //                         FROM FeedComment 
    //                      ])
    //             {
    //                 if(mapObj.containsKey(lstfc.CreatedById)){
    //                     mapObj.get(lstfc.CreatedById).values();
    //                 }
    //                 else{
    //                      mapObj.put(lstfc.CreatedById,lstfc);
    //                 }
    //             }
                
                 
    //   /* List<FeedComment> lstFc = [SELECT Id, FeedItemId, ParentId, CreatedDate,CreatedById, CreatedBy.Name, Revision, LastEditDate, CommentBody, CommentType, IsRichText 
    //             FROM FeedComment 
    //             ];
    //         System.debug('>>>> lstFc >>>>'+lstFc);
    //         String groupId ;
    //         List<String> newLstFc = new List<String>();

    //             for(integer i=1; i< lstFc.size();i++){
    //                 groupId = lstFc[i].CreatedById;
    //                 if(lstFc[i].CreatedById == groupId ){
    //                     newLstFc.add(groupId);
    //                 }
    //             }
	// 		System.debug('>>>>> newLstFc >>>>>'+newLstFc);
    //     return newLstFc;
    //     */
    //     return null;
    // }

}