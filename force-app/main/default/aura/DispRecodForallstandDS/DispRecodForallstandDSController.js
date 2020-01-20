({
    //FieldSet API name--OpportunityFieldset
    doInit : function(component, event, helper) {
        
        var recordId = component.get("v.recordId");        
       // console.log('>>>recordId>>>>>',recordId);
        
        var sobejctName = component.get("v.sObejctName");        
       // console.log('>>>sObejctName>>>>>',sobejctName);
        
        var fieldSetName = component.get("v.fieldSetName");        
        //console.log('>>>fieldSetName>>>>>',fieldSetName);
       
        var Sobject_Name=component.get("v.HeaderOppName");
        console.log('>>>Sobject_Name>>>>>',Sobject_Name);

        var action = component.get("c.getContact");
        action.setParams({
            sObejctName : sobejctName,
            fieldSetName : fieldSetName,
            currentRecId: recordId
        });
        action.setCallback(this, function(response){
            var relatedItins = response.getReturnValue();
            //component.set("v.opportunityList",relatedItins);
            component.set("v.record",relatedItins.record);
            component.set("v.fldList",relatedItins.wrapFldsList);
            console.log('>>>response>>>>>',relatedItins);
        //    console.log('>>>opportunityList>>>>>',component.get("v.opportunityList"));
            
        });
        $A.enqueueAction(action);
    }
})