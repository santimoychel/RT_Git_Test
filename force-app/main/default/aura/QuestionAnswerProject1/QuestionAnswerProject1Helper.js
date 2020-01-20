({
    getUser : function(component, event, helper) {
        // Fetching the user
        var action = component.get("c.fetchUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // set current user information on userInfo attribute
                component.set("v.userInfo", storeResponse);
            }
        });
        $A.enqueueAction(action);
    },
    question : function(component, event, helper) {
        // console.log('>Question >');
        
        
        var action = component.get("c.retrieveRecord"); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            // console.log('>>>> Response.getState()>>>',state);
            if (state === "SUCCESS") {
                var name = response.getReturnValue();
                // console.log('>>>> name Question >>>',name);
            } 
            var values = name;
            var id ;
            var createDate;
            values.forEach(function(rec){
                id = rec.Id ;
                createDate=rec.CreatedDate;
            });
        //  console.log('>>>> FeedItem Id >>>>',createDate);
            
            component.set("v.feedItem",name);
          this.timeCalculate(component,id,createDate);
          
        }); 
        $A.enqueueAction(action);
    },
    answer : function(component, event, helper) {
        // console.log('>>>>>>>>>>>>> start ');
        var action = component.get("c.retrieveFCRecord"); 
        // action.setParams({
        // FIId : component.get('v.recordId'),
        // })
        action.setCallback(this, function(response) {
            var state = response.getState();
            // console.log('>>>> Response.getState()>>>',state);
            if (state === "SUCCESS") {
                var name = response.getReturnValue();
                // console.log('>>>> name length >>>',name.length);
            } 
            // var values = name;
            // var StartDate ;
            // var endDate;
            // values.forEach(function(rec){
            // StartDate = rec.CreatedDate ;
            // endDate = rec.LastEditDate;
            // finalDate = StartDate.Date() - endDate.Date();
            // console.log('Final Date ->',finalDate);
            // });
            // console.log('>>>> FeedItem Id >>>>',id);
            //  component.set("v.feedCommentlength",name.length);
            component.set("v.feedComment",name);
            
        });
        $A.enqueueAction(action);
    },
    // FOR edit and Delete operations
    doEdit: function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": '0D72v000005EAtsCAG'
            //event.target.id
            //selectedMenuItemValue.replace('_EDIT', '')
        });
        editRecordEvent.fire();
    },
    
    doDelete: function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        var idtask = selectedMenuItemValue.replace('_DELETE', '');
        var action = component.get("c.deleteTaskById");
        action.setParams({
            "taskid":idtask,
            "recordId" : component.get("v.recordId")
        });
        action.setCallback(this, function(r) {
            if(r.getState()==='SUCCESS'){
                helper.doInit(component, event, helper);
            }else{
                //console.log(r.getError());
            }
        });
        $A.enqueueAction(action);
    },
  
    timeCalculate: function(component,id,createDate) {
        var localDate = new Date();
          // console.log('Local Date in Your Laptop : '+localDate);
        
        var currentMonth =localDate.getMonth() + 1;
        //   console.log('currentMonth : '+currentMonth);
        
        var currentyear = localDate.getFullYear();
        //   console.log('currentyear : '+currentyear);
        
        var currentDay = localDate.getDate();
         //  console.log('currentDay : '+currentDay);
        
         var CreateDate = new Date(createDate);
         //  console.log('createDate : '+CreateDate);
        
         var postingMonth =CreateDate.getMonth() + 1;
         //  console.log('postingMonth : '+postingMonth);
        
        var postingYear = CreateDate.getFullYear();
         //  console.log('postingYear : '+postingYear);
        
        var PostingDay = CreateDate.getDate();
         //  console.log('PostingDay : '+PostingDay);
          
         var diffOfDays=currentDay-PostingDay;
         //console.log('diffOfDays ',diffOfDays);
        
         var diffOfHours=CreateDate.getHours()-localDate.getHours();
         var diffOfMin=CreateDate.getMinutes()-localDate.getMinutes();
         var diffOfSec=CreateDate.getSeconds()-localDate.getSeconds();
        // var diffOfMillSec=createDate.getMilliseconds()-localDate.getMilliseconds());
        
          // console.log('diffOfHours : '+diffOfHours);
          // console.log('diffOfMin : '+diffOfMin);
          // console.log('diffOfSec : '+diffOfSec);
          
        
        var numberDaysDue;
        
       if(diffOfDays<1){
            if(diffOfHours<24 && diffOfHours>1){
                numberDaysDue=diffOfHours  +'  Hours Ago';
            
                console.log('diffOfHours>>>>>>>>> '+numberDaysDue);
         
            }
            else if (diffOfMin<60 && diffOfMin>1){
                  numberDaysDue= diffOfMin +'  Min Ago';
                    console.log('diffOfMin>>>>>>>>> '+numberDaysDue);
              
            }
            else{
                numberDaysDue=diffOfSec +'  Sec Ago';
                   console.log('diffOfSec>>>>>>>>> '+numberDaysDue);
            }
        }
        else{
                numberDaysDue=diffOfDays+'  DaysAgo';
                console.log('numberDaysDue>>>>>>>>> '+numberDaysDue);
        }

          component.set("v.differenceOfPostingdays",numberDaysDue);
    },
     copyTextHelper : function(component,event,text) {
        // Create an hidden input
        var hiddenInput = document.createElement("input");
        // passed text into the input
        hiddenInput.setAttribute("value", text);
        // Append the hiddenInput input to the body
        document.body.appendChild(hiddenInput);
        // select the content
        hiddenInput.select();
        // Execute the copy command
        document.execCommand("copy");
        // Remove the input from the body after copy text
        document.body.removeChild(hiddenInput); 
        // store target button label value
        var orignalLabel = event.getSource().get("v.label");
        // change button icon after copy text
        event.getSource().set("v.iconName" , 'utility:check');
        // change button label with 'copied' after copy text 
        event.getSource().set("v.label" , 'copied');
        
        // set timeout to reset icon and label value after 700 milliseconds 
        setTimeout(function(){ 
            event.getSource().set("v.iconName" , 'utility:copy_to_clipboard'); 
            event.getSource().set("v.label" , orignalLabel);
        }, 700);
        component.set("v.isModalOpen", false);
    }
    
})