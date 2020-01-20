({
    doInit : function(component, event, helper) {
        
        let record = component.get('v.record');
        let fld = component.get('v.fld');
        let value ='';
        let fldApiName = fld.fldApiName;
        if(fldApiName.includes('.')){
            let fldsList = fldApiName.split('.');
            let innerObj = record[fldsList[0]];
            value = innerObj[fldsList[1]];
        }else{
            value = record[fld.fldApiName];
        }
        component.set('v.value',value);
    }
})