"use client"

import { useState, useRef } from "react"
import type { AppSuggestion } from "@/types"
import { searchApps } from "@/services/api"

export function useAppSearch() {
  const [appName, setAppName] = useState("")
  const [suggestions, setSuggestions] = useState<AppSuggestion[]>([])
  const [open, setOpen] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = (value: string) => {
    setAppName(value)

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout to debounce API calls
    searchTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(value)
    }, 300)
  }

  const fetchSuggestions = async (query: string) => {
    const results = await searchApps(query)
    setSuggestions(results)
  }

  const handleSelectApp = (app: AppSuggestion) => {
    setAppName(app.title)
    setOpen(false)
  }

  return {
    appName,
    setAppName,
    suggestions,
    open,
    setOpen,
    handleInputChange,
    handleSelectApp,
  }
}
