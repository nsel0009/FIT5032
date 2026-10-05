# Fieldnotes

A Vue 3 journal app for recording training and reflecting on progress. It has two collections:

- **Training sessions** — activity, date, duration and session notes.
- **Session reflections** — a linked session, rating, mood and reflection.

Entries are stored in the browser's `localStorage`; no account or database connection is required. Sample entries are provided on first use.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Journal homepage |
| `/sessions` | Training session index |
| `/sessions/new` | Create a training session |
| `/sessions/:id` | View one training session |
| `/ratings` | Session reflection index |
| `/ratings/new` | Create a session reflection |
| `/ratings/:id` | View one session reflection |

The forms trim saved text, remove angle brackets from text fields, and validate required titles and numeric values.
