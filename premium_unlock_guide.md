# Hướng Dẫn Unlock Premium Apps via MITM Proxy

> Tổng hợp từ repo [ekaznyra/PremiumCC](https://github.com/ekaznyra/PremiumCC)
> Ngày: 2026-05-09

---

## 1. Tổng Quan

Module proxy (Shadowrocket/Surge/Loon...) sử dụng kỹ thuật **MITM (Man-in-the-Middle)** để chặn và sửa đổi response từ server, giả lập trạng thái Premium cho 20+ ứng dụng iOS.

### Cơ chế hoạt động

```
App gửi request kiểm tra subscription
        ↓
Shadowrocket chặn giữa đường (MITM + SSL Decrypt)
        ↓
Script JS sửa response → inject trạng thái "Premium"
        ↓
App nhận response giả → hiển thị Premium
```

### Điều kiện bắt buộc

- **Phải BẬT VPN (Shadowrocket)** để giữ Premium
- Tắt VPN = app gọi thẳng server thật = mất Premium
- Ngoại lệ: một số app cache trạng thái (xem mục 6)

---

## 2. Chọn App Proxy

| App | CPU/Pin | RAM | Giá | Nóng máy | Ghi chú |
|---|---|---|---|---|---|
| **Shadowrocket** ⭐ | 🟢 Rất thấp | ~30MB | $2.99 | Ít nhất | Khuyên dùng |
| **LanceX** ⭐ | 🟢 Rất thấp | ~25MB | $1.99 | Ít nhất | Rẻ nhất, UI tiếng Trung |
| Quantumult X | 🟡 Thấp | ~50MB | $7.99 | Ít | Pro user |
| Loon | 🟡 TB | ~60MB | $5.99 | TB | Plugin system tốt |
| Surge | 🔴 Cao | ~80-120MB | $49.99 | Nóng nhất | Overkill cho mục đích này |
| Stash | 🟡 TB | ~70MB | $14.99 | TB | Clash-based |

**→ Dùng Shadowrocket hoặc LanceX là tối ưu nhất (nhẹ, rẻ, tương thích 100%).**

### Mẹo giảm nóng máy

1. **Tắt Log** — Settings → tắt ghi log
2. **Chỉ bật module cần thiết** — không bật hết nếu chỉ xài 2-3 app
3. **Dùng DIRECT** — nếu không cần VPN lướt web, chọn Global Direct
4. **Giảm hostname MITM** — bỏ domain không cần = ít giải mã SSL = ít CPU

---

## 3. Cấu Trúc Repo

```
ekaznyra/PremiumCC/
├── Module/
│   ├── js/                              # Script JS xử lý response
│   │   ├── revenuecat_multi.js          # ⭐ RevenueCat bypass (Locket, 车票票, generic)
│   │   ├── deleteHeader.js              # Xóa ETag header
│   │   ├── youtube.response.js          # YouTube Premium
│   │   ├── spotify-json.js              # Spotify (JSON)
│   │   ├── spotify-proto.js             # Spotify (Protobuf)
│   │   ├── SoundCloudGoPlus.js          # SoundCloud Go+
│   │   ├── PicsArt.js                   # PicsArt Gold
│   │   ├── lightroom.js                 # Adobe Lightroom
│   │   ├── photoshop.js                 # Adobe Photoshop Express
│   │   ├── emby.js                      # Emby Premiere
│   │   ├── Kinemaster.js                # KineMaster Pro
│   │   ├── calm.js                      # Calm Premium
│   │   ├── headspace.js                 # Headspace Premium
│   │   ├── AlightMotion.js              # Alight Motion Pro
│   │   ├── WinkVipCrack.js              # Wink VIP
│   │   ├── TrueCaller.js                # Truecaller Premium
│   │   ├── camScanner.js                # CamScanner Premium
│   │   ├── BeautyPlus.js                # BeautyPlus Premium
│   │   ├── VSCO.js                      # VSCO Premium
│   │   ├── Snow.js                      # Snow Premium
│   │   ├── MeiTuXiuXiu.js              # Meitu XiuXiu Premium
│   │   ├── bussu.js                     # Bussu Premium
│   │   ├── djay.js                      # djay Pro
│   │   ├── funimate.js                  # Funimate Pro
│   │   ├── mojo.js                      # Mojo Pro
│   │   ├── reface.js                    # Reface Pro
│   │   ├── unfold.js                    # Unfold Pro
│   │   └── widgetsmith.js               # Widgetsmith Pro
│   │
│   ├── PremiumCC_Premium.module   # Shadowrocket config
│   ├── PremiumCC_LanceX.module    # LanceX config
│   ├── PremiumCC_Loon.plugin      # Loon config
│   ├── PremiumCC_Surge.sgmodule   # Surge config
│   ├── PremiumCC_QuantumultX.snippet  # QX config
│   └── PremiumCC_Stash.stoverride     # Stash config
```

---

## 4. Kỹ Thuật Chính

### 4.1 RevenueCat Bypass (quan trọng nhất)

Nhiều app dùng RevenueCat (`api.revenuecat.com`) để quản lý subscription. Script `revenuecat_multi.js` hoạt động như sau:

```javascript
// Cấu trúc response RevenueCat gốc:
{
  "subscriber": {
    "entitlements": {},        // ← rỗng = free user
    "subscriptions": {}        // ← rỗng = chưa mua
  }
}

// Sau khi script sửa:
{
  "subscriber": {
    "entitlements": {
      "Gold": {                // ← inject entitlement giả
        "expires_date": "9999-07-18T10:10:14Z",
        "product_identifier": "locket_1600_1y"
      }
    },
    "subscriptions": {
      "locket_1600_1y": {      // ← inject subscription giả
        "expires_date": "9999-01-09T10:10:14Z",
        "ownership_type": "PURCHASED",
        "store": "app_store"
      }
    }
  }
}
```

**App phân biệt bằng User-Agent:**

```javascript
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],  // 车票票
  'Locket': ['Gold']                                     // Locket
};
// Nếu UA không match → fallback dùng entitlement "pro"
```

### 4.2 Header Rewrite

Xóa header `X-RevenueCat-ETag` để server không trả về cached response (304):

```javascript
// deleteHeader.js
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
```

### 4.3 YouTube Premium

- **Block QUIC protocol** (UDP) → force dùng HTTPS (để MITM được)
- **URL Rewrite** → block domain quảng cáo
- **Script protobuf** → sửa response binary để bỏ ads + bật PiP/Background

### 4.4 Spotify Premium

- **Block ad domains** → `audio-ak-spotify-com.akamaized.net`, v.v.
- **Xóa `if-none-match` header** → force server gửi response mới
- **Script protobuf** → sửa bootstrap response

---

## 5. Cài Đặt (Shadowrocket)

### Bước 1: Cài Module

1. Mở Shadowrocket → Tab **Configuration**
2. Chọn config đang dùng → **Edit Configuration**
3. Kéo xuống phần `[Module]` → nhấn **+**
4. Chọn **Add Module URL** → dán:

```
https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_Premium.module
```

5. Save

### Bước 2: Cài MITM Certificate

1. **Settings** → **Certificate** → **Generate New Certificate**
2. **Install Certificate** → Safari mở → cài profile
3. **Cài đặt** → **Cài đặt chung** → **VPN & Quản lý thiết bị** → cài profile
4. **Cài đặt** → **Cài đặt chung** → **Giới thiệu** → **Cài đặt tin cậy chứng chỉ**
5. Bật tin cậy cho Shadowrocket

### Bước 3: Xác minh

- Mở YouTube → không có quảng cáo ✅
- Mở Spotify → bỏ qua không giới hạn ✅
- Mở Locket → Premium đã kích hoạt ✅

---

## 6. Giữ Premium Khi Tắt VPN (DNS Block)

Một số app **cache trạng thái Premium** vào bộ nhớ local. Nếu block domain verify subscription bằng DNS → app không check lại được → giữ Premium mãi.

**Ví dụ Locket Gold:**

Repo cung cấp file `LocketGoldDNS.mobileconfig` — cài vào iOS Settings để block DNS level.

**Nguyên lý:**

```
App muốn check subscription → gọi api.revenuecat.com
        ↓
DNS Profile block domain này → request fail
        ↓
App dùng cache cũ (Premium) → vẫn Premium ✅
```

---

## 7. Triển Khai Cho App Mới (VD: Litmatch)

### Bước 1: Xác định hệ thống subscription

Bật Shadowrocket MITM cho các domain sau, rồi mở app:

```
api.revenuecat.com, api.rc-backup.com, buy.itunes.apple.com, *.litmatch.*, *.litatom.*
```

Xem log để xác định app gọi đến đâu.

### Bước 2: Nếu dùng RevenueCat

Chỉ cần sửa `revenuecat_multi.js`, thêm vào mapping:

```javascript
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold'],
  'Litmatch': ['premium']  // ← thêm dòng này
};
```

> ⚠️ `'premium'` là tên entitlement — cần xem response thật để biết chính xác.

Config module cần thêm hostname MITM:

```ini
[MITM]
hostname = api.revenuecat.com
```

### Bước 3: Nếu dùng iTunes Receipt

Tận dụng script `iTunes.js` từ chxm1023:

```ini
[Script]
itunes = type=http-response, pattern=^https?://buy\.itunes\.apple\.com/verifyReceipt$, script-path=https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes.js, requires-body=true, timeout=60

[MITM]
hostname = buy.itunes.apple.com
```

### Bước 4: Nếu dùng API riêng

Cần:
1. Bắt request/response bằng MITM
2. Phân tích cấu trúc JSON response
3. Viết script JS mới theo pattern:

```javascript
var obj = JSON.parse($response.body);

// Sửa các field liên quan đến premium
obj.is_vip = true;
obj.vip_level = 3;
obj.vip_expire_time = 4102444800;  // 2099-12-31

$done({ body: JSON.stringify(obj) });
```

---

## 8. Template Tạo Script Mới

### Template cơ bản (JSON response)

```javascript
/***********************************************
> [TÊN APP] Premium Unlocker
> Author: [tên]
> Date: [ngày]
***********************************************/

var obj = JSON.parse($response.body);

// === SỬA RESPONSE TẠI ĐÂY === //
obj.is_premium = true;
obj.subscription = {
  status: "active",
  plan: "yearly",
  expires_at: "9999-12-31T23:59:59Z"
};

$done({ body: JSON.stringify(obj) });
```

### Template RevenueCat (copy từ repo)

```javascript
/***********************************************
> RevenueCat Premium Unlocker - [TÊN APP]
***********************************************/

const mapping = {
  '[APP_UA_KEYWORD]': ['[ENTITLEMENT_NAME]']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
  obj = JSON.parse($response.body);

var subscription = {
  auto_resume_date: null,
  display_name: "[PRODUCT_ID]",
  is_sandbox: true,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "9999-01-09T10:10:14Z",
  original_purchase_date: "2005-07-18T10:10:15Z",
  purchase_date: "2005-07-18T10:10:14Z",
  store: "app_store",
  store_transaction_id: "2000001108724193",
};

var entitlement = {
  purchase_date: "2005-07-18T10:10:14Z",
  product_identifier: "[PRODUCT_ID]",
  expires_date: "9999-07-18T10:10:14Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let entitlementName = mapping[match][0];
  obj.subscriber.subscriptions["[PRODUCT_ID]"] = subscription;
  obj.subscriber.entitlements[entitlementName] = entitlement;
} else {
  obj.subscriber.subscriptions["[PRODUCT_ID]"] = subscription;
  obj.subscriber.entitlements.pro = entitlement;
}

$done({ body: JSON.stringify(obj) });
```

### Template Module Config (Shadowrocket `.module`)

```ini
#!name=⚡ [TÊN MODULE]
#!desc=Unlock [TÊN APP] Premium
#!version=1.0.0
#!date=[NGÀY]
#!author=[TÊN]

[Header Rewrite]
^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) header-del X-RevenueCat-ETag

[Script]
[tên]-response = type=http-response, pattern=^https:\/\/[DOMAIN_PATTERN], script-path=[URL_SCRIPT], requires-body=true, timeout=60

[MITM]
hostname = [DANH_SÁCH_DOMAIN]
```

---

## 9. Các URL Module Sẵn Có

| App Proxy | URL |
|---|---|
| **Shadowrocket** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_Premium.module` |
| **LanceX** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_LanceX.module` |
| **Surge** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_Surge.sgmodule` |
| **Loon** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_Loon.plugin` |
| **Quantumult X** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_QuantumultX.snippet` |
| **Stash** | `https://raw.githubusercontent.com/PremiumCC/PremiumCC/main/Module/PremiumCC_Stash.stoverride` |

---

## 10. Lưu Ý Quan Trọng

- ⚠️ Việc sử dụng module này **vi phạm điều khoản dịch vụ** của các app
- ⚠️ Có thể bị **khóa tài khoản** nếu app phát hiện
- ⚠️ Cài MITM certificate = **giảm bảo mật** thiết bị — chỉ trust certificate cho mục đích cụ thể
- ⚠️ Không hoạt động với app dùng **Certificate Pinning** hoặc **Trusted Entitlements** (RevenueCat v4+)
- ⚠️ Script có thể **hết hiệu lực** khi app/server update
