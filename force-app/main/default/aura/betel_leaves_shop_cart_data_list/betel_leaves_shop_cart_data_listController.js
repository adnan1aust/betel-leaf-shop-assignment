({
  closeModel: function(component, event, helper) {
    component.set("v.showCart", false);
  },
  updateCost: function(component, event, helper) {
    let cartObjects = component.get("v.cartObjectList");
    let totalPrice = 0;

    /*Update the price as soon as the quantity is changed*/

    for (var key in cartObjects) {
      var obj = cartObjects[key];
      if (obj.quantity < 0) {
        alert("Quantity can not be negative");
        return;
      }
      obj.total = obj.price * obj.quantity;
      totalPrice += obj.total;
    }
    component.set("v.cartObjectList", cartObjects);
    component.set("v.totalPrice", totalPrice);
  },
  doSave: function(component, event, helper) {
    let cartObjects = component.get("v.cartObjectList");
    //console.log("objectsss: " + JSON.stringify(cartObjects));

    /*Arrays to hold the data*/
    let product = [];
    let invidualPrice = [];
    let totalPrice = [];
    let amount = [];

    /*Populate the data*/
    for (var key in cartObjects) {
      let obj = cartObjects[key];

      product.push(obj.Id);
      invidualPrice.push(obj.price);
      totalPrice.push(obj.total);
      amount.push(obj.quantity);
    }

    product = product.join(",");
    invidualPrice = invidualPrice.join(",");
    totalPrice = totalPrice.join(",");
    amount = amount.join(",");

    let userAddress = component.find("userAddress").get("v.value");

    let cartObject = {
      Name: product,
      amount__c: amount,
      individual_price__c: invidualPrice,
      individual_total_price__c: totalPrice,
      client_address__c: userAddress
    };
    console.log("objectsss: " + JSON.stringify(cartObject));

    let action = component.get("c.saveShoppingCart");
    action.setParams({
      shoppingCart: cartObject
    });
    action.setCallback(
      this,
      function(response) {
        let state = response.getState();
        alert(state);
        if (state == "SUCCESS" || state == "DRAFT") {
          alert("Thank you for your purchase.");
          component.set("v.showCart", false);
          location.reload();
        }
      },
      "ALL"
    );
    $A.enqueueAction(action, false);
  }
});
