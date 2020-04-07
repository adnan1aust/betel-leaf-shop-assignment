({
  doSearch: function(component, event, helper) {
    let componentEvent = component.getEvent("betelSearchEvent");
    let searchParam = component.find("searchInput").get("v.value");
    componentEvent.setParams({
      searchText: searchParam
    });
    componentEvent.fire();
  }
});
