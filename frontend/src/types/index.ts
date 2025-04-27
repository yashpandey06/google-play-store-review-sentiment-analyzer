export interface AppSuggestion {
  appId: string
  title: string
}

export interface ReviewSentiment {
  review_text: string
  sentiment_score: number
}

export interface AnalysisResult {
  average_sentiment: number
  reviews_analyzed: number
  sample_reviews: ReviewSentiment[]
}
