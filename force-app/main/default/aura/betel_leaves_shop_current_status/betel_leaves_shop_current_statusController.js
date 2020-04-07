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
  printTable: function(component, event, helper) {
    let tab = document.getElementById("dataTable");
    let tableHtml = tab.outerHTML;
    tableHtml = tableHtml.split('"').join("'");
    console.log(tableHtml);
    let win = window.open("", "", "height=700,width=700");
    win.document.write(tableHtml);
    win.document.close();
    win.print();
  }
});
