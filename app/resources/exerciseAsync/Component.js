/* eslint-disable no-undef */
/*eslint-env es6 */
sap.ui.define([
    "sap/sample/common/Component"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("sap.sample.exerciseAsync.Component", {

        metadata: {
            manifest: "json"
        },

        createContent: function () {
            // create root view
            var oView = sap.ui.view({
                id: "App",
                viewName: `sap.sample.exerciseAsync.view.App`,
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
            var oModel = this.getModel("chatModel")
            oModel.setData({
                chat: "",
                message: ""
            })
            this.superInit()
        }
    })
})