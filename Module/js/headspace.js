/*
 * @name: Headspace Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (PremiumCC)
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "subscriptions": [
        {
            "sku": "com.headspace.annual",
            "status": "active",
            "store": "apple",
            "is_trial": false,
            "expires_at": "9999-01-09T02:00:00Z",
            "started_at": "2024-01-09T02:00:00Z",
            "product_id": "com.headspace.annual"
        }
    ],
    "has_subscription": true
};

$done({ body: JSON.stringify(objc) });
