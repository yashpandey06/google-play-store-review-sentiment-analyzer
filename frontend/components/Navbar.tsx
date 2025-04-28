import Link from 'next/link';
import { BarChart3, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 max-w-5xl mx-auto">
        <div className="flex gap-2 items-center mr-4">
          <BarChart3 className="h-6 w-6 text-primary" />
          <Link 
            href="/" 
            className="flex items-center text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          >
            PlayStore Analyzer
          </Link>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {/* Navigation items removed as requested */}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex"
            onClick={() => window.open('https://github.com/yashpandey06/google-play-store-review-sentiment-analyzer', '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            View Code
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}