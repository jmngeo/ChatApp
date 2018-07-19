sap.ui.controller("userapp.expandView", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf userapp.collapsedMode
*/
	onInit: function() {
		
//		 var oExpandBtn = sap.ui.getCore().byId("expandBtn");
//		 oExpandBtn.setVisible(true);
		
		
	},
	
	
	expand:function(oEvt){
		
	 var oExpandBtn = sap.ui.getCore().byId("expandBtn");
   	 var oBox = sap.ui.getCore().byId("idFlexBox");
     if(oExpandBtn.getVisible()) {
       oBox.setVisible(true);
       oExpandBtn.setVisible(false);
           
       }
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf userapp.collapsedMode
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf userapp.collapsedMode
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf userapp.collapsedMode
*/
//	onExit: function() {
//
//	}

});