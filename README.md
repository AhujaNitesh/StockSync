# StockSync — Kirana & General Store Management System

A high-performance store inventory, POS billing, and visual financial analytics platform designed for **Sri Ganesh General Stores**, Bangalore.

---

## 📁 Clean Project Architecture

`
general-store/
├── frontend/                     # Modular Static Frontend (HTML, CSS, JS)
│   ├── index.html                # Landing page with business profile & shortcuts
│   ├── login.html                # Auth portal with role switcher (Owner, Supervisor, Cashier)
│   ├── dashboard.html            # Core dashboard (collapsible sidebar, Chart.js, POS, alerts)
│   ├── css/
│   │   ├── common.css            # Design tokens, dark theme variables, Font Awesome
│   │   ├── landing.css           # Landing hero section & core feature card styling
│   │   ├── login.css             # Auth card layout & role badge styles
│   │   └── dashboard.css         # Collapsible sidebar, KPI cards, tables & modals
│   └── js/
│       ├── landing.js            # Landing page interactions
│       ├── login.js              # Auth portal login verification
│       └── dashboard.js          # Robust store state, tab switching, POS counter, Chart.js
│
├── server/                       # Node.js + Express REST API
│   ├── controllers/              # Auth, products, categories, suppliers, sales, purchases, reports
│   ├── routes/                   # REST API routes
│   ├── middleware/               # JWT authentication & error handling
│   ├── db/                       # MySQL connection pool
│   ├── schema.sql                # Database schema
│   ├── seed.sql                  # Demo seed data (Sri Ganesh General Stores)
│   ├── app.js                    # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── README.md                     # Project documentation
`

---

## 🚀 1-Click Launch (Recommended)

Simply double-click or run:
```cmd
start.bat
```
This automatically:
1. Verifies **Node.js**, **npm**, and **MySQL** services.
2. Creates `server/.env` and installs dependencies if needed.
3. Launches the **Backend API** (port 5000) and **Frontend** (port 5173).
4. Serves the full application live and automatically opens `http://localhost:5000` in your default browser.

To stop all background processes at any time:
```cmd
stop.bat
```

---

## 🌐 Live URLs
- **Unified Web Application**: [http://localhost:5000](http://localhost:5000)
- **Dedicated Frontend**: [http://localhost:5173](http://localhost:5173)
- **REST API Endpoint**: [http://localhost:5000/api](http://localhost:5000/api)

---

### Manual Launching (Alternative)
- **Home Page**: Open `frontend/index.html`
- **Login Portal**: Open `frontend/login.html`
- **Dashboard**: Open `frontend/dashboard.html`

### 2. Demo User Roles & Credentials
| Role | Name | Email | Password | Access Level |
|---|---|---|---|---|
| **Owner / Admin** | Sri Ganesh | dmin@sriganeshstore.com | dmin123 | Full Access (Sales turnover, cost prices, charts) |
| **Supervisor / Manager** | Suresh Rao | manager@sriganeshstore.com | manager123 | Restricted (Revenue, profits & cost prices hidden) |
| **Cashier / Staff** | Rahul V. | staff@sriganeshstore.com | staff123 | POS Counter & Sales only |

---

## 🛠️ Backend API Setup (Optional)

1. **MySQL Database**:
   `sql
   SOURCE server/schema.sql;
   SOURCE server/seed.sql;
   `
2. **Server**:
   `ash
   cd server
   npm install
   cp .env.example .env
   npm start
   `
