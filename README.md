# Lavanderia Fury

A modern laundry business management system built with **Nuxt 4** and **Vue 3**.
Handles orders, machine monitoring, inventory, catalogs, and user management in a clean, responsive UI.

---

## Features

- **Dashboard** — KPI cards, revenue chart, order status donut, and bar charts
- **Orders** — Create, edit, filter, and track laundry orders with status badges
- **Machine Control** — Monitor washing machines, start cycles, manage incidents
- **Inventory** — Track products and supplies
- **Catalogs** — Manage services, brands, and other tabbed catalogs
- **Users** — Add and manage system users with roles

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) + Vue 3 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (Vite plugin, CSS `@theme`) |
| State | [Pinia](https://pinia.vuejs.org) |
| Tables | [TanStack Vue Table](https://tanstack.com/table) |
| Charts | [Chart.js](https://www.chartjs.org) + [vue-chartjs](https://vue-chartjs.org) |
| Dates | [dayjs-nuxt](https://github.com/fumeapp/dayjs-nuxt) |
| Dev API | [json-server](https://github.com/typicode/json-server) |
| Types | TypeScript strict |
| Linting | ESLint + Prettier (with tailwindcss class sorting) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Development

Start the dev server and the local API in separate terminals:

```bash
# App — http://localhost:3000
npm run dev

# Dev API (json-server)
npm run api:watch
```

### Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
app/
├── assets/css/main.css     # Tailwind @theme design tokens
├── components/
│   ├── common/             # Shared: MapIcon, Modal, Dropdown, Search
│   ├── dashboard/          # KPI cards, charts
│   ├── layout/             # AppHeader, AsideMenu
│   ├── machine-control/    # Machine cards, cycle & status modals
│   ├── orders/             # Order rows, filters, detail panel, form modal
│   ├── users/              # User form modal
│   └── ui/                 # DataTable, TableToolbar, ModalHost, PageHeader
├── layouts/
│   └── default.vue         # Header + sidebar + main grid
├── pages/
│   ├── index.vue           # Dashboard
│   ├── orders.vue          # Order management
│   ├── machine-control.vue # Machine monitoring
│   ├── inventory.vue       # Inventory
│   ├── catalogs.vue        # Catalogs (tabbed)
│   ├── users.vue           # Users
│   └── nav-hub.vue         # Navigation hub
└── types/                  # Domain TypeScript interfaces
api/
└── server.cjs              # Local json-server (dev only)
```

---

## Design Tokens

All colors, shadows, and fonts are defined in `app/assets/css/main.css` via Tailwind CSS v4 `@theme`.
Never use raw hex values in components — always reference tokens:

| Category | Tokens |
|---|---|
| Brand | `primary`, `secondary`, `accent` (+ `-light`, `-dark`, `-darker` variants) |
| Surfaces | `surface`, `background`, `menu-bg`, `subtle-bg`, `content-bg` |
| Text | `text`, `text-subtle`, `muted`, `subtle`, `faint` |
| Borders | `border`, `border-strong` |
| States | `info`, `success`, `warning`, `error` (+ `-bg`, `-text`, `-soft` variants) |
| Order status | `status-pending`, `status-in-process`, `status-ready`, `status-canceled`, `status-completed` |
| Shadows | `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-primary` |

---

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run api          # Start json-server
npm run api:watch    # Start json-server with file watching
npx vue-tsc --noEmit # Type check
npx eslint .         # Lint
npx prettier --write . # Format
```
