# Google Play Store Review Sentiment Analyzer - Backend

This is the FastAPI backend for the Google Play Store Review Sentiment Analyzer.

## Setup

1. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

2. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`

3. Create a `.env` file with your Google Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. Run the server:
   \`\`\`
   uvicorn main:app --reload
   \`\`\`

The API will be available at http://localhost:8000.

## API Endpoints

- `POST /analyze`: Analyze reviews for a given app name
- `GET /search-apps/{query}`: Search for apps by name (used for autocomplete)

## Notes

- The backend uses `google-play-scraper` to fetch reviews from the Google Play Store.
- Sentiment analysis is performed using Google Gemini.
- Reviews are processed in batches with rate limiting to avoid overwhelming the API.
\`\`\`

Now, let's create the Next.js frontend:
