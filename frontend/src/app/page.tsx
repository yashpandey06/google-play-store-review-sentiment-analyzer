"use client"

import { AppSearch } from "@/components/AppSearch"
import { AnalysisResults } from "@/components/AnalysisResults"
import { useAnalysis } from "@/hooks/useAnalysis"

export default function Home() {
  const { isLoading, result, error, analyzeAppReviews } = useAnalysis()

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Google Play Store Review Sentiment Analyzer</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter an app name to analyze the sentiment of its recent reviews
        </p>

        <AppSearch onSearch={analyzeAppReviews} isLoading={isLoading} error={error} />

        {result && <AnalysisResults result={result} />}
      </div>
    </main>
  )
}
