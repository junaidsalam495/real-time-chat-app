"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { MessageCircle, Shield, Zap } from 'lucide-react'
import { io } from 'socket.io-client'

const HomeHeroSection = () => {

  useEffect(() => {
    const socket = io("http://localhost:3000")

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <section className="container mx-auto py-24 md:py-32 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Connect with friends <span className="text-primary">instantly</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px]">
            A modern chat application that lets you stay connected with your friends and family. Simple, secure, and
            fast.
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/auth/signup">
              <Button size="lg" className="h-12 px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="h-12 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Messaging</h3>
            <p className="text-muted-foreground">
              Send and receive messages instantly with our real-time messaging system.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Chats</h3>
            <p className="text-muted-foreground">
              Your conversations are encrypted and secure, ensuring your privacy.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast & Reliable</h3>
            <p className="text-muted-foreground">Built with modern technology to ensure speed and reliability.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeHeroSection


