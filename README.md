# Play Store Analyzer

A powerful application for analyzing Google Play Store app reviews using machine learning–based sentiment analysis.

---

## 🚀 Project Overview

The **Play Store Analyzer** helps developers and product teams uncover actionable insights from user feedback by automatically classifying sentiment and extracting key themes using a lightweight, state-of-the-art DistilBERT model.

## Screenshots

![Screenshot from 2025-04-28 19-27-37](https://github.com/user-attachments/assets/3a1b2a4d-4e7a-4c18-a970-9b03261ef2b7)

![Screenshot from 2025-04-28 19-29-10](https://github.com/user-attachments/assets/f87d482c-ebc1-4ce5-9e96-68812f627cc1)


## Assignment Walkthrough :

https://drive.google.com/file/d/1vggTKvAg-ocFQsGUWXiMPWbMJ_3puS_n/view?usp=sharing

---

## 📊 Key Features

- **App Search**:  
  Search any app on the Google Play Store with autocomplete suggestions.
- **Review Retrieval**:  
  Fetches the 100 most recent reviews automatically.
- **ML-Powered Sentiment Analysis**:  
  Accurate sentiment scoring using DistilBERT.
- **Visual Analytics**:  
  Interactive charts showing sentiment breakdown over time.
- **Review Insights**:  
  Display representative sample reviews by sentiment category.
- **Dark/Light Mode**:  
  Automatic theme switching based on user preference.
- **Responsive Design**:  
  Fully optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

### Backend

- **FastAPI** — High-performance Python web framework
- **DistilBERT** — Lightweight sentiment-analysis model
- **google-play-scraper** — Fetches app metadata and reviews
- **Python 3.9+**, **PyTorch**, **Asyncio** — For backend logic and model inference

### Frontend

- **Next.js 14** — React framework with server-side rendering
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library built on Radix UI
- **Framer Motion** — Smooth animations

---

## 🏗️ Architecture

```plaintext
┌───────────────┐       ┌───────────────┐       ┌─────────────────┐
│               │       │               │       │                 │
│  Next.js      ├──────▶│  FastAPI      ├──────▶│  Google Play    │
│  Frontend     │◀──────┤  Backend      │◀──────┤  Store API      │
│               │       │               │       │                 │
└───────────────┘       └──────┬────────┘       └─────────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │                   │
                         │   DistilBERT      │
                         │   Sentiment Model │
                         │                   │
                         └───────────────────┘
```

```

play-store-analyzer/
├── backend/                   # FastAPI backend
│   ├── app.py                 # FastAPI app setup
│   ├── config.py              # Configuration settings
│   ├── main.py                # Entry point
│   ├── models/                # Pydantic schemas
│   ├── routes/                # API endpoints
│   └── services/              # Business logic
│       ├── play_store_service.py  # Google Play interactions
│       └── sentiment_service.py   # DistilBERT sentiment analysis
└── frontend/                  # Next.js frontend
    ├── app/                   # App router structure
    │   ├── app/               # Main application pages
    │   ├── marketing/         # Landing and marketing pages
    │   └── layout.tsx         # Root layout component
    ├── components/            # Reusable React components
    ├── lib/                   # Utility functions and API client
    └── types.ts               # TypeScript types

```



## 🚀 Setup Instructions

### Prerequisites

- Node.js v18 or higher  
- Python 3.9 or higher  
- PyTorch (compatible with your Python version)  

---

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create & activate virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload

```
---

### 2. Frontend Setup

```bash
# In a new terminal, go to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🧠 ML and Sentiment Analysis

### DistilBERT Model

The application uses the distilbert-base-uncased-finetuned-sst-2-english model from Hugging Face's Transformers library. This model:

*   Is a lightweight, distilled version of BERT (40% smaller, 60% faster)
*   Was specifically fine-tuned on the Stanford Sentiment Treebank (SST-2) dataset
*   Provides binary sentiment classification (positive/negative)
*   Balances efficiency and accuracy for real-time applications

### Sentiment Analysis Process

1.  Reviews are fetched from the Google Play Store
2.  Each review is processed through the DistilBERT model using the Transformers pipeline
3.  The pipeline returns sentiment labels (POSITIVE/NEGATIVE) with confidence scores
4.  Positive sentiment scores remain positive, while negative scores are converted to negative values
5.  Results are aggregated to generate insights
6.  Key statistics and sample reviews are returned to the frontend

### Performance Optimization

The sentiment analysis implementation includes:

  *   *Concurrent Processing*: Uses asyncio for parallel review processing
  *   *Rate Limiting*: Controls the number of model inferences per time period (10 calls per second)
  *   *Resource Management*: Limits maximum concurrent workers (5) to prevent memory issues
  *   *Efficient Threading*: Utilizes [asyncio.to\_thread](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) for non-blocking model inference

## 📱 API Endpoints

The backend exposes the following API endpoints:

*   GET /search-apps/{query}: Search for apps by name
  *   POST /analyze: Analyze reviews for a given app

## 💻 UI Components

The frontend uses several custom components:

*   SearchAppForm: App search with autocomplete
*   Loader: Loading indicator with animations
*   AnalysisResult: Displays sentiment analysis results
*   Navbar: Navigation with theme toggle

## 🔄 Implementation Details

### Review Fetching

* *   Fetches the 100 most recent reviews from the Google Play Store
* *   Uses the google-play-scraper library which is an unofficial API
* *   Handles rate limiting and errors

### Async Processing

* *   Reviews are processed concurrently using async/await
* *   Processing is done with controlled concurrency (maximum 5 simultaneous inferences)
* *   Rate limiting ensures system stability (maximum 10 calls per second)

### Responsive Design

* *   Mobile-first approach with Tailwind CSS
* *   Adaptive layout using responsive breakpoints
* *   Interactive elements optimized for touch screens
