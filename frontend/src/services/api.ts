import type { AppSuggestion, AnalysisResult } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function searchApps(query: string): Promise<AppSuggestion[]> {
  if (query.length < 2) {
    return []
  }

  try {
    const response = await fetch(`${API_URL}/search-apps/${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error("Failed to fetch app suggestions")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching suggestions:", error)
    return []
  }
}

export async function analyzeApp(appName: string): Promise<AnalysisResult> {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appName }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || "Failed to analyze app reviews")
  }

  return data
}
