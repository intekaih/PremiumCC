/*
 * @name: Funimate Pro Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (PremiumCC)
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

if (objc.user) {
    objc.user.is_pro = true;
    objc.user.pro_status = "active";
    objc.user.pro_expires_at = "9999-01-09T02:00:00Z";
    objc.user.subscription_type = "yearly";
}

$done({ body: JSON.stringify(objc) });
