({
    handleLike : function(component,event,questionId) {
        console.log('>>>>> Helper like >>>>');
        console.log('>>>>> Helper like questionId >>>>',questionId);
        var action = component.get("c.updateLikes");
        action.setParams({
            "quesId" : questionId
        })
        console.log('>>>>> Helper like 1 >>>>');
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('>>>>> Helper like state >>>>',state);
            if (state === "SUCCESS") {
                // var res = response.getReturnValue();
                var event = component.getEvent("CommunityTitlePageEvent");
                event.setParam("message", "the message to send" );
                event.fire();
            }
        });
    
    $A.enqueueAction(action);
    },
    deleteRecord : function(component,event,questionId) {
        var action =  component.get("c.deleteFIRecords");
        var deletetRec = component.get("v.Question");
        console.log('>>>deletetRec>>>',JSON.parse(JSON.stringify(deletetRec.CreatedById)));
        console.log('>>>deletetRec>>>',JSON.parse(JSON.stringify(deletetRec.Id)));
    	console.log('>>>deletetRec>>>',JSON.parse(JSON.stringify(deletetRec)));
   		 action.setParams({
   							 "deleteId": deletetRec.CreatedById,
    							"Id" : deletetRec.Id
						  }); 
			action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('>>>>> controller delete state >>>>',state);
            if (state === "SUCCESS") {
                this.doInit(component,event,helper);
            }
        }),
        $A.enqueueAction(action);
    } ,
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