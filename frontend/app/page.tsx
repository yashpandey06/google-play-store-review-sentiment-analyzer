'use client';
import { useState } from 'react';

import { AnalysisResponse } from '@/types';
import AnalysisResult from '@/components/AnalysisResult';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import SearchAppForm from '@/components/SearchAppForm';
import { analyzeApp } from '@/lib/api';
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
    <>
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Play Store Sentiment Analyzer</h1>
      <SearchAppForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {data && <AnalysisResult data={data} />}
    </>
  );
}