# Portfolio Venus

Joe Burton's personal portfolio website — a Next.js 14 (App Router) application that showcases his work history, project case studies, and a small "experiments" playground of custom React components.

The site is live as Joe's public portfolio and online playground, presenting over 20 years of web development experience across companies such as Publicis Sapient, WorldFirst, GE Power Digital, Tribal Worldwide, and Ogilvy.

## Tech Stack

- **Framework:** Next.js 14.2 (App Router, React Server Components)
- **Language:** TypeScript 5
- **UI Library:** Chakra UI 2 (`@chakra-ui/react`, `@chakra-ui/next-js`, `@chakra-ui/icons`)
- **Icons:** `react-icons`, `react-bootstrap-icons`, and custom SVG icon components
- **Database:** MongoDB (via the official `mongodb` driver) — used to store work history records
- **Forms & Validation:** Custom validation utilities driving a Chakra UI contact form (Formik is also installed)
- **Email:** Nodemailer (Gmail SMTP) for the contact form; `@sendgrid/mail` is also installed as an alternative
- **HTTP:** Axios for client-side requests
- **HTML Parsing:** `html-react-parser` for rendering HTML stored in MongoDB records
- **Error Handling:** `react-error-boundary` plus the App Router's `error.tsx` / `global-error.tsx` conventions
- **Testing:** Jest 29 + React Testing Library + `jest-environment-jsdom`
- **Linting:** ESLint with `next/core-web-vitals`

## Project Structure

```
src/
├── app/                         # Next.js App Router pages and route handlers
│   ├── layout.tsx               # Root layout (Navigation, Footer, Chakra Provider)
│   ├── page.tsx                 # Home / splash page
│   ├── error.tsx                # Route-level error boundary
│   ├── global-error.tsx         # Global error boundary
│   ├── contact/                 # Contact page (ContactForm + page metadata)
│   ├── thankyou/                # Post-submission confirmation page
│   ├── experiments/             # "Experiments" playground page
│   ├── work/                    # Work listing page
│   │   ├── page.tsx             # Lists all projects (data from MongoDB)
│   │   └── [id]/page.tsx        # Per-project detail page (statically generated)
│   └── api/                     # Route handlers (server-side API)
│       ├── mailsender/          # POST: sends contact-form email via Nodemailer/Gmail
│       ├── work/                # CRUD endpoints backed by MongoDB
│       │   ├── route.ts                 # GET all work projects
│       │   ├── [id]/route.ts            # GET + PATCH + DELETE a single project by _id
│       │   ├── add-one/route.ts         # POST a single project (admin)
│       │   ├── bulk-add/route.ts        # POST many projects — idempotent upsert (admin)
│       │   └── delete-all/route.ts      # DELETE every project (admin)
│       └── projects/            # GET endpoints backed by an in-memory dataset
│           ├── route.ts                 # GET all projects
│           ├── [id]/route.ts            # GET single project
│           └── projects.ts              # Hard-coded project data
├── components/                  # Reusable UI components
│   ├── Navigation/              # Top nav bar
│   ├── Footer/                  # Page footer
│   ├── ChakraProvider/          # Client-side Chakra UI provider wrapper
│   ├── PageIntro/               # Standard page header (title, subtitle, detail)
│   ├── PageContent/SplashPage/  # Home page splash content
│   ├── Projects/                # Renders a responsive grid of DisplayItems
│   ├── DisplayItem/             # Card showing a single project / role
│   ├── ContactForm/             # Form + validation logic
│   ├── FilterProjects/          # Keyboard-activated project filter (press "x" or "y")
│   ├── BarGraph/                # Pure-CSS percentage bar graph
│   ├── Carousel/                # Carousel component
│   ├── SmartCarousel/           # Translate-based carousel with position tracker
│   ├── DisplayRandomImages/     # Picks random images from the engineers dataset
│   ├── Related/                 # GitHub / LinkedIn related links card
│   ├── RememberingToCode/       # Small practice component
│   └── CustomIcons/             # Hand-rolled SVG icons (GitHub, LinkedIn, Home, Vercel)
├── data/                        # Static datasets (engineers, items, pigeons, work)
├── hooks/                       # Custom React hooks
│   ├── useRandomArrayItems.tsx  # Pick N random items from an array
│   ├── useDetectOutsideClick.ts # Detect clicks outside a ref
│   └── useToggleOnKeys.ts       # Toggle state on configurable keypresses
├── lib/                         # Server-side helpers
│   ├── mongodb.ts               # MongoClient with dev/prod connection handling
│   ├── work.ts                  # MongoDB queries + WorkDoc type for the "work" database
│   └── adminGuard.ts            # assertAdmin() — protects destructive /api/work routes
├── theme/                       # Chakra UI theme (breakpoints, fonts, global styles)
├── utils/                       # Misc utility helpers
└── css/                         # Global stylesheets (main.css, reset.css)

public/
└── assets/                      # Logos, profile images, project screenshots, AI-generated imagery
```

## Pages

- **`/`** — Splash page introducing Joe with quick links to GitHub, LinkedIn, the work page, and contact details.
- **`/work`** — Server-rendered grid of work history, sourced from MongoDB. Revalidates hourly (`revalidate = 3600`).
- **`/work/[id]`** — Per-project detail page, statically generated via `generateStaticParams` from the MongoDB collection.
- **`/experiments`** — Playground showcasing the custom components (`FilterProjects`, `BarGraph`, `SmartCarousel`, `DisplayRandomImages`, `Related`, `RememberingToCode`, and Chakra `Grid` examples).
- **`/contact`** — Contact form posting to `/api/mailsender`.
- **`/thankyou`** — Post-submit confirmation page.

## Getting Started

### Prerequisites

- Node.js (recent LTS recommended)
- A MongoDB instance (local for development, hosted for production)
- A Gmail account with an App Password (for the contact form)

### Install

```bash
npm install
```

### Environment Variables

Create a `.env.local` in the project root:

```bash
# MongoDB
MONGODB_URI_LOCAL=mongodb://localhost:27017          # used when NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/   # used in production

# Gmail (Nodemailer) — used by /api/mailsender
GMAIL_USER=your.address@gmail.com
GMAIL_APP_PASSWORD=your-google-app-password

# Base URL used by client-side fetches (e.g. ContactForm -> /api/mailsender)
NEXT_PUBLIC_BASE_URL=http://localhost:8080

# Base URL used by server-side fetches in /experiments
BASE_URL=http://localhost:8080

# Shared secret guarding the destructive /api/work admin routes
# (add-one, bulk-add, delete-all, PATCH/DELETE /api/work/[id]).
# Not needed locally — NODE_ENV=development bypasses the guard.
# In production, set this and send it as the `x-admin-secret` header.
# Generate one with: openssl rand -hex 32
ADMIN_API_SECRET=change-me-to-a-long-random-string
```

The MongoDB `work` database is expected to contain a `companiesAndProjects` collection. Documents follow the `DisplayItemInterface` shape (see `src/components/DisplayItem/DisplayItem.tsx`) with a `sortOrder` field controlling display order.

**`_id` is an application-owned string, not a MongoDB `ObjectId`.** The canonical dataset lives in `src/app/api/projects/projects.ts`, where each record carries its own stable `_id` (e.g. `"6796a5e1a2a569c729ee2e22"`). Keeping ids in the source file means they survive a wipe-and-reseed, so bookmarked `/work/[id]` URLs and API calls keep working. All `/api/work` routes therefore query by string `_id` — see `WorkDoc` in `src/lib/work.ts`. Seed the collection with `POST /api/work/bulk-add` (see [Managing work data](#managing-work-data)).

### Scripts

```bash
npm run dev      # Start Next.js in dev mode on http://localhost:8080
npm run build    # Production build
npm run start    # Start the production server
npm run lint     # Run ESLint (next/core-web-vitals)
npm test         # Run Jest in watch + verbose mode
```

Note: the dev server is configured to run on **port 8080**, not the Next.js default of 3000.

## API Endpoints

All endpoints are implemented as Next.js Route Handlers under `src/app/api`.

### `POST /api/mailsender`
Sends the contact form via Nodemailer (Gmail). Expects JSON: `{ name, email, phoneNumber, message }`.

Endpoints marked **(admin)** are protected by `assertAdmin()` (`src/lib/adminGuard.ts`): they run freely when `NODE_ENV=development`, and in every other environment require an `x-admin-secret` header matching `ADMIN_API_SECRET`. A missing or wrong secret returns `401 { "message": "Unauthorized" }`.

### `GET /api/work`
Returns all work projects from MongoDB (sorted by `sortOrder`).

### `GET /api/work/[id]`
Returns a single work project by its string `_id`. `404` if not found.

### `PATCH /api/work/[id]` — (admin)
Partially updates a single project by its string `_id`. Body is a partial document — only the fields present are changed (via `$set`); `_id` in the body is ignored (the URL param is authoritative). Returns the updated document on success, `400` if the body has no fields to update, `404 { "message": "No document found with the given ID" }` if nothing matched.

### `DELETE /api/work/[id]` — (admin)
Deletes a single project by its string `_id`. Returns `200` on success, `404 { "message": "No document found with the given ID" }` if nothing matched.

### `POST /api/work/add-one` — (admin)
Adds a single project and assigns it the next `sortOrder`. Body is the document itself. The `_id` is resolved as follows:

- if the body has a string `_id`, it is used as-is (`409` if it already exists);
- otherwise an `_id` is derived by slugifying `company` (`"Publicis Sapient"` → `"publicis-sapient"`), with a numeric suffix (`-2`, `-3`, …) added until it is unique;
- `400` if there is neither an `_id` nor a `company` to derive one from.

Responds `201 { "_id": "<id>", "sortOrder": <n> }`.

### `POST /api/work/bulk-add` — (admin)
Upserts an array of project documents. Every element **must** have a string `_id` (`400` otherwise). Each doc is written with `replaceOne … { upsert: true }` keyed on `_id`, and `sortOrder` is (re)assigned from the array index — so the payload is the single source of truth for order.

Because it upserts, it is **idempotent**: re-running it against an already-seeded collection updates the existing rows instead of erroring on duplicate keys, and you do **not** need to `delete-all` first. Responds `200 { "message": "Documents upserted", "upsertedCount": <n>, "modifiedCount": <n> }`.

### `DELETE /api/work/delete-all` — (admin)
Wipes the `companiesAndProjects` collection. Responds `200 { "message": "All documents deleted", "deletedCount": <n> }`.

### `GET /api/projects`, `GET /api/projects/[id]`
Returns project data from the list in `src/app/api/projects/projects.ts` — this is also the canonical seed data for the `work` collection. Currently consumed by the `/experiments` page.

## Managing work data

The `work` collection is seeded and maintained through the `/api/work` admin endpoints. Locally (dev server on port 8080, guard bypassed):

```bash
# Seed / re-seed the whole collection from the canonical dataset.
# projects.ts is a TS module, so convert it to JSON first, e.g. with a throwaway script,
# or maintain a projects.json alongside it. Then:
curl -X POST http://localhost:8080/api/work/bulk-add \
  -H 'Content-Type: application/json' \
  --data @projects.json
# first run:  { "message": "Documents upserted", "upsertedCount": 19, "modifiedCount": 0 }
# re-run:     { "message": "Documents upserted", "upsertedCount": 0,  "modifiedCount": 19 }

# Add one record (auto-slug id from "company")
curl -X POST http://localhost:8080/api/work/add-one \
  -H 'Content-Type: application/json' \
  -d '{ "company": "New Client", "role": "Front-end Lead", "description": "<p>…</p>" }'
# -> { "_id": "new-client", "sortOrder": 19 }

# Delete one record by its string _id
curl -X DELETE http://localhost:8080/api/work/new-client
# -> { "message": "Document deleted successfully" }

# Wipe everything
curl -X DELETE http://localhost:8080/api/work/delete-all
```

Against a deployed environment, add the admin secret to every write/delete call:

```bash
curl -X DELETE https://<your-domain>/api/work/6796a5e1a2a569c729ee2e22 \
  -H "x-admin-secret: $ADMIN_API_SECRET"
```

In Postman, add a header `x-admin-secret` with your `ADMIN_API_SECRET` value to the request (or leave it off entirely when hitting `localhost` in dev).

## Testing

Tests live alongside the components they exercise (e.g. `Footer.test.tsx`, `ContactForm.test.tsx`, `BarGraph.test.tsx`, `DisplayItem.test.tsx`, `FilterProjects.test.tsx`, `PageIntro.test.tsx`).

```bash
npm test
```

Jest is configured via `jest.config.js` using `next/jest`, with `jsdom` as the test environment and `@testing-library/jest-dom` matchers loaded in `jest.setup.js`.

## Path Aliases

`tsconfig.json` defines `@/*` as an alias for `./src/*`, so imports like `@/components/PageIntro` and `@/lib/mongodb` resolve from the `src` directory.

## Deployment

The project is a standard Next.js 14 application and deploys to any Node-compatible host (Vercel, etc.). In production:

- `MONGODB_URI` is used instead of `MONGODB_URI_LOCAL`.
- The `/work` listing revalidates every hour (ISR).
- `/work/[id]` pages are statically generated at build time from the current MongoDB contents via `generateStaticParams`.
- `ADMIN_API_SECRET` **must** be set, otherwise the `add-one`, `bulk-add`, `delete-all`, and `DELETE /api/work/[id]` routes reject every request with `401`. Send it as the `x-admin-secret` header when calling them.

Make sure all environment variables listed above are configured in your hosting provider.

## Contact

- Email: joeburton@gmail.com
- LinkedIn: [linkedin.com/in/joejamesburton](https://www.linkedin.com/in/joejamesburton)
- GitHub: [github.com/joeburton](https://github.com/joeburton)
