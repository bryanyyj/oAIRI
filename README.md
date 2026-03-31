# Readiness Assessment App

A scenario-based readiness assessment application built with React, Vite, Tailwind CSS, and Cloudflare Pages with D1 database.

## Features

- 5 scenario-based decision-making questions
- Multiple action choices with hidden weighted scoring
- Real-time progress tracking
- Immediate readiness level calculation
- Server-side validation and scoring
- Anonymous assessment (no personal data collection)
- Persistent storage in Cloudflare D1 (SQLite)
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages
- **API**: Cloudflare Pages Functions (Workers)
- **Database**: Cloudflare D1 (SQLite)
- **Containerization**: Docker & Docker Compose

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create D1 Database

```bash
npx wrangler login  # If not already logged in
npx wrangler d1 create survey-db
```

This will output a database ID. Copy it and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "survey-db"
database_id = "YOUR_D1_DATABASE_ID"  # Replace with your actual ID
```

### 3. Initialize Database Schema

```bash
npx wrangler d1 execute survey-db --file=schema.sql
```

### 4. Development

First, build the React app:

```bash
npm run build
```

Then run the development server with Wrangler:

```bash
npx wrangler pages dev dist --d1=DB
```

The app will be available at `http://localhost:8788`

**Note**: When making changes to React code, you need to rebuild:
```bash
npm run build && npx wrangler pages dev dist --d1=DB
```

### 5. Docker Deployment

Run with Docker Compose:

```bash
docker-compose up --build
```

Or manually:

```bash
docker build -t readiness-app .
docker run -p 8788:8788 readiness-app
```

The app will be available at `http://localhost:8788`

### 6. Deploy to Cloudflare Pages

First, build the production version:

```bash
npm run build
```

Then deploy:

```bash
npx wrangler pages deploy dist
```

For subsequent deploys, you can also set up automatic deployments via GitHub integration in the Cloudflare dashboard.

## Project Structure

```
readiness-assessment/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Router setup
│   ├── data/
│   │   └── scenarios.js      # Scenario questions, options, weights, and readiness framework
│   ├── pages/
│   │   ├── SurveyPage.jsx    # 5 scenario-based assessment form
│   │   └── ResultsPage.jsx   # Readiness level display
│   └── components/
│       ├── QuestionCard.jsx  # Scenario card with action options
│       ├── ProgressBar.jsx   # Assessment progress indicator
│       └── ScoreDisplay.jsx  # Readiness level visualization
├── functions/
│   └── api/
│       └── submit.js         # API endpoint for assessment submission
├── docs/                     # Internal documentation (gitignored)
├── Dockerfile               # Docker container configuration
├── docker-compose.yml       # Docker Compose setup
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── wrangler.toml           # Cloudflare configuration
└── schema.sql              # D1 database schema
```

## Assessment Scoring

### How It Works

- **5 scenarios** covering different competency areas:
  1. Crisis Management
  2. Team Leadership
  3. Strategic Planning
  4. Resource Management
  5. Stakeholder Communication

- Each scenario has **5 action options** with hidden weights (1-5 points)
- Frontend displays scenario text and action choices
- Backend maps selected options to scores
- Total possible score: **25 points** (5 scenarios × max 5 points each)

### Readiness Levels

| Score | Level | Description |
|-------|-------|-------------|
| 21-25 | **Expert Ready** | Demonstrates exceptional decision-making and readiness across all scenarios |
| 17-20 | **Advanced Ready** | Shows strong readiness with consistent good judgment |
| 13-16 | **Moderately Ready** | Displays adequate readiness with room for development |
| 9-12  | **Developing** | Shows basic readiness but needs significant improvement |
| 5-8   | **Novice** | Limited readiness; requires substantial training and support |

## API Endpoint

### POST /api/submit

Submits assessment responses and returns the calculated readiness level.

**Request:**
```json
{
  "answers": {
    "1": "b",
    "2": "b",
    "3": "b",
    "4": "c",
    "5": "b"
  }
}
```

**Response:**
```json
{
  "success": true,
  "readinessData": {
    "label": "Expert Ready",
    "description": "Demonstrates exceptional decision-making and readiness across all scenarios",
    "color": "emerald",
    "score": 25,
    "percentage": 100
  }
}
```

## Database Schema

The `responses` table stores all assessment submissions with:
- 5 individual scenario scores (q1-q5) - the weighted values, not the option IDs
- Total score (5-25)
- Score percentage
- Readiness level label
- Timestamp of submission

**Note**: No personal information is collected or stored.

## Security & Privacy

- ✅ No names or personal data collected
- ✅ All scoring performed server-side
- ✅ Option weights hidden from frontend
- ✅ Server-side validation of all inputs
- ✅ Anonymous response tracking

## Development Notes

- All scoring weights are defined in `src/data/scenarios.js` for the frontend and duplicated in `functions/api/submit.js` for the Worker
- D1 database binding is accessed as `env.DB` in Worker functions
- CORS headers are included in the API response for development
- Client-side validation ensures all scenarios are answered before submission
- Server-side validation maps option IDs to weights and validates all inputs

## License

MIT
