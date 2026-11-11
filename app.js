// ===== Data =====
const skills = [
  { icon: "code", title: "Frontend Development", items: ["HTML5", "CSS3", "React", "Tailwind CSS", "Responsive Design"] },
  { icon: "pen", title: "UI/UX Design", items: ["Wireframing", "Prototyping", "Design Systems", "Usability"] },
  { icon: "terminal", title: "Programming Languages", items: ["JavaScript", "TypeScript", "PHP", "Python"] },
  { icon: "figma", title: "Design Tools", items: ["Figma", "Canva", "Photoshop"] },
  { icon: "wrench", title: "Other Technical Skills", items: ["Git & GitHub", "MySQL", "REST APIs", "VS Code"] },
];

const projects = [
  {
    name: "Capstone: Campus Portal",
    desc: "My capstone project — a student portal for schedules, grades and announcements.",
    tech: ["PHP", "MySQL", "JavaScript"],
    details: "Led the frontend as part of a 4-person team. Built role-based dashboards for students and faculty and handled the database design.",
  },
  {
    name: "Coffee Shop Website",
    desc: "A responsive online menu and ordering site for a local coffee shop.",
    tech: ["React", "Tailwind CSS"],
    details: "Designed in Figma first, then built mobile-first with reusable components and a simple cart.",
  },
  {
    name: "Portfolio UI Kit",
    desc: "A small design system in Figma that I used to design this portfolio.",
    tech: ["Figma", "Prototyping"],
    details: "Colors, type scale, buttons and cards documented so design and code stay consistent.",
  },
];

const processSteps = ["Research", "Planning", "Wireframing", "UI Design", "Development", "Testing & Improvement"];

// ===== SVG icons =====
const icons = {
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
  terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>',
  figma: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>',
};

// ===== Render skills =====
const skillsGrid = document.getElementById("skillsGrid");
skillsGrid.innerHTML = skills
  .map(
    (s) => `
    <div class="skill-card">
      <div class="skill-icon">${icons[s.icon]}</div>
      <h3>${s.title}</h3>
      <div class="chips">${s.items.map((i) => `<span>${i}</span>`).join("")}</div>
    </div>`
  )
  .join("");

// ===== Render projects (with search + details toggle) =====
const projectsGrid = document.getElementById("projectsGrid");
const noResults = document.getElementById("noResults");
const searchNote = document.getElementById("searchNote");
const searchInput = document.getElementById("searchInput");
let openDetails = null;

function renderProjects() {
  const q = searchInput.value.trim().toLowerCase();
  const shown = projects.filter((p) =>
    (p.name + p.desc + p.tech.join(" ")).toLowerCase().includes(q)
  );

  searchNote.classList.toggle("hidden", !q);
  if (q) {
    searchNote.innerHTML = `Showing results for "${searchInput.value.trim()}" — <button type="button" id="clearSearch">clear</button>`;
    document.getElementById("clearSearch").addEventListener("click", () => {
      searchInput.value = "";
      renderProjects();
    });
  }

  noResults.classList.toggle("hidden", shown.length > 0);

  projectsGrid.innerHTML = shown
    .map((p) => {
      const i = projects.indexOf(p);
      return `
      <article class="project-card">
        <div class="project-thumb">0${i + 1}</div>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="chips">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
        <div class="project-actions">
          <a href="#" class="project-view">View Project ${icons.arrow}</a>
          <button type="button" class="details-btn" data-index="${i}">${openDetails === i ? "Hide" : "View Details"}</button>
        </div>
        ${openDetails === i ? `<p class="project-details reveal">${p.details}</p>` : ""}
      </article>`;
    })
    .join("");

  projectsGrid.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      openDetails = openDetails === i ? null : i;
      renderProjects();
    });
  });
}

searchInput.addEventListener("input", renderProjects);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  }
});
renderProjects();

// ===== Render process steps =====
document.getElementById("processList").innerHTML = processSteps
  .map(
    (t, i) => `
    <li>
      <span class="process-num">${i + 1}</span>
      <p>${t}</p>
    </li>`
  )
  .join("");

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const hamburger = '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>';
const closeIcon = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden");
  menuIcon.innerHTML = isOpen ? hamburger : closeIcon;
});

mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.innerHTML = hamburger;
  })
);

// ===== Contact form =====
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendBtn.textContent = "Message sent — thank you!";
});
