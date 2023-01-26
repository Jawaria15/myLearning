define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function(
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push({
            type: 'baadmey',
            component: 'Esparksinc_BaadmeyPayementGateway/js/view/payment/method-renderer/baadmey-method'
        });
        return Component.extend({});
    }
);