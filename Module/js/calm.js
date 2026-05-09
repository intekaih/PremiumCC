/*
 * @name: Calm Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (z3rokaze)
 * @homepage: https://github.com/z3rokaze/NguyenNgocAnhTu
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "subscription": {
        "type": "lifetime",
        "is_active": true,
        "will_renew": true,
        "product_id": "com.calm.subscription.yearly",
        "store": "app_store",
        "original_purchase_date": "2024-01-09T02:00:00Z",
        "purchase_date": "2024-01-09T02:00:00Z",
        "expires_date": "9999-01-09T02:00:00Z"
    },
    "is_subscriber": true,
    "subscriber_type": "paid"
};

$done({ body: JSON.stringify(objc) });
