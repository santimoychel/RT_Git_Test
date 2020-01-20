({
	   doAction : function(component, event, helper) {
        var params = event.getParam("param");
           console.log('params>>>>>>>',params);
        if (params) {
            var param = params.param;
            component.set('v.no_times',param);
        }
    }
})