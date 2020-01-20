({
    doInit : function(component, event, helper) {
       console.log('inside doinit method parent');
        helper.question(component, event);
              
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
        component.set("v.IsShare",true);
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
    bestAnsBtn : function(component, event, helper) {
        var value=component.get("v.bestAns");
        console.log('value ->',value);
        var AnswerDetails = component.get("v.feedComment");
        var topAnsDiv=component.get("v.topAnsDiv");
        
        if(value==true || topAnsDiv==true){
        value=false;
        topAnsDiv=false;
        }
        else{
        value=true;
        topAnsDiv=true;
        }
        component.set("v.bestAns",value);
        component.set("v.TopAnswerDetails",AnswerDetails);
        component.set("v.topAnsDiv",topAnsDiv);
  },
    // Write answer -> insert record
    Submit : function(component, event, helper) {
        // var objCompB = component.find('compB');

        console.log('>>>>>> Submit >>>>>>');
        var feed = component.get("v.newFeedCommentBody");
        var question = component.get("v.feedItem");
        console.log('>>>>>> Submit inside feed >>>>>>',feed);
        console.log('>>>>>> Submit inside feed >>>>>>',question.Id);
        var action = component.get("c.saveFCRecord");
        action.setParams({ 
            "fcId": question.Id,
            "fcBody" :feed
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('>>>> Response.getState()>>>',state);
            if (state === "SUCCESS") {
                component.set("v.newFeedCommentBody",null);
                helper.question(component, event);
            }            
        });


        
        $A.enqueueAction(action);
    },
    IsChange : function(component, event, helper) {
        var Change = component.set("v.IsRichText",true);
    },
//     edit : function(component, event, helper) {
//     },
//     delete : function(component, event, helper) {
//     },
//  // For EDIT and DELETE MEnu buttons
//  handleMenuSelect: function(component, event, helper) {
//     console.log('handleMenuSelect function called');
//     var menuValue = event.detail.menuItem.get("v.accesskey");
//     console.log('menuValue ====>> '+menuValue);
//     switch(menuValue) {
//         case "1": helper.doEdit(component, event, helper); break;
//         case "2": helper.doDelete(component, event, helper); break;
//     }
// }
// ,handleEvent: function(component, event, helper) {
//     helper.question(component, event);
//     var message = event.getParam("message");
//     alert(message);
// }

})