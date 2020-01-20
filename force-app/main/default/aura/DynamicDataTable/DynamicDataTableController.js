({
    doInit : function(component, event, helper) {
        
        helper.doInit(component, event, helper);
        
    },
    onSelectChange : function(component, event, helper){
        var len=component.get("v.tableRecords").length;
        component.set('v.totalSize', len);
        // console.log('selected--------');
        var selected = component.find("records").get("v.value");
        // console.log('selected',selected);
        component.set('v.pageSize', selected);
        
        var paginationList = [];
        var oppList = component.get("v.opportunityList");
        //console.log('oppList'+oppList)
        for(var i=0; i< selected; i++)          
        {
            paginationList.push(oppList[i]);
        }
        //    console.log('>>>>>>>>>',paginationList);
        component.set('v.tableRecords', paginationList);
           component.set("v.UnfilteredData", component.get("v.tableRecords"));
        
    },
   Search: function(component, event, helper) {
      
     //data showing in table  
     var data = component.get("v.tableRecords");  
       console.log('data ',data.length);
     // all data featched from apex when component loaded  
     var allData = component.get("v.UnfilteredData");  
         console.log('allData ',allData.length);
     //Search tems  
     var searchKey = component.get("v.searchString");  
       console.log('searchKey ',searchKey)
     // check is data is not undefined and its lenght is greater than 0  
     if(data!=undefined || data.length>0){  
       // filter method create a new array tha pass the test (provided as function)  
       var filtereddata = allData.filter(word => (!searchKey) || word.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1);  
       console.log('** '+filtereddata);  
     }  
     // set new filtered array value to data showing in the table.  
     
     // check if searchKey is blank  
     if(searchKey==''){  
       // set unfiltered data to data in the table.  
       component.set("v.tableRecords",component.get("v.UnfilteredData"));  
     }  else{
          component.set("v.tableRecords", filtereddata); 
     }
  
    },
    first : function(component, event, helper)
    
    {
        
        var oppList = component.get("v.tableRecords");
        
        var pageSize = component.get("v.pageSize");
     //   console.log(">>>>>>>>>>>>>>>>",pageSize)
        var paginationList = [];
        
        for(var i=0; i< pageSize; i++)
            
        {
            
            paginationList.push(oppList[i]);
            
        }
        
        component.set('v.opportunityList', paginationList);
        
    },
    
    last : function(component, event, helper)
    
    {
        
        var oppList = component.get("v.tableRecords");
        
        var pageSize = component.get("v.pageSize");
        
        var totalSize = component.get("v.totalSize");
        
        var paginationList = [];
        
        for(var i=totalSize-pageSize+1; i< totalSize; i++)
            
        {
            
            paginationList.push(oppList[i]);
            
        }
        component.set('v.opportunityList', paginationList);
    },
    next : function(component, event, helper)
    {
          console.log('next.......');
          var oppList = component.get("v.tableRecords");
        
        var end = component.get("v.end");
        console.log('end',end);
        
        var start = component.get("v.start");
        console.log('start',start);
        
        var pageSize = component.get("v.pageSize");
        console.log('pageSize',pageSize);
        
        var paginationList = [];
        console.log('oppList.length',oppList.length);
        
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
        component.set('v.opportunityList', paginationList);
    },
    previous : function(component, event, helper)
    
    {
          console.log('previous.......');
        var oppList = component.get("v.tableRecords");
        
        var end = component.get("v.end");
         console.log('end',end);
        var start = component.get("v.start");
          console.log('start',start);
        var pageSize = component.get("v.pageSize");
         console.log('pageSize',pageSize);
        var paginationList = [];
          console.log('oppList.length',oppList.length);
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
        component.set('v.opportunityList', paginationList);
        
    }
    
})