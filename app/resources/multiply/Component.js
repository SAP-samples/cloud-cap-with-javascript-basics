/* eslint-disable no-undef */
/*eslint-env es6 */
sap.ui.define([
    "sap/sample/common/Component"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("sap.sample.multiply.Component", {

        metadata: {
            manifest: "json"
        },

        createContent: function () {
            // create root view
            var oView = sap.ui.view({
                id: "App",
                viewName: `sap.sample.multiply.view.App`,
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
            this.superInit()
        }
    })
})