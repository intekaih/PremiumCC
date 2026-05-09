/*
 * @name: Spotify Premium Proto Handler
 * @author: PremiumCC - Based on app2smile
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

const header = $request.headers;
const ua = header["user-agent"] || header["User-Agent"];

if (ua.includes("Spotify")) {
    let body = $response.body;

    // Premium features unlock
    const premiumConfig = {
        "ads": 0,
        "catalogue": "premium",
        "product": "premium",
        "type": "premium",
        "on-demand": true,
        "high-bitrate": true,
        "shuffle": false,
        "ad-free": true,
        "very-high-bitrate": true,
        "download": true,
        "offline": true
    };

    // Apply premium configuration
    body = body.replace(/"ads":\d+/g, '"ads":0');
    body = body.replace(/"catalogue":"[^"]*"/g, '"catalogue":"premium"');
    body = body.replace(/"product":"[^"]*"/g, '"product":"premium"');
    body = body.replace(/"type":"[^"]*"/g, '"type":"premium"');

    $done({ body });
} else {
    $done({});
}
