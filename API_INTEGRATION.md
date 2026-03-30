# Node.js API Integration Documentation

## Overview
This file documents the Node.js API integration work implemented in this CoreUI React admin template project.

### Main integration point
- `src/assets/globalAPI/GlobalApi.js`
  - Uses `axios` as HTTP client.
  - Base URL: `https://workfoliobackend-j5a9.onrender.com/api/app`
  - Implements auth and data endpoints for projects, organizations, and dashboard metrics.

---

## 1) Authentication flow
### Login
- File: `src/views/pages/login/Login.js`
- API: `loginUser(data)`
- Endpoint: `POST /auth/login`
- Behavior:
  - Posts `{ email, password }`.
  - On success: stores `userToken` and `userdetails` in `localStorage` and redirects to `/dashboard`.
  - Error handling: shows toast with API or generic message.

### Register (exists in GlobalApi but not shown in login page)
- API: `createUser(data)`
- Endpoint: `POST /auth/register`

---

## 2) Project management
### Get projects list
- File: `src/layouts/ProjectsList/index.js`
- API: `getAllProjects(data)`
- Endpoint: `POST /projects/getProjects`
- Behavior:
  - Sends `{ page }` from local state.
  - Attaches `Authorization: Bearer <token>` header from `localStorage`.
  - Maps backend items into table rows.
  - Handles pagination and loading states.

### Create project
- File: `src/layouts/ProjectsList/CreateProject/index.js`
- API: `createMyProject(data)`
- Endpoint: `POST /projects/createProject`

### Edit project
- File: `src/layouts/ProjectsList/EditProject/index.js`
- API: `updateMyProject(data)`
- Endpoint: `POST /projects/updateProject`

### Organization helper for projects
- Used during create/edit project workflows to populate select list
- API: `getAllOrganizations()`
- Endpoint: `GET /organizations/getOrganizations`

---

## 3) Organization management
### Get organizations
- File: `src/layouts/OrganizationsList/index.js`
- API: `getAllOrganizations()`
- Endpoint: `GET /organizations/getOrganizations`
- Behavior:
  - Loads all orgs on mount.
  - Formats dates, promotions, status tags.

### Create organization
- File: `src/layouts/OrganizationsList/CreateOrganization/index.js`
- API: `createMyOrganization(data)`
- Endpoint: `POST /organizations/createOrganization`

### Edit organization
- File: `src/layouts/OrganizationsList/EditOrganization/index.js`
- API: `updateMyOrganization(data)`
- Endpoint: `POST /organizations/updateOrganization`

---

## 4) Dashboard metrics
- File: `src/views/dashboard/Dashboard.js`
- APIs:
  - `fetchDashboardData()` -> `GET /dashboard/summary`
  - `fetchCareerData()` -> `GET /dashboard/career`
  - `fetchTechStackData()` -> `GET /dashboard/tech`
  - `fetchTimelineData()` -> `GET /dashboard/timeline`
- Behavior:
  - Runs all four requests in parallel using `Promise.all`.
  - Stores results in state: summary cards, chart, tech stats, timeline.

---

## 5) Axios configuration
- `axios.defaults.baseURL` set once globally in `GlobalApi.js`.
- Authorization header is added for each request requiring authentication:
  - `let token = localStorage.getItem('userToken')`
  - `axios.defaults.headers.common['Authorization'] = 'Bearer ' + token`

---

## 6) Notes and future suggestions
- Consider moving per-request header settings to an Axios instance:
  - `const api = axios.create({ baseURL: ... })`
  - Use request interceptor for token
- Error handling currently mostly in components; a shared helper (e.g. `handleApiError`) can reduce duplication.
- Add typing (TypeScript) or JSDoc for request payloads and responses.

---

## 7) Quick usage diagram
1. `Login.js` calls `loginUser()` -> `POST /auth/login`
2. On success stores token and user data.
3. `ProjectsList`, `OrganizationsList`, `Dashboard` call respective endpoints with token headers.
4. CRUD actions on Projects/Organizations use `createMyProject/updateMyProject/createMyOrganization/updateMyOrganization`.

---

## 8) Style / dependency
- Uses `axios@^1.13.6` (see `package.json`).
- React components using CoreUI, Ant Design table/layout, framer-motion, react-hot-toast.

---

## 9) Where to add in README
Recommended section in `README.md`:
- "Node.js API Integration"
- points to `src/assets/globalAPI/GlobalApi.js` and key UI flows above.
