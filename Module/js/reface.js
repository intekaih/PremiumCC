/*
 * @name: Reface Premium Unlock
 * @author: PremiumCC
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "is_subscribed": true,
    "subscription_type": "yearly",
    "product_id": "com.reface.pro.yearly",
    "expires_date": "9999-01-09T02:00:00Z",
    "purchase_date": "2024-01-09T02:00:00Z",
    "is_trial": false,
    "features": {
        "unlimited_swaps": true,
        "hd_quality": true,
        "no_watermark": true,
        "premium_content": true
    }
};

$done({ body: JSON.stringify(objc) });
