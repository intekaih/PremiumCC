/*
 * @name: Spotify Premium JSON Handler
 * @author: Nguyễn Ngọc Anh Tú (PremiumCC) - Based on app2smile
 * @homepage: https://github.com/intekaih/PremiumCC
 * @date: 2026-05-09
 */

const header = $request.headers;
const ua = header["user-agent"] || header["User-Agent"];
let obj = JSON.parse($response.body);

if (ua.includes("Spotify")) {
    if ($request.url.includes("/artistview/")) {
        obj.creator_about = {
            ...obj.creator_about,
            monthly_listeners: 999999999,
            following_count: 999999999
        };
    }
    if ($request.url.includes("/album-entity-view/")) {
        obj.album_metadata = {
            ...obj.album_metadata,
            is_premium_only: false
        };
    }
}

$done({ body: JSON.stringify(obj) });
