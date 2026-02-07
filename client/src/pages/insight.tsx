import Layout from "@/components/layout";
import { useParams, useLocation } from "wouter";
import { RECENT_ARTIFACTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Share2, Download, ExternalLink, Network, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function InsightPage() {
  const [location, setLocation] = useLocation();
  // Simple extraction of ID from URL if params doesn't work directly (wouter fallback)
  const id = location.split('/').pop(); 
  
  const artifact = RECENT_ARTIFACTS.find(a => a.id === id);
  const [viewMode, setViewMode] = useState<"summary" | "full">("summary");

  if (!artifact) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Artifact Not Found</h2>
          <Button variant="link" onClick={() => setLocation('/search')}>Return to Search</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation('/search')} className="pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export JSON</Button>
          </div>
        </div>

        {/* Title Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">{artifact.type}</Badge>
                <Badge variant="outline">{artifact.era}</Badge>
              </div>
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">{artifact.title}</h1>
              <p className="text-slate-500 flex items-center gap-2">
                <span className="font-semibold text-slate-700">{artifact.location}</span> • Found: 2024
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">{artifact.confidence_score}%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Confidence Score</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Toggle Switch */}
            <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              <button 
                onClick={() => setViewMode("summary")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
                  viewMode === "summary" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <Sparkles className="h-4 w-4 text-amber-500" /> AI Summary
              </button>
              <button 
                onClick={() => setViewMode("full")}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2",
                  viewMode === "full" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
                )}
              >
                <FileText className="h-4 w-4" /> Full Text
              </button>
            </div>

            <Card className="min-h-[300px]">
              <CardContent className="p-8">
                {viewMode === "summary" ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h3 className="font-serif font-bold text-xl mb-4 text-slate-800">Key Insights</h3>
                    <p className="text-lg leading-relaxed text-slate-700 mb-6">
                      {artifact.summary}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase">Cultural Significance</span>
                        <p className="text-slate-900 font-medium mt-1">{artifact.cultural_significance}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase">Approximate Date</span>
                        <p className="text-slate-900 font-medium mt-1">{Math.abs(artifact.year_approx)} BCE</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                     <h3 className="font-serif font-bold text-xl mb-4 text-slate-800">Extracted Text</h3>
                     <p className="font-mono text-sm leading-relaxed text-slate-600 bg-slate-50 p-6 rounded-lg border border-slate-100">
                       {artifact.full_text_snippet}
                     </p>
                     <div className="mt-4 text-xs text-slate-400 text-right">
                       Extracted from: excavation_report_2024_Q1.pdf (Page 42)
                     </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Knowledge Graph Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-500" /> Related Entities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Mycenaean Civilization", "Late Bronze Age Collapse", "Linear B", "Pylos Archives", "Mediterranean Trade"].map(tag => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 cursor-pointer">
                      {tag} <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Metadata */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-500">Accession No.</span>
                  <span className="font-mono">{artifact.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-500">Excavator</span>
                  <span>Team Alpha</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-500">Storage</span>
                  <span>Zone B-12</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">Last Updated</span>
                  <span>2 days ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
