title: "Technical Documentation"
assignment: "Assignment 3 – Advanced Functionality"
course: "SWE363 – Web Engineering"
author: "Raghad Almaghrabi"
semester: "2025"

overview: |
  This document provides technical details for the implementation of my Assignment 3 portfolio web application.
  It covers logic, API integration, state management, UI components, performance techniques, and advanced behaviors.
  The project is built entirely using HTML, CSS, and vanilla JavaScript while incorporating external APIs
  and persistent front-end state using localStorage.

structure: |
  # (Leave this empty — you will insert the project structure here later)

utilities: |
  Utility helpers are implemented for cleaner DOM access and reusable logic.
  These include:
    - `$()` for selecting a single element
    - `$$()` for selecting multiple elements as arrays
  These functions reduce repeated querySelector calls and simplify the codebase.

greeting_popup_system: |
  The greeting popup appears on initial page load and uses:
    - Time-based greetings (morning, afternoon, evening)
    - Username storage in localStorage
    - Dynamic updates depending on whether a name exists
  The popup includes:
    - A name form (first-time users)
    - A personalized greeting (returning users)
    - Buttons to dismiss or reset the saved name

theme_toggle: |
  The site supports light and dark mode using a toggle switch in the header.
  The selected theme is stored in `localStorage.theme` so it persists across sessions.
  The theme is applied using:
    `document.body.classList.toggle("dark", theme === "dark")`.

projects_section: |
  The Projects system contains advanced dynamic logic:
    - Live search (title + tags)
    - Tag filters (web, ai, design)
    - Sorting (A–Z, Z–A, Newest, Oldest)
    - Experience-level filtering (beginner, advanced, all)
    - Show/Hide button with persistent state
    - "No projects found" state for empty results

  Each project uses HTML5 `data-*` attributes:
    - data-title
    - data-date
    - data-tags
    - data-level

  Rendering is fully dynamic via the `renderProjects()` function which:
    - Filters cards by search, tag, and level
    - Sorts according to the selected rules
    - Rebuilds the DOM efficiently
    - Ensures the project grid never stays hidden unintentionally

experience_level_system: |
  Located inside the About section.
  A dropdown input allows users to identify themselves as:
    - Beginner
    - Advanced
    - Just browsing

  This selection:
    - Changes the descriptive message
    - Filters the projects automatically to match their skill level
  Levels are stored in `data-level` attributes on each project card.

weather_api_integration: |
  The site integrates real-time weather data using the Open-Meteo API.
  This API requires no authentication and provides:
    - Temperature
    - Weather code
    - Wind speed
    - Timestamp of last update

  Features include:
    - Loading state
    - Graceful error handling
    - Manual refresh button
    - Human-readable weather descriptions via `weatherCodeToText()`

form_validation: |
  The contact form validation includes:
    - Required field enforcement
    - Regex email validation
    - Live inline error feedback
    - Success + error message toggling
  The form does not submit data to a backend, as per assignment requirements.

session_timer_and_clock: |
  The footer displays:
    - Current time (updated every second)
    - Session duration since the user loaded the page
  These values update via `setInterval(updateClock, 1000)`.

login_simulation: |
  A LOGIN/LOGOUT button simulates authentication.
    - Toggles button text
    - Updates footer status (“Guest mode” vs “Logged in”)
    - State stored in `localStorage.isLoggedIn`

skills_accordion: |
  The Skills section uses an interactive accordion:
    - Expand/collapse on click, Enter, or Space
    - State managed using a `data-collapsed` attribute
    - Fully keyboard accessible
  This improves usability and accessibility.

performance_optimizations: |
  Applied optimizations include:
    - Caching DOM selectors
    - Reducing layout thrashing
    - Grouping DOM updates
    - Eliminating redundant queries
    - Simplifying animations
    - Clean, modular JavaScript functions
    - Improved CSS organization for maintainability

accessibility: |
  Accessibility considerations include:
    - aria-modal, aria-hidden for the popup
    - aria-live for weather updates
    - Keyboard-navigable accordions
    - High-contrast dark/light themes
    - Semantic HTML structure
    - Focus management on interactive elements

limitations: |
  Current limitations:
    - Contact form is frontend-only (no backend)
    - Weather shows only current conditions
    - Login simulation is purely client-side
    - Project list is static rather than API-driven

future_improvements: |
  Planned future enhancements:
    - Integrate GitHub API to fetch real repositories
    - Add multilingual support (English/Arabic)
    - Add animations to project filtering
    - Add backend support for real contact submissions
    - Improve weather card with icons and hourly forecast

conclusion: |
  This project successfully implements all advanced features required for Assignment 3:
    - External API integration
    - Complex JavaScript logic
    - Local storage state management
    - Performance optimization
    - Documentation and accessibility
  The portfolio now provides a dynamic, interactive, and modern user experience.

