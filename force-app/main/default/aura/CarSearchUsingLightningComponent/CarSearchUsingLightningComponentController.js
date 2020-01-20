({
     doInit:function(component, event, helper) {
        var createCarRecord =$A.get("e.force:createRecord");
        if(createCarRecord ){
            
            component.set("v.showNew",true);
        }
        else{
            component.set("v.showNew",false);
            console.log("Event is not supportd");
        }
         var carTypes=component.get("v.carTypes");
         component.set("v.carTypes",['sports car','Luxary Car','van']);
         carTypes=component.get("v.carTypes");
    },
    onSearhClick : function(component, event, helper) {
        helper.helperOnClick(component, event, helper);
    },
    /*  ontoggleClick:function(component, event, helper){
        var currentValue=component.get("v.isNewbtnAvailable");
       // console.log("Method is Executed");//debug purpose
       // debugger;
        if(currentValue){
            component.set("v.isNewbtnAvailable",false);
        }
        else{
            component.set("v.isNewbtnAvailable",true);
        }
      //  var value=component.get("v.isNewbtnAvailable");//debug purpose
      //  cosole.log("value"+value)//debug purpose
    },*/
    newValueSelected:function(component, event, helper) {
        var CarTypeId=component.find("carTypeList").get("v.value");
        alert(CarTypeId+'Option Selected');
    }
    
   
})