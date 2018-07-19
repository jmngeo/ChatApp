sap.ui.controller("chatapp.groups", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf chatapp.groups
	 */
	onInit : function() {
		
		
		var oData = {
				names : [ {
					Name : "#HELPDESK",
					Channel : "channel1",
					Description : "User Clients"
				}, {
					Name : "#GENERAL",
					Channel : "channel2",
					Description : "GENERAL"
				}, {
					Name : "",
					Channel : "channel3",
					Description : ""
				}, {
					Name : "",
					Channel : "channel4",
					Description : ""
				}, {
					Name : "",
					Channel : "channel5",
					Description : ""
				} ]
			};
		sName = "admin";
		// create some dummy JSON oData
//		this.oDataTable = oData;
		channel = "";

		// create a oModel with this oData
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(oData);
		sap.ui.getCore().setModel(oModel, "list");
		
		// pubnub init
		pubnub = new PubNub({
			publishKey: 'pub-c-0ee381bb-ce80-4cf0-8d63-7ecdb89f6149',
			subscribeKey: 'sub-c-fd0d34fa-7f70-11e8-8a91-7eaf2813b766'
		});
		
	},
	
	subscribeToChannel : function(sChannel) {
//		Subscribe to channel after checking whether already subscribed.
		var oChatData = sap.ui.getCore().getModel("chat").getData();
		var aSubscribedChannels = oChatData.subscribed_channels;
		console.log(aSubscribedChannels);
		var bIsAlreadySubscribed = false;
		for(var i=0;i<aSubscribedChannels.length;i++) {
			if(aSubscribedChannels[i]==sChannel) {
				console.log("Already Exists!!");
				bIsAlreadySubscribed = true;
			}
		}
		if(!bIsAlreadySubscribed) {
			oChatData.subscribed_channels.push(sChannel);
//			pubnub subscribe
			pubnub.subscribe({
				channels: [sChannel]
			});
		}
	},

	enterGroup : function(oEvt) {
		var sClickedData = oEvt.getSource().getTitle();
		var oData = sap.ui.getCore().getModel("list").getData();
		var oNewData = [];
		var oChatData = sap.ui.getCore().getModel("chat").getData();
		oChatData["current_chat"] = [];
		oChatData["current_room"] = sClickedData;
		console.log(oChatData);
		for (var i = 0; i < oData["names"].length; i++) {
			if (oData["names"][i]["Name"] === sClickedData) {
				oNewData.push(oData["names"][i]);
				channel = oData["names"][i]["Channel"];
				if(oChatData[channel] != undefined)
					oChatData["current_chat"] = oChatData[channel].slice();
			}
		}
		sap.ui.getCore().getModel("chat").refresh();
		console.log(oNewData);
		sap.ui.getCore().getModel("table").setData(oNewData);
		this.subscribeToChannel(oNewData[0]["Channel"]);
	},
	
	changeName : function(oEvt) {
		sName = oEvt.getSource().getValue();
		sap.m.MessageToast.show("Name Changed", {
			my: "center top",
			at: "center top"
		});
		return;
	}

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf chatapp.groups
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf chatapp.groups
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf chatapp.groups
 */
// onExit: function() {
//
// }
});