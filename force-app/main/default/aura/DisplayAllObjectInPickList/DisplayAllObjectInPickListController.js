({
    doInit : function(component, event, helper) {
        var action = component.get("c.getObjectOptions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                var allValues = response.getReturnValue();
                component.set("v.pickl", allValues);
            }        	         
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);}}
                else {
                    console.log("Unknown Error");}}
        });
        $A.enqueueAction(action);
        
    },
    ValueofComboBox : function(component, event, helper) {
        var selected = component.find("select").get("v.value");
        
        //Intiale NumberofPage
        component.set('v.PageNumber',1);
        
        //Hide and Show the Label
        var ShowLabel=component.get("v.hideLabel")
        if(selected!=null){
            ShowLabel=true;
        }
        component.set('v.hideLabel',ShowLabel);
        
        var sel = String(selected);
        console.log("<<<getvalue>>>>>>",selected);
        var action = component.get("c.getApiName");       
        action.setParams({ sobj : sel });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                
                // console.table(response.getReturnValue());
                
                // Main RecordList
                component.set('v.DispRecordList',response.getReturnValue());   
                
                //BackUp the record
                component.set("v.SizeList",response.getReturnValue());
                
                //Get and Set the total length
                var TotalPageSize=component.get("v.DispRecordList").length;
                console.log('TotalPageSize',TotalPageSize);
                component.set('v.TotalPageSize', TotalPageSize);
                
                //Initial Size set
                var pagesize = 10;
                component.set('v.pageSize', pagesize);
                
                component.set("v.start",0);
                component.set("v.end",pagesize-1);
                
                //No of Pages
                var TotalPages=Math.ceil(TotalPageSize/pagesize);
                console.log('TotalPages',TotalPages);               
                component.set("v.TotalPages",TotalPages);
                
                var paginationList = [];
                var oppList = component.get("v.SizeList");
                for(var i=0; i< pagesize; i++)          
                {
                    paginationList.push(oppList[i]);
                }
                //Set the record After fix the page Size
                component.set('v.DispRecordList', paginationList);
                
            }
            
        });
        $A.enqueueAction(action);
        
    },
    
    sortByLabel: function(component, event, helper) {
        // console.log("<<<<<<<sortByLabel>>>>>>>>>");
        helper.sortBy(component, "sLabel");
    },
    sortByAPI: function(component, event, helper) {
        //   console.log("<<<<<<<sortByAPI>>>>>>>>>");
        helper.sortBy(component, "sLabelApi");
    },
    sortByType: function(component, event, helper) {
        //  console.log("<<<<<<<sortByType>>>>>>>>>");
        helper.sortBy(component, "sLabelType");
    },
    sortByRequired: function(component, event, helper) {
        //  console.log("<<<<<<<sortByType>>>>>>>>>");
        helper.sortBy(component, "required");
    },
    
    first : function(component, event, helper)
    
    {
        
        var oppList = component.get("v.SizeList");
        
        var pageSize = component.get("v.pageSize");
        
        var paginationList = [];
        
        for(var i=0; i< pageSize; i++)
            
        {
            paginationList.push(oppList[i]);
            
        }
        
        component.set('v.DispRecordList', paginationList);
        
    },
    
    last : function(component, event, helper)
    
    {
        var oppList = component.get("v.SizeList");
        
        var pageSize = component.get("v.pageSize");
        
        var totalSize = component.get("v.TotalPageSize");
        
        var paginationList = [];
        
        for(var i=totalSize-pageSize+1; i< totalSize; i++)
            
        {
            
            paginationList.push(oppList[i]);
            
        }
        
        component.set('v.DispRecordList', paginationList);
        
    },
    
    next : function(component, event, helper)
    
    {
        
        var oppList = component.get("v.SizeList");
        
        var end = component.get("v.end");
        console.log('end',end);
        var start = component.get("v.start");
        console.log('start',start);
        var pageSize = component.get("v.pageSize");
        
        //NumberofPage
        component.set('v.PageNumber',component.get('v.PageNumber')+1);
        
        var paginationList = [];  
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++)
            
        {
            if(oppList.length > end)  
              {
                paginationList.push(oppList[i]);
                counter ++ ; 
            }     
        }
        start = start + counter;
        end = end + counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        
        component.set('v.DispRecordList', paginationList);
        
    },
    previous : function(component, event, helper)
    
    {
        var oppList = component.get("v.SizeList");
        
        var end = component.get("v.end");
          console.log('previous end',end);
        var start = component.get("v.start");
          console.log('previous start',start);
        
        //NumberofPage
        component.set('v.PageNumber',component.get('v.PageNumber')-1);
        
        var pageSize = component.get("v.pageSize");
        
        var paginationList = [];
        var counter = 0;  
        for(var i= start-pageSize; i < start ; i++)   
        {
                       if(i > -1)
                
            {  
                paginationList.push(oppList[i]);
                counter ++;     
            } 
            else { 
                start++; 
            }
        }
        
        start = start - counter;
        end = end - counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.DispRecordList', paginationList);
        
    }
    
})