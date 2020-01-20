({
    folderId : function(component, event, helper) {
        var action = component.get("c.getFolderId");
        // console.log('>>>uploadedFiles>>>>', JSON.parse(JSON.stringify(action)));
        
        var result;
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === 'SUCCESS') {
                
                result = response.getReturnValue();
                
                //    component.set('v.folderName', response.getReturnValue());
                
            }
         result.forEach(function(res){
                component.set("v.libraryId",res.Id);
                component.set("v.libraryName",res.Name);
                // console.log('>> res.Id >>',res.Id);
            });
        });
        $A.enqueueAction(action);
        
    },
    
     doInit1: function (component, event, helper) {
        var spinner = component.find("spnr");
        var action = component.get('c.getAccountTree');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                //get account and respective contact list, and initialize with items
                component.set('v.items', response.getReturnValue());
                //hide spinner after getting data
                $A.util.toggleClass(spinner, "slds-hide");
            }else{
                $A.util.toggleClass(spinner, "slds-hide");
                alert('ERROR');
            }
        });
        $A.enqueueAction(action);
    },
     getImgId: function (component, event, helper) {
        var action=component.get("c.getImageId");
       // console.log('imgId-' + action);
        action.setCallback(this, function(response) {
           var state = response.getState();
           if(component.isValid() && state === 'SUCCESS') {
                component.set("v.listOfimgId",response.getReturnValue());
               // console.log('sucess-');
           }
       });
        $A.enqueueAction(action); 
    },
    disFolderName: function (component, event, helper) {
        var idOfselectfolder=component.get("v.libraryId1");
        console.log('idOfselectfolder ',idOfselectfolder);
        var action=component.get("c.getfolderName");
        
          action.setParams({ 
                           "idoffolder" : idOfselectfolder 
                          });
          action.setCallback(this, function(response) {
            var state = response.getState();
            //  console.log('state',state);
            if( state === 'SUCCESS') {
              console.log('vvvv ',response.getReturnValue());
               component.set("v.folderName",response.getReturnValue()); 
               
            }
        });
        $A.enqueueAction(action);
        
    },
    
    disRecordParticularFolder : function (component, event, helper) {
        
        var action=component.get("c.getrecordDetailsfromFolder");
        var value= component.get("v.libraryId1");
      console.log('value>>>',value)
          action.setParams({ 
                           "idofcontentfolder" : value 
                          });
            action.setCallback(this, function(response) {
            var state = response.getState();
            //  console.log('state',state);
            if( state === 'SUCCESS') {
          console.table('response ',response.getReturnValue());
              component.set("v.FileDetails1",response.getReturnValue()); 
               
            }
        });
        $A.enqueueAction(action);
        
    } 
})