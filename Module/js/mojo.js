/*
 * @name: Mojo Pro Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (z3rokaze)
 * @homepage: https://github.com/z3rokaze/NguyenNgocAnhTu
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "subscription": {
        "productId": "com.mojo.pro.yearly",
        "isActive": true,
        "willRenew": true,
        "isPremium": true,
        "expirationDate": "9999-01-09T02:00:00Z",
        "purchaseDate": "2024-01-09T02:00:00Z",
        "originalPurchaseDate": "2024-01-09T02:00:00Z",
        "store": "app_store"
    }
};

$done({ body: JSON.stringify(objc) });
