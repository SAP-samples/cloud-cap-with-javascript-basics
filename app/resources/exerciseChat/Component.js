/* eslint-disable no-undef */
/*eslint-env es6 */
sap.ui.define([
    "sap/sample/common/Component"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("sap.sample.exerciseChat.Component", {

        metadata: {
            manifest: "json"
        },

        createContent: function () {
            // create root view
            var oView = sap.ui.view({
                id: "App",
                viewName: `sap.sample.exerciseChat.view.App`,
                type: "XML",
                async: true,
                viewData: {
                    component: this
                }
            })
            return oView
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // Chat Model
            let oModel = this.getModel("chatModel")
            let names = ["Student1", "Student2", "Student3", "Student4", "Student5", "Student6"]
            oModel.setData({
				user: names[Math.floor(names.length * Math.random())],
				chat: "",
				message: ""
            })
            this.superInit()
        }
    })
})