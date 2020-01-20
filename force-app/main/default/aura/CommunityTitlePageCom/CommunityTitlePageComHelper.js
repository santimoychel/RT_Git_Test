({
   question: function(component, event) {
    var action = component.get("c.retrieveRecord");
    action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var res = response.getReturnValue();
            console.log('>>> Count Like >>>>>',res.LikeCount);
            component.set("v.userById", res.userById);
            component.set("v.bestAnswerId", res.FeedItemObj.BestCommentId); 
           
            if(res.FeedItemObj.BestCommentId != null && res.FeedItemObj.BestCommentId != undefined){
                
                let rec = res.FeedCommentList.find(rec =>  rec.Id == res.FeedItemObj.BestCommentId );           

                if(rec != null && rec != undefined && rec !=''){
                    component.set("v.bestAnswer",rec);
                    component.set("v.isBestAnswerShow",true);               
                }  
                      
            }else{
              component.set("v.isBestAnswerShow",false);
              component.set("v.bestAnswer",null);
            }
            component.set("v.feedItem", res.FeedItemObj);
            component.set("v.feedComment", res.FeedCommentList);
            component.set('v.isShowHeader', true);

            component.set("v.IsRichText",false);

            if(res.FeedItemObj.LikeCount == 0){
              component.set("v.isLike",true);
            }
            else{
              component.set("v.isLike",false);
            }
        }
    });
    $A.enqueueAction(action);
  },
  // answer: function(component, event, helper) {
    
  //   var articleURL = window.location.pathname;
  //   console.log(">>>> URL >>>>>", articleURL);

  //   var action = component.get("c.retrieveFCRecord");
   
  //   action.setCallback(this, function(response) {
  //     var state = response.getState();
      
  //     if (state === "SUCCESS") {
  //       var name = response.getReturnValue();
        
  //     }
  //     var values = name;

  //     var views;
  //     values.forEach(function(rec) {
  //       views = rec.Revision;
  //     });
  //     component.set("v.userViews", views);

      //     var values = name;
      //     var StartDate ;
      //     var endDate;
      //     values.forEach(function(rec){
      //         StartDate = rec.CreatedDate ;
      //         endDate = rec.LastEditDate;
      //         finalDate = StartDate.Date() - endDate.Date();
      //         console.log('Final Date ->',finalDate);
      //     });
      //    console.log('>>>> FeedItem Id >>>>',id);
  //     component.set("v.answers", name.length);
  //     component.set("v.feedComment", name);
  //   });
  //   $A.enqueueAction(action);
  // },
  // FOR edit and Delete operations
  // doEdit: function(component, event, helper) {
  //   var selectedMenuItemValue = event.getParam("value");
  //   var editRecordEvent = $A.get("e.force:editRecord");
  //   editRecordEvent.setParams({
  //     recordId: event.target.id
  //     //selectedMenuItemValue.replace('_EDIT', '')
  //   });
  //   editRecordEvent.fire();
  // },

  // doDelete: function(component, event, helper) {
  //   var selectedMenuItemValue = event.getParam("value");
    
  //   var idtask = selectedMenuItemValue.replace("_DELETE", "");
  //   var action = component.get("c.deleteTaskById");
  //   action.setParams({
  //     taskid: idtask,
  //     recordId: component.get("v.recordId")
  //   });
  //   action.setCallback(this, function(r) {
  //     if (r.getState() === "SUCCESS") {
  //       helper.doInit(component, event, helper);
  //     } else {
  //       //console.log(r.getError());
  //     }
  //   });
  //   $A.enqueueAction(action);
  // }

  
});