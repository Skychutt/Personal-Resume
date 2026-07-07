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

async function loadResume() {
  const response = await fetch("./resume-data.json");
  const data = await response.json();
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
loadResume().catch(() => observeReveals());
