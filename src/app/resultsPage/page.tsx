"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowLeft, GitBranch, Users, Calendar, TrendingUp, Code, FileText, Activity } from "lucide-react"
import Link from "next/link"

// Sample data from the AI analysis
const analysisData = {
  repository: {
    owner: "fetchai",
    name: "asi-alliance-wallet",
    url: "https://github.com/fetchai/asi-alliance-wallet",
  },
  analysis_date: "2025-09-27T06:08:56.222277",
  graph_data: {
    line_changes_map: [
      { date: "2024-06-28", additions: 1, deletions: 3, total: 4 },
      { date: "2024-07-02", additions: 7770, deletions: 193, total: 7963 },
      { date: "2024-07-03", additions: 1886, deletions: 715, total: 2601 },
      { date: "2024-07-08", additions: 64292, deletions: 16623, total: 80915 },
      { date: "2024-07-10", additions: 448, deletions: 156, total: 604 },
      { date: "2024-07-19", additions: 679, deletions: 586, total: 1265 },
      { date: "2024-07-20", additions: 1045, deletions: 283, total: 1328 },
      { date: "2024-08-12", additions: 2995, deletions: 2139, total: 5134 },
      { date: "2024-08-14", additions: 103, deletions: 6, total: 109 },
      { date: "2024-08-19", additions: 146, deletions: 62, total: 208 },
      { date: "2024-08-20", additions: 1381, deletions: 69, total: 1450 },
      { date: "2024-08-21", additions: 153, deletions: 19, total: 172 },
      { date: "2024-08-28", additions: 65862, deletions: 9, total: 65871 },
      { date: "2024-09-02", additions: 113, deletions: 3, total: 116 },
      { date: "2024-09-05", additions: 954, deletions: 300, total: 1254 },
      { date: "2024-09-11", additions: 1018, deletions: 943, total: 1961 },
      { date: "2024-09-13", additions: 308, deletions: 8, total: 316 },
      { date: "2024-09-18", additions: 645, deletions: 201, total: 846 },
    ],
    contributor_map: [
      { user: "Thunnini", percentage: 22.77, commits: 23 },
      { user: "agent-dominatrix", percentage: 12.49, commits: 12 },
      { user: "sh-wallet", percentage: 10.61, commits: 11 },
      { user: "AbbasAliLokhandwala", percentage: 6.25, commits: 6 },
      { user: "delivan", percentage: 5.7, commits: 6 },
      { user: "HeesungB", percentage: 5.49, commits: 5 },
      { user: "dependabot[bot]", percentage: 5.49, commits: 5 },
      { user: "imvinay84", percentage: 3.31, commits: 3 },
      { user: "dimiandre", percentage: 3.28, commits: 3 },
      { user: "blacktoast", percentage: 3.28, commits: 3 },
    ],
  },
  metadata: {
    total_commits: 100,
    analyzed_commits: 10,
    total_contributors: 51,
    hackathon_period: {
      start: "2025-09-25T00:00:00+00:00",
      end: "2025-09-27T23:59:59+00:00",
    },
    commit_timing: {
      before_hackathon: 100,
      during_hackathon: 0,
      after_hackathon: 0,
    },
  },
}

const COLORS = ["#6B5FFF", "#4D8AFF", "#FF64F9", "#5BFF89", "#FFD700", "#FF6D1B", "#FF6565"]

export default function ResultsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const commitActivityData = analysisData.graph_data.line_changes_map.map((item) => ({
    ...item,
    month: new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
  }))

  const contributorPieData = analysisData.graph_data.contributor_map.slice(0, 8).map((contributor, index) => ({
    name: contributor.user,
    value: contributor.percentage,
    commits: contributor.commits,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 ${isVisible ? "slide-up" : ""}`}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/analyze">
                <Button variant="ghost" size="sm" className="hover:bg-slate-800/50 text-slate-300">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analysis
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                <h1 className="text-2xl font-bold text-balance text-white">Repository Analysis Report</h1>
                <p className="text-sm text-slate-400">
                  {analysisData.repository.owner}/{analysisData.repository.name}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-400 text-blue-400 bg-blue-500/10">
              Analysis Complete
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="floating-card bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Total Commits</p>
                  <p className="text-3xl font-bold text-purple-300">{analysisData.metadata.total_commits}</p>
                </div>
                <GitBranch className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Contributors</p>
                  <p className="text-3xl font-bold text-blue-300">{analysisData.metadata.total_contributors}</p>
                </div>
                <Users className="w-8 h-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Analysis Date</p>
                  <p className="text-lg font-bold text-green-300">
                    {new Date(analysisData.analysis_date).toLocaleDateString()}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commit Activity Timeline */}
          <Card
            className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm hover:border-purple-400/50 hover:bg-slate-800/80"
            onMouseEnter={() => setActiveCard("commits")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Activity className="w-5 h-5 text-purple-400" />
                <span>Commit Activity Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={commitActivityData}>
                  <defs>
                    <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B5FFF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6B5FFF" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#6B5FFF"
                    fillOpacity={1}
                    fill="url(#commitGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Contributor Distribution */}
          <Card
            className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm hover:border-blue-400/50 hover:bg-slate-800/80"
            onMouseEnter={() => setActiveCard("contributors")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Users className="w-5 h-5 text-blue-400" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={contributorPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {contributorPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value.toFixed(1)}% (${props.payload.commits} commits)`,
                      props.payload.name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Code Changes Analysis */}
          <Card
            className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm hover:border-green-400/50 hover:bg-slate-800/80"
            onMouseEnter={() => setActiveCard("changes")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Code className="w-5 h-5 text-green-400" />
                <span>Additions vs Deletions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={commitActivityData.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                      color: "#F1F5F9",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="additions" fill="#5BFF89" name="Additions" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="deletions" fill="#FF6565" name="Deletions" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Timeline Analysis */}
          <Card className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm hover:border-cyan-400/50 hover:bg-slate-800/80">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Timeline Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-2xl font-bold text-red-400">
                    {analysisData.metadata.commit_timing.before_hackathon}
                  </p>
                  <p className="text-xs text-slate-300">Before Hackathon</p>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-2xl font-bold text-green-400">
                    {analysisData.metadata.commit_timing.during_hackathon}
                  </p>
                  <p className="text-xs text-slate-300">During Hackathon</p>
                </div>
              </div>
              <div className="space-y-2 p-4 bg-slate-700/30 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Hackathon Period:</span>
                </div>
                <div className="text-xs text-slate-400">
                  <p>Start: {new Date(analysisData.metadata.hackathon_period.start).toLocaleDateString()}</p>
                  <p>End: {new Date(analysisData.metadata.hackathon_period.end).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Repository Statistics */}
        <Card className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Repository Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <p className="text-2xl font-bold text-purple-300">{analysisData.metadata.total_commits}</p>
                <p className="text-sm text-slate-300">Total Commits</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-2xl font-bold text-blue-300">{analysisData.metadata.analyzed_commits}</p>
                <p className="text-sm text-slate-300">Analyzed Commits</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-2xl font-bold text-green-300">{analysisData.metadata.total_contributors}</p>
                <p className="text-sm text-slate-300">Contributors</p>
              </div>
              <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <p className="text-2xl font-bold text-cyan-300">
                  {new Date(analysisData.analysis_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-300">Analysis Date</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Section */}
        <Card className="floating-card bg-slate-800/60 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Analysis Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <h4 className="text-lg font-medium mb-4 text-white">Key Insights:</h4>
                <ul className="text-slate-300 space-y-2">
                  <li>
                    • Repository shows consistent development activity with {analysisData.metadata.total_commits} total
                    commits
                  </li>
                  <li>
                    • Strong contributor diversity with {analysisData.metadata.total_contributors} contributors
                    participating
                  </li>
                  <li>• Major development phases visible in commit timeline with significant code additions</li>
                  <li>• Active development period shows collaborative team effort</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
