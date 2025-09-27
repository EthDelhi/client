"use client"

import { useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ArrowLeft, Github, ExternalLink, GitBranch, Users, Calendar, Award, AlertTriangle, CheckCircle, XCircle, Clock, Shield, Code, FileText, TrendingUp, BarChart3, Activity, Target, Zap, Database } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import type * as THREE from "three"
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"
import { mockData } from "@/src/lib/mock"

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

function InteractiveAnalysisBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mousePosition.x * 0.05
      groupRef.current.rotation.x = mousePosition.y * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere args={[0.5]} position={[-3, 2, -2]}>
          <meshBasicMaterial color="#6B5FFF" transparent opacity={0.3} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <Sphere args={[0.3]} position={[3, -1, -1]}>
          <meshBasicMaterial color="#4D8AFF" transparent opacity={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.4]} position={[0, -2, -3]}>
          <meshBasicMaterial color="#FF64F9" transparent opacity={0.2} />
        </Sphere>
      </Float>
    </group>
  )
}

export default function ReportPage() {
  const [reportData, setReportData] = useState<{
    analysis: typeof mockData;
    additional: typeof mockData;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Get the data from localStorage
    const storedData = localStorage.getItem('reportData');
    if (storedData) {
      setReportData(JSON.parse(storedData));
    }
  }, [])
  const router = useRouter()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  // Chart configurations using actual data
  const data = reportData?.analysis || mockData;
  const summaryInflationChart: ApexOptions = {
    chart: { type: 'radialBar', background: 'transparent' },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: { fontSize: '16px', color: '#6B5FFF' },
          value: { fontSize: '24px', fontWeight: 'bold', color: '#4D8AFF' }
        }
      }
    },
    fill: { colors: ['#EF4444'] },
    labels: ['Trust Score'],
    colors: ['#EF4444']
  }

  const commitTimelineChart: ApexOptions = {
    chart: { 
      type: 'area', 
      background: 'transparent', 
      toolbar: { show: false } 
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#22C55E', '#EF4444'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1
      }
    },
    xaxis: {
      categories: mockData.graph_data.line_changes_map.map(item =>
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      ),
      labels: {
        style: {
          colors: mockData.graph_data.line_changes_map.map(() => '#FFFFFF') // dynamic based on number of categories
        }
      }
    },
    yaxis: {
      labels: { style: { colors: ['#FFFFFF'] } }  // Y-axis labels in white
    },
    grid: { borderColor: '#374151' },
    legend: {
      show: true,
      labels: { colors: '#000' },
      markers: { fillColors: ['#22C55E', '#EF4444'] },
      onItemClick: { toggleDataSeries: true }
    },
    tooltip: {
      theme: "dark", // makes tooltip black with white text
      style: {
        fontSize: '14px',
        fontFamily: 'inherit'
      }
    }
  }


  const contributorChart: ApexOptions = {
    chart: { type: 'pie', background: 'transparent' },
    labels: mockData.graph_data.contributor_map.map(c => c.user),
    colors: ['#6B5FFF', '#4D8AFF', '#FF64F9', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981', '#F97316'],
    stroke: { show: false },
    dataLabels: {
      enabled: false
    },
    legend: { 
      show: true,
      labels: { colors: '#FFFFFF' },
      position: 'right'
    }
  }

  const apiRequiredUsedChart: ApexOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false }  },
    plotOptions: { bar: { horizontal: false, borderRadius: 0 } },
    dataLabels: { enabled: false },
    colors: ['#22C55E', '#EF4444'],
    xaxis: { 
      categories: ['Used APIs', 'Unused APIs'],
      labels: { style: { colors: ['#FFFFFF', '#FFFFFF'] } }  // X-axis labels in white
    },
    yaxis: {
      labels: { style: { colors: ['#FFFFFF'] } }  // Y-axis labels in white
    },
    grid: { borderColor: '#374151' },
    tooltip: { enabled: false }
  }

  const apiNotUsedChart: ApexOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false }  },
    plotOptions: { bar: { horizontal: false, borderRadius: 0 } },
    dataLabels: { enabled: false },
    colors: ['#22C55E', '#EF4444'],
    xaxis: {
      categories: ['Used APIs', 'Unused APIs'],
      labels: { style: { colors: ['#FFFFFF', '#FFFFFF'] } }  // X-axis labels in white
    },
    yaxis: {
      labels: { style: { colors: ['#FFFFFF'] } }  // Y-axis labels in white
    },
    grid: { borderColor: '#374151' },
    tooltip: { enabled: false }
  }

  const apiIntegrationChart: ApexOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false }  },
    plotOptions: { bar: { horizontal: false, borderRadius: 0 } },
    dataLabels: { enabled: false },
    colors: ['#22C55E', '#F59E0B', '#6B7280'],
    xaxis: {
      categories: ['Integrated', 'Not Integrated', 'Test Only'],
      labels: { style: { colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF'] } }
    },
    yaxis: {
      labels: { style: { colors: ['#FFFFFF'] } }  // Y-axis labels in white
    },
    grid: { borderColor: '#374151' },
    tooltip: { enabled: false }
  }

  const commitTimingChart: ApexOptions = {
    chart: { type: 'bar', background: 'transparent', toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, borderRadius: 0 } },
    dataLabels: { enabled: false },
    colors: ['#EF4444', '#22C55E', '#737c8eff'],
    xaxis: {
      categories: ['Before Hackathon', 'During Hackathon', 'After Hackathon'],
      labels: { style: { colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF'] } }
    },
    yaxis: {
      labels: { style: { colors: ['#FFFFFF', '#FFFFFF'] } }
    },
    grid: { borderColor: '#374151' },
    tooltip: { enabled: false }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#6B5FFF" />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4D8AFF" />
          <InteractiveAnalysisBackground mousePosition={mousePosition} />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <Link
          href="/analyze"
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Analysis</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Hackathon Analysis Report</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Project Analysis Results</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Comprehensive analysis of your hackathon project and sponsor integration
          </p>
        </div>

        {/* Row 1: Repository Overview Card */}
        <Card className="mb-8 floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <Github className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {mockData.repository.name}
                  </span>
                  <p className="text-sm text-muted-foreground font-normal mt-1">
                    Last analyzed: {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <Link 
                href={mockData.repository.url}
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Repo</span>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <GitBranch className="w-4 h-4" />
                  <span>Total Commits</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">{mockData.metadata.total_commits}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Contributors</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">{mockData.metadata.total_contributors}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Hackathon Period</span>
                </div>
                <p className="text-2xl font-bold text-cyan-400">3 Days</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Risk Level</span>
                </div>
                <p className={`text-2xl font-bold ${mockData.authenticity_summary.risk_level === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {mockData.authenticity_summary.risk_level}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row 2: Four Numeric Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-purple-400 mb-2">{mockData.metadata.commit_timing.before_hackathon}</h3>
              <p className="text-sm text-muted-foreground">Commits Before Hackathon</p>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-blue-500/10 via-card/30 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-blue-400 mb-2">{mockData.metadata.analyzed_commits}</h3>
              <p className="text-sm text-muted-foreground">Analyzed Commits</p>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-cyan-500/10 via-card/30 to-green-500/10 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30">
                  <Target className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">{Math.round(mockData.authenticity_summary.trust_score * 100)}%</h3>
              <p className="text-sm text-muted-foreground">Trust Score</p>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-green-500/10 via-card/30 to-yellow-500/10 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-green-400 mb-2">{mockData.metadata.commit_timing.during_hackathon}</h3>
              <p className="text-sm text-muted-foreground">Commits During Hackathon</p>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Three Graphs - Timeline, Similarity Inflation, Code Quality */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Commit Timeline
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={commitTimelineChart}
                  series={[
                    { 
                      name: 'Additions', 
                      data: mockData.graph_data.line_changes_map.map(item => item.additions) 
                    },
                    { 
                      name: 'Deletions', 
                      data: mockData.graph_data.line_changes_map.map(item => item.deletions) 
                    }
                  ]}
                  type="area"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-indigo-500/10 via-card/30 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                  <Shield className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Similarity Inflation
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64">
                <ApexChart
                  options={summaryInflationChart}
                  series={[Math.round(mockData.authenticity_summary.trust_score * 100)]}
                  type="radialBar"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-cyan-500/10 via-card/30 to-green-500/10 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Commit Timing Analysis
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={commitTimingChart}
                  series={[
                    { 
                      name: 'Commits', 
                      data: [
                        mockData.metadata.commit_timing.before_hackathon,
                        mockData.metadata.commit_timing.during_hackathon,
                        mockData.metadata.commit_timing.after_hackathon
                      ]
                    }
                  ]}
                  type="bar"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Three API Analysis Graphs */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <Card className="floating-card bg-gradient-to-br from-green-500/10 via-card/30 to-blue-500/10 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
                  <Database className="w-5 h-5 text-green-400" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  API Required vs Used
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={apiRequiredUsedChart}
                  series={[
                    { name: 'API Status', data: [87, 13] }
                  ]}
                  type="bar"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-yellow-500/10 via-card/30 to-red-500/10 backdrop-blur-xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-500/30">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                  Imported but Not Used
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={apiNotUsedChart}
                  series={[
                    { name: 'API Status', data: [87, 13] }
                  ]}
                  type="bar"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-blue-500/10 via-card/30 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Integration Status
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={apiIntegrationChart}
                  series={[
                    { name: 'Integration Status', data: [78, 15, 7] }
                  ]}
                  type="bar"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Integrity Data Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="floating-card bg-gradient-to-br from-blue-500/10 via-card/30 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Contributor Distribution
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ApexChart
                  options={contributorChart}
                  series={mockData.graph_data.contributor_map.map(c => c.percentage)}
                  type="pie"
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Integrity Metrics
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Pre-Hackathon Commits</span>
                  </div>
                  <p className="text-3xl font-bold text-red-400">{mockData.metadata.commit_timing.before_hackathon}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    <span>During Hackathon</span>
                  </div>
                  <p className="text-3xl font-bold text-red-400">{mockData.metadata.commit_timing.during_hackathon}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Risk Level</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-400">{mockData.authenticity_summary.risk_level}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Trust Score</span>
                  </div>
                  <p className="text-3xl font-bold text-red-400">{Math.round(mockData.authenticity_summary.trust_score * 100)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 6: Final Summary Card */}
        <Card className="floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-indigo-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                AI-Generated Analysis Summary
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 rounded-lg bg-background/20 backdrop-blur-sm border border-purple-500/20">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-red-400">⚠️ Integrity Concerns Detected:</strong> {mockData.authenticity_summary.verdict_summary}
                The analysis reveals that <strong className="text-purple-400">{mockData.repository.name}</strong> had significant development activity 
                prior to the hackathon period, with <strong className="text-blue-400">{mockData.metadata.commit_timing.before_hackathon} commits</strong> 
                completed before the official start date. This pattern suggests potential pre-work that may violate hackathon integrity requirements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
