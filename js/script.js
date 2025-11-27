

// ============================
// Utilities
// ============================
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const STORAGE = {
  THEME: "theme",          // 'light' | 'dark'
  USERNAME: "username",    // string
  LOGIN: "isLoggedIn",     // 'true' | 'false'
  HIDE_PROJECTS: "hideProjects", // 'true' | 'false'
};

// Time-of-day greeting
function timeGreeting(date = new Date()) {
  const h = date.getHours();
  if (h < 6) return "You're up early";
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

// ============================
// Live Clock + Session Timer
// ============================
const timeEl = $("#current-time");
const sessionEl = $("#session-duration");
const sessionStart = Date.now();

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  if (timeEl) timeEl.textContent = `${hh}:${mm}`;

  const diffMs = Date.now() - sessionStart;
  const totalSec = Math.floor(diffMs / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (sessionEl) {
    if (min === 0) sessionEl.textContent = `${sec}s`;
    else sessionEl.textContent = `${min}m ${sec}s`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// ============================
// Theme Switch
// ============================
const themeToggle = $("#themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  if (themeToggle) themeToggle.checked = theme === "dark";
}
function initTheme() {
  const saved = localStorage.getItem(STORAGE.THEME);
  const theme = saved || "light";
  applyTheme(theme);
}
function handleThemeToggle() {
  const theme = themeToggle.checked ? "dark" : "light";
  localStorage.setItem(STORAGE.THEME, theme);
  applyTheme(theme);
}
initTheme();
themeToggle && themeToggle.addEventListener("change", handleThemeToggle);

// ============================
// Greeting Popup (auto)
// ============================
const popupOverlay = $("#popupOverlay");
const closePopup = $("#closePopup");
const popupGreetingEl = $("#popupGreeting");
const nameForm = $("#nameForm");
const usernameInput = $("#username");
const popupActions = $("#popupActions");
const dismissPopupBtn = $("#dismissPopup");
const forgetNameBtn = $("#forgetName");

function renderGreeting() {
  const user = localStorage.getItem(STORAGE.USERNAME);
  const greet = timeGreeting();
  if (popupGreetingEl) {
    popupGreetingEl.textContent = user ? `${greet}, ${user}!` : greet + " 👋";
  }
  if (!nameForm || !popupActions) return;

  if (user) {
    nameForm.hidden = true;
    popupActions.hidden = false;
  } else {
    nameForm.hidden = false;
    popupActions.hidden = true;
  }
}

function openPopup() {
  if (!popupOverlay) return;
  popupOverlay.style.display = "block";
  popupOverlay.setAttribute("aria-hidden", "false");
}
function closePopupOverlay() {
  if (!popupOverlay) return;
  popupOverlay.style.display = "none";
  popupOverlay.setAttribute("aria-hidden", "true");
}

function initPopup() {
  renderGreeting();
  openPopup();
}
window.addEventListener("load", initPopup);

closePopup?.addEventListener("click", closePopupOverlay);
popupOverlay?.addEventListener("click", (e) => {
  if (e.target === popupOverlay) closePopupOverlay();
});

nameForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = usernameInput.value.trim().slice(0, 24);
  if (!name) {
    usernameInput.focus();
    usernameInput.setAttribute("aria-invalid", "true");
    return;
  }
  localStorage.setItem(STORAGE.USERNAME, name);
  usernameInput.removeAttribute("aria-invalid");
  renderGreeting();
});

dismissPopupBtn?.addEventListener("click", closePopupOverlay);
forgetNameBtn?.addEventListener("click", () => {
  localStorage.removeItem(STORAGE.USERNAME);
  if (usernameInput) usernameInput.value = "";
  renderGreeting();
});

// ============================
// Simulated Login State
// ============================
const loginToggleBtn = $("#loginToggle");
const loginStatusEl = $("#loginStatus");

function applyLoginState(isLoggedIn) {
  if (loginStatusEl) {
    loginStatusEl.textContent = isLoggedIn ? "Logged in" : "Guest mode";
  }
  if (loginToggleBtn) {
    loginToggleBtn.textContent = isLoggedIn ? "LOGOUT" : "LOGIN";
  }
}

function initLoginState() {
  const stored = localStorage.getItem(STORAGE.LOGIN);
  const isLoggedIn = stored === "true";
  applyLoginState(isLoggedIn);
}

loginToggleBtn?.addEventListener("click", () => {
  const stored = localStorage.getItem(STORAGE.LOGIN);
  const isLoggedIn = stored === "true";
  const next = !isLoggedIn;
  localStorage.setItem(STORAGE.LOGIN, String(next));
  applyLoginState(next);
});

initLoginState();

// ============================
// Experience Level Logic
// ============================
const experienceSelect = $("#experienceLevel");
const experienceMessage = $("#experienceMessage");

function updateExperienceMessage() {
  if (!experienceSelect || !experienceMessage) return;
  const val = experienceSelect.value;

  if (val === "beginner") {
    experienceMessage.textContent =
      "You’re in learning mode — I’ll highlight more approachable and visual projects.";
  } else if (val === "advanced") {
    experienceMessage.textContent =
      "You like things deep and technical — I’ll surface projects with more complexity and backend or AI work.";
  } else {
    experienceMessage.textContent =
      "I’ll show a mix of projects that balance learning and real-world impact.";
  }

  // Re-render projects to respect level filtering too
  renderProjects();
}
experienceSelect?.addEventListener("change", updateExperienceMessage);

// ============================
// Projects: search / filter / sort / show-hide / level
// ============================
const projectsGrid = $("#projectsGrid");
const projectSearch = $("#projectSearch");
const projectFilter = $("#projectFilter");
const projectSort   = $("#projectSort");
const emptyProjects = $("#emptyProjects");
const toggleProjectsButton = $("#toggleProjectsButton");

function getProjectCards() {
  return $$(".card", projectsGrid);
}

function visibleByQuery(card, q) {
  if (!q) return true;
  const title = (card.dataset.title || "").toLowerCase();
  const tags = (card.dataset.tags || "").toLowerCase();
  return title.includes(q) || tags.includes(q);
}
function visibleByFilter(card, filter) {
  if (filter === "all") return true;
  const tags = (card.dataset.tags || "").toLowerCase();
  return tags.split(",").map(s => s.trim()).includes(filter);
}
function visibleByLevel(card, level) {
  if (!level || level === "all") return true;
  const projectLevel = (card.dataset.level || "all").toLowerCase();
  if (level === "beginner") return projectLevel === "beginner";
  if (level === "advanced") return projectLevel === "advanced";
  return true;
}

function sorter(key) {
  return (a, b) => {
    if (key === "title-asc")  return a.dataset.title.localeCompare(b.dataset.title);
    if (key === "title-desc") return b.dataset.title.localeCompare(a.dataset.title);
    if (key === "date-asc")   return new Date(a.dataset.date) - new Date(b.dataset.date);
    if (key === "date-desc")  return new Date(b.dataset.date) - new Date(a.dataset.date);
    return 0;
  };
}

function renderProjects() {
  if (!projectsGrid) return;
  const q = (projectSearch?.value || "").trim().toLowerCase();
  const filter = projectFilter?.value || "all";
  const sortKey = projectSort?.value || "title-asc";
  const level = experienceSelect?.value || "all";
  const cards = getProjectCards();

  const filtered = cards.filter(
    c => visibleByQuery(c, q) && visibleByFilter(c, filter) && visibleByLevel(c, level)
  );

  filtered.sort(sorter(sortKey));

  projectsGrid.innerHTML = "";
  filtered.forEach(c => projectsGrid.appendChild(c));

  if (emptyProjects) {
    emptyProjects.hidden = filtered.length > 0;
  }
}

projectSearch?.addEventListener("input", renderProjects);
projectFilter?.addEventListener("change", renderProjects);
projectSort?.addEventListener("change", renderProjects);

// Show/hide projects section + persist
function applyProjectsVisibility(hidden) {
  if (!projectsGrid || !toggleProjectsButton) return;

  // Only hide the GRID, not the whole section
  projectsGrid.style.display = hidden ? "none" : "flex";

  toggleProjectsButton.textContent = hidden ? "Show Projects" : "Hide Projects";
}


function initProjectsVisibility() {
  const stored = localStorage.getItem(STORAGE.HIDE_PROJECTS);
  const hidden = stored === "true";
  applyProjectsVisibility(hidden);
}

toggleProjectsButton?.addEventListener("click", () => {
  const stored = localStorage.getItem(STORAGE.HIDE_PROJECTS);
  const hidden = stored === "true";
  const next = !hidden;
  localStorage.setItem(STORAGE.HIDE_PROJECTS, String(next));
  applyProjectsVisibility(next);
});

initProjectsVisibility();
renderProjects(); // initial render

// ============================
// Skills expand/collapse
// ============================
$$(".skill-card").forEach((card) => {
  function toggle() {
    const isCollapsed = card.getAttribute("data-collapsed") === "true";
    card.setAttribute("data-collapsed", isCollapsed ? "false" : "true");
  }

  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
});

// ============================
// Contact form validation
// ============================
const contactForm = $("#contactForm");
const formSuccess = $("#formSuccess");
const formError = $("#formError");

function validateField(input) {
  const value = input.value.trim();
  let valid = value.length > 0;

  if (input.type === "email") {
    valid = /\S+@\S+\.\S+/.test(value);
  }

  input.classList.toggle("error", !valid);
  return valid;
}

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = $$("input[required]", contactForm);
  const allValid = inputs.map(validateField).every(Boolean);

  if (allValid) {
    if (formError) formError.hidden = true;
    if (formSuccess) formSuccess.hidden = false;
    contactForm.reset();
    formSuccess?.focus?.();
  } else {
    if (formSuccess) formSuccess.hidden = true;
    if (formError) formError.hidden = false;
    formError?.focus?.();
  }
});

$$("input[required]", contactForm).forEach(inp => {
  inp.addEventListener("input", () => validateField(inp));
});

// ============================
// Weather API (Open-Meteo)
// ============================
//
// We'll use Open-Meteo (no API key required) to fetch current
// weather for Dhahran. Lat/Lon approx: 26.3, 50.1
//
const weatherStatus = $("#weatherStatus");
const weatherCard   = $("#weatherCard");
const weatherMain   = $(".weather-main");
const weatherTemp   = $("#weatherTemp");
const weatherDesc   = $("#weatherDesc");
const weatherWind   = $("#weatherWind");
const weatherUpdated = $("#weatherUpdated");
const refreshWeatherBtn = $("#refreshWeather");

function weatherCodeToText(code) {
  // Simple mapping for common codes
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return map[code] || "Variable conditions";
}

async function fetchWeather() {
  if (weatherStatus) {
    weatherStatus.textContent = "Loading weather…";
  }
  if (weatherMain) {
    weatherMain.hidden = true;
  }

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      "?latitude=26.3&longitude=50.1" +
      "&current_weather=true&timezone=auto";

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response not ok");
    }
    const data = await res.json();
    const cw = data.current_weather;
    if (!cw) throw new Error("No current weather in response");

    const temp = cw.temperature;
    const wind = cw.windspeed;
    const code = cw.weathercode;
    const time = cw.time;

    if (weatherTemp) weatherTemp.textContent = Math.round(temp);
    if (weatherWind) weatherWind.textContent = wind.toFixed(1);
    if (weatherDesc) weatherDesc.textContent = weatherCodeToText(code);
    if (weatherUpdated) weatherUpdated.textContent = new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (weatherStatus) {
      weatherStatus.textContent = "Weather updated successfully ✅";
    }
    if (weatherMain) {
      weatherMain.hidden = false;
    }
  } catch (err) {
    console.error("Weather error:", err);
    if (weatherStatus) {
      weatherStatus.textContent =
        "Couldn’t load the weather right now. Please check your connection or try again.";
    }
    if (weatherMain) {
      weatherMain.hidden = true;
    }
  }
}

refreshWeatherBtn?.addEventListener("click", fetchWeather);

// Fetch on first load
fetchWeather();
