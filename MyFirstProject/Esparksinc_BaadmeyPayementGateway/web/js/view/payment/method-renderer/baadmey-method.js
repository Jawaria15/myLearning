define(
    [
        'jquery',
        'mage/url',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/model/totals'
    ],
    function($, url, Component, totals) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Esparksinc_BaadmeyPayementGateway/payment/baadmey'
            },
            getMailingAddress: function() {
                return window.checkoutConfig.payment.checkmo.mailingAddress;
            },
            getInstructions: function() {
                return window.checkoutConfig.payment.instructions[this.item.method];
            },

            getLogo: function() {
                return window.checkoutConfig.imageUrl;
            },
            getInstallMentsText: function() {
                return window.checkoutConfig.installmentsText;
            },
            getInstallMent: function() {
                return Math.floor(totals.totals().grand_total / 3);
            },
            getPopUpText: function() {
                return window.checkoutConfig.popupText;
            },
            getSymbol: function() {
                return window.checkoutConfig.currencySymbol;
            },
            customPlaceOrder: function() {
                var formurl = "baadmey gateway";
                var conurl = url.build('customgateway/baadmeygateway/index');
                window.location = conurl;
                $.ajax({
                    type: "POST",
                    url: conurl,
                    data: { form: formurl },
                    success: function(response) {
                        Materialize.toast('Order added successfully', 4000, 'android-success');
                    }

                });
            },
        });
    }
);