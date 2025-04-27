'use client';

import { useState, useEffect } from 'react';
import { AppInfo } from '@/types';
import { searchApps } from '@/lib/api';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

interface Props { onSearch: (appName: string) => void; }
export default function SearchAppForm({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AppInfo[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSuggestions(await searchApps(query));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(query);
      }}
      className="space-y-2"
    >
      <Command>
        <CommandInput
          placeholder="Enter app name..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {suggestions.map(app => (
            <CommandItem
              key={app.appId}
              value={app.title}
              onSelect={value => {
                setQuery(value);
                onSearch(value);
              }}
            >
              {app.title}
            </CommandItem>
          ))}
        </CommandList>
      </Command>

      <Button type="submit">Analyze</Button>
    </form>
  );
}
