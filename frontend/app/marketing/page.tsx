'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Github
} from 'lucide-react';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleTheme = () => {
    if (mounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex gap-2 items-center">
            <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="font-semibold text-base sm:text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              PlayStore Analyzer
            </span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </nav>
            
            {/* Theme toggle button */}
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
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/30">
            <nav className="container flex flex-col px-4 py-4 space-y-4">
              <Link 
                href="#features" 
                className="text-sm font-medium p-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">Toggle theme</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  {mounted && theme === 'dark' ? (
                    <Sun className="h-[1.2rem] w-[1.2rem]" />
                  ) : (
                    <Moon className="h-[1.2rem] w-[1.2rem]" />
                  )}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 relative">
        <div className="absolute inset-0 bg-grid-white/10 bg-[length:40px_40px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/50 to-background" />
        
        <div className="container relative z-10 px-4 max-w-7xl mx-auto">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
              Transform App Reviews into Actionable Insights
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2">
              Our advanced sentiment analysis turns thousands of Play Store reviews into clear, 
              data-driven insights to help you build better apps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
              <Button 
                size="lg" 
                onClick={() => router.push('/app')}
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 rounded-xl w-full sm:w-auto"
              >
                Get Started <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-primary/20 hover:bg-primary/5 w-full sm:w-auto"
                onClick={() => window.open('https://github.com/yashpandey06/google-play-store-review-sentiment-analyzer', '_blank')}
              >
                <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> View Code
              </Button>
            </div>
          </motion.div>
          
          {/* Dashboard Preview */}
          <motion.div 
            className="mt-12 sm:mt-16 relative px-2 sm:px-0"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl opacity-30" />
            <div className="relative bg-black/80 border border-white/10 p-1 sm:p-2 md:p-4 rounded-2xl shadow-2xl">
              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-white/10">
                <div className="w-full h-full bg-gradient-to-br from-background to-background/95 p-2 sm:p-4">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm sm:text-base">Sentiment Analysis</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">App Review Insights</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 sm:h-8 w-16 sm:w-24 bg-background/80 rounded-md hidden sm:block" />
                      <div className="h-6 sm:h-8 w-12 sm:w-16 bg-primary/20 rounded-md" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-background/60 p-2 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">Positive Reviews</div>
                      <div className="text-lg sm:text-2xl font-bold text-green-500">78%</div>
                    </div>
                    <div className="bg-background/60 p-2 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">Negative Reviews</div>
                      <div className="text-lg sm:text-2xl font-bold text-red-500">14%</div>
                    </div>
                    <div className="bg-background/60 p-2 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-1">Neutral Reviews</div>
                      <div className="text-lg sm:text-2xl font-bold text-blue-500">8%</div>
                    </div>
                  </div>
                  <div className="h-24 sm:h-36 md:h-48 bg-background/50 rounded-lg mb-2 sm:mb-4 overflow-hidden">
                    <div className="h-full w-full flex items-end justify-around px-2 sm:px-6">
                      <div className="w-[5%] h-[25%] bg-primary/20 rounded-t-md" />
                      <div className="w-[5%] h-[45%] bg-primary/40 rounded-t-md" />
                      <div className="w-[5%] h-[65%] bg-primary/60 rounded-t-md" />
                      <div className="w-[5%] h-[85%] bg-primary/80 rounded-t-md" />
                      <div className="w-[5%] h-[75%] bg-primary/70 rounded-t-md" />
                      <div className="w-[5%] h-[55%] bg-primary/50 rounded-t-md" />
                      <div className="w-[5%] h-[35%] bg-primary/30 rounded-t-md" />
                      <div className="w-[5%] h-[25%] bg-primary/20 rounded-t-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Powerful Analytics Features</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Our platform offers comprehensive tools to understand your app's performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-md h-full bg-gradient-to-b from-card to-card/95 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground flex-grow">{feature.description}</p>
                    <div className="mt-4 pt-3 sm:pt-4 border-t border-border/20">
                      <Link href="#" className="text-sm text-primary font-medium flex items-center">
                        Learn more <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Understand Your Users?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">
              Start analyzing app reviews today and make data-driven decisions for your app
            </p>
            <Button 
              size="lg" 
              onClick={() => router.push('/app')}
              className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 w-full sm:w-auto"
            >
              Get Started Now <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 sm:py-12 border-t border-border/20">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="font-semibold text-sm sm:text-base">PlayStore Analyzer</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Powerful sentiment analysis for app developers
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-4">Resources</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="https://github.com/yashpandey06/google-play-store-review-sentiment-analyzer" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub Repository</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-4">Legal</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/10 text-xs sm:text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} PlayStore Analyzer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Features array remains unchanged
const features = [
  {
    title: "Sentiment Analysis",
    description: "Analyze thousands of reviews to understand user sentiment with advanced AI.",
    icon: <TrendingUp className="h-6 w-6 text-primary" />
  },
  {
    title: "Review Insights",
    description: "Extract key feedback points and categorize them automatically by topic.",
    icon: <MessageSquare className="h-6 w-6 text-primary" />
  },
  {
    title: "Competitor Analysis",
    description: "Compare your app's sentiment against competitors to gain market insights.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />
  },
];