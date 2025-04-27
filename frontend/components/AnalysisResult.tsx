
// components/AnalysisResult.tsx
import { AnalysisResponse } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
interface Props { data: AnalysisResponse; }
export default function AnalysisResult({ data }: Props) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Average Sentiment: <strong>{data.average_sentiment.toFixed(2)}</strong></p>
        <p>Reviews Analyzed: <strong>{data.reviews_analyzed}</strong></p>
        <ul className="mt-4 space-y-2">
          {data.sample_reviews.map((r, i) => (
            <li key={i} className="border p-2 rounded">
              <p className="italic">"{r.review_text}"</p>
              <p className="text-sm">Score: {r.sentiment_score.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
