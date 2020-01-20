({
    fetchLeadSourcePicklist : function(component, event, helper) {
        
        
        
        var action = component.get("c.getPicklistvalues");
          console.log( component.get("v.candidate.sobjectType"));
          console.log( component.get("v.profile_picklist"));
             console.log('action',action );
        action.setParams({
            'objectName': component.get("v.candidate.sobjectType"),
            'field_apiname': component.get("v.profile_picklist"),
            'nullRequired': true
        });
        action.setCallback(this, function(a) {
            var state = a.getState();
              console.log('state',state);
            if (state === "SUCCESS"){
                component.set("v.ProfileSourcePicklist", a.getReturnValue());
                 
                //  console.log('state',state);
            } 
            else{
                  console.log('state',"Error");
            }
        });
        $A.enqueueAction(action);
    },
    SaveDetails : function(component, event, helper) {
        console.log('Create record');
        var selValue = component.find("statusPicklist");
        var getvalue=selValue.get("v.value");
        console.log('>>>selValue>>>',getvalue);
        //getting the candidate information
        component.set("v.candidate.Profile__c",getvalue);
        var candidate = component.get("v.candidate");
        /*   
        //Validation
        if($A.util.isEmpty(candidate.Email__c) || $A.util.isUndefined(candidate.Email__c)){
            alert('First Name is Required');
            return;
        }            
        if($A.util.isEmpty(candidate.Username__c) || $A.util.isUndefined(candidate.Username__c)){
            alert('Last Name is Rqquired');
            return;
        }
        if($A.util.isEmpty(candidate.FirstName__c) || $A.util.isUndefined(candidate.FirstName__c)){
            alert('Email is Required');
            return;
        }
        if($A.util.isEmpty(candidate.LastName__c) || $A.util.isUndefined(candidate.LastName__c)){
            alert('SSN is Required');
            return;
        }
       if($A.util.isEmpty(candidate.Profile__c) || $A.util.isUndefined(candidate.Profile__c)){
            alert('SSN is Required');
            return;
        }
        */
        //Calling the Apex Function
        var action = component.get("c.insertRecord");
        
        //Setting the Apex Parameter
        action.setParams({
            candidate : candidate
        });
        
        //Setting the Callback
        action.setCallback(this,function(a){
            //get the response state
            var state = a.getState();
            console.log('Create record');
            //check if result is successfull
            if(state == "SUCCESS"){
                //Reset Form
               
                var newCandidate = {'sobjectType':  component.get("v.candidate.sobjectType"),
                                    'Email__c': '',
                                    'Username__c': '',
                                    'FirstName__c': '', 
                                    'LastName__c': '',
                                    'Profile__c': component.get("v.profile_picklist")
                                   };
                console.log('newCandidate',newCandidate);
                
                //resetting the Values in the form
                component.set("v.candidate",newCandidate);
                alert('Record is Created Successfully');
                $A.get('e.force:refreshView').fire();
                
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        
        //adds the server-side action to the queue        
        $A.enqueueAction(action);
        
    },
    
    recordList: function(component,event,helper){
        var action=component.get("c.dispRecord");
        action.setCallback(this,function(data){
            var state = data.getState();
          //  console.log('Create record');
            //check if result is successfull
            if(state == "SUCCESS"){
               
                component.set("v.myList",data.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    /*page refresh after data save*/
    isRefreshed: function(component, event, helper) {
        location.reload();
    }
    
})