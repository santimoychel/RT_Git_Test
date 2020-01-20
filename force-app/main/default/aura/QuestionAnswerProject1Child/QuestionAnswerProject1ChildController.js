({
    doInit : function(component, event, helper) {
        console.log('>>>>>>>>>> Child >>>>>>>>>');
        // var res = component.get("v.feedCommentChild");
        // console.log('res Child -->',JSON.stringify(res));
        // console.log('res Child 1 -->',JSON.stringify(res.CreatedBy.Name));
        
        // component.set("v.value",res);
        // helper.getUser(component, event, helper);
        // helper.answer(component, event, helper);
    },
    like : function(component, event, helper) {
        var res = component.get("v.IsLike");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        component.set("v.IsLike",res);
        
    },
    comment : function(component, event, helper) {
        var res = component.get("v.IsComment");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        //component.set("v.IsComment",res);
        component.set("v.IsRichText",true);
        //helper.answer(component, event, helper);
    },
    share : function(component, event, helper) {
        component.set("v.IsShare",true);
        
    },
    select : function(component, event, helper) {
        var res = component.get("v.IsSelect");
        if(res == true){
            res = false;
        }
        else{
            res = true;
        }
        component.set("v.IsSelect",res);
        
    },
    bestAnsBtn : function(component, event, helper) {
        var value=component.get("v.bestAns");
        console.log(value);
        var AnswerDetails = component.get("v.feedCommentChild");
        var topAnsDiv=component.get("v.topAnsDiv");
        console.log(topAnsDiv);
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