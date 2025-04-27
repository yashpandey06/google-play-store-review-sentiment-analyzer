// Get sentiment color based on score
export function getSentimentColor(score: number): string {
  if (score < 0.4) return "bg-red-500"
  if (score < 0.6) return "bg-yellow-500"
  return "bg-green-500"
}

// Get sentiment label based on score
export function getSentimentLabel(score: number): string {
  if (score < 0.3) return "Very Negative"
  if (score < 0.4) return "Negative"
  if (score < 0.6) return "Neutral"
  if (score < 0.8) return "Positive"
  return "Very Positive"
}
