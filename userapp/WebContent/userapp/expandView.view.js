sap.ui.jsview("userapp.expandView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf userapp.collapsedMode
	*/ 
	getControllerName : function() {
		return "userapp.expandView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf userapp.collapsedMode
	*/ 
	createContent : function(oController) {

		var oButton=new sap.m.Button("expandBtn",{
			text:"Chat Area",
			type:"Accept",
			width:"100%",
			press:[oController.expand, oController]
			
		});
		
		return oButton;
	}

});
