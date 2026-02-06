import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "../assets/hero-archaeology.png";
import { ArrowRight, Database, Search, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-amber-500 rounded-md flex items-center justify-center">
              <span className="font-serif font-bold text-white text-lg">C</span>
            </div>
            <span className="font-serif font-bold text-xl text-white tracking-tight">Chronos</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <Button variant="secondary" className="font-medium">
                Researcher Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex-1 min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Archaeological Site" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/70 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-200 text-sm font-medium backdrop-blur-sm animate-in fade-in zoom-in duration-1000 delay-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Intel Optimized Architecture
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-in slide-in-from-bottom-8 duration-1000 delay-200">
            Uncover History with <br/>
            <span className="text-amber-500">Intelligent Compression</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            A next-generation platform for cultural heritage researchers. 
            Compress gigabytes of archaeological reports into structured, searchable insights using advanced NLP.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link href="/dashboard">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-medium h-12 px-8 text-lg rounded-full shadow-lg shadow-amber-900/20 transition-all hover:scale-105">
                Access Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 h-12 px-8 text-lg rounded-full backdrop-blur-sm">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-950 py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
              <Database className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Smart Compression</h3>
            <p className="text-slate-400 leading-relaxed">
              Reduce storage costs by 80% while preserving critical historical context through semantic extraction.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-amber-900/30 rounded-lg flex items-center justify-center border border-amber-500/20">
              <Search className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Contextual Search</h3>
            <p className="text-slate-400 leading-relaxed">
              Find connections between artifacts, eras, and locations instantly using our knowledge graph engine.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 bg-emerald-900/30 rounded-lg flex items-center justify-center border border-emerald-500/20">
              <Zap className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">High Performance</h3>
            <p className="text-slate-400 leading-relaxed">
              Built on optimized infrastructure for blazing fast queries across massive archaeological datasets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
