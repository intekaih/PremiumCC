/*
 * @name: Photoshop Express Premium Unlock
 * @author: Nguyễn Ngọc Anh Tú (PremiumCC)
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

var objc = JSON.parse($response.body);

objc = {
    "mobileProfile": {
        "profileStatus": "PROFILE_AVAILABLE",
        "relationshipProfile": {
            "commerce": {
                "subscriptions": [
                    {
                        "productArrangement": "INDIVIDUAL",
                        "productName": "PHOTOSHOP_EXPRESS_PREMIUM",
                        "status": "ACTIVE",
                        "store": "APPLE_APPSTORE",
                        "contractId": "PremiumCC_premium_2024"
                    }
                ]
            }
        }
    }
};

$done({ body: JSON.stringify(objc) });
