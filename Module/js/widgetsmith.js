/*
 * @name: Widgetsmith Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (PremiumCC)
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "subscription": {
        "is_premium": true,
        "premium_until": "9999-01-09T02:00:00Z",
        "product_id": "com.widgetsmith.premium.yearly",
        "store": "app_store",
        "purchase_date": "2024-01-09T02:00:00Z"
    }
};

$done({ body: JSON.stringify(objc) });
