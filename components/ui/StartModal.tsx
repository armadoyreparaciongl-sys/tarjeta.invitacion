"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";
import Image from "next/image";
import IconoAnillos from "@/public/anillosBoda.png"

interface StartModalProps {
  onClose: () => void;
}

export function StartModal({ onClose }: StartModalProps) {
  const { play } = useAudio();

  const handleEnter = async () => {
    await play();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl"
      >
        <h2 className="text-2xl font-serif mb-2">
          Estás invitado a nuestra boda
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className=" flex justify-center text-foreground/80"
        >
          <Image
            src={IconoAnillos}
            alt="corazón"
            height={45}
            width={45}
            className="mix-blend-multiply opacity-80"
          />
        </motion.div>

        <p className="text-gray-600 mb-6 mt-2">
          Nos encantaría que seas parte de este día tan especial
        </p>

        <button
          onClick={handleEnter}
          className="bg-primary text-white px-6 py-3 rounded-full"
        >
          Ver invitación
        </button>
      </motion.div>
    </div>
  );
}