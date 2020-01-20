({
	qusDetails : function(component, event, helper) {
	var action = component.get("c.fetchQuestion");
 //  console.log('<<<<<<<');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.QuestionDetails", storeResponse);
               
                  
            }
        });
        $A.enqueueAction(action);	
	},
    ansDetails : function(component, event, helper) {
	var action = component.get("c.fetchAnswer");
   console.log('<<<action<<<<',action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               
                var storeResponse = response.getReturnValue();
                component.set("v.AnswerDetails", storeResponse);
             
            }
        });
        $A.enqueueAction(action);	
        var len = component.get("v.AnswerDetails");
         console.log('<<<len<<<<',len.length);
	},
})