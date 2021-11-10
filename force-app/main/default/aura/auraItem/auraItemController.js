({
    handleClick: function(component, event, helper) {
    
        let action = component.getEvent("selectItem");
        let contact = component.get("v.item")
        action.setParams({"details": contact})
    
        action.fire();
    },  
})
