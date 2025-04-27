"use client"

import { useState } from "react"
import type { AnalysisResult } from "@/types"
import { analyzeApp } from "@/services/api"

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeAppReviews = async (appName: string) => {
    if (!appName.trim()) {
      setError("Please enter an app name")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeApp(appName)
      setResult(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    result,
    error,
    analyzeAppReviews,
  }
}
