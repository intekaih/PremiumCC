/*
 * @name: BeautyPlus Premium Unlock
 * @author: PremiumCC
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-04-21
 */

var objc = JSON.parse($response.body);

objc = {
    "vip_expires_date": 4071600000,
    "message": "success",
    "data": {
        "points": 999999999,
        "next_claim": 1,
        "gid": "2641810920",
        "balance": 999999999,
        "created_at": 1707331696
    }
}

$done({ body: JSON.stringify(objc) });
