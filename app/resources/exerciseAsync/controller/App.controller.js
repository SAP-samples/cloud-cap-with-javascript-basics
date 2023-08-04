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
    var connection = new WebSocket("/rest/excAsync")

    return BaseController.extend("sap.sample.exerciseAsync.controller.App", {

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
                var msg = data.text,
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
        sendBasic: function () {
            let oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "async"
            }))
        },

        sendFileS: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "fileSync"
            }))
        },

        sendFileA: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "fileAsync"
            }))
        },

        sendHTTP: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "httpClient"
            }))
        },

        sendHTTP2: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "httpClient2"
            }))
        },

        sendDB1: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "dbAsync"
            }))
        },

        sendDB2: function () {
            var oModel = this.getOwnerComponent().getModel("chatModel")
            oModel.setData({
                chat: ""
            }, true)
            connection.send(JSON.stringify({
                action: "dbAsync2"
            }))
        }

    })
})