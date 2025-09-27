"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Github, FileText, BarChart3, Zap, Brain, Network } from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

function InteractiveBackground({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2 + mousePosition.y * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + mousePosition.x * 0.1
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.5 + mousePosition.x * 0.3
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.3 + mousePosition.y * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={3}>
        <MeshDistortMaterial
          color="#6B5FFF"
          attach="material"
          distort={0.4 + mousePosition.x * 0.2}
          speed={2 + mousePosition.y}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function InteractiveParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const particlesRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (particlesRef.current) {
      const mouseIntensity = Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y)
      const baseSpeed = 0.05
      const interactiveSpeed = baseSpeed + mouseIntensity * 0.15

      particlesRef.current.rotation.y = state.clock.elapsedTime * interactiveSpeed + mousePosition.x * 0.02
      particlesRef.current.rotation.x = mousePosition.y * 0.01

      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const particleSpeed = 0.1 + mouseIntensity * 0.3
        mesh.position.y = Math.sin(state.clock.elapsedTime * particleSpeed + i) * 0.5 + mousePosition.y * 0.2
        mesh.position.x += Math.sin(state.clock.elapsedTime * particleSpeed + i) * (0.01 + mouseIntensity * 0.02)

        const distance = Math.sqrt(
          Math.pow(mesh.position.x - (mousePosition.x * viewport.width) / 2, 2) +
            Math.pow(mesh.position.y - (mousePosition.y * viewport.height) / 2, 2),
        )
        const scale = Math.max(0.3, 3 - distance / 3)
        mesh.scale.setScalar(scale)
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 120 }).map((_, i) => (
        <Float key={i} speed={1.5 + Math.random() * 2} rotationIntensity={0.8} floatIntensity={0.8}>
          <Sphere
            args={[0.02 + Math.random() * 0.03]}
            position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30]}
          >
            <meshBasicMaterial
              color={i % 4 === 0 ? "#4D8AFF" : i % 4 === 1 ? "#FF64F9" : i % 4 === 2 ? "#5BFF89" : "#FFD700"}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

function WaveEffect({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const waveRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (waveRef.current) {
      waveRef.current.rotation.z = state.clock.elapsedTime * 0.1 + mousePosition.x * 0.5
      waveRef.current.position.x = mousePosition.x * 2
      waveRef.current.position.y = mousePosition.y * 2
    }
  })

  return (
    <mesh ref={waveRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial color="#1a1a2e" transparent opacity={0.1} wireframe />
    </mesh>
  )
}

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }

    const handleClick = () => {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 300)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  const features = [
    {
      icon: <Network className="w-8 h-8" />,
      title: "Knowledge Graph Generation",
      description:
        "Create comprehensive knowledge graphs showing how documentation components are used in your codebase",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Usage Analytics",
      description: "Detailed reports and visualizations comparing sponsor code usage across your project",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "README Analysis",
      description: "Analyze how well your README documentation aligns with your actual codebase implementation",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for improving code-documentation alignment",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6B5FFF" />
          <pointLight position={[-10, -10, -10]} intensity={0.7} color="#FF64F9" />
          <spotLight position={[0, 10, 0]} intensity={0.8} color="#4D8AFF" />
          <InteractiveBackground mousePosition={mousePosition} />
          <InteractiveParticles mousePosition={mousePosition} />
          <WaveEffect mousePosition={mousePosition} />
          <Environment preset="night" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2 + Math.abs(mousePosition.x) * 1.2 + Math.abs(mousePosition.y) * 0.8}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {isClicked && (
        <div
          className="fixed pointer-events-none z-20"
          style={{
            left: `${(mousePosition.x + 1) * 50}%`,
            top: `${(-mousePosition.y + 1) * 50}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-32 h-32 border-2 border-purple-400 rounded-full animate-ping opacity-75"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-balance">CodeSync AI</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
            Analyze
          </Link>
          <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            AI-Powered Repository Analysis
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
            Analyze Code Against
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Documentation
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Leverage agentic AI to create knowledge graphs, analyze component usage, and generate comprehensive reports
            comparing your GitHub repositories against documentation.
          </p>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Link href="/analyze" className="cta-button">
              Start Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Button variant="outline" size="lg" className="group bg-transparent backdrop-blur-sm">
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 bg-card/30 backdrop-blur-sm border-border/50 hover:bg-card/50"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div
                  className={`inline-flex p-3 rounded-lg transition-all duration-300 ${
                    hoveredFeature === index
                      ? "bg-primary text-primary-foreground scale-110"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-balance">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trusted By Section */}
        <div className="text-center mt-32">
          <p className="text-sm text-muted-foreground mb-8">Trusted by developers at</p>
          <div className="flex items-center justify-center space-x-12 opacity-50">
            <div className="text-2xl font-bold hover:opacity-100 transition-opacity cursor-pointer">Vercel</div>
            <div className="text-2xl font-bold hover:opacity-100 transition-opacity cursor-pointer">GitHub</div>
            <div className="text-2xl font-bold hover:opacity-100 transition-opacity cursor-pointer">OpenAI</div>
            <div className="text-2xl font-bold hover:opacity-100 transition-opacity cursor-pointer">Stripe</div>
          </div>
        </div>
      </div>
    </div>
  )
}
