export interface AppRequest { appName: string; }
export interface ReviewSentiment { review_text: string; sentiment_score: number; }
export interface AnalysisResponse { average_sentiment: number; reviews_analyzed: number; sample_reviews: ReviewSentiment[]; }
export interface AppInfo {
  developer: any; appId: string; title: string; 
}