-- The trip briefs sent from the home page's planner (worker.js). Apply with `npx wrangler d1 migrations apply sense --remote`.
CREATE TABLE briefs (
  id INTEGER PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  lang TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  month TEXT,
  travelers TEXT NOT NULL,
  interests TEXT
);
