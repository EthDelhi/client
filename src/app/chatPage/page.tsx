"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Environment } from "@react-three/drei";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  ArrowLeft,
  Github,
  Loader2,
  Zap,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type * as THREE from "three";

function InteractiveAnalysisBackground({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        state.clock.elapsedTime * 0.1 + mousePosition.x * 0.05;
      groupRef.current.rotation.x = mousePosition.y * 0.02;
    }
  });

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
  );
}

export default function ChatPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    repoUrls: "",
    projectSummary: "",
    hackathonDates: "",
    sponsorRequirements: "",
    hackathonStartDate: "",
    hackathonEndDate: "",
  });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAnalyze = async () => {
    if (!formData.repoUrls || !formData.projectSummary) return;

    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      document.body.classList.add("slide-up");
      router.push("/report");
    }, 3000);
  };

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
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Project Name</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Hackathon Project Setup
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Share the hackathon project details for comprehensive analysis
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
                <Label
                  htmlFor="repo-urls"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <span>Repository Links</span>
                </Label>
                <Textarea
                  id="repo-urls"
                  placeholder="https://github.com/team/main-repo"
                  value={formData.repoUrls}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      repoUrls: e.target.value,
                    }))
                  }
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-purple-500/20 transition-all duration-300 focus:bg-background/80 focus:border-purple-500/40 focus:shadow-lg focus:shadow-purple-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  Enter all GitHub repository URLs for your hackathon project
                  (one per line)
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
                  Project Summary
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label
                  htmlFor="team-summary"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <span>Project Description</span>
                </Label>
                <Textarea
                  id="team-summary"
                  placeholder="Describe your project, tech stack, team members, and what you're building for the hackathon"
                  value={formData.projectSummary}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectSummary: e.target.value,
                    }))
                  }
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
      {/* Start Date */}
      <Label
        htmlFor="hackathon-start-date"
        className="text-base font-medium flex items-center space-x-2"
      >
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"></div>
        <span>Start Date</span>
      </Label>
      <DatePicker
        selected={formData.hackathonStartDate ? new Date(formData.hackathonStartDate) : null}
        onChange={(date: Date | null) =>
          setFormData(prev => ({
            ...prev,
            hackathonStartDate: date ? date.toISOString() : "",
          }))
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        className="w-full min-h-12 px-3 py-2 bg-background/60 backdrop-blur-sm border border-cyan-500/20 rounded-md transition-all duration-300 focus:bg-background/80 focus:border-cyan-500/40 focus:shadow-lg focus:shadow-cyan-500/10"
      />

      {/* End Date */}
      <Label
        htmlFor="hackathon-end-date"
        className="text-base font-medium flex items-center space-x-2 mt-3"
      >
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"></div>
        <span>End Date</span>
      </Label>
      <DatePicker
        selected={formData.hackathonEndDate ? new Date(formData.hackathonEndDate) : null}
        onChange={(date: Date | null) =>
          setFormData(prev => ({
            ...prev,
            hackathonEndDate: date ? date.toISOString() : "",
          }))
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        className="w-full min-h-12 px-3 py-2 bg-background/60 backdrop-blur-sm border border-cyan-500/20 rounded-md transition-all duration-300 focus:bg-background/80 focus:border-cyan-500/40 focus:shadow-lg focus:shadow-cyan-500/10"
      />

      <p className="text-sm text-muted-foreground/80 mt-2">
        Enter start and end dates along with important milestones
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
                <Label
                  htmlFor="sponsor-requirements"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                  <span>Sponsor APIs & Requirements</span>
                </Label>
                <Textarea
                  id="sponsor-requirements"
                  placeholder="Required APIs: Stripe for payments, OpenAI for AI features&#10;Sponsor Challenges: Best use of AI, Most innovative fintech solution"
                  value={formData.sponsorRequirements}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sponsorRequirements: e.target.value,
                    }))
                  }
                  className="min-h-32 resize-none bg-background/60 backdrop-blur-sm border-green-500/20 transition-all duration-300 focus:bg-background/80 focus:border-green-500/40 focus:shadow-lg focus:shadow-green-500/10"
                />
                <p className="text-sm text-muted-foreground/80">
                  List sponsor APIs, challenges, and specific requirements to
                  fulfill
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={
              !formData.repoUrls || !formData.projectSummary || isAnalyzing
            }
            // className={`cta-button h-14 px-8 text-lg font-medium transition-all duration-300 ${
            //   !formData.repoUrls || !formData.projectSummary || isAnalyzing
            //     ? "opacity-50 cursor-not-allowed"
            //     : "hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
            // }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                Analyzing Project...
              </>
            ) : (
              <div className="flex justify-center mt-12">
                <div className="group relative inline-flex items-center bg-purple-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 px-8 py-4">
                  <span className="transition-all duration-300">
                    Start Hackathon Analysis
                  </span>
                  <span className="ml-0 w-0 overflow-hidden flex items-center justify-center bg-white text-purple-500 font-bold rounded-full transition-all duration-300 group-hover:ml-4 group-hover:w-8 h-8">
                    ➔
                  </span>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Full-screen overlay for analysis */}
        {isAnalyzing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-500">
            <div className="relative w-48 h-48">
              {/* Crazy loader: pulsating concentric circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-8 border-purple-400 border-t-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute w-32 h-32 border-4 border-blue-400 border-b-transparent rounded-full animate-ping-slow"></div>
                <div className="absolute w-40 h-40 border-2 border-cyan-400 border-l-transparent rounded-full animate-spin-fast"></div>
              </div>
              <span className="absolute bottom-[-2.5rem] text-center text-lg font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Analyzing Hackathon Project...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
