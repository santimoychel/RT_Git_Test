({
    handleSelect: function (component, event, helper) {
        //return name of selected tree item
        var selectedName = event.getParam('name');
        component.set("v.showAddBtn",true);   
        component.set("v.disFolder",true);   
       // console.log('selectedName>>>>>>>>>>>',selectedName);
        component.set("v.libraryId1",selectedName);
        
        var action = component.get("c.getfolderLabelName");
        
        action.setParams({ 
                           "idoflabel" : selectedName 
                          });
          action.setCallback(this, function(response) {
            var state = response.getState();
            //  console.log('state',state);
            if( state === 'SUCCESS') {
               console.log('vvvv ',response.getReturnValue());
               component.set("v.labelName",response.getReturnValue()); 
               
            }
        });
        $A.enqueueAction(action);
        helper.disFolderName(component, event, helper);
        helper.disRecordParticularFolder(component, event, helper);
    },
    doInit : function(component, event, helper) {
        console.log('>>>>>>>');
        
       // var action = component.get("c.dispFileDeatails");
        //   var lengthOfaction =action.length;
        //   console.log(lengthOfaction);
        
       /* action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === 'SUCCESS') {
             component.set("v.FileDetails", response.getReturnValue()); 
            }
        });
        $A.enqueueAction(action);*/
         var action=component.get("c.dispAllLibrary");
        
         
          action.setCallback(this, function(response) {
            var state = response.getState();
            //  console.log('state',state);
            if( state === 'SUCCESS') {
           // console.log('vvvv ',response.getReturnValue());
               component.set("v.FileDetails",response.getReturnValue()); 
               
            }
        });
        $A.enqueueAction(action);
        helper.folderId(component, event, helper);
        helper.doInit1(component, event, helper);
        helper.getImgId(component, event, helper);
        
        
    },
    handleUploadFinished: function (cmp, event) {
        // This will contain the List of File uploaded data and status
        var uploadedFiles = event.getParam("files");
        
        //  console.log('>>>uploadedFiles>>>>',uploadedFiles);          
        alert("Files uploaded : " + uploadedFiles.length);
        //    console.log('>>>uploadedFiles>>>>');
    },
    
    handleClick: function(component, event, helper) {
        // Set isModalOpen attribute to truecreateFolder
        component.set("v.isModalOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
    },
    
    handlerOfsubmitDetails: function(component, event, helper) {
        
       // console.log('>>>>>>>');
        var myAttri = component.find("createFolderName").get("v.value");
      //  console.log(myAttri);
        var libId = component.get("v.libraryId1");
       // console.log(libId);
        var action = component.get("c.createFolder");
        
        action.setParams({ "folderName" : myAttri,
                          "libraryId":libId
                         });
        
       // console.log('>>>>action>>>',action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === 'SUCCESS') {
                
            }
        });
        $A.enqueueAction(action);
        component.set("v.isModalOpen", false);
        $A.get('e.force:refreshView').fire();
    },
    handleTileMode: function(component, event, helper) {
        var selectedMenu = event.detail.menuItem.get("v.value");
       // console.log('selectedMenu-' + selectedMenu);
        
        if(selectedMenu=='Table'){
            component.set("v.changeTileandTable",true);
            
        }else{
            component.set("v.changeTileandTable",false);
        }
        
        
    },
    openFolder: function(component, event, helper) {
        
        alert('>>>');
      //  console.log('>>>>>>>>>>>>>>');
        
    }
})