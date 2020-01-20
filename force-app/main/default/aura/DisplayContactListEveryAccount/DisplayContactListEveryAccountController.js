({
	doInit : function(component, event, helper) {
       
		var action = component.get("c.getAccountWithRelatedContacts");
      //   console.log('<<<<action<<<<<<',action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse =response.getReturnValue();
                //  console.log('<<<<storeResponse>>>Acc>>>>',storeResponse);
               //  console.log('<<<<storeResponse>>>>>con>>',JSON.parse(JSON.stringify(storeResponse[0])).lstOfRelatedContacts);
              //  console.table(storeResponse);
                 component.set("v.accName",JSON.parse(JSON.stringify(storeResponse[0])).accName);
                 component.set("v.contactDetails",JSON.parse(JSON.stringify(storeResponse[0])).lstOfRelatedContacts);
                
                var accName=component.get("v.accName");
                console.log('accName>>>>> ',accName);
                
                 var contactDetails=component.get("v.contactDetails");
                console.log('contactDetails>>>>> ',contactDetails);
            }
        });
        $A.enqueueAction(action);
	}
    
})