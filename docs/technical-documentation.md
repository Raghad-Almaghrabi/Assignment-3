# 📘 Technical Documentation  
### Assignment 3 – Advanced Functionality  
**Course:** SWE363 – Web Engineering  
**Author:** Raghad Almaghrabi  
**Semester:** 2025  

This document explains the technical implementation of the portfolio web application created for Assignment 3.  
It covers the logic, API integrations, state management, UI behaviors, performance techniques, and accessibility considerations used throughout the project.

---

# 1️⃣ Overview

This project is a fully interactive portfolio website built using:

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **Open-Meteo Weather API (no key required)**
- **LocalStorage for client-side persistence**

It implements advanced front-end functionality including dynamic rendering, filtering, sorting, state synchronization, and real API data.

---

# 2️⃣ Project Structure  
```
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

# 3️⃣ Utility Functions

Utility helpers were created to simplify and shorten DOM access:

- **`$()`** → Fast `querySelector`
- **`$$()`** → Returns a real array from `querySelectorAll`

These functions improve readability and reduce repetitive code.

---

# 4️⃣ Greeting Popup System

A fully dynamic popup appears automatically when the page loads.

### Features:
- Time-based greetings:
  - *Good Morning / Good Afternoon / Good Evening*
- Saves username in **localStorage**
- If a name exists → shows personalized greeting  
- If no name exists → shows a form to collect the user’s name
- Includes:
  - “Let’s go!” button  
  - “Change name” option  


---

# 5️⃣ Theme Toggle (Light / Dark Mode)

A theme switch is provided in the header.

### How it works:
- Toggling the switch adds or removes the `.dark` class from `<body>`
- Current theme is saved in: light mode \ dark mode
- The theme is restored instantly on page load.

---

# 6️⃣ Projects Section (Advanced Dynamic Logic)

The Projects section implements multiple layers of functionality.

### Includes:
- **Live search** (title + tags)
- **Category filter** (Web, AI, Design)
- **Sorting**:
  - Title A–Z  
  - Title Z–A  
  - Newest  
  - Oldest  
- **Experience-level filter** (Beginner, Advanced, All)
- **Show/Hide Projects** toggle  
- **Persistent visibility state using localStorage**
- **No-projects-found state** when filtering returns 0 results

### Core function:  
`renderProjects()` handles all filtering, sorting, and dynamic DOM rebuilding.

---

# 7️⃣ Experience Level System

Located inside the **About Me** section.

Users select their own experience level:
- Beginner  
- Advanced  
- Just browsing  

The system then:
- Updates the message displayed under the dropdown
- Dynamically filters projects by the `data-level` attribute

This improves personalisation & UX.

---

# 8️⃣ Weather API Integration (Open-Meteo)

The site fetches real-time weather for **Dhahran** using Open-Meteo.

### Data retrieved:
- Temperature (°C)
- Weather code → converted into readable text
- Wind speed
- Timestamp of last update

### Features:
- Automatic load on page open  
- Loading state while fetching  
- Fallback error message on failure  
- Manual refresh button  

This satisfies the Assignment 3 requirement for external API integration.

---

# 9️⃣ Contact Form Validation

The contact form includes custom validation:

### Rules:
- All fields are required
- Email validated using regex
- Inline error styling added to invalid fields
- Success & error messages shown dynamically

The form does not require backend submission per assignment requirements.

---

# 🔟 Session Timer & Live Clock

Displayed in the footer:

- Current **local time** (updates every second)
- **Session duration** tracking how long the visitor has been on the website

Both are updated via `setInterval()` every 1 second.

---

# 1️⃣1️⃣ Simulated Login System

A button in the header allows toggling between:

- **LOGIN**
- **LOGOUT**


### Affects:
- Button text
- Footer login status (Guest mode / Logged in)

There is no backend authentication — this is a simulated front-end state system.

---

# 1️⃣2️⃣ Skills Accordion

The Skills section includes an interactive accordion:

- Expands/collapses on click  
- Keyboard accessible (Enter + Space)
- State managed with `data-collapsed` attribute
- Smooth animation handled via CSS transitions

This improves organization and accessibility.

---

# 1️⃣3️⃣ Performance Optimizations

The project includes several front-end optimization techniques:

### Techniques:
- Cached DOM selectors
- Grouped DOM updates to reduce reflows
- Efficient filtering and sorting logic
- Removed unused code and redundant styles
- Modular JS structure for maintainability
- Minimized repeated date parsing

As required by the assignment, performance improvements were intentionally included.

---

# 1️⃣4️⃣ Accessibility Features

Thoughtful accessibility features were added:

- `aria-modal`, `aria-hidden` for popup
- `aria-live="polite"` for weather updates
- Keyboard-friendly interactive cards
- High contrast dark/light themes
- Semantic structure for better screen reader support

---

# 1️⃣5️⃣ Limitations

Current limitations include:

- Contact form does not send to a backend  
- Weather API only shows current conditions  
- Login system is fully client-side  
- Project list is static (not pulled from GitHub API)

---

# 1️⃣6️⃣ Future Improvements

Potential upgrades:

- Fetch real GitHub repositories using GitHub API  
- Add multilingual support (English/Arabic)  
- Add animations to project filters  
- Build backend for real contact form submissions  
- Add weather icons + hourly forecast  

---

# ✅ Conclusion

This portfolio application fulfills all **Assignment 3** requirements:

- ✔ External API Integration  
- ✔ Complex JavaScript Logic  
- ✔ State Management  
- ✔ Performance Improvements  
- ✔ Accessibility  
- ✔ Full Documentation  
- ✔ AI Usage Report  

The website now provides an advanced, modern, interactive user experience showcasing professional technical skills.






