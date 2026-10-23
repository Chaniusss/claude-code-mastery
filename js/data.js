// 이력서 데이터. 이 파일의 값만 바꾸면 페이지 내용이 바뀝니다.
// 아래 값은 모두 예시이므로 실제 정보로 교체하세요.
const resumeData = {
  profile: {
    name: "홍길동",
    role: "프론트엔드 개발자",
    intro: "사용자 경험을 중요하게 생각하는 개발자입니다.",
    about:
      "웹 화면을 만드는 일이 재미있어 개발을 시작했습니다. 읽기 쉬운 코드와 꼼꼼한 협업을 중요하게 생각하며, 작은 디테일이 모여 좋은 경험을 만든다고 믿습니다.",
    image: "https://i.pravatar.cc/256?img=12",
    footer: "© 2026 홍길동. All rights reserved.",
  },

  // 히어로 섹션 버튼 목록 (첫 번째 버튼은 강조 스타일로 표시)
  heroLinks: [
    { label: "GitHub", href: "https://github.com/example" },
    { label: "블로그", href: "https://example.com/blog" },
    { label: "연락하기", href: "#contact" },
  ],

  // 자기소개 섹션의 서비스 목록. icon은 js/main.js의 ICONS 키 중 하나
  services: [
    { title: "웹 개발", icon: "code" },
    { title: "앱 개발", icon: "mobile" },
    { title: "웹 호스팅", icon: "cloud" },
  ],

  // 자기소개 섹션의 숫자 통계
  stats: [
    { value: 120, suffix: "+", label: "완료한 프로젝트" },
    { value: 95, suffix: "%", label: "고객 만족도" },
    { value: 10, suffix: "+", label: "년 경험" },
  ],

  // 기술 스택 카드와 상단 기술 띠에 함께 사용됨
  skills: [
    { category: "언어", items: ["HTML", "CSS", "JavaScript"] },
    { category: "프레임워크 및 라이브러리", items: ["Tailwind CSS"] },
    { category: "도구", items: ["Git", "GitHub", "VS Code"] },
  ],

  projects: [
    {
      title: "개인 포트폴리오 사이트",
      description: "HTML, CSS, JavaScript로 만든 반응형 소개 페이지입니다.",
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      image: "https://picsum.photos/seed/portfolio/640/360",
      link: "https://example.com/portfolio",
    },
    {
      title: "할 일 관리 앱",
      description: "로컬 저장소를 활용해 할 일을 추가, 완료, 삭제하는 앱입니다.",
      tech: ["JavaScript", "localStorage"],
      image: "https://picsum.photos/seed/todo/640/360",
      link: "https://example.com/todo",
    },
    {
      title: "날씨 조회 앱",
      description: "도시 이름을 검색하면 현재 날씨를 보여 주는 앱입니다.",
      tech: ["JavaScript", "Fetch API"],
      image: "https://picsum.photos/seed/weather/640/360",
      link: "https://example.com/weather",
    },
  ],

  experience: [
    {
      company: "예시 주식회사",
      role: "프론트엔드 개발자",
      period: "2023.03 - 2026.09",
      summary: "관리자 페이지 UI를 개발하고, 화면 성능과 접근성을 개선했습니다.",
    },
  ],

  education: [
    {
      school: "예시 대학교",
      major: "컴퓨터공학과",
      period: "2019.03 - 2023.02",
    },
  ],

  contacts: [
    { label: "이메일", value: "hong@example.com", href: "mailto:hong@example.com" },
    { label: "GitHub", value: "github.com/example", href: "https://github.com/example" },
    { label: "블로그", value: "example.com/blog", href: "https://example.com/blog" },
  ],
};
