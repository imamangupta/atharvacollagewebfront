'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

const AnimatedSphere = () => {
  const mesh = useRef()
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y = Math.sin(time) * 0.1
    mesh.current.rotation.x = Math.sin(time / 2) * Math.PI
    mesh.current.rotation.y = Math.sin(time / 3) * Math.PI
    mesh.current.rotation.z = Math.sin(time / 4) * Math.PI
  })

  return (
    <Sphere visible args={[1, 100, 200]} scale={1.5} ref={mesh}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  )
}

const AnimatedText = ({ text }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    })
  }, [controls])

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      {text}
    </motion.span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-indigo-900">
      <div className="absolute inset-0 w-full h-full">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
        </Canvas>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
          <AnimatedText text="Transform Your Event Planning Experience" />
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 text-indigo-200 max-w-3xl mx-auto">
          <AnimatedText text="PlanKaro brings your ideas to life with collaborative tools, real-time updates, and seamless vendor management. Make every occasion extraordinary." />
        </p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg" asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-indigo-400 text-indigo-400 hover:bg-indigo-800 px-8 py-3 rounded-full text-lg" asChild>
            <Link href="/demo">Watch Demo</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}