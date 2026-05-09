/*
 * @name: Unfold Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (z3rokaze)
 * @homepage: https://github.com/z3rokaze/NguyenNgocAnhTu
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "receipt": {
        "is_valid": true,
        "is_premium": true,
        "product_id": "com.unfold.premium.yearly",
        "expires_date": "9999-01-09T02:00:00Z",
        "purchase_date": "2024-01-09T02:00:00Z",
        "original_purchase_date": "2024-01-09T02:00:00Z"
    }
};

$done({ body: JSON.stringify(objc) });
