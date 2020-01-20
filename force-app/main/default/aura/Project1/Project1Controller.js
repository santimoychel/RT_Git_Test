({  
    doInit : function(component, event, helper) {  
      var action = component.get("c.getObjRslts");  
    //  alert('************' + component.get("v.sObjectName"));  
      action.setParams({  
       objName: component.get("v.sObjectName"),        
      });  
     action.setCallback(this, function(data) {  
    //   alert(data.getReturnValue());  
        component.set("v.lstRcds", data.getReturnValue());  
    });      
    $A.enqueueAction(action);   
   }  
,

toggleVisibility : function(component, event, helper)
{
    var RelatedTo=component.get("v.RelatedTo");
    if (RelatedTo==null || RelatedTo.length==0)
    {
        var ddDiv = component.find('ddId');
        $A.util.toggleClass(ddDiv,'slds-is-open');
        console.log("Toggle");
    }
    else
        console.log('We will not toggle as the value is selected');
},

blurtoggleVisibility : function(component, event, helper)
{
    var RelatedTo=component.get("v.RelatedTo");
    if (RelatedTo==null || RelatedTo.length==0)
    {
        var ddDiv = component.find('ddId');
        window.setTimeout(
            $A.getCallback(function() {
                $A.util.toggleClass(ddDiv,'slds-is-open');
                console.log('Toggle on Blur event');
         }), 250);
    }
     var val= component.find("setInput").value;
   
},

init: function(component, event, helper)
{
    var ddDiv = component.find('ddId');
    $A.util.toggleClass(ddDiv,'slds-is-open');
},

itemSelected : function(component, event, helper)
{

    console.log('We are in Select function');
    var target = event.target;   
    var SelIndex = helper.getIndexFrmParent(target,helper,"data-selectedIndex");  
    if(SelIndex){
        var selectedOption = component.get("v.options");
        var selItem = selectedOption[SelIndex];
        if(selItem.label){
            console.log('Selected Value : ',selItem.label,'>>>>>>>>',selItem);
            component.set("v.RelatedTo",selItem.label);
             component.set("v.sObjectName",selItem.label); //set the value in Sobject
             
        }
    }
    //Enable And Disable
    
    component.set("v.manageBtn", false);
},

serverCall : function(component, event, helper) {  
    var target = event.target;  
    var RelatedTo = target.value; 
    var PreviousRelatedValue=component.get("v.RelatedTo");
    if (RelatedTo.length==0 || RelatedTo==null)
    {
        var ddDiv = component.find('ddId');
        $A.util.toggleClass(ddDiv,'slds-is-open');
        console.log('Value in input box is empty');
    }
    else if ((PreviousRelatedValue==undefined && (RelatedTo.length>0)) ||
             ((PreviousRelatedValue!=undefined) && (PreviousRelatedValue.length==0) && (RelatedTo.length>0)))
    {
        var ddDiv = component.find('ddId');
        $A.util.toggleClass(ddDiv,'slds-is-open');
    }
    else
    {
        console.log('Value in the Input Box:',RelatedTo);
    }
    component.set("v.RelatedTo",RelatedTo);
    console.log('Value in Variable :',component.get("v.RelatedTo"));
},
    handleClick : function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    },
    closeModal:function(component,event,helper){    
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
    },
    openmodal: function(component,event,helper) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
     
      Search: function(component, event, helper) {
       if('v.searchString'!='null'){
            helper.SearchHelper(component, component.get('v.searchString'));
           //console.log('<<<<<gggggg>>>>>',component.get('v.searchString'));
        }
        else{
            helper.getAccounts(component);
        }
    },
    saveBtn:function(component,event,helper){
    
     }


})