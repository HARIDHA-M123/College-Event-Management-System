# College Events Backend

Simple Express + MongoDB backend for the College Event Management System.

Setup

- Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
- Install dependencies: `npm install` inside the `backend` folder.
- Start dev server: `npm run dev` (requires `nodemon`).

Endpoints

- POST /api/auth/signup { name, email, password, role }
- POST /api/auth/login { email, password }
- GET /api/auth/me (bearer token)
- GET /api/events
- GET /api/events/:id
- POST /api/events (auth)
- POST /api/events/:id/attend (auth)
 - POST /api/events/:id/feedback { rating(1-5), comment } (auth)
 - GET /api/events/:id/feedback

Automatic Expiry

Events are now automatically deleted 6 days after their event `date` (configurable via `EVENT_RETENTION_DAYS`). This is implemented using a MongoDB TTL index on the `expiresAt` field in the `Event` model.

Changing Retention

- Set `EVENT_RETENTION_DAYS` in `.env` (default 6).
- New events will compute `expiresAt = date + retentionDays` upon creation.

Migrating Existing Events

Run the migration script to backfill `expiresAt` for events created before this change:

```bash
cd backend
node scripts/migrateSetEventExpiry.js
```

Prerequisites: ensure MongoDB is running and `.env` has `MONGO_URI` set.

Feedback

Each event stores an array `feedback` with entries:
`{ user, rating (1-5), comment, createdAt }` and maintains `averageRating`.

Rules:
- User must have attended OR event date must have passed to submit feedback.
- Repeated submissions by same user overwrite previous feedback.
- Average rating recalculated on each change and emitted via Socket.IO `event:feedback`.

Example submit (with bearer token):

```bash
curl -X POST \
	-H "Authorization: Bearer <token>" \
	-H "Content-Type: application/json" \
	-d '{"rating":5,"comment":"Great organization"}' \
	http://localhost:4000/api/events/<eventId>/feedback
```

Fetch feedback:

```bash
curl http://localhost:4000/api/events/<eventId>/feedback
```
