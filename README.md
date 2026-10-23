# 개발자 웹 이력서

HTML, CSS, JavaScript, Tailwind CSS로 만든 개발자 웹 이력서입니다. 빌드 과정 없이 브라우저에서 바로 실행됩니다.

## 주요 기능

- 히어로 섹션 (이름, 직무, 한 줄 소개, 링크 버튼)
- 자기소개, 기술 스택, 프로젝트, 경력 및 학력, 연락처 섹션
- 반응형 레이아웃 (모바일, 태블릿, 데스크톱)
- 모바일 메뉴 토글
- 시크한 다크 디자인 (기본값은 다크, 선택값은 브라우저에 저장)
- 프로필 사진과 프로젝트 썸네일 샘플 이미지 (로드 실패 시 빈 박스로 표시)
- 스크롤에 따라 현재 섹션 내비 강조, 섹션 페이드인
- `prefers-reduced-motion` 설정 존중

## 실행 방법

1. 저장소를 내려받습니다.
2. `index.html` 파일을 브라우저로 엽니다.

Tailwind CSS는 CDN으로 불러오므로 인터넷 연결이 필요합니다.

## 내용 수정 방법

이력서 내용은 `js/data.js`에서만 수정하면 됩니다.

- `profile`: 이름, 직무, 한 줄 소개, 자기소개, 푸터 문구
- `heroLinks`: 히어로 섹션 버튼 (라벨과 링크)
- `skills`: 기술 스택 분류와 항목
- `projects`: 프로젝트 제목, 설명, 사용 기술, 링크
- `experience`: 경력
- `education`: 학력
- `contacts`: 연락처

샘플 이미지는 `profile.image`와 `projects[].image`에 적힌 외부 URL(`i.pravatar.cc`, `picsum.photos`)을 사용합니다. 실제 이미지로 바꾸려면 해당 URL을 교체하세요.

`index.html`의 섹션 제목이나 문구를 바꾸려면 해당 파일을 직접 수정합니다.

## 폴더 구조

```
claude-code-mastery/
├── index.html        # 페이지 골격 (시맨틱 마크업)
├── css/style.css     # 최소한의 커스텀 스타일
├── js/data.js        # 이력서 데이터
├── js/main.js        # 렌더링, 메뉴, 다크 모드, 스크롤 효과
├── ROADMAP.md        # 제작 로드맵
└── CLAUDE.md         # Claude Code 작업 규칙
```

## 기술 스택

- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS (CDN)
