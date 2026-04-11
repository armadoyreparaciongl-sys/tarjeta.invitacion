"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, User, Baby, UtensilsCrossed, X, Wine, Salad, Beef, Droplets, Cake, Moon, GlassWater } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LogoCatering from '@/public/images/logoCatering.jpg';

interface MayorPricePeriod {
  label: string;
  deadline: Date;
  price: number;
}

interface FixedPricing {
  menor: number;
  mini: number;
}

interface MenuItem {
  name: string;
  description?: string;
}

interface MenuCategory {
  name: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface PricingSectionProps {
  mayorPricePeriods?: MayorPricePeriod[];
  fixedPricing?: FixedPricing;
  menu?: MenuCategory[];
  cateringLogo?: string;
  cateringName?: string;
}

const defaultMayorPricePeriods: MayorPricePeriod[] = [
  {
    label: "Hasta el 30 de Junio",
    deadline: new Date("2026-06-30T23:59:59"),
    price: 75000,
  },
  {
    label: "Del 1 de Julio al 8 de Agosto",
    deadline: new Date("2026-08-08T23:59:59"),
    price: 79000,
  },
];

const defaultFixedPricing: FixedPricing = {
  menor: 31000,
  mini: 16000,
};

const defaultMenu: MenuCategory[] = [
  {
    name: "Bebidas",
    icon: <Wine className="w-5 h-5" />,
    items: [
      { name: "Vino tinto Alma Mora", description: "" },
      { name: "Vino blanco y blanco dulce", description: "" },
      { name: "Cerveza Heineken", description: "" },
      { name: "Gaseosas línea Coca-Cola", description: "" },
      { name: "Agua saborizada", description: "" },
      { name: "Agua mineral", description: "" },
      { name: "Soda", description: "" },
    ],
  },
  {
    name: "Recepción",
    icon: <Salad className="w-5 h-5" />,
    items: [
      { name: "Sándwiches triples de miga", description: "" },
      { name: "Empanadas surtidas", description: "" },
      { name: "Canapés", description: "" },
      { name: "Brusquetas", description: "" },
      { name: "Tabla de quesos", description: "Fiambres, frutos secos y frutas de estación" },
      { name: "Rabas", description: "" },
      { name: "Pinchos de pollo con ali oli", description: "" },
      { name: "Pollo crispy", description: "" },
      { name: "Sándwich gourmet", description: "" },
      { name: "Paquetitos de rúcula", description: "" },
      { name: "Pinchos caprese", description: "" },
      { name: "Ciruelas con panceta", description: "" },
      { name: "Corona hojaldrada de pesto", description: "" },
      { name: "Caramelos de muzarella", description: "" },
      { name: "Figacitas de manteca", description: "Pollo, huevo y guacamole" },
      { name: "Brochetas", description: "Pollo, cerdo y verdura" },
      { name: "Mini medialunas agridulces", description: "" },
      { name: "Bagels", description: "Jamón crudo, tomate seco, queso crema y rúcula" },
      { name: "Limonada casera", description: "Y jugos en dispensers" },
      { name: "Espumante tropical", description: "" },
      { name: "Barra de recepción", description: "" },
    ],
  },
  {
    name: "Plato Principal",
    icon: <Beef className="w-5 h-5" />,
    items: [
      { name: "Pollo relleno", description: "" },
      { name: "Bondiola de cerdo", description: "" },
    ],
  },
  {
    name: "Salsas",
    icon: <Droplets className="w-5 h-5" />,
    items: [
      { name: "Champiñones", description: "" },
    ],
  },
  {
    name: "Guarniciones",
    icon: <Salad className="w-5 h-5" />,
    items: [
      { name: "Papas bastón", description: "" },
      { name: "Ensalada", description: "" },
    ],
  },
  {
    name: "Postre",
    icon: <Cake className="w-5 h-5" />,
    items: [
      { name: "Brownie con helado", description: "" },
    ],
  },
  {
    name: "Trasnoche",
    icon: <Moon className="w-5 h-5" />,
    items: [
      { name: "Pizza", description: "" },
      { name: "Rincón mexicano", description: "Tacos y nachos con cheddar" },
    ],
  },
  {
    name: "Barra de Tragos",
    icon: <GlassWater className="w-5 h-5" />,
    items: [
      { name: "Fernet Branca", description: "" },
      { name: "Gancia", description: "" },
      { name: "Vodka Smirnoff", description: "" },
      { name: "Campari", description: "" },
      { name: "Daiquiri", description: "" },
      { name: "Gin", description: "" },
      { name: "Caipiriña", description: "" },
      { name: "Caipiroska", description: "" },
      { name: "Lemon Champ", description: "" },
    ],
  },
  {
    name: "Sin Alcohol",
    icon: <GlassWater className="w-5 h-5" />,
    items: [
      { name: "Bebidas de cena", description: "" },
      { name: "Jugos de durazno y naranja", description: "" },
      { name: "Jugos naturales", description: "Con frutas" },
      { name: "Daiquiri sin alcohol", description: "" },
      { name: "Licuados", description: "Frutilla, ananá y durazno" },
    ],
  },
];

export function PricingSection({
  mayorPricePeriods = defaultMayorPricePeriods,
  fixedPricing = defaultFixedPricing,
  menu = defaultMenu,
  cateringLogo,
  cateringName = "Catering & Eventos",
}: PricingSectionProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Determinar qué período de precios está activo para Mayores
  const currentMayorPeriod = useMemo(() => {
    const now = new Date();
    for (const period of mayorPricePeriods) {
      if (now <= period.deadline) {
        return period;
      }
    }
    return mayorPricePeriods[mayorPricePeriods.length - 1];
  }, [mayorPricePeriods]);

  const fixedTiers = [
    {
      name: "Menores",
      ageRange: "6 - 10 años",
      icon: <User className="w-7 h-7" />,
      price: fixedPricing.menor,
    },
    {
      name: "Mini",
      ageRange: "3 - 5 años",
      icon: <Baby className="w-6 h-6" />,
      price: fixedPricing.mini,
    },
  ];

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(value);


  return (
    <>
      <section id="tarjetas" className="py-24 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
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

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Mayores - con fechas de vencimiento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <Users className="w-8 h-8" />
                </div>

                <h3 className="font-serif text-2xl text-foreground mb-1">
                  Mayores
                </h3>

                <span className="text-sm text-muted-foreground font-sans mb-6">
                  11+ años
                </span>

                {/* Price periods for Mayores */}
                <div className="w-full space-y-3">
                  {mayorPricePeriods.map((period, periodIndex) => {
                    const isActive = period === currentMayorPeriod;
                    return (
                      <div
                        key={periodIndex}
                        className={`p-3 rounded-xl transition-colors ${isActive
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-muted/50"
                          }`}
                      >
                        <p className={`text-xs font-sans mb-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground"
                          }`}>
                          {period.label}
                          {isActive && " (Precio actual)"}
                        </p>
                        <span className={`text-2xl font-serif ${isActive ? "text-primary" : "text-muted-foreground"
                          }`}>

                          {formatPrice(period.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Menores y Mini - precio fijo */}
            {fixedTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.15 }}
                className="bg-card rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    {tier.icon}
                  </div>

                  <h3 className="font-serif text-2xl text-foreground mb-1">
                    {tier.name}
                  </h3>

                  <span className="text-sm text-muted-foreground font-sans mb-6">
                    {tier.ageRange}
                  </span>

                  {/* Fixed price */}
                  <div className="w-full">
                    <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary">
                      <p className="text-xs font-sans mb-1 text-primary font-medium">
                        Precio único
                      </p>
                      <span className="text-3xl font-serif text-primary">
                        {formatPrice(tier.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-muted-foreground font-sans text-sm">
              Los niños menores de 3 años no pagan tarjeta
            </p>

            {/* Menu Button */}
            <Button
              onClick={() => setShowMenu(true)}
              size="lg"
              className="gap-2"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Ver Menú Completo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Menu Modal */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-[#f1eae0] bg-[#fffdf9]"
            >
              {/* Header */}
              <div className="relative text-center px-6 pt-8 pb-6">
                <button
                  onClick={() => setShowMenu(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                {cateringLogo ? (
                  <div className="mb-4">
                    <Image
                      src={LogoCatering}
                      alt={cateringName}
                      width={60}
                      height={60}
                      style={{ borderRadius: '50%' }}
                      className="mx-auto object-contain opacity-90"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <UtensilsCrossed className="w-7 h-7" />
                  </div>
                )}

                <h3 className="font-serif text-3xl tracking-wide text-foreground">
                  Menú
                </h3>

                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-2">
                  {cateringName}
                </p>

                <div className="w-16 h-px bg-primary/40 mx-auto mt-4" />
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 pb-8 scrollbar-hide">
                <div className="space-y-10">
                  {menu.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: index * 0.07,
                      }}
                    >
                      {/* Category */}
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 text-primary mb-2">
                          {category.icon}
                        </div>

                        <h4 className="font-serif text-2xl tracking-wide text-foreground">
                          {category.name}
                        </h4>

                        <div className="w-10 h-px bg-primary/30 mx-auto mt-2" />
                      </div>

                      {/* Items */}
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="text-center">
                            <p className="font-medium text-foreground">
                              {item.name}
                            </p>

                            {item.description && (
                              <p className="text-sm italic text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-10 p-2 text-center border-t border-[#f1eae0]">
                  <p className="text-sm text-muted-foreground font-sans italic ">
                    Contamos con opciones especiales para celíacos, vegetarianos y veganos.
                    Por favor indicalo al confirmar tu asistencia.
                  </p>
                  <p className="text-[10px] tracking-widest uppercase text-muted-foreground mt-3 mb-3">
                    Menú Bruncher · Servicio de Catering
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
