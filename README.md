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
- 아이디어 참고: [Random Life](https://randomlife.chaechae.life/). 원본 코드·브랜드·디자인 복사 없이 새 구현.

여권의 국가 문장·보안 요소는 복제하지 않음. 모든 표지는 자체 지구본 문양을 쓴 환생 기념 디자인.
