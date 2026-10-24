# 자료·라이선스 검토 기록

검토일: 2026-10-24

## 검토 범위

현재 배포 소스, 정적 결과 페이지, OG 생성 코드, 데이터 스냅샷, 웹 폰트, 빌드 의존성 및 Git 이력을 검토했다. 법률 의견서나 비침해 보증은 아니다. 관할별 저작권·데이터베이스권·상표권 판단과 전 세계 선행 저작물 대조까지 수행한 것은 아니다.

## 항목별 결과와 조치

| 항목 | 확인 내용 | 조치 |
| --- | --- | --- |
| 게임 구현 | 인구 가중 추첨, 국가 제외, 결과 공유는 직접 작성한 코드로 구현. 참고 서비스의 소스·이미지·브랜드를 배포 파일에서 사용하지 않음. | 공개 UI와 README의 아이디어 참고 문구 제거. 일반적인 게임 규칙의 유사성과 개별 표현 복제를 구분해 검토. |
| 여권·OG | 국가별 문장·실물 표지 사진 대신 자체 지구본 문양과 텍스트, 코드로 만든 질감 사용. | 외부 여권 이미지 또는 로고 파일 미사용 유지. |
| 국가·인구 | REST Countries 원본 JSON과 가공 데이터 사용. 원본 저장소 라이선스 MPL-2.0 확인. | 라이선스 전문, 원본 위치, 가공 범위 공시. 원본과 변환 코드는 공개 저장소에서 제공. |
| 지도 | Natural Earth 원자료는 public domain. world-atlas 재배포 패키지는 ISC. | 원자료와 패키지의 권리 조건을 구분하고 ISC 전문 포함. |
| 웹 폰트 | DM Sans 및 Noto Sans KR의 SIL OFL 1.1 확인. Google Fonts에서 로드. | 두 폰트의 저작권 고지와 OFL 전문 포함. |
| OG 시스템 폰트 | SVG 렌더링에서 Windows 시스템 폰트를 사용하며 출력물은 래스터 JPG/PNG. 폰트 파일 자체를 배포하지 않음. | 시스템 폰트 파일 복사·배포 없음 확인. Microsoft의 이미지·그래픽 출력 관련 FAQ를 근거 자료에 기록. |
| 빌드 도구 | sharp는 Apache-2.0, topojson-client는 ISC. 브라우저에 해당 도구 바이너리 또는 라이브러리 코드를 번들하지 않음. | 전문 및 잠금 파일 기준 의존성 버전·SPDX 목록 포함. |
| 통계·광고 | 사이트 소유자가 지정한 본사이트의 Google·Cloudflare 스니펫 사용. | 오픈소스 라이브러리로 잘못 분류하지 않음. 각 제공자 약관 적용. |

## 남아 있는 확인 사항

1. **여권 표지색 분류표:** Passport2Liberty가 제시한 국가별 색상 사실값을 사용한다. 해당 사이트의 이미지·SVG·문장·페이지 코드는 현재 배포본에 포함하지 않는다. 색상표 자체에 대한 명시적 재사용 라이선스는 확인하지 못했다. 사실값 이용과 별개로, 전체 분류표의 데이터베이스권·계약상 이용 조건까지 해결되었다고 단정하지 않는다. 완전한 권리 확정을 위해서는 독립적인 국가별 원자료 대조 또는 권리자의 재사용 허락 확인이 필요하다. 출처 표시는 이용 허락을 대체하지 않는다.
2. **과거 Git 이력 정리 완료:** 최초 커밋에 포함되었던 조사용 `data/passport-colors-source.html`을 2026-10-24 소유자 승인 후 원격 `main`의 전체 이력에서 제거했다. 7개 커밋을 재작성했으며 정리 직후 HEAD는 `5ac7d74613699235d45e9413689933796cec6256`이다. 이전 HEAD는 `271a2502f4a670deb637f8e9fbf51e9a83884730`이며 로컬 Git bundle로 백업했다. 교체 전후 최신 파일 트리가 동일함을 확인하고, 새로 복제한 원격 저장소의 도달 가능한 객체 목록에서 해당 경로가 없음을 검증했다. 이는 현재 원격 브랜치 이력의 정리이며 GitHub의 고립된 과거 객체, 외부 캐시·기존 복제본까지 삭제했음을 뜻하지 않는다.

## 근거 자료

- MPL 공식 문서 및 배포 의무: https://www.mozilla.org/en-US/MPL/2.0/FAQ/
- REST Countries 원본 및 라이선스: https://github.com/restcountries/restcountries
- Natural Earth 이용 조건: https://www.naturalearthdata.com/about/terms-of-use/
- world-atlas 라이선스: https://github.com/topojson/world-atlas/blob/master/LICENSE
- DM Sans OFL: https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt
- Noto Sans KR OFL: https://github.com/google/fonts/blob/main/ofl/notosanskr/OFL.txt
- Microsoft 폰트 출력·재배포 FAQ: https://learn.microsoft.com/en-us/typography/fonts/font-faq
- 표지색 자료와 조사 한계: https://passport2liberty.org/sources
- 아이디어·방법과 보호되는 표현의 구별에 관한 미국 저작권청 안내: https://www.copyright.gov/circs/circ33.pdf

참조 법역과 자료의 범위가 제한되어 있으므로 위 안내만으로 한국 또는 다른 법역의 모든 권리 문제를 확정하지 않는다.
