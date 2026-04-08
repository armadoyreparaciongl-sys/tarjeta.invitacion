"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";

interface AudioProviderProps {
    children: ReactNode;
}

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: AudioProviderProps) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        audioRef.current?.play();
        setIsPlaying(true);
    };

    const pause = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
    };

    return (
        <AudioContext.Provider value={{ isPlaying, play, pause }}>
            <audio ref={audioRef} loop preload="auto">
                <source src="/sound.mp3" type="audio/mpeg" />
            </audio>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);