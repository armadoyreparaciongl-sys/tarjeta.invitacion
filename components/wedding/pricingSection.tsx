"use client";

import { motion } from "framer-motion";
import { Users, User, Baby } from "lucide-react";

interface PricingTier {
  name: string;
  ageRange: string;
  price: number;
  icon: React.ReactNode;
  description: string;
}

interface PricingSectionProps {
  pricing?: {
    mayor: number;
    menor: number;
    mini: number;
  };
}

export function PricingSection({ 
  pricing = { mayor: 150, menor: 80, mini: 50 } 
}: PricingSectionProps) {
  const tiers: PricingTier[] = [
    {
      name: "Mayores",
      ageRange: "11+ años",
      price: pricing.mayor,
      icon: <Users className="w-8 h-8" />,
      description: "Menú completo con entrada, plato principal, postre y bebidas",
    },
    {
      name: "Menores",
      ageRange: "6 - 10 años",
      price: pricing.menor,
      icon: <User className="w-7 h-7" />,
      description: "Menú infantil adaptado con opciones divertidas",
    },
    {
      name: "Mini",
      ageRange: "3 - 5 años",
      price: pricing.mini,
      icon: <Baby className="w-6 h-6" />,
      description: "Menú especial para los más pequeños",
    },
  ];

  return (
    <section id="tarjetas" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Información
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Valor de la Tarjeta
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground font-sans max-w-md mx-auto">
            Para ayudarnos con la organización, te compartimos el valor por persona según la edad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  {tier.icon}
                </div>
                
                <h3 className="font-serif text-2xl text-foreground mb-1">
                  {tier.name}
                </h3>
                
                <span className="text-sm text-muted-foreground font-sans mb-4">
                  {tier.ageRange}
                </span>
                
                <div className="mb-4">
                  <span className="text-4xl font-serif text-primary">
                    ${tier.price.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground font-sans">
                  {tier.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-muted-foreground font-sans text-sm mt-8"
        >
          Los niños menores de 3 años no pagan tarjeta
        </motion.p>
      </div>
    </section>
  );
}
