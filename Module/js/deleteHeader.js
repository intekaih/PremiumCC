/***********************************************
> RevenueCat ETag Header Remover
> Original: PremiumCC (V1.0.2)
> Updated: PremiumCC
> Date: 2026-04-21
***********************************************/

const version = 'V1.0.2';

function setHeaderValue(e,a,d){var r=a.toLowerCase();r in e?e[r]=d:e[a]=d}var modifiedHeaders=$request.headers;setHeaderValue(modifiedHeaders,"X-RevenueCat-ETag",""),$done({headers:modifiedHeaders});
