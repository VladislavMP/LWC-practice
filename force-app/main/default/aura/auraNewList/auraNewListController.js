({
    doInit: function(component, event, helper) {
        let action = component.get("c.getContactList");
    
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.listContact10", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
    
        $A.enqueueAction(action);
    },    

    handleSelectEvent: function(component, event, helper) {
        let contact = event.getParam("details");
        component.set("v.selectedItem", contact);

    }, 
})
