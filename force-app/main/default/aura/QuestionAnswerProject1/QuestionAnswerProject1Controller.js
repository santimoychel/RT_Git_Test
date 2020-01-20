({
doInit : function(component, event, helper) {
        helper.getUser(component, event, helper);
        helper.question(component, event, helper);
        helper.answer(component, event, helper);
     
        // Fetching the user
        // var action = component.get("c.fetchUser");
        //     action.setCallback(this, function(response) {
        //         var state = response.getState();
        //         if (state === "SUCCESS") {
        //             var storeResponse = response.getReturnValue();
        //            // set current user information on userInfo attribute
        //             component.set("v.userInfo", storeResponse);
        //         }
        //     });
        //    // helper.answer(component, event, helper);
        //     $A.enqueueAction(action);
    },
    testTopic : function(component, event, helper) {
        alert('There is no topics are there to select');
    },
    like : function(component, event, helper) {
        var res = component.get("v.IsLike");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        component.set("v.IsLike",res);
        
    },
    comment : function(component, event, helper) {
        var res = component.get("v.IsComment");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        //component.set("v.IsComment",res);
        component.set("v.IsRichText",true);
        //helper.answer(component, event, helper);
    },
    share : function(component, event, helper) {
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
    select : function(component, event, helper) {
        var res = component.get("v.IsSelect");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        component.set("v.IsSelect",res);
        
    },
    // Write answer -> insert record
    Submit : function(component, event, helper) {
        var feed = component.get("v.newFeedComment");
        var action = component.get("c.saveFCRecord");
         event.stopPropagation();
        action.setParams({ 
            "fc": feed
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            // console.log('>>>> Response.getState()>>>',state);
            if (state === "SUCCESS") {
                
                alert('The Record is Saved Successfully');
                //$A.get('e.force:refreshView').fire();
                var name = response.getReturnValue();
            } 
            var default1 = {'sobjectType': 'FeedComment',
                            'CommentBody':'',
                           };
            component.set("v.newFeedComment",default1);
             
        });
        // var Change = component.set("v.IsRichText",false);
        $A.enqueueAction(action);
        helper.getUser(component, event, helper);
        helper.question(component, event, helper);
        helper.answer(component, event, helper);
    },
    IsChange : function(component, event, helper) {
        var Change = component.set("v.IsRichText",true);
    },
    edit : function(component, event, helper) {
    },
    delete : function(component, event, helper) {
},
 // For EDIT and DELETE MEnu buttons
 handleMenuSelect: function(component, event, helper) {
    console.log('handleMenuSelect function called');
    var menuValue = event.detail.menuItem.get("v.accesskey");
    console.log('menuValue ====>> '+menuValue);
    switch(menuValue) {
        case "1": helper.doEdit(component, event, helper); break;
        case "2": helper.doDelete(component, event, helper); break;
    }
},
 //openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
     // component.set("v.isModalOpen", true);
   //},
  
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
           console.log('textForCopy ',textForCopy );
           
        // calling common helper class to copy selected text value
        helper.copyTextHelper(component,event,textForCopy);
    },
       
})