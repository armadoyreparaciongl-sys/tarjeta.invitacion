"use client";

import { useAudio } from "@/context/AudioContext";
import Image from "next/image";

interface StartModalProps {
  onClose: () => void;
}

export function StartModal({ onClose }: StartModalProps) {
  const { play } = useAudio();

  const handleEnter = async () => {
    try {
      console.log("CLICK");
      await play?.();
      console.log("AUDIO OK");
    } catch (e) {
      console.log("ERROR AUDIO:", e);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in" />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl animate-scale-in">
        <h2 className="text-2xl font-serif mb-2">
          Estás invitado a nuestra boda
        </h2>

        <div className="flex justify-center mt-2 mb-4 animate-fade-in-delay">
          <Image
            src="/anillosBoda.png"
            alt="anillos"
            height={45}
            width={45}
            className="mix-blend-multiply opacity-80"
          />
        </div>

        <p className="text-gray-600 mb-6">
          Nos encantaría que seas parte de este día tan especial
        </p>

        <button
          onClick={handleEnter}
          className="bg-primary text-white px-6 py-3 rounded-full cursor-pointer active:scale-95 transition-transform duration-150 hover:opacity-90"
        >
          Ver invitación
        </button>
      </div>
    </div>
  );
}