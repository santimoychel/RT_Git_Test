public class QuestionAnswerProjectClass {
   @AuraEnabled 
    public static user fetchUser(){
       User u = [select id,Name from User where id =: userInfo.getUserId()];
        System.debug('username'+u);
        return u;
    }
  @AuraEnabled 
    public static FeedItem fetchQuestion(){
  
        return [select Id,Title,CreatedDate,LikeCount ,CommentCount,Revision  from FeedItem limit 1];
    }
    @AuraEnabled 
    public static FeedComment fetchAnswer(){
      FeedComment fc = [SELECT Id, CommentBody FROM FeedComment ];
        System.debug('CommentBody'+fc);
        return fc;
    }
    
}