import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { AnalysisResult } from "@/types"
import { getSentimentColor, getSentimentLabel } from "@/utils/sentiment"

interface AnalysisResultsProps {
  result: AnalysisResult
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
        <CardDescription>Analyzed {result.reviews_analyzed} reviews from the Google Play Store</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Average Sentiment Score</span>
            <span className="text-sm font-medium">{(result.average_sentiment * 100).toFixed(1)}%</span>
          </div>
          <Progress value={result.average_sentiment * 100} className={getSentimentColor(result.average_sentiment)} />
          <div className="flex justify-center mt-2">
            <Badge className={`${getSentimentColor(result.average_sentiment)} text-white`}>
              {getSentimentLabel(result.average_sentiment)}
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Sample Reviews</h3>
          <div className="space-y-3">
            {result.sample_reviews.map((review, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <Badge className={`${getSentimentColor(review.sentiment_score)} text-white`}>
                    {getSentimentLabel(review.sentiment_score)}
                  </Badge>
                  <span className="text-sm text-gray-500">Score: {(review.sentiment_score * 100).toFixed(1)}%</span>
                </div>
                <p className="text-sm text-gray-700">{review.review_text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">Sentiment analysis performed using Google Gemini</CardFooter>
    </Card>
  )
}
