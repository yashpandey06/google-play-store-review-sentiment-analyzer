# Google Play Store Review Sentiment Analyzer

This application retrieves recent Google Play Store reviews for a specified app, analyzes their sentiment using Google Gemini, and displays the average sentiment score.

## Features

- Input field for app name with autocomplete suggestions
- Fetches 100 most recent reviews from Google Play Store
- Analyzes sentiment of each review using Google Gemini
- Displays average sentiment score and number of reviews analyzed
- Shows sample reviews with their individual sentiment scores

## Tech Stack

- **Backend**: FastAPI with async processing for concurrent review analysis
- **Frontend**: Next.js with shadcn/ui components
- **Sentiment Analysis**: Google Gemini AI model
- **Data Retrieval**: google-play-scraper library

## Project Structure

### Backend

\`\`\`
backend/
├── main.py                 # Entry point
├── app.py                  # FastAPI app setup
├── config.py               # Configuration and settings
├── models/                 # Data models
│   └── schemas.py          # Pydantic schemas
├── routes/                 # API endpoints
│   └── app_routes.py       # Routes for app analysis
├── services/               # Business logic
│   ├── play_store_service.py  # Google Play Store interactions
│   └── sentiment_service.py   # Sentiment analysis with Gemini
└── requirements.txt        # Python dependencies
\`\`\`

### Frontend

\`\`\`
frontend/
├── src/
│   ├── app/                # Next.js app directory
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   │   ├── AppSearch.tsx   # App search component
│   │   └── AnalysisResults.tsx  # Results display
│   ├── hooks/              # Custom React hooks
│   │   ├── useAppSearch.ts # App search logic
│   │   └── useAnalysis.ts  # Analysis logic
│   ├── services/           # API services
│   │   └── api.ts          # API client
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Type definitions
│   └── utils/              # Utility functions
│       └── sentiment.ts    # Sentiment helpers
└── .env.local              # Environment variables
\`\`\`

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- Google Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`
   cd backend
   \`\`\`

2. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`

4. Create a `.env` file based on `.env.example`:
   \`\`\`
   cp .env.example .env
   \`\`\`

5. Edit the `.env` file and add your Google Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

6. Start the FastAPI server:
   \`\`\`
   python main.py
   \`\`\`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a `.env.local` file based on `.env.local.example`:
   \`\`\`
   cp .env.local.example .env.local
   \`\`\`

4. Start the Next.js development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open your browser and navigate to http://localhost:3000

## How It Works

1. **App Search**: Enter an app name in the search field. The autocomplete feature will suggest app names as you type.
2. **Review Retrieval**: The backend fetches the 100 most recent reviews for the selected app from the Google Play Store.
3. **Sentiment Analysis**: Each review is analyzed by Google Gemini to determine its sentiment score (0-1 scale).
4. **Results Display**: The frontend displays the average sentiment score, number of reviews analyzed, and sample reviews with their individual scores.

## Implementation Notes

### Data Retrieval

- The application uses the `google-play-scraper` library to fetch reviews from the Google Play Store.
- This is an unofficial method as Google does not provide an official API for Play Store data.
- Limitations include potential rate limiting and changes to the Play Store structure that could break the scraper.

### Sentiment Analysis

- Google Gemini is used for sentiment analysis.
- Reviews are processed in batches with rate limiting to avoid overwhelming the API.
- The sentiment score is normalized to a 0-1 scale, where:
  - 0-0.4: Negative
  - 0.4-0.6: Neutral
  - 0.6-1.0: Positive

### Async Processing

- The backend uses async processing to analyze reviews concurrently.
- Reviews are processed in batches with a configurable delay between batches to respect rate limits.
