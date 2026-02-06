import { LucideIcon, Pickaxe, Scroll, Search, Upload, BarChart3, Clock, Database, Map } from "lucide-react";

export interface Artifact {
  id: string;
  title: string;
  type: "Pottery" | "Weapon" | "Tool" | "Structure" | "Text" | "Jewelry";
  era: string;
  year_approx: number;
  location: string;
  coordinates: [number, number];
  summary: string;
  full_text_snippet: string;
  cultural_significance: string;
  confidence_score: number;
  image_url?: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export const MOCK_STATS: Stat[] = [
  { label: "Reports Processed", value: "1,248", change: "+12% this month", trend: "up", icon: Scroll },
  { label: "Data Compressed", value: "840 GB", change: "Saved 65% storage", trend: "up", icon: Database },
  { label: "Entities Indexed", value: "14,392", change: "+850 new", trend: "up", icon: Search },
  { label: "Research Hours Saved", value: "~420h", change: "Estimated", trend: "up", icon: Clock },
];

export const RECENT_ARTIFACTS: Artifact[] = [
  {
    id: "A-2024-001",
    title: "Amphora Frag. #442",
    type: "Pottery",
    era: "Late Bronze Age",
    year_approx: -1200,
    location: "Mycenae, Greece",
    coordinates: [37.7308, 22.7561],
    summary: "Storage vessel fragment indicating olive oil trade with Egypt. Clay composition matches local Argolid soil.",
    full_text_snippet: "The shard exhibits distinct Mycenaean styling with characteristic stirrup-jar handles. Residue analysis confirms traces of olea europaea (olive oil). The clay fabric is reddish-yellow (5YR 6/6) with fine inclusions...",
    cultural_significance: "Trade Network Evidence",
    confidence_score: 98,
  },
  {
    id: "A-2024-002",
    title: "Linear B Tablet 12",
    type: "Text",
    era: "Mycenaean",
    year_approx: -1350,
    location: "Pylos, Greece",
    coordinates: [37.0264, 21.6961],
    summary: "Administrative record listing sheep and wool production quotas for the palace workshops.",
    full_text_snippet: "Tablet PY An 12. Obverse: 'The Palace to the herders... 50 units of wool... 200 sheep...' This tablet correlates with the taxation records found in Room 8.",
    cultural_significance: "Economic Administration",
    confidence_score: 92,
  },
  {
    id: "A-2024-003",
    title: "Bronze Dagger Blade",
    type: "Weapon",
    era: "Middle Bronze Age",
    year_approx: -1600,
    location: "Crete, Greece",
    coordinates: [35.2985, 25.1632],
    summary: "Ceremonial dagger with gold inlay. Likely Minoan craftsmanship showing Egyptian influence.",
    full_text_snippet: "Blade measures 22cm. Oxidation is heavy but gold inlay remains visible. The motif depicts a lion hunt, a common theme in high-status Minoan weaponry...",
    cultural_significance: "Elite Burial Goods",
    confidence_score: 89,
  },
  {
    id: "A-2024-004",
    title: "Obsidian Core",
    type: "Tool",
    era: "Neolithic",
    year_approx: -4500,
    location: "Cyclades",
    coordinates: [37.0625, 25.1500],
    summary: "Sourced from Melos, found on Naxos. Demonstrates early maritime resource transport.",
    full_text_snippet: "Core exhibits pressure flaking typical of the late Neolithic. Chemical signature matches the Sta Nychia quarry on Melos...",
    cultural_significance: "Maritime Technology",
    confidence_score: 95,
  },
];

export const STORAGE_DATA = [
  { name: 'Jan', raw: 400, compressed: 120 },
  { name: 'Feb', raw: 300, compressed: 90 },
  { name: 'Mar', raw: 550, compressed: 160 },
  { name: 'Apr', raw: 480, compressed: 140 },
  { name: 'May', raw: 620, compressed: 180 },
  { name: 'Jun', raw: 750, compressed: 210 },
];
