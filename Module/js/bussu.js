/*
 * @name: Busuu Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (z3rokaze)
 * @homepage: https://github.com/z3rokaze/NguyenNgocAnhTu
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "user": {
        "id": "z3rokaze_premium",
        "email": "premium@z3rokaze.com",
        "premium": true,
        "premium_until": "9999-01-09T02:00:00Z",
        "subscription_type": "premium_plus",
        "is_trial": false,
        "features": {
            "offline_mode": true,
            "grammar_review": true,
            "vocabulary_trainer": true,
            "travel_courses": true,
            "business_courses": true,
            "certificates": true
        }
    }
};

$done({ body: JSON.stringify(objc) });
