({
	init : function(component, event, helper) {
		 // Set the validate attribute to a function that includes validation logic
       component.set('v.validate', function() {
           var userInput = cmp.get('v.textAttribute');
           if(userInput && userInput.length>0) {
               // If the component is valid...
               return { isValid: true };
           }
           else {
               // If the component is invalid...
               return { isValid: false, errorMessage: 'A value is required.' };
           }})
	}
})