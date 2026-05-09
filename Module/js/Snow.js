/*
 * @name: Snow Premium Unlock
 * @author: PremiumCC
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "result": "SUCCESS",
    "data": {
        "subscriber_status": "ACTIVE",
        "subscription_type": "PREMIUM",
        "product_id": "com.snow.premium.yearly",
        "original_purchase_date": "2024-01-09T02:00:00Z",
        "purchase_date": "2024-01-09T02:00:00Z",
        "expires_date": "9999-01-09T02:00:00Z",
        "is_trial_period": false,
        "is_in_intro_offer_period": false,
        "auto_renew_status": true,
        "store": "app_store",
        "environment": "Production"
    }
};

$done({ body: JSON.stringify(objc) });
