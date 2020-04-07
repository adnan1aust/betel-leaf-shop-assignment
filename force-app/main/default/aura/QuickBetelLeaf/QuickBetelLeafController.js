({
  closeModel: function(component, event, helper) {
    component.set("v.showInputFields", false);
  },
  doSave: function(component, event, helper) {
    let action = component.get("c.createBetelLeafType");
    action.setParams({
      betelLeafType: component.get("v.betelLeafType")
    });
    action.setCallback(
      this,
      function(response) {
        let state = response.getState();
        alert(state);
        if (state == "SUCCESS" || state == "DRAFT") {
          alert("Details inserted successfully.");
          component.set("v.showInputFields", false);
          location.reload();
        }
      },
      "ALL"
    );
    $A.enqueueAction(action, false);
  }
});
