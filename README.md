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
│       │   ├── [id]/route.ts            # GET single project
│       │   ├── add-one/route.ts         # POST single project
│       │   ├── bulk-add/route.ts        # POST many projects
│       │   ├── delete-one/[id]/route.ts # DELETE single project
│       │   └── delete-all/route.ts      # DELETE all projects
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
│   └── work.ts                  # MongoDB queries for the "work" database
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
```

The MongoDB `work` database is expected to contain a `companiesAndProjects` collection. Documents follow the `DisplayItemInterface` shape (see `src/components/DisplayItem/DisplayItem.tsx`) with a `sortOrder` field controlling display order. You can seed data via the `POST /api/work/bulk-add` endpoint.

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

### `GET /api/work`
Returns all work projects from MongoDB (sorted by `sortOrder`).

### `GET /api/work/[id]`
Returns a single work project by `_id`.

### `POST /api/work/add-one`
Adds a single project. Automatically assigns the next `sortOrder` value.

### `POST /api/work/bulk-add`
Bulk-inserts an array of project documents, assigning `sortOrder` by array index.

### `DELETE /api/work/delete-one/[id]`
Deletes a project by its MongoDB `ObjectId`.

### `DELETE /api/work/delete-all`
Wipes the `companiesAndProjects` collection.

### `GET /api/projects`, `GET /api/projects/[id]`
Returns project data from a hard-coded in-memory list in `src/app/api/projects/projects.ts`. Currently used by the `/experiments` page; flagged in the code as a TODO to migrate to MongoDB.

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

Make sure all environment variables listed above are configured in your hosting provider.

## Contact

- Email: joeburton@gmail.com
- LinkedIn: [linkedin.com/in/joejamesburton](https://www.linkedin.com/in/joejamesburton)
- GitHub: [github.com/joeburton](https://github.com/joeburton)
