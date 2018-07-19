sap.ui.jsview("userapp.userChatBox", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf chatapp.userPage
	*/ 
	getControllerName : function() {
		return "userapp.userChatBox";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf chatapp.userPage
	*/ 
	createContent : function(oController) {
		
		
		var oButton=new sap.m.Button({
			text:"Chat Area",
			type:"Accept",
			width:"100%",
			press:[oController.collapse, oController]
			
		});
		var oNameInp=new sap.m.Input("chatInp",{
			placeholder : "Enter your name.",
//			valueLiveUpdate="true",
			submit : [ oController.changeName, oController ],
			width:"75%"
		});
		
		var oChatBtn=new sap.m.Button({
			text:"Chat",
			type:"Emphasized",
			width:"20%",
			press:[oController.enterGroup, oController]
			
		});
		
		var oTimeline = new sap.suite.ui.commons.Timeline({
			noDataText : "Initiate Chat",
			showFilterBar : false,
			width : "100%",
			
			enableScroll : false
		});

		oTimeline.bindAggregation("content", {
			path : "chat>/current_chat",
			template : new sap.suite.ui.commons.TimelineItem({
				dateTime : "{chat>timestamp}",
				text : "{chat>message}",
				userName : "{chat>username}",
				icon : "sap-icon://person-placeholder"
			})
		});

		var oScrollContainer = new sap.m.ScrollContainer("scroll",{
			width : "100%",
			height : "80%",
			horizontal : false,
			vertical : true,
			content : [ oNameInp,oChatBtn,oTimeline ]
		});
		

		var oInp = new sap.m.Input("inputMessage",{
			placeholder : "Enter your message",
			submit : [ oController.sendMessage, oController ],
			width:"100%"
		});
		
		var flexBox=new sap.m.FlexBox("idFlexBox",{
			items:[ oButton,oScrollContainer,oInp ],
			direction: "Column",
			height:"500px",
			width:"350px"
		}).addStyleClass("backgroundcolor");
 		
 		return flexBox;
	}

});