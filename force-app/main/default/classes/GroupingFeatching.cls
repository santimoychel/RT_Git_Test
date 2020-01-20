public class  GroupingFeatching{
   public static List<Group> GetUserIdsFromGroup(){
       List<Id> groupIds = new List<Id>();
       for(GroupMember obj :[ SELECT GroupId FROM GroupMember WHERE UserOrGroupId =: UserInfo.getUserId()]){
           groupIds.add(obj.GroupId);
       }
       System.debug('DeveloperName'+[SELECT Id, DeveloperName 
               FROM Group 
               WHERE ID =: groupIds]);
       return [SELECT Id, DeveloperName 
               FROM Group 
               WHERE ID =: groupIds];
      
    }
}