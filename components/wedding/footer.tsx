"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FooterProps {
  coupleName: string;
}

export function Footer({ coupleName }: FooterProps) {
  return (
    <footer className="py-12 px-4 bg-foreground text-card">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-card/30" />
          <Heart className="w-5 h-5 text-accent fill-accent" />
          <span className="h-px w-12 bg-card/30" />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl mb-4">{coupleName}</h2>

        <p className="text-card/70 font-sans text-sm">
          ¡Gracias por ser parte de nuestra historia!
        </p>

        <nav className="flex items-center justify-center gap-6 mt-8 text-sm font-sans">
          <a href="#ubicacion" className="text-card/70 hover:text-card transition-colors">
            Ubicación
          </a>
          <a href="#galeria" className="text-card/70 hover:text-card transition-colors">
            Galería
          </a>
          <a href="#confirmar" className="text-card/70 hover:text-card transition-colors">
            Confirmar
          </a>
        </nav>
      </motion.div>
    </footer>
  );
}
