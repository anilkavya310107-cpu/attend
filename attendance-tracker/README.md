# Student Attendance Tracker 🎓

A production-ready React app to track and visualize student attendance. Built with Vite + React, zero backend needed.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Stats summary + branding
│   ├── Header.module.css
│   ├── Controls.jsx        # Filter / sort / search / toggle bar
│   ├── Controls.module.css
│   ├── StudentTable.jsx    # Main table with rows + skeleton loader
│   ├── StudentTable.module.css
│   ├── DetailPanel.jsx     # Side panel on row click
│   └── DetailPanel.module.css
├── hooks/
│   └── useStudents.js      # useEffect fetch + all state logic
├── utils/
│   └── helpers.js          # Pure utility functions
├── App.jsx                 # Layout + composition
├── App.module.css
└── index.css               # Global design tokens (CSS variables)
```

## Features

- **Live data** fetched from JSONPlaceholder API via `useEffect`
- **Filter buttons** — All / Present / Absent
- **Sort** — by Name, Attendance ↑↓, Student ID
- **Search** — by name, email, username, city
- **Toggle** — show only below-75% attendance students
- **Row click** — opens detailed side panel with circular progress ring
- **Color coding** — green ≥75%, amber 50–74%, red <75%
- **5-stat header** — total, avg, good standing, at-risk, critical
- **Skeleton loading** state
- **Responsive** — collapses columns on mobile
- **Dark theme** throughout

## Tech Stack

- React 19
- Vite 8
- CSS Modules (zero runtime CSS-in-JS)
- No backend, no extra dependencies
