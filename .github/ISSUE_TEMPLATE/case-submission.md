---
name: 보안 사례 제보
about: 새로운 보안 사고/유출 사례를 데이터로 등록합니다.
title: "[사례] "
labels: ["case-submission"]
---

아래 JSON 블록의 값만 수정한 뒤 이슈를 등록해 주세요.
마커(`BEGIN_CASE_DATA` / `END_CASE_DATA`)와 ```json 코드 블록은 절대 지우지 마세요.

<!-- BEGIN_CASE_DATA -->
```json
{
  "companyName": "회사명",
  "date": "2026-01-01",
  "country": "KR",
  "cause": "hacking",
  "damage": { "value": 0, "unit": "억" },
  "leaks": ["유출 항목 예시"],
  "secondaryDamage": ["2차 피해 예시"],
  "causeAnalyses": [
    { "date": "2026-01-01", "content": "원인 분석 단계 설명" }
  ],
  "rootCauses": ["근본 원인 예시"],
  "prevention": {
    "personal": ["개인 예방 수칙"],
    "corporate": ["기업 예방 수칙"]
  },
  "tags": ["태그1", "태그2"]
}
```
<!-- END_CASE_DATA -->

### 필드 설명
- `cause`: `hacking` | `insider` | `negligence` | `technical` | `unknown`
- `damage.unit`: `억` | `만` | `천` | `""`(없음)
- `country`: ISO 코드 (예: `KR`, `US`, `JP`, `CN`, `GB`, `DE`, `FR`)
- `date`: `YYYY-MM-DD` 형식
