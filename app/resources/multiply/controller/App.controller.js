/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0, no-sequences: 0, no-unused-expressions: 0*/
/*eslint-env es6 */
//To use a javascript controller its name must end with .controller.js
sap.ui.define([
    "sap/sample/common/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, Model) {
    "use strict";
    return BaseController.extend("sap.sample.multiply.controller.App", {

        onInit: function () {
            let model = new Model({})
            this.getView().setModel(model)
        },

        onLiveChange: function (oEvent) {
            let view = this.getView()
            let result = view.getModel().getData()
            let controller = this.getView().getController()
            let valSend
            if (oEvent.getParameters().id.includes("val1")) {
                valSend = result.val2
            } else {
                valSend = result.val1
            }
            if (valSend === undefined) {
                valSend = 0
            }
            let aUrl = "/rest/multiply/" +
                + encodeURIComponent(oEvent.getParameters().newValue) +
                "/" + encodeURIComponent(valSend)
            jQuery.ajax({
                url: aUrl,
                method: "GET",
                dataType: "json",
                success: (myTxt) => {
                    controller.onCompleteMultiply(myTxt, view)
                },
                error: controller.onErrorCall
            })
        },

        onCompleteMultiply: function (myTxt, view) {
            var oResult = view.byId("result")
            if (myTxt === undefined) {
                oResult.setText(0)
            } else {
                sap.ui.require(["sap/ui/core/format/NumberFormat"], (NumberFormat) => {
                    var oNumberFormat = NumberFormat.getIntegerInstance({
                        maxFractionDigits: 12,
                        minFractionDigits: 0,
                        groupingEnabled: true
                    });
                    oResult.setText(oNumberFormat.format(myTxt));
                })
            }
        }

    })
})