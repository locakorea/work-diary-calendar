# work-diary-calendar

달력과 연동된 업무다이어리 MVP (Vite + React) 입니다.

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버: `http://localhost:5173`

## 주요 기능 (MVP)

- **월간 달력 화면**: 월 이동, 날짜 선택, 날짜별 업무 건수 표시
- **날짜별 업무일지 작성**: 제목/내용/중요도/진행상태/메모/작성일(저장 시각) 입력
- **업무 목록 화면**: 선택한 날짜의 업무 목록 확인
- **업무 상세/수정 화면**: 기존 업무를 불러와 수정/저장
- **오늘의 업무 요약 영역**: 오늘 등록 건수, 완료/미완료 건수
- **로컬 저장소(localStorage)**: 브라우저에 데이터 자동 저장

## 구조화 방향

향후 Supabase/Firebase/Google Calendar API 연동을 위해 다음처럼 분리했습니다.

- `src/components`: UI 단위 컴포넌트
- `src/hooks/useTaskStore.js`: 데이터 저장/CRUD 책임
- `src/lib/dateUtils.js`: 날짜 처리 유틸
- `src/constants/taskOptions.js`: 상태값/중요도 옵션 상수

## 다음 개발 단계 제안

1. **데이터 레이어 추상화**: localStorage adapter와 remote adapter(Supabase/Firebase) 인터페이스 분리
2. **Google Calendar 연동**: OAuth + 일정 읽기/쓰기 동기화
3. **알림 기능**: 브라우저 Notification API + 백엔드 푸시
4. **반복 업무 규칙 엔진**: 매일/매주/매월 반복 생성 로직
5. **회고 리포트**: 주간/월간 완료율, 중요도별 소요 분석
6. **검색/필터 강화**: 상태, 중요도, 키워드, 기간별 조회

## 비고

현재 환경에서 `npm create vite@latest` 명령이 레지스트리 권한(403)으로 실패하여,
동일한 Vite + React 표준 구조를 수동으로 구성했습니다.
