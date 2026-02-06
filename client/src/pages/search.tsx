import Layout from "@/components/layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RECENT_ARTIFACTS, Artifact } from "@/lib/mockData";
import { Search as SearchIcon, Filter, MapPin, Calendar, Tag, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const eras = ["Bronze Age", "Iron Age", "Neolithic", "Mycenaean", "Roman"];
  const types = ["Pottery", "Weapon", "Text", "Tool", "Structure"];

  const filteredArtifacts = RECENT_ARTIFACTS.filter(a => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase()) || 
                         a.summary.toLowerCase().includes(query.toLowerCase());
    const matchesEra = selectedEra ? a.era.includes(selectedEra) : true;
    const matchesType = selectedType ? a.type === selectedType : true;
    return matchesQuery && matchesEra && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Research Database</h1>
            <p className="text-muted-foreground">Search through compressed archaeological records.</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2">
               <MapPin className="h-4 w-4" /> Map View
             </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-10 h-12 text-lg bg-card shadow-sm border-slate-200" 
            placeholder="Search by keywords, location, or artifact ID..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center pb-4 border-b">
          <div className="flex items-center gap-2 mr-4 text-sm font-medium text-slate-500">
            <Filter className="h-4 w-4" /> Filters:
          </div>
          
          {eras.map(era => (
            <Badge 
              key={era} 
              variant={selectedEra === era ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => setSelectedEra(selectedEra === era ? null : era)}
            >
              {era}
            </Badge>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-2" />
          {types.map(type => (
            <Badge 
              key={type} 
              variant={selectedType === type ? "secondary" : "outline"}
              className="cursor-pointer px-3 py-1 hover:bg-slate-100"
              onClick={() => setSelectedType(selectedType === type ? null : type)}
            >
              {type}
            </Badge>
          ))}
        </div>

        {/* Results */}
        <div className="grid gap-4">
          {filteredArtifacts.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No records found matching your criteria.</p>
            </div>
          ) : (
            filteredArtifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  return (
    <Link href={`/insight/${artifact.id}`}>
      <Card className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-amber-500">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-24 w-24 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center border border-slate-200 self-start">
              <Tag className="h-8 w-8 text-slate-400 group-hover:text-amber-500 transition-colors" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {artifact.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {artifact.era} (~{Math.abs(artifact.year_approx)} BCE)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {artifact.location}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Processed
                </Badge>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {artifact.summary}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                  {artifact.cultural_significance}
                </span>
                <span className="text-xs text-slate-400">ID: {artifact.id}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:border-l pl-4">
              <ChevronRight className="h-6 w-6 text-slate-300 group-hover:text-amber-500 transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
