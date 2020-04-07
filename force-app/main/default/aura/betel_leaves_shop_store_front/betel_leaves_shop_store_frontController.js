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
  addToCart: function(component, event, helper) {
    let eventSource = event.getSource();
    let id = eventSource.get("v.name");
    let ids = component.get("v.checkoutIds");
    ids.push(id);
    component.set("v.checkoutIds", ids);
    alert("Item added to your cart");
  },
  checkOut: function(component, event, helper) {
    let action = component.get("c.getRecordsById");
    let ids = component.get("v.checkoutIds");
    if (ids.length == 0) {
      alert("Please select at least one item");
      return;
    }
    action.setParams({
      idList: ids
    });

    action.setCallback(
      this,
      function(response) {
        let state = response.getState();

        if (state == "SUCCESS" || state == "DRAFT") {
          let responseValue = response.getReturnValue();
          component.set("v.checkoutItems", responseValue);
          component.set("v.showCart", true);

          let cartSize = component.get("v.checkoutItems");

          /*Genrating JSON*/
          let cartObjectList = [];
          let totalPrice = 0;
          for (let i = 0; i < cartSize.length; i++) {
            cartObjectList.push({
              Id: cartSize[i].Id,
              name: cartSize[i].Name,
              quantity: 1,
              price: cartSize[i].price_per_leaf__c,
              total: cartSize[i].price_per_leaf__c
            });
            totalPrice += cartSize[i].price_per_leaf__c;
          }
          component.set("v.cartObjectList", cartObjectList);
          component.set("v.totalPrice", totalPrice);
        } else if (state == "INCOMPLETE") {
          console.log("Request incomplete for data retrieve operation");
        } else if (state == "ERROR") {
          let errors = response.getError();
          console.log(
            "There was an error while requesting for data: " +
              errors[0].pageErrors[0].message
          );
        }
      },
      "ALL"
    );

    $A.enqueueAction(action, false);
  }
});
