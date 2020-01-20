({
    doInit : function(component, event, helper) {
        let Question = component.get('v.Question');
       // console.log('>>>>>Question >>>',JSON.stringify(Question));
        let likes = Question.FeedLikes;
        
        if(likes == 'undefined' || likes == null  || likes.length <= 0){
            component.set("v.isLike",false);
        }else {
        for(let i= 0; i<likes.length;i++){
           // console.log('>>>>> in side for Question Card likes >>>',JSON.stringify(likes));
            if(likes[i].FeedItemId == Question.Id){
                // user Liked the Question 
                component.set("v.isLike",true);
            }
        }
      }
        let userById = component.get('v.userById');

        let imageUrl = '/assets/images/avatar1.jpg';
        if(userById[Question.CreatedById] != null && userById[Question.CreatedById] != undefined){
            imageUrl = userById[Question.CreatedById].SmallPhotoUrl;
        }
        component.set('v.imageUrl',imageUrl);
    },
    like : function(component, event, helper) {
        
        console.log('>>>>>>> like controller >>>>>');
        var quesId = component.get('v.Question');
        var questionId = quesId.Id;
        console.log('>>>>>>> like questionId >>>>>',questionId);
        helper.handleLike(component, event,questionId);
    },
    handleSelect: function (component, event, helper) {
        // This will contain the string of the "value" attribute of the selected
        // lightning:menuItem
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue == 'CopyLink'){
        component.set('v.isShareWithGroup',false);
        component.set('v.isCopyLink',true);
        component.set('v.isShareWithFollowers',false);
        helper.handleCopyLink(component,event,helper);
        }else if(selectedMenuItemValue == 'ShareWithGroup'){
        component.set('v.isCopyLink',false);
        component.set('v.isShareWithGroup',true);
        component.set('v.isShareWithFollowers',false);
        helper.handleShareWithGroup(component,event,helper);
        }else if(selectedMenuItemValue == 'ShareWithFollowers'){
        component.set('v.isCopyLink',false);
        component.set('v.isShareWithGroup',false);
        component.set('v.isShareWithFollowers',true);
        helper.handleShareWithFollowers(component,event,helper);
        }
        },
      
    editAndDelete : function(component, event, helper) {
         console.log('>>>> edit >>>>');
     
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue === 'Edit'){
            var editRecordEvent = $A.get("e.force:editRecord");
        var editRec = component.get("v.Question");
        console.log('>>>> editRec >>>>',JSON.parse(JSON.stringify(editRec.Id)));
        editRecordEvent.setParams({
            "recordId": editRec.Id,
            
        });
        editRecordEvent.fire();
        }else{
            helper.deleteRecord(component,event,helper);  
        }
    },
    // edit : function(component, event, helper) {
    //     var editRecordEvent = $A.get("e.force:editRecord");
    //     var editRec = component.get("v.Question");
    //     console.log('>>>> editRec >>>>',JSON.parse(JSON.stringify(editRec.Id)));
    //     editRecordEvent.setParams({
    //         "recordId": editRec.Id,
            
    //     });
    //     editRecordEvent.fire();
    // },
    // delete : function(component, event, helper) {
    //     helper.deleteRecord(component,event,helper);    
    // },
    // if we click answer button in question feed that time it will open like textArea field and post the answer
    sendAnswer : function(component, event, helper) {
        console.log('>>>>>>>>');
        component.set("v.IsRichText",true);
        component.set("v.IsRichText",true);
        // var event = component.getEvent("CommunityTitlePageEvent");
        // event.setParam("message", "the message to send" );
        // event.fire();
    },
     share : function(component, event, helper) {
           console.log('>>>>>>>>>>>');
         console.log('>>>>>>>>>>>',event.getParam("value"));
        if(event.getParam("value")=='CopyLink')
           {
               var question =JSON.parse(JSON.stringify(component.get('v.feedItem')));
               console.log('======================Id==>',question[0].Id);
               var url =  'https://santimoychel999-dev-ed.lightning.force.com/lightning/r/'+question[0].Id+'/view';
               console.log('=====>',url);
               component.set('v.copiedLinkToShare',url);
               component.set("v.isCopyLink",true);
           }
        else if(event.getParam("value")=='ShareWithGroup'){
             component.set("v.isShareGroup",true);
        }
            else if(event.getParam("value")=='ShareWithFollowers'){
              component.set("v.isShareWithFriend",true);
            }
       
        
    },
    openModel: function(component, event, helper) {
      //Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
     closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isCopyLink", false);
       component.set("v.isShareGroup", false);
       component.set("v.isShareWithFriend", false);
   },
  
   submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
      component.set("v.isModalOpen", false);
   },
       copyHardcoreText : function(component, event, helper) {
        // get HTML hardcore value using aura:id
      console.log('textForCopy////////////// ' );
        var textForCopy = component.get('v.copiedLinkToShare');
          // console.log('textForCopy ',textForCopy );
           
        // calling common helper class to copy selected text value
        helper.copyTextHelper(component,event,textForCopy);
    },
       
})