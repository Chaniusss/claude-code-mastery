// 이력서 페이지 렌더링, 모바일 메뉴, 다크 모드, 스크롤 인터랙션
(function () {
  "use strict";

  const THEME_KEY = "resume-theme";
  const PRIMARY_BUTTON_CLASS =
    "inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-brand/25 transition hover:bg-brand-strong hover:text-white";
  const SECONDARY_BUTTON_CLASS =
    "inline-flex items-center rounded-full border border-brand/70 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-brand/10 dark:text-zinc-100";
  const CARD_CLASS =
    "rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800 dark:shadow-none";
  const CARD_HOVER_CLASS = "transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg";
  const BADGE_CLASS =
    "rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-navy-700 dark:text-zinc-200";
  const LINK_CLASS = "inline-flex items-center text-sm font-semibold text-brand-strong hover:underline dark:text-brand";
  const TIMELINE_CLASS =
    "relative border-l-2 border-brand/40 pl-6 before:absolute before:-left-[7px] before:top-1.5 before:h-3 before:w-3 before:rounded-full before:bg-brand before:content-['']";
  const SERVICE_ITEM_CLASS =
    "relative flex items-center gap-4 font-semibold before:absolute before:-left-[41px] before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-brand before:content-['']";

  // 서비스 아이콘 경로 (고정된 SVG 문자열만 사용하므로 innerHTML로 넣어도 안전)
  const ICONS = {
    code: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />',
    mobile:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />',
    cloud:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.75 3.75 0 0 1 18 19.5H6.75Z" />',
  };

  // 요소 생성 헬퍼: 텍스트는 textContent로 넣어 HTML 해석을 막음
  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  // 이미지 생성: 로드에 실패하면 img만 제거하고 배경 박스는 남김
  function createImage(src, alt, wrapperClass) {
    const wrapper = createElement("div", `${wrapperClass} overflow-hidden bg-zinc-200 dark:bg-navy-700`);
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.className = "h-full w-full object-cover";
    img.addEventListener("error", () => img.remove());
    wrapper.appendChild(img);
    return wrapper;
  }

  // 외부 링크는 새 탭에서 열고 보안 속성을 붙임
  function applyLinkAttributes(anchor, href) {
    anchor.href = href;
    if (href.startsWith("http")) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  }

  // data-field 속성이 붙은 요소에 프로필 값을 채움
  function renderProfile() {
    document.querySelectorAll("[data-field]").forEach((el) => {
      const value = resumeData.profile[el.dataset.field];
      if (value !== undefined) el.textContent = value;
    });
  }

  function renderProfilePhoto() {
    const { profile } = resumeData;
    const container = document.getElementById("profile-photo");
    container.appendChild(createImage(profile.image, `${profile.name} 프로필 사진`, "aspect-square w-full rounded-full"));
  }

  function renderHeroLinks() {
    const container = document.getElementById("hero-links");
    resumeData.heroLinks.forEach((link, index) => {
      const anchor = createElement("a", index === 0 ? PRIMARY_BUTTON_CLASS : SECONDARY_BUTTON_CLASS, link.label);
      applyLinkAttributes(anchor, link.href);
      container.appendChild(anchor);
    });
  }

  // 히어로 아래 띠: 기술 스택 항목을 한 줄로 나열
  function renderSkillStrip() {
    const container = document.getElementById("skill-strip");
    resumeData.skills
      .flatMap((group) => group.items)
      .forEach((item) => container.appendChild(createElement("li", "", item)));
  }

  function renderServices() {
    const container = document.getElementById("services-list");
    resumeData.services.forEach((service) => {
      const li = createElement("li", SERVICE_ITEM_CLASS);

      const icon = createElement("span", "shrink-0 text-brand");
      icon.setAttribute("aria-hidden", "true");
      if (ICONS[service.icon]) {
        icon.innerHTML = `<svg class="h-8 w-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">${ICONS[service.icon]}</svg>`;
      }

      li.appendChild(icon);
      li.appendChild(createElement("span", "", service.title));
      container.appendChild(li);
    });
  }

  function renderStats() {
    const container = document.getElementById("stats-list");
    resumeData.stats.forEach((stat) => {
      // 라벨(dt)을 값(dd) 아래에 보이도록 역순 정렬
      const wrapper = createElement("div", "flex flex-col-reverse gap-1");
      wrapper.appendChild(createElement("dt", "text-sm text-zinc-600 dark:text-zinc-400", stat.label));

      const value = createElement("dd", "text-3xl font-bold tracking-tight", `${stat.value}`);
      value.appendChild(createElement("span", "text-brand-strong dark:text-brand", stat.suffix));
      wrapper.appendChild(value);

      container.appendChild(wrapper);
    });
  }

  function renderSkills() {
    const container = document.getElementById("skills-list");
    resumeData.skills.forEach((group) => {
      const card = createElement("div", `${CARD_CLASS} p-6`);
      card.appendChild(createElement("h3", "mb-4 font-semibold", group.category));

      const badges = createElement("ul", "flex flex-wrap gap-2");
      group.items.forEach((item) => badges.appendChild(createElement("li", BADGE_CLASS, item)));

      card.appendChild(badges);
      container.appendChild(card);
    });
  }

  function renderProjects() {
    const container = document.getElementById("projects-list");
    resumeData.projects.forEach((project) => {
      const card = createElement("article", `${CARD_CLASS} ${CARD_HOVER_CLASS} flex flex-col overflow-hidden`);
      card.appendChild(createImage(project.image, project.title, "aspect-video w-full"));

      const body = createElement("div", "flex flex-1 flex-col p-6");
      body.appendChild(createElement("h3", "mb-2 text-lg font-semibold tracking-tight", project.title));
      body.appendChild(createElement("p", "mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400", project.description));

      const badges = createElement("ul", "mb-5 flex flex-wrap gap-2");
      project.tech.forEach((tech) => badges.appendChild(createElement("li", BADGE_CLASS, tech)));
      body.appendChild(badges);

      const anchor = createElement("a", LINK_CLASS, "자세히 보기 →");
      applyLinkAttributes(anchor, project.link);
      body.appendChild(anchor);

      card.appendChild(body);
      container.appendChild(card);
    });
  }

  function renderExperience() {
    const container = document.getElementById("experience-list");
    resumeData.experience.forEach((item) => {
      const li = createElement("li", TIMELINE_CLASS);
      li.appendChild(createElement("p", "font-semibold", `${item.company} · ${item.role}`));
      li.appendChild(createElement("p", "mt-1 text-sm text-zinc-600 dark:text-zinc-400", item.period));
      li.appendChild(createElement("p", "mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300", item.summary));
      container.appendChild(li);
    });
  }

  function renderEducation() {
    const container = document.getElementById("education-list");
    resumeData.education.forEach((item) => {
      const li = createElement("li", TIMELINE_CLASS);
      li.appendChild(createElement("p", "font-semibold", item.school));
      li.appendChild(createElement("p", "mt-1 text-sm text-zinc-700 dark:text-zinc-300", item.major));
      li.appendChild(createElement("p", "mt-1 text-sm text-zinc-600 dark:text-zinc-400", item.period));
      container.appendChild(li);
    });
  }

  function renderContacts() {
    const container = document.getElementById("contact-list");
    resumeData.contacts.forEach((contact) => {
      const li = createElement("li", `${CARD_CLASS} ${CARD_HOVER_CLASS} flex flex-col gap-2 p-6`);
      li.appendChild(createElement("span", "text-sm text-zinc-600 dark:text-zinc-400", contact.label));

      const anchor = createElement("a", LINK_CLASS, contact.value);
      applyLinkAttributes(anchor, contact.href);
      li.appendChild(anchor);

      container.appendChild(li);
    });
  }

  // 저장소 접근이 막힌 환경(시크릿 창 등)에서도 동작하도록 try/catch 처리
  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (error) {
      // 저장에 실패해도 화면 전환은 그대로 동작하므로 무시
    }
  }

  // 아이콘은 CSS(dark:block, dark:hidden)로 전환되므로 여기서는 라벨과 클래스만 바꿈
  function applyTheme(isDark) {
    const toggle = document.getElementById("theme-toggle");
    document.documentElement.classList.toggle("dark", isDark);
    toggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  }

  function setupTheme() {
    // 저장된 값이 없으면 다크 모드를 기본으로 사용
    applyTheme(readStoredTheme() !== "light");

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const isDark = !document.documentElement.classList.contains("dark");
      applyTheme(isDark);
      storeTheme(isDark ? "dark" : "light");
    });
  }

  function setupMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "메뉴 열기");
      menu.classList.add("hidden");
    }

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
        return;
      }
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "메뉴 닫기");
      menu.classList.remove("hidden");
    });

    // 메뉴 링크를 누르면 모바일 메뉴를 닫음
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  }

  function setupScrollEffects() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // 현재 화면 중앙에 있는 섹션의 내비 링크 강조
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    // 섹션이 보이면 페이드인 후 관찰 중단
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => {
      section.classList.add("reveal");
      navObserver.observe(section);
      revealObserver.observe(section);
    });
  }

  function init() {
    renderProfile();
    renderProfilePhoto();
    renderHeroLinks();
    renderSkillStrip();
    renderServices();
    renderStats();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderContacts();
    setupTheme();
    setupMenu();
    setupScrollEffects();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
