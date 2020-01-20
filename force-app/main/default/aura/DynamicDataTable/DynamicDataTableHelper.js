({
    doInit:function(component, event, helper) {
        console.log('in doinit');
        
        
        helper.getTableFieldSet(component, event, helper);
        
        
    },
    
    getTableFieldSet : function(component, event, helper) {
        
        var action = component.get("c.getFieldSet");
        //  console.log('action',action);
        action.setParams({
            sObjectName: component.get("v.sObjectName"),
            fieldSetName: component.get("v.fieldSetName")
        });
        
        action.setCallback(this, function(response) {
            var fieldSetObj = JSON.parse(response.getReturnValue());
            component.set("v.fieldSetValues", fieldSetObj);
            
            //Call helper method to fetch the records
            helper.getTableRows(component, event, helper);
        })
        $A.enqueueAction(action);
    },
    
    getTableRows : function(component, event, helper){
        var pageSize = component.get("v.pageSize");
        console.log(pageSize);
        var action = component.get("c.getRecords");
        var fieldSetValues = component.get("v.fieldSetValues");
        var setfieldNames = new Set();
        for(var c=0, clang=fieldSetValues.length; c<clang; c++){      
            if(!setfieldNames.has(fieldSetValues[c].name)) {       
                setfieldNames.add(fieldSetValues[c].name);   
                if(fieldSetValues[c].type == 'REFERENCE') {   
                    if(fieldSetValues[c].name.indexOf('__c') == -1) {      
                        setfieldNames.add(fieldSetValues[c].name.substring(0, fieldSetValues[c].name.indexOf('Id')) + '.Name')
                    }                     else {       
                        setfieldNames.add(fieldSetValues[c].name.substring(0, fieldSetValues[c].name.indexOf('__c')) + '__r.Name');        
                    }                 }    
            }        
        }       
        var arrfieldNames = [];     
        setfieldNames.forEach(v => arrfieldNames.push(v));
        console.log(arrfieldNames);
        action.setParams({
            sObjectName: component.get("v.sObjectName"),
            parentFieldName: component.get("v.parentFieldName"),
            
            fieldNameJson: JSON.stringify(arrfieldNames)
        });
        action.setCallback(this, function(response) {
            var list = JSON.parse(response.getReturnValue());
            component.set("v.opportunityList", list);
            var oppList = component.get("v.opportunityList");
          
            var paginationList = [];
            for(var i=0; i< pageSize; i++)          
            {
                paginationList.push(oppList[i]);
            }
            //component.set('v.opportunityList', paginationList);
            component.set("v.tableRecords", paginationList);
             component.set("v.UnfilteredData", component.get("v.tableRecords"));
            
            var len=component.get("v.tableRecords").length;
            console.log('len',len);
            component.set('v.totalSize',len);
            component.set("v.start",0);
            component.set("v.end",pageSize);
            
            
        });
        $A.enqueueAction(action);
    },
    
    
})