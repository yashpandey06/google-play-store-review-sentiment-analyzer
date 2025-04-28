import { AnalysisResponse } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter
} from './ui/card';
import { Badge } from './ui/badge';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';

interface Props { 
  data: AnalysisResponse; 
}

export default function AnalysisResult({ data }: Props) {
  // Helper function to determine sentiment color
  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return "text-green-500 dark:text-green-400";
    if (score >= 0.4) return "text-emerald-500 dark:text-emerald-400";
    if (score >= 0) return "text-blue-500 dark:text-blue-400";
    if (score >= -0.4) return "text-amber-500 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  // Helper function to get sentiment label
  const getSentimentLabel = (score: number) => {
    if (score >= 0.7) return "Very Positive";
    if (score >= 0.4) return "Positive";
    if (score >= -0.1) return "Neutral";
    if (score >= -0.4) return "Negative";
    return "Very Negative";
  };

  const averageScoreColor = getSentimentColor(data.average_sentiment);
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="pb-2 border-b border-border/20 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Analysis Results</CardTitle>
              <CardDescription>
                Sentiment analysis based on {data.reviews_analyzed} user reviews
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-base px-4 py-1.5 shadow-sm border border-primary/20">
              <span className={`font-semibold ${averageScoreColor}`}>
                {getSentimentLabel(data.average_sentiment)}
              </span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center justify-center p-4 border border-border/20 rounded-lg shadow-sm bg-card">
              <div className={`text-3xl font-bold mb-2 ${averageScoreColor}`}>
                {data.average_sentiment.toFixed(2)}
              </div>
              <div className="text-muted-foreground text-sm">Average Sentiment Score</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 border border-border/20 rounded-lg shadow-sm bg-card">
              <div className="text-3xl font-bold mb-2 text-primary">
                {data.reviews_analyzed}
              </div>
              <div className="text-muted-foreground text-sm">Reviews Analyzed</div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border border-border/20 rounded-lg shadow-sm bg-card">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="h-5 w-5 text-green-500" />
                  <span className="text-xl font-semibold">{Math.round(data.average_sentiment > 0 ? data.average_sentiment * 100 : 0)}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ThumbsDown className="h-5 w-5 text-red-500" />
                  <span className="text-xl font-semibold">{Math.round(data.average_sentiment < 0 ? Math.abs(data.average_sentiment) * 100 : 0)}%</span>
                </div>
              </div>
              <div className="text-muted-foreground text-sm">Sentiment Distribution</div>
            </div>
          </div>
          
       
        </CardContent>
        
        <CardFooter className="border-t border-border/20 text-sm text-muted-foreground">
          Analysis powered by PlayStore Sentiment Analyzer
        </CardFooter>
      </Card>
    </div>
  );
}