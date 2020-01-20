({
    doInit : function(component, event, helper) {
        
        var answer = component.get("v.feedCommentChild");
       // console.log('>>>>>>>> 1 answer 1 >>>>>>>',JSON.parse(JSON.stringify(answer)));
        let userById = component.get('v.userById'); 
        
        let imageUrl = '/assets/images/avatar1.jpg';
        if(userById[answer.CreatedById] != null && userById[answer.CreatedById] != undefined){
            imageUrl = userById[answer.CreatedById].SmallPhotoUrl;
        }
        component.set('v.imageUrl',imageUrl);
        let bestAnswerId = component.get('v.bestAnswerId');
        if(bestAnswerId != null && answer.Id == bestAnswerId){
            component.set('v.isSelectedAsBest',true);
        }   
    },
    editAndDelete : function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue === 'Edit'){
            var editRecordEvent = $A.get("e.force:editRecord");
                var editRec = component.get("v.feedCommentChild");
                editRecordEvent.setParams({
                    "recordId": editRec.FeedItemId,
             });
                editRecordEvent.fire();
        }else{
            helper.deleteRecord(component,event,helper);  
        }
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
                        helper.handelBestAnswer(component, event, helper);
                        //     console.log('Value fields in child ->',value);
                        //     var answerDetails = component.get("v.feedComment");
                        
                        //    var questionId = component.get("v.feedItemId");
                        
                        //    console.log('questionId in child ->',questionId);
                        //     var answerId = component.get("v.bestAnswerId");
                        
                        //     console.log('answerId in child ->',answerId);
                        //     var topAnsDiv=component.get("v.topAnsDiv");
                        //     console.log('topAnsDiv in child ->',topAnsDiv);
                        //     var action = component.get("c.updateBestAnswer");
                        //     action.setParams({
                        //         'questionId' : questionId,
                        //         'answerId' : answerId
                        //     });
                        //         action.setCallback(this, function(response) {
                        //                     var state = response.getState();
                        //                     if (state === "SUCCESS") {
                        //                         var res = response.getReturnValue();
                        //                         //component.set("v.", res);
                        //                     }
                        //                 });
                        //                 $A.enqueueAction(action);
                        
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
                    },
                        removeBestAnswer :function(component, event, helper) {
                            var value=component.get("v.bestAns");
                          //  console.log('>>>>>>> value form Child contoller >>>>>>');
                            helper.handelRemoveBestAnswer(component, event, helper);
                            if(value==true || topAnsDiv==true){
                                value=false;
                                topAnsDiv=false;
                            }
                            else{
                                value=true;
                                topAnsDiv=true;
                            }
                            component.set("v.bestAns",value);
                            component.set("v.topAnsDiv",topAnsDiv);
                        }

})