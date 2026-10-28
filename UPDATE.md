# 2026-10-28: Eight-language country game expansion

## Scope

- Preserved the Korean root and every existing `/ko/`, `/en/`, `/es/`, `/zh/` route.
- Added complete Japanese, German, French and Portuguese source editions at `/ja/`, `/de/`, `/fr/`, `/pt/`.
- Translated controls, dialogs, source/license explanations, runtime state, validation/error messages, country/color/region names, sharing text, page descriptions and OG images. REST Countries translations are used for country names; Japanese Kosovo uses `Intl.DisplayNames` because the source snapshot omits that translation.
- Preserved 199 results, original population/equal draw models, exclusion rules, settings and credit accounting. Existing share/copy behavior and cache namespaces are retained. New editions use their own settings/credit namespace.
- The language selector preserves the corresponding country result route. Every home/result document has reciprocal eight-language hreflang, an x-default route and a self canonical URL. The root sitemap includes all 1,800 HTML routes.
- Preserved the original appearance and bottom-right `More Apps` directory link.

## Publisher policy

All HTML uses one guarded bootstrap for GTM `GTM-NV2WWQXB`, GA `G-2ZYSF0173P`, AdSense `ca-pub-9767176956440077` and Cloudflare token `9f3423bb0d034d91bbe1a12afeff2429`. Automatic GA page views are disabled. A single explicit `page_view` sends only the current origin/path, a blank referrer and the page title; it omits the query and hash. Repeat initialization does not send a duplicate page view. Only HTTPS on `nanalab.kr`, its subdomains and `nanacompany.github.io` may create these external scripts. HTTP, local/loopback hosts and file URLs create zero publisher scripts. Static tracking tags and the unconditional GTM iframe were replaced. The noscript fallback is intentionally inert because static HTML cannot check its host/protocol.

## Preservation

`tests/fixtures/preserved-hashes.json` checks 1,493 original source-data, license, art and robots files against baseline commit `fb255bb4cd2bdcb372067f4cbc32a83e42ba2993`: 93 text files use the original Git blob with LF EOL normalization, and 1,400 binary images retain raw SHA-256. Each normalized text baseline was checked directly against the original Git blob. The separate release audit `rebirth_country-preserved-raw.json` also retains all 1,493 original Windows checkout byte hashes; all raw hashes still match after the build. Source JSON data no longer gets rewritten by the build; this also preserves the original CRLF byte convention. Existing original art files are reused byte-for-byte. New OG files have a source-SVG input hash cache so changed text causes a refresh.

## Verification

- Dependency installation: `npm ci --ignore-scripts`, invoked through bundled Node/npm CLI. 0 vulnerabilities reported. System npm initially returned EPERM for a node_modules directory; bundled Node completed successfully.
- Full eight-language build: passed.
- `node --test tests/*.test.js`: 14 tests passed, 0 failed on the current Windows host. The latest run includes the sanitized single page-view event and portable text-EOL preservation checks. No Linux execution is claimed.
- Actual application-controller VM checks cover every language: free first draw, one redraw, cancelled native share, failed copy and blocked popup granting no bonus, successful clipboard preparation granting +2 only once per card.
- Model/credits tests, 199 crawler-readable result metadata, JPEG signatures, all 1,800 canonical/hreflang/navigation/sitemap entries and local asset references passed.
- All 1,493 preserved hashes passed.
- Publisher VM checks passed for HTTP/HTTPS localhost, IPv4/IPv6 loopback, file URLs, an unrelated host and both allowed production host families. Production loads four integrations and one sanitized GA page view once; repeated execution does not duplicate them.
- New locale audit passed: 4 languages × 199 names, 16 JavaScript syntax checks, 60 engine/style/license/data hash checks and targeted untranslated-copy checks.
- Visually inspected four generated OG files: Japanese US, German BA, French KR and Portuguese GB. Text was readable without overlap in those samples.

Browser interaction, native platform delivery, Git commit/push, GitHub Pages deployment and served-production readback are coordinated by the parent release task and are not claimed here. Clipboard/popup preparation is not proof of a message being sent.

- Repeat-build determinism check passed: all 4,215 files in the complete docs tree were byte-identical before/after a full rebuild. No output-file difference remained.
