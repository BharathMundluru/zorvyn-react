# Zorvyn — Expense Tracker & Analytics Dashboard

Zorvyn is a modern, responsive **React.js-based financial dashboard** designed to help users track expenses, analyze spending patterns, and gain actionable insights through interactive visualizations.

---

## Overview

This project demonstrates a clean and scalable frontend architecture for financial tracking applications. It focuses on usability, modular design, and data visualization.

---

## Key Features

*  **Authentication UI** — Login & Signup interface (ready for backend integration)
*  **Interactive Dashboard** — Overview of financial data
*  **Insights & Analytics** — Category-wise and monthly spending analysis
*  **Transaction Management** — Track and display user transactions
*  **Responsive UI** — Optimized for desktop and mobile devices
*  **Modular Architecture** — Clean separation of concerns (API, pages, components)

---

##  Technology Stack

| Category   | Technology        |
| ---------- | ----------------- |
| Frontend   | React.js          |
| Language   | JavaScript (ES6+) |
| Styling    | CSS               |
| Charts     | Recharts          |
| Build Tool | Create React App  |

---

##  Project Structure

```id="n6h3av"
src/
├── api/
│   ├── api.js
│   └── loginapi.js
├── pages/
│   ├── Auth.js
│   ├── Dashboard.js
│   ├── Settings.js
│   ├── Insights.js
│   ├── Charts.js
│   └── Transactions.js
├── App.js
├── index.js
└── App.css
```

---

## Getting Started

### 1. Clone the repository

```id="84v67z"
git clone https://github.com/BharathMundluru/zorvyn-react.git
cd zorvyn-react
```

### 2. Install dependencies

```id="h2xyg0"
npm install
```

### 3. Start development server

```id="0q6w3n"
npm start
```

 Application will be available at: http://localhost:3000

---

## Available Scripts

```id="o5u5qq"
npm start
npm run build
npm test
```

---

## Future Enhancements

* Backend Integration using Spring Boot
* Secure Authentication with JWT
* Deployment (Vercel / Netlify)
* Advanced analytics & reporting
* Export reports (PDF/CSV)

---

## Architecture Highlights

* Separation of API and UI layers
* Component-based design for scalability
* Reusable UI patterns
* Clean folder structure for maintainability

---

## Disclaimer

This project is developed for educational and demonstration purposes and serves as a foundation for full-stack financial applications.
