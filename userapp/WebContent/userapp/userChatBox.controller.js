sap.ui.controller("userapp.userChatBox", {
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf chatapp.userPage
*/
    onInit: function() {
    	
    	
    	
    	var oBox = sap.ui.getCore().byId("idFlexBox");
    	oBox.setVisible(false);
    	
    	
    	sWindow=window.location.href;
    
        var oData = {
                names : [ {
                    Name : "#HELPDESK",
                    Channel : "channel1",
                    Description : "User Clients"
                } ]
            };
            sName = "";
            sValue="";
            // create some dummy JSON oData
//          this.oDataTable = oData;
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
            var oData = {
                    current_room: "channel1",//"Please select a room"
                    current_chat: [],
                    subscribed_channels : ["channel1"]
                };
                var oModelCh = new sap.ui.model.json.JSONModel();
                oModelCh.setData(oData);
                sap.ui.getCore().setModel(oModelCh, "chat");
//                console.log(sap.ui.getCore().getModel("chat").getData());
                var oModel = new sap.ui.model.json.JSONModel();
                sap.ui.getCore().setModel(oModel, "table");
                pubnub.addListener({
                    message: function(message) {
                        console.log(message);
                        var oDataAppend = sap.ui.getCore().getModel("chat").getData();
                        if(!oDataAppend.hasOwnProperty(message.channel)) {
                            oDataAppend[message.channel] = [];
                        }
                        oDataAppend[message.channel].push({
                            "message": message.message.message,
                            "username": message.message.username,
                            "timestamp": Date(message.message.timestamp)
                        });
                        console.log(oDataAppend);
                        if(message.channel == channel) {
                            oDataAppend["current_chat"].push({
                                "message": message.message.message,
                                "username": message.message.username,
                                "timestamp": Date(message.message.timestamp)
                            });
                        }
                        oModelCh.refresh();
                    }
                });
        },
        
        subscribeToChannel : function() {
//          Subscribe to channel after checking whether already subscribed.
           // var oChatData = sap.ui.getCore().getModel("chat").getData();
//            var aSubscribedChannels = oChatData.subscribed_channels;
//            console.log(aSubscribedChannels);
//            var bIsAlreadySubscribed = false;
//          for(var i=0;i<aSubscribedChannels.length;i++) {
//              if(aSubscribedChannels[i]=="channel1") {
//                  console.log("Already Exists!!");
//                  bIsAlreadySubscribed = true;
//              }
//          }
            //if(!bIsAlreadySubscribed) {
               // oChatData.subscribed_channels.push("channel1");
//              pubnub subscribe
                pubnub.subscribe({
                    channels: ["channel1"]
                });
                
                         
                
                //TO PRINT THE CURRENT URL
                
                
                
                var oGroup = sap.ui.getCore().getModel("table").getData();
                if(oGroup[0] && oGroup[0].Channel) {
                    pubnub.publish({
                        message: {
                            message: sWindow,
                            timestamp: new Date(),
                            username: sName || pubnub.getUUID()
                        },
                        channel: oGroup[0].Channel
                    },
                    function (status, response) {
                        console.log(response);
                    });
                    
                }
                
                
               //DONE PRINTING THE CURRENT URL 
                
                      
                
            
        },
        enterGroup : function(oEvt) {
        	
        	
        	 var oChatInp=sap.ui.getCore().byId("chatInp");
        	 sName = oChatInp.getValue();          //             TO GET USERNAME
        	 
        	 
        	
        	
            //var sClickedData = oEvt.getSource().getTitle();
            var oData = sap.ui.getCore().getModel("list").getData();
            var oNewData = [];
            var oChatData = sap.ui.getCore().getModel("chat").getData();
            oChatData["current_chat"] = [];
            oChatData["current_room"] = "channel1";
            console.log(oChatData);
            //for (var i = 0; i < oData["names"].length; i++) {
                //if (oData["names"][i]["Name"] === "Group1") {
                    oNewData.push(oData["names"][0]);
                    channel = "channel1";
                    if(oChatData[channel] != undefined)
                        oChatData["current_chat"] = oChatData[channel].slice();
                //}
            //}
            sap.ui.getCore().getModel("chat").refresh();
            console.log(oNewData);
            sap.ui.getCore().getModel("table").setData(oNewData);
            this.subscribeToChannel();
        },
        
        changeName : function(oEvt) {            // NOT NEEDED
           
        	sName=oEvt.getSource().getValue();
        	
            sap.m.MessageToast.show("Name Changed to "+sName);
            return;
        },
        
        sendMessage : function(oEvt) {
            sValue = oEvt.getSource().getValue();
            if(sValue == "") {
                return;
            }
            var oGroup = sap.ui.getCore().getModel("table").getData();
            if(oGroup[0] && oGroup[0].Channel) {
                pubnub.publish({
                    message: {
                        message: sValue,
                        timestamp: new Date(),
                        username: sName || pubnub.getUUID()
                    },
                    channel: oGroup[0].Channel
                },
                function (status, response) {
                    console.log(response);
                });
                oEvt.getSource().setValue("");
            } else {
                sap.m.MessageToast.show("Click Chat Button to initiate Chat!", {
                    my: "center top",
                    at: "center top"
                });
            }
        },
    
    collapse:function(oEvt)
    {
    	var oExpandBtn = sap.ui.getCore().byId("expandBtn");
    	 var oBox = sap.ui.getCore().byId("idFlexBox");
         if(oBox.getVisible()) {
            oBox.setVisible(false);
            oExpandBtn.setVisible(true);
            
        }  
    }
    
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf chatapp.userPage
*/
//  onBeforeRendering: function() {
//
//  },
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf chatapp.userPage
*/
//  onAfterRendering: function() {
//
//  },
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf chatapp.userPage
*/
//  onExit: function() {
//
//  }
});