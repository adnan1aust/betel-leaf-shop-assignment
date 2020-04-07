({
  doInit: function(component, event, helper) {
    let action = component.get("c.getRecords");

    action.setParams({});

    action.setCallback(
      this,
      function(response) {
        let state = response.getState();

        if (state == "SUCCESS" || state == "DRAFT") {
          let responseValue = response.getReturnValue();
          console.log(state);
          component.set("v.records", responseValue);
        } else if (state == "INCOMPLETE") {
          console.log("Request incomplete for data retrieve operation");
        } else if (state == "ERROR") {
          let errors = response.getError();
          console.log(
            "Threr was an error while requesting for data: " +
              errors[0].pageErrors[0].message
          );
        }
      },
      "ALL"
    );

    $A.enqueueAction(action, false);
  },
  doRedirect: function(component, event, helper) {
    let eventSource = event.getSource();
    let id = eventSource.get("v.name");

    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      recordId: id,
      slideDevName: "detail"
    });
    navEvt.fire();
  },
  addType: function(component, event, helper) {
    component.set("v.showInputFields", true);
  },
  doSearch: function(component, event, helper) {
    let searchParam = event.getParam("searchText");

    let action = component.get("c.searchRecords");

    action.setParams({
      searchText: searchParam
    });

    action.setCallback(
      this,
      function(response) {
        let state = response.getState();

        if (state == "SUCCESS" || state == "DRAFT") {
          let responseValue = response.getReturnValue();
          console.log(state);
          component.set("v.records", responseValue);
        } else if (state == "INCOMPLETE") {
          console.log("Request incomplete for data retrieve operation");
        } else if (state == "ERROR") {
          let errors = response.getError();
          console.log(
            "Threr was an error while requesting for data: " +
              errors[0].pageErrors[0].message
          );
        }
      },
      "ALL"
    );

    $A.enqueueAction(action, false);
  }
});
