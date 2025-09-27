"use client"

import { useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, Environment } from "@react-three/drei"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Github, Loader2, ArrowRight, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import type * as THREE from "three"

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

export default function ChatPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    repoUrls: "",
    teamSummary: "",
    hackathonDates: "",
    sponsorRequirements: "",
  })
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

  const handleAnalyze = async () => {
    if (!formData.repoUrls || !formData.teamSummary) return

    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      document.body.classList.add("slide-up")
      router.push("/report")
    }, 3000)
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
          href="/"
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Github className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">CodeSync AI</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Hackathon Project Setup</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Configure your hackathon project details for comprehensive analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Card 1: GitHub Repository URLs */}
          <Card className="floating-card bg-gradient-to-br from-purple-500/10 via-card/30 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                  <Github className="w-5 h-5 text-purple-400" />
                </div>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  GitHub Repository URLs
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="repo-urls" className="text-base font-medium flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <span>Repository Links</span>
                </Label>
                <Textarea
                  id="repo-urls"
                  placeholder="https://github.com/team/main-repo&#10;https://github.com/team/frontend&#10;https://github.com/team/backend"
                  value={formData.repoUrls}
                  onChange={(e) => setFormData((prev) => ({ ...prev, repoUrls: e.target.value }))}
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-purple-500/20 transition-all duration-300 focus:bg-background/80 focus:border-purple-500/40 focus:shadow-lg focus:shadow-purple-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  Enter all GitHub repository URLs for your hackathon project (one per line)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Summary Proposing Team */}
          <Card className="floating-card bg-gradient-to-br from-blue-500/10 via-card/30 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Team Summary
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="team-summary" className="text-base font-medium flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <span>Project & Team Description</span>
                </Label>
                <Textarea
                  id="team-summary"
                  placeholder="Describe your project, team members, their roles, and what you're building for the hackathon..."
                  value={formData.teamSummary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, teamSummary: e.target.value }))}
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-blue-500/20 transition-all duration-300 focus:bg-background/80 focus:border-blue-500/40 focus:shadow-lg focus:shadow-blue-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  Provide details about your team composition and project goals
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Dates of Hackathon */}
          <Card className="floating-card bg-gradient-to-br from-cyan-500/10 via-card/30 to-green-500/10 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Hackathon Timeline
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="hackathon-dates" className="text-base font-medium flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"></div>
                  <span>Event Dates & Schedule</span>
                </Label>
                <Textarea
                  id="hackathon-dates"
                  placeholder="Start Date: January 15, 2024&#10;End Date: January 17, 2024&#10;Key Milestones: Demo on Day 2, Final Presentation on Day 3"
                  value={formData.hackathonDates}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hackathonDates: e.target.value }))}
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-cyan-500/20 transition-all duration-300 focus:bg-background/80 focus:border-cyan-500/40 focus:shadow-lg focus:shadow-cyan-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  Include start/end dates and important milestones or deadlines
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Sponsor Requirements */}
          <Card className="floating-card bg-gradient-to-br from-green-500/10 via-card/30 to-yellow-500/10 backdrop-blur-xl border border-green-500/20 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
                  <Award className="w-5 h-5 text-green-400" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Sponsor Requirements
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="sponsor-requirements" className="text-base font-medium flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                  <span>Sponsor APIs & Requirements</span>
                </Label>
                <Textarea
                  id="sponsor-requirements"
                  placeholder="Required APIs: Stripe for payments, OpenAI for AI features&#10;Sponsor Challenges: Best use of AI, Most innovative fintech solution&#10;Documentation: https://docs.sponsor.com/api"
                  value={formData.sponsorRequirements}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sponsorRequirements: e.target.value }))}
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-green-500/20 transition-all duration-300 focus:bg-background/80 focus:border-green-500/40 focus:shadow-lg focus:shadow-green-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  List sponsor APIs, challenges, and specific requirements to fulfill
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!formData.repoUrls || !formData.teamSummary || isAnalyzing}
            className={`cta-button h-14 px-8 text-lg font-medium transition-all duration-300 ${
              !formData.repoUrls || !formData.teamSummary || isAnalyzing
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Analyzing Project...
              </>
            ) : (
              <>
                Start Hackathon Analysis
                <ArrowRight className="w-6 h-6 ml-3" />
              </>
            )}
          </button>
        </div>

        {isAnalyzing && (
          <Card className="mt-8 floating-card bg-gradient-to-br from-primary/20 via-primary/15 to-blue-500/10 border border-primary/30 backdrop-blur-xl shadow-2xl shadow-primary/20 animate-pulse hover:scale-[1.01] transition-all duration-500">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Hackathon Analysis in Progress
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/20 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Analyzing repository structure and codebase...</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/20 backdrop-blur-sm">
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-sm font-medium">Evaluating team composition and project scope...</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/20 backdrop-blur-sm">
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                    <span className="text-sm font-medium">Checking sponsor requirement compliance...</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-background/10 backdrop-blur-sm">
                    <div
                      className="w-3 h-3 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.6s" }}
                    ></div>
                    <span className="text-sm text-muted-foreground font-medium">
                      Generating hackathon readiness report...
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
