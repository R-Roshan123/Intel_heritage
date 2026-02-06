import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_STATS, RECENT_ARTIFACTS, STORAGE_DATA } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-primary">Mission Control</h1>
        <p className="text-muted-foreground">Overview of archaeological data processing and recent discoveries.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {MOCK_STATS.map((stat) => (
          <Card key={stat.label} className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500" />}
                <span className={stat.trend === "up" ? "text-emerald-600 font-medium" : "text-slate-500"}>
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Data Compression Efficiency</CardTitle>
            <CardDescription>
              Comparison of Raw vs Compressed storage usage (TB)
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={STORAGE_DATA}>
                  <defs>
                    <linearGradient id="colorRaw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCompressed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}TB`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#1e293b' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="raw" 
                    stroke="#94a3b8" 
                    fillOpacity={1} 
                    fill="url(#colorRaw)" 
                    name="Raw Data"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="compressed" 
                    stroke="#d97706" 
                    fillOpacity={1} 
                    fill="url(#colorCompressed)" 
                    name="Compressed"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Findings</CardTitle>
            <CardDescription>
              Latest artifacts processed by the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {RECENT_ARTIFACTS.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-4 group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0 group-hover:border-amber-500/50 group-hover:bg-amber-50 transition-colors">
                    <Activity className="h-5 w-5 text-slate-500 group-hover:text-amber-600" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        {item.confidence_score}% Conf.
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="flex gap-2 pt-1">
                      <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 px-1.5 rounded">{item.era}</span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 px-1.5 rounded">{item.type}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/search">
                <Button variant="outline" className="w-full text-xs" size="sm">
                  View All Findings <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
