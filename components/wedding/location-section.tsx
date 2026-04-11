"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Church, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationSectionProps {
  venueName: string;
  venueNameBoda: string
  address: string;
  addressBoda: string;
  date: Date;
  time: string;
  mapUrl: string;
  dateBoda: string;
  timeBoda: string;
  mapUrlBoda: string;
}

export function LocationSection({
  venueName,
  address,
  venueNameBoda,
  addressBoda,
  date,
  time,
  mapUrl,
  dateBoda,
  timeBoda,
  mapUrlBoda
}: LocationSectionProps) {

  const fecha = new Date(date);
  const dia = fecha.getDate();
  const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" });
  const mes = fecha.toLocaleDateString("es-ES", { month: "long" });
  console.log(date)
  return (
    <section id="ubicacion" className="py-24 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-foreground text-lg font-serif mb-4">
            Te esperamos para celebrar nuestra boda
          </p>

          <div className="flex items-center justify-center gap-6 text-foreground">
            <span className="text-sm tracking-widest uppercase border-t border-b py-2 px-4">
              {diaSemana}
            </span>

            <span className="text-4xl md:text-5xl font-serif leading-none">
              {dia}
            </span>

            <span className="text-sm tracking-widest uppercase border-t border-b py-2 px-4">
              {mes}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center flex flex-col items-center"
          >
            <div >
              <Church className="w-10 h-10 text-primary" />
            </div>
            <div className="flex flex-col items-center text-center">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-1">
                  {time} - {venueName}
                </h3>
                <p className="text-muted-foreground font-sans">{address}</p>
              </div>
            </div>


            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" />
                Ver Ubicación
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-center flex flex-col items-center"
          >
            <div >
              <PartyPopper className="w-10 h-10 text-primary" />
            </div>
            <div className="flex flex-col items-center text-center">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-1">
                  {timeBoda} - {venueNameBoda}
                </h3>
                <p className="text-muted-foreground font-sans">{addressBoda}</p>
              </div>
            </div>


            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href={mapUrlBoda} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" />
                Ver Ubicación
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section >
  );
}
