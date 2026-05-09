/*
 * @name: Lightroom Premium Unlock
 * @author: PremiumCC
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "entitlement": {
        "status": "subscriber",
        "current_subs": {
            "product_id": "lightroom_premium_yearly",
            "store": "adobe",
            "purchase_date": "2024-01-09T02:00:00Z",
            "expiration_date": "9999-01-09T02:00:00Z",
            "auto_renew": true
        }
    },
    "storage": {
        "used": 0,
        "limit": 1099511627776,
        "warn": 1099511627776,
        "display_limit": "1TB"
    },
    "profile": {
        "email_verified": true,
        "first_name": "Premium",
        "last_name": "CC"
    }
};

$done({ body: JSON.stringify(objc) });
