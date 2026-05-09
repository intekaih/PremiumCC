/*
 * @name: Emby Premiere Unlock
 * @author: PremiumCC
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "cacheExpirationDays": 999,
    "message": "Device is valid",
    "resultCode": "GOOD"
};

$done({ body: JSON.stringify(objc) });
