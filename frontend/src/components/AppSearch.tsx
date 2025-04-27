"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAppSearch } from "@/hooks/useAppSearch"
import type { AppSuggestion } from "@/types"

interface AppSearchProps {
  onSearch: (appName: string) => void
  isLoading: boolean
  error: string | null
}

export function AppSearch({ onSearch, isLoading, error }: AppSearchProps) {
  const { appName, suggestions, open, setOpen, handleInputChange, handleSelectApp } = useAppSearch()

  const handleSearch = () => {
    onSearch(appName)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>App Search</CardTitle>
        <CardDescription>Enter the name of a Google Play Store app to analyze its reviews</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="flex-1">
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {appName || "Search for an app..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search apps..." value={appName} onValueChange={handleInputChange} />
                <CommandList>
                  <CommandEmpty>No apps found</CommandEmpty>
                  <CommandGroup>
                    {suggestions.map((app: AppSuggestion) => (
                      <CommandItem key={app.appId} onSelect={() => handleSelectApp(app)}>
                        {app.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  )
}
