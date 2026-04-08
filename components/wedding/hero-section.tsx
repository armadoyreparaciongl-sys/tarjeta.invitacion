"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroSectionProps {
  coupleName: string;
  date: string;
  imageUrl: string;
}

export function HeroSection({ coupleName, date, imageUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={`Foto de ${coupleName}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div style={{ marginTop: 315 }} className="relative z-10 text-center px-4"> 
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
          style={{ marginBottom: 10 }}
        >
          <p className="text-card/90 text-lg tracking-[0.3em] uppercase font-sans">
            Estás invitado a la boda de
          </p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-card font-medium tracking-wide text-balance">
            {coupleName}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-card/60" />
            <p className="text-card text-xl md:text-2xl font-sans tracking-widest">
              {date}
            </p>
            <span className="h-px w-16 bg-card/60" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16"
        >
          <a
            href="#ubicacion"
            className="inline-flex items-center gap-2 text-card/80 hover:text-card transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">Descubre más</span>
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
