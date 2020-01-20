({
	doInit : function(component, event, helper) {
    helper.qusDetails(component, event, helper);
    helper.ansDetails(component, event, helper);
        
	var action = component.get("c.fetchUser");
        
   var currentdate = new Date(); 
   var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  " 
                +"At " + 
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.userInfo", storeResponse);
               
                  component.set('v.today', datetime);
            }
        });
        $A.enqueueAction(action);
       
	},
    likebtn1 : function(component, event, helper) {
    var value=component.get("v.liked1");
        console.log(value);
        
        if(value==true){
            value=false;
        }
        else{
            value=true;
        }
        component.set("v.liked1",value);
    },
     likebtn2 : function(component, event, helper) {
    var value=component.get("v.liked2");
        console.log(value);
        
        if(value==true){
            value=false;
        }
        else{
            value=true;
        }
        component.set("v.liked2",value);
    },
     likebtn3 : function(component, event, helper) {
    var value=component.get("v.liked3");
        console.log(value);
        
        if(value==true){
            value=false;
        }
        else{
            value=true;
        }
        component.set("v.liked3",value);
    },
    bestAnsBtn : function(component, event, helper) {
    var value=component.get("v.bestAns");
        console.log(value);
     var AnswerDetails = component.get("v.AnswerDetails");
      var topAnsDiv=component.get("v.topAnsDiv");
  
        if(value==true || topAnsDiv==true){
            value=false;
            topAnsDiv=false;
        }
        else{
            value=true;
            topAnsDiv=true;
        }
        component.set("v.bestAns",value);
        component.set("v.TopAnswerDetails",AnswerDetails);
        component.set("v.topAnsDiv",topAnsDiv);
   
       
    }
})