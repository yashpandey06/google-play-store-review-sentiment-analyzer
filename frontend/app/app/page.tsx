'use client';
import { useState } from 'react';

import { AnalysisResponse } from '@/types';
import AnalysisResult from '@/components/AnalysisResult';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import SearchAppForm from '@/components/SearchAppForm';
import { analyzeApp } from '@/lib/api';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (appName: string) => {
    setError(null);
    setData(null);
    setLoading(true);
    try {
      const res = await analyzeApp(appName);
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Card className="border-none shadow-lg mb-8">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Play Store Sentiment Analyzer
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Analyze app reviews and get comprehensive sentiment insights
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <SearchAppForm onSearch={handleSearch} />
          </CardContent>
        </Card>
        
        <div className="mt-8 space-y-4">
          {loading && (
            <Card className="border-none shadow-md p-6">
              <CardContent className="flex justify-center items-center py-12">
                <Loader />
              </CardContent>
            </Card>
          )}
          
          {error && (
            <Card className="border-none shadow-md bg-destructive/10 border-l-4 border-l-destructive">
              <CardContent className="p-4">
                <p className="text-destructive font-medium">{error}</p>
              </CardContent>
            </Card>
          )}
          
          {data && (
            <div className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
              <AnalysisResult data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}