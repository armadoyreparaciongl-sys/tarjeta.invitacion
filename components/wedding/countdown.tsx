"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import IconoCorazon from "../../public/corazon.png";

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);
  const [isWeddingDay, setIsWeddingDay] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      // 👇 detectar mismo día (más UX)
      const isSameDay =
        now.getFullYear() === targetDate.getFullYear() &&
        now.getMonth() === targetDate.getMonth() &&
        now.getDate() === targetDate.getDate();

      if (difference <= 0) {
        setIsWeddingDay(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  // 🎉 🎉 🎉 PANTALLA GRAN DÍA
  if (isWeddingDay) {
    return (
      <section className="py-10 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-serif text-3xl md:text-5xl text-foreground mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ¡Hoy es el gran día! 💍
            </motion.h2>

            <p className="text-lg text-muted-foreground font-sans">
              Llegó el momento que tanto esperamos ❤️
            </p>

            {/* 🎊 Emojis animados */}
            <div className="mt-6 flex justify-center gap-4 text-3xl">
              {["🎉", "🥂", "✨", "🎊"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <section className="py-10 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-muted-foreground text-lg tracking-widest uppercase mb-4 font-sans">
            Faltan
          </p>

          <div className="flex justify-center gap-4 md:gap-8">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 bg-card rounded-lg shadow-sm border border-border flex items-center justify-center mb-2">
                  <span className="font-serif text-2xl md:text-4xl text-foreground font-medium">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase font-sans">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg md:text-xl text-foreground/80 font-sans"
          >
            Para el día más especial de nuestras vidas
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 flex justify-center"
          >
            <Image
              src={IconoCorazon}
              alt="corazón"
              height={50}
              width={50}
              className="mix-blend-multiply opacity-80"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}