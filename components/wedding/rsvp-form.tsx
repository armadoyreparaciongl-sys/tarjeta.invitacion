"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, Minus, Heart, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type GuestType = "mayor" | "menor" | "mini";

interface Guest {
  id: string;
  name: string;
  type: GuestType;
  dietaryRestrictions: string;
}

const guestTypeLabels: Record<GuestType, { label: string; ageRange: string }> = {
  mayor: { label: "Mayor", ageRange: "11+ años" },
  menor: { label: "Menor", ageRange: "6-10 años" },
  mini: { label: "Mini", ageRange: "3-5 años" },
};

export function RSVPForm({ deadline }: { deadline: Date }) {
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [mainGuest, setMainGuest] = useState({ name: "", email: "", phone: "", dietaryRestrictions: "", });
  const [guests, setGuests] = useState<Guest[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDeadlinePassed = new Date() > deadline;


  const addGuest = (type: GuestType = "mayor") => {
    setGuests([
      ...guests,
      {
        id: Date.now().toString(),
        name: "",
        type,
        dietaryRestrictions: "",
      },
    ]);
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  const updateGuest = (id: string, field: keyof Guest, value: string) => {
    setGuests(
      guests.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        attendance,
        mainGuest,
        guests,
        message,
        createdAt: new Date().toISOString(),
      };

      // 🔹 Guardar en Firebase (esto sí siempre)
      await addDoc(collection(db, "rsvps"), payload);

      // 🔹 SOLO si asiste → enviar a n8n
      if (attendance === "yes") {
        const n8nPayload = {
          nombre: mainGuest.name,
          email: mainGuest.email,
          telefono: mainGuest.phone,
          restriccion_alimenticia: mainGuest.dietaryRestrictions || "",
          mensaje: message || "",
          acompanantes: guests.map((g) => ({
            nombre: g.name,
            type: g.type,
            restriccion_alimenticia: g.dietaryRestrictions || "",
          })),
        };

        const res = await fetch("https://n8n.ai.streambe.com/webhook/api/confirmacion-boda", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(n8nPayload),
        });

        const data = await res.json();
        console.log("Respuesta n8n:", data);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error guardando RSVP:", error);
    }

    setIsSubmitting(false);
  };

  if (isDeadlinePassed) {
    return (
      <section id="confirmar" className="py-24 px-4 bg-secondary">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Confirmación cerrada
          </h2>
          <p className="text-muted-foreground font-sans">
            La fecha límite para confirmar asistencia (31 de Julio) ya ha pasado.
            Si necesitás avisarnos algo, comunicate con nosotros.
          </p>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="confirmar" className="py-24 px-4 bg-secondary">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            ¡Gracias por confirmar!
          </h2>
          <p className="text-muted-foreground font-sans">
            {attendance === "yes"
              ? "Estamos muy emocionados de que puedas acompañarnos en este día tan especial."
              : "Lamentamos que no puedas asistir, pero te tendremos presente en nuestro corazón."}
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="confirmar" className="py-24 px-4 bg-secondary">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Confirmación
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            ¿Asistirás a Nuestra Boda?
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground font-sans max-w-md mx-auto">
            Por favor confirma tu asistencia antes del 31 de Julio
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Attendance Selection */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <Label className="text-foreground font-serif text-lg mb-4 block">
              ¿Podrás asistir?
            </Label>
            <RadioGroup
              value={attendance || ""}
              onValueChange={(value) => setAttendance(value as "yes" | "no")}
              className="flex gap-4"
            >
              <label
                className={`flex-1 cursor-pointer rounded-xl border-2 p-4 transition-all ${attendance === "yes"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
                  }`}
              >
                <RadioGroupItem value="yes" className="sr-only" />
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${attendance === "yes"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                      }`}
                  >
                    {attendance === "yes" && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="font-sans text-foreground">Sí, asistiré</span>
                </div>
              </label>

              <label
                className={`flex-1 cursor-pointer rounded-xl border-2 p-4 transition-all ${attendance === "no"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
                  }`}
              >
                <RadioGroupItem value="no" className="sr-only" />
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${attendance === "no"
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                      }`}
                  >
                    {attendance === "no" && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="font-sans text-foreground">No podré asistir</span>
                </div>
              </label>
            </RadioGroup>
          </div>

          {attendance === "yes" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-6"
            >
              {/* Main Guest Info */}
              <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-foreground">
                  Tus Datos
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-sans">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      value={mainGuest.name}
                      onChange={(e) =>
                        setMainGuest({ ...mainGuest, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-sans">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={mainGuest.email}
                      onChange={(e) =>
                        setMainGuest({ ...mainGuest, email: e.target.value })
                      }
                      placeholder="tu@email.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-sans">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={mainGuest.phone}
                    onChange={(e) =>
                      setMainGuest({ ...mainGuest, phone: e.target.value })
                    }
                    placeholder="+34 600 000 000"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="restriccion" className="text-foreground font-sans">
                      Restricciones alimentarias (opcional)
                    </Label>

                    <Input
                      id="restriccion"
                      value={mainGuest.dietaryRestrictions}
                      onChange={(e) =>
                        setMainGuest({ ...mainGuest, dietaryRestrictions: e.target.value })
                      }
                      placeholder="Indicanos si tenés alguna restricción (Sin TACC, vegetariano, vegano, alergias, etc.)"
                      className="bg-background resize-none"
                    />

                    <p className="text-xs text-muted-foreground italic">
                      Contamos con opciones especiales si lo indicás previamente
                    </p>
                  </div>
                </div>
              </div>


              {/* Additional Guests */}
              <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="font-serif text-lg text-foreground">
                    Acompañantes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addGuest("mayor")}
                      className="gap-1 hover:bg-primary/10"
                    >
                      <Plus className="w-4 h-4" />
                      Mayor (11+)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addGuest("menor")}
                      className="gap-1 hover:bg-primary/10"
                    >
                      <Plus className="w-4 h-4" />
                      Menor (6-10)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addGuest("mini")}
                      className="gap-1 hover:bg-primary/10"
                    >
                      <Plus className="w-4 h-4" />
                      Mini (3-5)
                    </Button>
                  </div>
                </div>

                {guests.length === 0 ? (
                  <p className="text-muted-foreground font-sans text-sm">
                    ¿Vienes con acompañantes? Añádelos según su categoría de edad.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {guests.map((guest, index) => (
                      <motion.div
                        key={guest.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-background rounded-xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground font-sans">
                              Acompañante {index + 1}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-sans">
                              {guestTypeLabels[guest.type].label} ({guestTypeLabels[guest.type].ageRange})
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGuest(guest.id)}
                            className="h-8 w-8 text-destructive hover:bg-primary/10"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Input
                          value={guest.name}
                          onChange={(e) =>
                            updateGuest(guest.id, "name", e.target.value)
                          }
                          placeholder="Nombre del acompañante"
                          required
                        />
                        <Input
                          value={guest.dietaryRestrictions}
                          onChange={(e) =>
                            updateGuest(
                              guest.id,
                              "dietaryRestrictions",
                              e.target.value
                            )
                          }
                          placeholder="Restricciones alimentarias (opcional)"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-foreground">
                  Mensaje para los Novios
                </h3>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje especial para los novios... (opcional)"
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>
            </motion.div>
          )}

          {attendance && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || (attendance === "yes" && !mainGuest.name)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Enviando..." : "Confirmar Asistencia"}
              </Button>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
