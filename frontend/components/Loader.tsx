export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 animate-[spin_1.5s_cubic-bezier(0.45,0,0.55,1)_infinite]"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-[spin_1s_cubic-bezier(0.45,0,0.55,1)_infinite]"></div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Analyzing app reviews...</p>
    </div>
  );
}