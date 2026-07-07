const DEFAULT_RESUME_DATA = {
  name: "楚天泽",
  headline: "Software Engineering Student · Future AI Application Developer",
  role: "软件研发 / 后端开发 / AI应用开发",
  summary:
    "北京工业大学北京-都柏林国际学院软件工程本科在读，具备扎实的软件工程基础、主动学习能力与企业项目实习经历。关注企业级系统开发、后端工程实践与人工智能应用落地，目标成长为懂业务、能开发、会协作、可持续进阶的软件与AI应用型技术人才。",
  about:
    "我目前就读于北京工业大学北京-都柏林国际学院软件工程专业，GPA 3.66/4.20，专业排名16/96。学习上重视编程基础、逻辑思维和工程规范，能够使用 Java、Python、Matlab 完成课程与开发任务；实践上曾在新晨科技担任软件技术实习生，参与项目开发、代码调试、需求核对与技术文档编撰，初步熟悉企业标准化软件开发流程、版本管理规范和团队协作模式。未来希望以软件工程能力为根基，持续补强数据库、Web开发、数据分析与机器学习应用能力，向后端开发、软件研发与AI应用开发方向发展。",
  facts: [
    { label: "Education", value: "北京工业大学" },
    { label: "Major", value: "软件工程本科" },
    { label: "GPA", value: "3.66 / 4.20" },
    { label: "Rank", value: "16 / 96" },
    { label: "CET-4", value: "562" },
    { label: "Email", value: "chutianze@outlook.com" }
  ],
  skills: [
    "Java",
    "Python",
    "Matlab",
    "面向对象编程",
    "后端开发基础",
    "软件工程",
    "数据库学习中",
    "技术文档",
    "Office",
    "需求核对",
    "代码调试",
    "团队协作",
    "自主学习",
    "英语 CET-4 562"
  ],
  experience: [
    {
      date: "2024.09 - 2028.07",
      title: "软件工程本科在读",
      subtitle: "北京工业大学｜北京-都柏林国际学院",
      description:
        "系统学习程序设计、数据结构与算法、计算机网络、操作系统、软件工程、高等数学、线性代数、概率论与数理统计等课程。当前 GPA 3.66/4.20，专业排名16/96，保持稳定的学习投入与阶段复盘习惯。"
    },
    {
      date: "实习经历",
      title: "软件技术实习生",
      subtitle: "新晨科技",
      description:
        "贴合企业真实项目场景，参与项目开发、代码调试、需求核对与技术文档编撰，熟悉企业标准化开发流程、版本管理规范和团队项目协作模式，将校内编程理论与程序设计知识应用到实际业务开发中。"
    },
    {
      date: "2024 - 2025",
      title: "单科成绩优秀奖",
      subtitle: "北京工业大学",
      description:
        "在本科阶段保持勤勉进取的学习状态，凭借课程表现获得校级单科成绩优秀奖，并持续完善专业能力、工程素养与职业发展规划。"
    }
  ],
  projects: [
    {
      title: "企业项目实习实践",
      description:
        "在新晨科技实习期间参与真实软件项目流程，从需求核对、编码协作、调试排查到技术文档整理，建立对企业级开发节奏、交付标准和团队配合方式的直观理解。",
      tags: ["Software Development", "Debugging", "Documentation"]
    },
    {
      title: "软件工程能力路径",
      description:
        "以 Java、Python 与软件工程课程为基础，持续补强数据库、Web开发框架、算法练习与工程规范，目标形成可支撑后端开发和软件研发岗位的稳定技术能力。",
      tags: ["Java", "Python", "Backend"]
    },
    {
      title: "AI应用成长方向",
      description:
        "职业规划聚焦“扎实工程能力+持续算法学习+场景化落地”，未来希望把智能能力嵌入业务系统，在AI应用开发、数据服务和行业数字化场景中持续深耕。",
      tags: ["AI Application", "Data", "Digitalization"]
    }
  ],
  contact: [
    { label: "Email", value: "mailto:chutianze@outlook.com", display: "chutianze@outlook.com" },
    { label: "Phone", value: "tel:13311003883", display: "13311003883" }
  ]
};

const state = {
  particles: [],
  pointer: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
};

const $ = (selector) => document.querySelector(selector);

function setText(selector, value) {
  const node = $(selector);
  if (node && value) node.textContent = value;
}

function initials(name) {
  const clean = (name || "R").replace(/\s+/g, "");
  return clean.slice(0, 1).toUpperCase();
}

function renderFacts(facts = []) {
  const target = $("#quickFacts");
  target.innerHTML = facts
    .map((item) => `<div><dt>${item.label}</dt><dd>${item.value}</dd></div>`)
    .join("");
}

function renderSkills(skills = []) {
  $("#skillsList").innerHTML = skills.map((skill) => `<span class="tag">${skill}</span>`).join("");
}

function renderExperience(items = []) {
  $("#experienceList").innerHTML = items
    .map(
      (item) => `
        <article class="timeline-item reveal">
          <time>${item.date}</time>
          <h3>${item.title}</h3>
          <p><strong>${item.subtitle}</strong></p>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");
}

function renderProjects(items = []) {
  $("#projectList").innerHTML = items
    .map(
      (item) => `
        <article class="project-card reveal">
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          <ul>${(item.tags || []).map((tag) => `<li>${tag}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("");
}

function renderContact(items = []) {
  $("#contactLinks").innerHTML = items
    .map((item) => `<a href="${item.value}" aria-label="${item.label}">${item.display}</a>`)
    .join("");
}

function renderResume(data) {
  document.title = `${data.name} | Resume`;
  setText("#brandName", data.name);
  setText("#name", data.name);
  setText("#headline", data.headline);
  setText("#summary", data.summary);
  setText("#role", data.role);
  setText("#aboutText", data.about);
  $("#avatar").textContent = initials(data.name);
  renderFacts(data.facts);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderProjects(data.projects);
  renderContact(data.contact);
  observeReveals();
}

async function loadResume() {
  try {
    const response = await fetch("./resume-data.json");
    if (!response.ok) throw new Error("Resume data request failed");
    renderResume(await response.json());
  } catch {
    renderResume(DEFAULT_RESUME_DATA);
  }
}

function observeReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
}

function setupCanvas() {
  const canvas = $("#ambient");
  const ctx = canvas.getContext("2d");
  let pulse = 0;
  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    const count = Math.min(150, Math.max(70, Math.floor(window.innerWidth / 10)));
    state.particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * 2.2 + 0.7,
      hue: Math.random() > 0.55 ? 158 : 218,
      phase: Math.random() * Math.PI * 2
    }));
  };

  const draw = () => {
    pulse += 0.008;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const halo = ctx.createRadialGradient(
      state.pointer.x,
      state.pointer.y,
      0,
      state.pointer.x,
      state.pointer.y,
      360
    );
    halo.addColorStop(0, "rgba(184,240,220,0.16)");
    halo.addColorStop(0.45, "rgba(143,184,255,0.07)");
    halo.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    state.particles.forEach((p, i) => {
      const dx = state.pointer.x - p.x;
      const dy = state.pointer.y - p.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 260) {
        p.x -= dx * 0.0014;
        p.y -= dy * 0.0014;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = window.innerWidth + 10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.y < -10) p.y = window.innerHeight + 10;
      if (p.y > window.innerHeight + 10) p.y = -10;
      const glow = 0.5 + Math.sin(pulse * 2 + p.phase) * 0.28;
      ctx.fillStyle = `hsla(${p.hue}, 82%, 78%, ${0.48 + glow * 0.36})`;
      ctx.shadowColor = `hsla(${p.hue}, 82%, 70%, 0.55)`;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + glow * 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let j = i + 1; j < state.particles.length; j += 1) {
        const q = state.particles[j];
        const gap = Math.hypot(p.x - q.x, p.y - q.y);
        if (gap < 150) {
          ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 82%, 76%, ${0.24 * (1 - gap / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    state.pointer.x = event.clientX;
    state.pointer.y = event.clientY;
  });
  resize();
  draw();
}

setupCanvas();
loadResume();
