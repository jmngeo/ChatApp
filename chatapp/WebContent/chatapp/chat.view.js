sap.ui.jsview("chatapp.chat", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf chatapp.chat
	 */
	getControllerName : function() {
		return "chatapp.chat";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf chatapp.chat
	 */
	createContent : function(oController) {

		var oTimeline = new sap.suite.ui.commons.Timeline({
			noDataText : "Sorry no messages here",
			showFilterBar : false,
			width : "80%",
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

		var oScrollContainer = new sap.m.ScrollContainer({
			width : "100%",
			height : "90%",
			horizontal : false,
			vertical : true,
			content : [ oTimeline ]
		});

		var oInp = new sap.m.Input({
			placeholder : "Enter your message and Press ↵ to submit.",
			submit : [ oController.sendMessage, oController ],
			width:"100%"
		});


		return new sap.m.Page({
			title : "{chat>/current_room}",
			content : [oScrollContainer, oInp  ]
		});
	}

});