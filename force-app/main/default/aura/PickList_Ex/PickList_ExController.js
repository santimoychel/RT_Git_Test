({
    //Load Sobject Profile__c Picklist
    doInit: function(component, event, helper) {        
        
        helper.getIndustryPicklist(component, event);
    },
    handleCompanyOnChange : function(component, event, helper) {
        console.log(indutry);
        var indutry = component.get("v.candidate.Profile__c");
        console.log('indutry'+indutry);
    },
    SaveDetails : function(component, event, helper) {
        //Picklist value get 
        var selValue = component.find("industryPicklist");
        var getvalue=selValue.get("v.value");
        //Picklist value set 
        component.set("v.candidate.Profile__c",getvalue);
        
        //getting the candidate information
        var candidate = component.get("v.candidate");
        
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
                                    'Profile__c': ''
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
                
                //set value to "UnfilteredData" attaribute   
                component.set("v.UnfilteredData",data.getReturnValue());
                
                //set value to "SizeList" attaribute   
                component.set("v.SizeList",data.getReturnValue()); 
            }
            
        });
        $A.enqueueAction(action);
    },
    /*page refresh after data save*/
    isRefreshed: function(component, event, helper) {
        location.reload();
    },
    /*Searching*/
    Search: function(component, event, helper) {
        //data showing in table  
        var data = component.get("v.myList");  
        console.log('data',data.length);
        // all data featched from apex when component loaded  
        var allData = component.get("v.UnfilteredData");  
        console.log('allData ',allData.length);
        //Search tems  
        var searchKey = component.get("v.filter");  
        console.log('searchKey ',searchKey);
        // check is data is not undefined and its lenght is greater than 0  
        if(data!=undefined||data.length>0){  
            console.log('searchKey ');
            // filter method create a new array tha pass the test (provided as function)  
            var filtereddata = allData.filter( word => 
                                              word.FirstName__c != null && word.FirstName__c != undefined && word.FirstName__c != '' ? word.FirstName__c.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 : false 
               // (!searchKey) || 
            );  
            console.log('** '+filtereddata);  
        }  
        // set new filtered array value to data showing in the table.  
        // component.set("v.myList", filtereddata);
        
        // check if searchKey is blank  
        if(searchKey==''){  
            // set unfiltered data to data in the table.  
            component.set("v.myList",component.get("v.UnfilteredData"));  
        }  else{  component.set("v.myList", filtereddata); 
                
               }
    },
    //Select page Size
    onSelectChange : function(component, event, helper){
        var len=component.get("v.myList").length;
        component.set('v.totalSize', len);
        console.log('selected--------');
        var selected = component.find("records").get("v.value");
        console.log('selected',selected);
        component.set('v.pageSize', selected);
        
        var paginationList = [];
        var oppList = component.get("v.SizeList");
        console.log('oppList'+oppList)
        for(var i=0; i< selected; i++)          
        {
            paginationList.push(oppList[i]);
        }
        console.log('>>>>>>>>>',paginationList);
        component.set('v.myList', paginationList);
        
    },
})