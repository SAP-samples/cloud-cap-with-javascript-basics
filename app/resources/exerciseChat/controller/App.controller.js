/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0, no-sequences: 0, no-unused-expressions: 0*/
/*eslint-env es6 */
//To use a javascript controller its name must end with .controller.js
sap.ui.define([
    "sap/sample/common/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/ws/WebSocket",
    "sap/m/MessageToast"
], function (BaseController, JSONModel, WebSocket, MessageToast) {
    "use strict";
    var connection = new WebSocket("/rest/chatServer")

    return BaseController.extend("sap.sample.exerciseChat.controller.App", {

        onInit: function () {
            // connection opened 
            connection.attachOpen((oControlEvent) => {
               MessageToast.show("connection opened")               
            })

            // server messages
            connection.attachMessage((oControlEvent) => {
                var oModel = this.getModel("chatModel")
                var eventData = oControlEvent.getParameter("data")
                var result = oModel.getData()

                var data = jQuery.parseJSON(eventData)
                var msg = data.user + ": " + data.text,
                          lastInfo = result.chat

                if (lastInfo.length > 0) {
                    lastInfo += "\r\n"
                }
                oModel.setData({
                    chat: lastInfo + msg
                }, true)
            }, this)

            // error handling
            connection.attachError((oControlEvent) => {
                MessageToast.show("Websocket connection error")
            })

            // onConnectionClose
            connection.attachClose((oControlEvent) => {
                MessageToast.show("Websocket connection closed")
            })
        },

        // send message
        sendMsg: function () {
            let oModel = this.getOwnerComponent().getModel("chatModel")
            let result = oModel.getData()
            let msg = result.message
            if (msg.length > 0) {
				connection.send(JSON.stringify({
					user: result.user,
					text: result.message
				}))
				oModel.setData({
					message: ""
				}, true)
			}
        }
    })
})