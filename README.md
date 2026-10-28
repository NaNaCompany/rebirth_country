# 환생 여권 · Rebirth Passport

세계 인구 비례로 다음 생의 나라를 추첨하고, 실제 일반 여권의 색상에서 영감을 받은 환생 여권을 발급하는 모바일 웹 게임.

## 실행

Node.js 22 이상. `npm ci` → `npm run build` → `npm run dev`.
미리보기: http://127.0.0.1:4173/
검증: `npm test`.

## 구성

- 크림색 종이, 코발트 지구본, 색상별 여권과 탑승권. 모바일·키보드·동작 줄이기 지원.
- 199개 국가·독자 여권 발급 지역. 인구 비례 / 균등 모드, 최대 3곳 제외.
- `/r/KR/`처럼 나라별 공유 주소. OG에는 발급된 여권이 표시되며, 방문자는 메인 화면에서 자신의 게임을 시작. 직접 접속·새로고침 모두 메인 진입. 게임 중 뒤로/앞으로 이동은 자신의 추첨 결과를 복원.
- 국가별 정적 HTML + 1200×630 JPG OG 199종, 기본 OG 1종 (기존 PNG 주소도 호환 유지). JS 실행 없이 크롤러가 메타데이터를 읽을 수 있음.
- 네이티브 공유 → 지원 안 되면 링크 복사. 카톡에는 결과 링크를 붙여넣으면 됨. Kakao SDK/App Key를 쓰는 직접 카톡 버튼은 아님.
- JPG 이미지 직접 다운로드. OG에는 기본 인구 비례 확률(국가 제외 전)을 표기. 본사이트와 동일한 Google Tag Manager·Google Analytics·Google AdSense·Cloudflare Web Analytics 삽입. 추첨 설정은 브라우저에 보관.

## 배포

빌드 결과인 `docs/`를 저장소에 함께 커밋. 기본 공개 URL은 조직의 Pages 도메인을 반영한 `https://nanalab.kr/rebirth_country`.
다른 도메인은 빌드 전에 `SITE_URL` 환경변수를 설정. 결과 페이지와 OG의 절대 URL이 함께 변경됨.
GitHub Pages: Settings → Pages → Source를 **Deploy from a branch**, 브랜치 **main**, 폴더 **/docs**로 지정. 별도 Actions 빌드 불필요. 수정 후 `npm run build` → `npm test` → `docs/` 포함 커밋·푸시.
비공개 미리보기나 localhost에서는 카톡 크롤러가 OG를 읽을 수 없음. 공개 배포 후 실제 카톡으로 결과 링크를 보내 수신 화면을 확인해야 공유 기능의 실서비스 검증이 완료됨.

## 데이터와 조사 범위

조사일: 2026-10-24.

- 인구·국가명: [REST Countries 공개 원본](https://github.com/restcountries/restcountries/blob/master/src/main/resources/countriesV3.1.json). 해당 파일 스냅샷 사용. v3.1 라이브 API는 폐기되어 빌드·런타임에서 호출하지 않음. 인구의 기준 연도는 국가마다 다를 수 있으며 현재 출생아 수가 아님. MPL-2.0, 원본은 `data/countries-source.json`에 보존.
- 여권 색상 199종: [Passport2Liberty의 현행 일반 여권 색상 조사](https://passport2liberty.org/passport-colors). 데이터 매핑과 출처: `data/passport-colors.json`. 남색·버건디·녹색·파랑·빨강·검정·틸·갈색 8개 계열. HEX는 이 서비스의 근사 표현색이며 정부 지정색 아님.
- 추가 공식 대조: 한국 남색 [대한민국 정책브리핑](https://www.korea.kr/briefing/policyBriefingView.do?newsId=148900221), 영국 청색 [GOV.UK](https://www.gov.uk/government/publications/types-of-british-passports-caseworker-guidance/types-of-british-passports-accessible). 전체 199종을 개별 정부 자료로 교차 검증한 것은 아님. 구형·신형·유효기간별 여권 색상이 다를 수 있음.
- 독자 여권이 없는 영토는 추첨에서 제외. 홍콩·마카오 등 독자 여권 발급 지역은 포함. 국적 취득·실제 환생·출생 통계 예측 서비스가 아님.
- 지도: [world-atlas](https://github.com/topojson/world-atlas), Natural Earth public domain.

여권의 국가 문장·보안 요소는 복제하지 않음. 모든 표지는 자체 지구본 문양을 쓴 환생 기념 디자인.

## 제3자 자료 공시

공개 데이터 출처·오픈소스 사용 내역 및 라이선스 전문은 사이트 하단 공시와 `src/licenses/`에 제공한다. 원본 MPL 데이터는 위 저장소 경로에서 내려받을 수 있다. 권리·구현 검토 범위는 `RIGHTS_REVIEW.md`에 기록한다.

## 다국어 통합

하나의 리포지토리에서 `/ko/`, `/en/`, `/es/`, `/zh/`, `/ja/`, `/de/`, `/fr/`, `/pt/`를 함께 배포한다. 기존 루트 한국어 주소와 공유 링크는 유지한다. 언어별 소스는 `locales/`이며 `npm run build`가 전체 `docs/`와 모든 언어·결과·출처 페이지를 포함한 사이트맵을 생성한다.

메인 및 결과 페이지의 언어 링크로 동일한 결과를 유지하며 수동 전환한다. 결과마다 8개 언어의 reciprocal hreflang과 canonical을 제공하며, 루트 한국어 200개 및 언어별 200개, 총 1,800개 HTML 주소를 사이트맵에 담는다. 저장한 언어가 없으면 GeoJS 국가 조회로 추천하고, 실패하면 브라우저 언어를 사용한다. 강제 리다이렉트는 하지 않는다. IP 자체는 저장하지 않으며 국가코드만 세션에 임시 보관한다. 외부 서비스 이용 안내는 화면에 표시한다. GeoJS 공식 문서: https://www.geojs.io/docs/v1/endpoints/country/

공유는 기기 기본 공유와 링크 복사를 사용한다. Kakao SDK·키는 포함하지 않는다. 이미지 출처와 라이선스·변경 고지를 모든 언어에서 보존한다.

## 2026-10-28 검증과 태그 정책

`UPDATE.md`에 이번 8개 언어 확장 범위와 로컬 검증을 기록한다. `tests/fixtures/preserved-hashes.json`은 확장 전 1,493개 데이터·라이선스·이미지·robots 파일의 검증 기준이다. 텍스트 93개는 원본 Git blob의 LF EOL 정규화 SHA-256, 바이너리 이미지 1,400개는 원시 SHA-256으로 검사한다. 원본 Windows 작업트리 바이트 1,493개는 별도 릴리스 감사에 보존한다. 원본 인구·여권색 데이터는 빌드가 재기록하지 않는다. 기존 OG 이미지는 보존하며 새 언어 OG는 입력 SVG 해시가 바뀔 때 갱신한다.

광고·분석 네 통합은 단일 `data-publisher-bootstrap`에서만 로드한다. HTTPS `nanalab.kr`, 그 하위 도메인, `nanacompany.github.io`만 허용한다. HTTP, localhost, 127.0.0.1, IPv6 loopback, file URL에서는 네 외부 스크립트를 생성하지 않는다. 정적 GTM noscript iframe은 프로토콜 검사가 불가능하므로 비활성 표식으로 대체한다. 브라우저 JS 비활성 시 분석 fallback 요청을 하지 않는다. GA 자동 page_view는 끄고 쿼리·해시를 제외한 origin/path와 빈 referrer로 방문 이벤트를 한 번 보낸다.

`npm test`는 실제 8개 앱 컨트롤러의 추첨·공유 취소/실패 경계와 보너스, 확률 모델, 1,800개 경로·메타·정적 자산, 기존 원본 해시 및 publisher VM 동작을 검증한다. 브라우저 표시와 실제 플랫폼 전송은 별도 검증이다.
