({
  getIndexFrmParent : function(target,helper,attributeToFind){
    //User can click on any child element, so traverse till intended parent found
    var SelIndex = target.getAttribute(attributeToFind);
    while(!SelIndex){
        target = target.parentNode ;
        SelIndex = helper.getIndexFrmParent(target,helper,attributeToFind);           
    }
    return SelIndex;
},
     SearchHelper: function(component, srcValue) {
        console.log('>>>>>>',component.get("v.AccData"));
        var allData = component.get("v.AccData");
       // console.log('>>>>>>',allData);
        var finalResult = [];
        for(var i= 0; i < allData.length ; i++){
            //console.log('inside>>>>>>>>',allData.length);
           // console.log('srcValue.trim>>>>>>',srcValue);
          //  console.log('srcValue.trim>>>>>>',srcValue.trim());
          //  console.log('>>allData[i].name>>>',allData[i].Name);
            if(allData[i].Name == srcValue.trim())
                finalResult.push(allData[i]);
                console.log('>>+++++++>>>>',finalResult,i);
            
        }
    //    console.log('>>+++++++>>>>',finalResult);
        component.set("v.lstRcds",finalResult);
    }
})