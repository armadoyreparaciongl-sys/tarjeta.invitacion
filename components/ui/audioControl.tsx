"use client";

import { useAudio } from "@/context/AudioContext";
import { Volume2, VolumeX } from "lucide-react";

export function AudioControl() {
    const { isPlaying, play, pause } = useAudio();

    const toggleAudio = async () => {
        if (isPlaying) {
            pause?.();
        } else {
            await play?.();
        }
    };

    return (
        <button
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-[9999] bg-primary text-white rounded-full w-10 h-10 shadow-lg flex items-center justify-center hover:scale-110 transition"
        >
            {isPlaying ? <Volume2 /> : <VolumeX />}
        </button>
    );
}