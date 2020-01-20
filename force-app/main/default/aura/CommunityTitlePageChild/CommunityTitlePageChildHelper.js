({
    getUser : function(component, event, helper) {
        // Fetching the user
        
        var action = component.get("c.fetchUser");
            action.setCallback(this, function(response) {
               // console.log('STATE Child -->',state);
                var state = response.getState();
                if (state === "SUCCESS") {
                    var storeResponse = response.getReturnValue();
                   // console.log('>>>>>>>>>>>>> User rec  Child >>>>>>'+storeResponse);
                   // set current user information on userInfo attribute
                    component.set("v.userInfo", storeResponse);
                }
            });
            $A.enqueueAction(action);
        },
    answer : function(component, event, helper) {
      //  console.log('>>>>>>>>>>>>> start  Child >>>>>>');
        var action = component.get("c.retrieveFCRecord");  
        // action.setParams({
        //     FIId : component.get('v.recordId'),
        // })
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var name = response.getReturnValue();
               // console.log('>>>> name length >>>',name.length);
            } 
        //     var values = name;
        //     var StartDate ;
        //     var endDate;
        //     values.forEach(function(rec){
        //         StartDate = rec.CreatedDate ;
        //         endDate = rec.LastEditDate;
        //         finalDate = StartDate.Date() - endDate.Date();
        //         console.log('Final Date ->',finalDate);
        //     });
        //    console.log('>>>> FeedItem Id >>>>',id);
        // component.set("v.feedCommentlength",name.length);
            component.set("v.feedComment",name);
        });
        $A.enqueueAction(action);
    },
    handelBestAnswer : function(component, event, helper) {
        var value=component.get("v.bestAns");
        
        var answerDetails = component.get("v.feedCommentChild");
        var questionId = answerDetails.FeedItemId;
        var topAnsDiv=component.get("v.topAnsDiv");
        
        var action = component.get("c.updateBestAnswer");
        action.setParams({
            "questionId" : questionId,
            "answerId" : answerDetails.Id
        });
            action.setCallback(this, function(response) {
                        var state = response.getState();
                           
                            if (state === "SUCCESS") {
                            
                          
                            var event = component.getEvent("CommunityTitlePageEvent");
                                event.setParam("message", "the message to send" );
                                event.fire();
                            // $A.get('e.force:refreshView').fire();
                        }
                    });
                    $A.enqueueAction(action);

    },
    handelRemoveBestAnswer : function(component, event, helper) {
        var value=component.get("v.bestAns");
      //  console.log('>>>>>>>> Value form Child helper>>>>',value);
         var answerDetails = component.get("v.feedCommentChild");
         var questionId =  answerDetails.FeedItemId;
     
        
        var action = component.get("c.updateBestAnswer");
        action.setParams({
            "questionId" : questionId,
            "answerId" : ''
        });
            action.setCallback(this, function(response) {
                 //   console.log('>>>>>>>> state form Child helper>>>>');

                        var state = response.getState();
                       // console.log('>>>>>>>> state form Child helper>>>>',state);
                            if (state === "SUCCESS") {
                            // var res = response.getReturnValue();
                            var event = component.getEvent("CommunityTitlePageEvent");
                                event.setParam("message", "the message to send" );
                                event.fire();
                            // $A.get('e.force:refreshView').fire();
                        }
                    });
                    $A.enqueueAction(action);
                },
                deleteRecord: function(component, event, helper) {
    
                    	var action =  component.get("c.deleteRecords");
                    	var deletetRec = component.get("v.feedCommentChild");
                    	//console.log('>>>deletetRec>>>',JSON.parse(JSON.stringify(deletetRec)));
                       	 action.setParams({
                       						 "deleteId": deletetRec.CreatedById,
                    							"Id" : deletetRec.Id
                    					  }); 
                    		action.setCallback(this, function(response) {
                            var state = response.getState();
                           // console.log('>>>>> Helper delete state >>>>',state);
                            if (state === "SUCCESS") {
                                this.doInit(component,event,helper);
                            }
                            }),
                          $A.enqueueAction(action);      
                    	},
})