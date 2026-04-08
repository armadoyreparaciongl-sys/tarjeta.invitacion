"use client";

import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";

export function MusicPlayer() {
    const { isPlaying, play, pause } = useAudio();

    const toggle = () => {
        if (isPlaying) pause();
        else play();
    };

    return (
        <div style={{ backgroundColor: "red " }} className="flex justify-center py-10">
            <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className="bg-black/70 backdrop-blur-md text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3"
            >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

                <span className="text-sm">
                    {isPlaying ? "Pausar música" : "Reproducir música"}
                </span>
            </motion.button>
        </div>
    );
}