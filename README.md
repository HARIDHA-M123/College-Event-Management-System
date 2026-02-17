# College Event Management — Frontend

This is a React + Vite frontend scaffold for a College Event Management System. It includes a modern SaaS-like dashboard UI with features for students, organizers, and admins.

Key tech: React, Vite, Tailwind CSS, Framer Motion, Recharts, FullCalendar (added as dependency), Zustand, Axios, socket.io-client.

Features included (frontend-only, mocked data):
- Role-based pages: Home, My Events, Create Event, Notifications, Admin Dashboard, Profile
- AI-based recommendations (client-side mock hook)
- Search / filters (UI shell — can be wired to API)
- Event cards with RSVP/share/like actions
- Dark/Light mode toggle
- Create Event form with image preview
- Admin analytics (Recharts)
- Leaderboard and XP badges

Getting started

1. Install dependencies:

   npm install

2. Run dev server:

   npm run dev

- This project can now be wired to a real backend. By default the frontend will call the API at `http://localhost:4000`.
- Backend quick start (from project root):
- 1. Install backend deps: `npm run backend:install`
- 2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
- 3. Start backend in dev mode: `npm run backend:dev`

- The frontend reads the API base URL from the `VITE_API_URL` environment variable. To change it, create a `.env` in the frontend with `VITE_API_URL=http://localhost:4000`.
- Replace placeholder images in `src/assets/` or update paths in mock data.
- FullCalendar is included in package.json; integration (drag-and-drop calendar view) can be added into pages as needed.

Next steps:
- Wire to a real backend API for events, auth, uploads
- Implement FullCalendar calendar view with drag-and-drop
- Add tests and E2E flows
