({
	click : function(component, event, helper) {
        console.log('childvalue>>>>>>>>');
        var childvalue=component.find('childcmp');
        console.log('childvalue',childvalue);
		component.set("v.no_times",component.get("v.no_times"));
        console.log('component.get("v.no_times")',component.get("v.no_times")+1);
      
        childvalue.sampleMethod(component.get('v.no_times'));
	},
    parcentAction : function(component, event, helper) {
		component.set('v.aura_action',component.get('v.aura_action')+1);
        component.set('v.aura_action',component.get('v.aura_action'));
	},
})