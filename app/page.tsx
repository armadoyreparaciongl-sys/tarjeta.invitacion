"use client";

import { HeroSection } from "@/components/wedding/hero-section";
import { Countdown } from "@/components/wedding/countdown";
import { LocationSection } from "@/components/wedding/location-section";
import { PhotoGallery } from "@/components/wedding/photo-gallery";
import { RSVPForm } from "@/components/wedding/rsvp-form";
import { Footer } from "@/components/wedding/footer";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { useMemo, useState } from "react";
import { StartModal } from "@/components/ui/StartModal";
import { PricingSection } from "@/components/wedding/pricingSection";
import { AudioControl } from "@/components/ui/audioControl";

export default function WeddingPage() {
  const weddingDate = useMemo(
    () => new Date(2026, 7, 15),
    []
  );
  const [showModal, setShowModal] = useState(true);
  console.log('weddingDate', weddingDate)
  const weddingDetails = {
    coupleName: "Iris & Leo",
    date: "15 de Agosto, 2026",
    venueName: "Parroquia ",
    valueNameBoda: "Salón municipal",
    address: "Benjamín Matienzo esq. Mtra. Dorila G. de Aguiar, Benjamín Gould, Córdoba",
    addressBoda: "Benjamín Matienzo, Benjamín Gould, Córdoba",
    time: "20:00 hs",
    timeBoda: "21:00 hs",
    mapUrl: "https://maps.app.goo.gl/caWFsXCf1H7CTUXZ7",
    mapUrlBoda: "https://maps.app.goo.gl/YErD3DeDuC2DXBkb6"
  };

  return (
    <>
      {showModal && <StartModal onClose={() => setShowModal(false)} />}

      <main className="min-h-screen">
        <HeroSection
          coupleName={weddingDetails.coupleName}
          date={weddingDetails.date}
          imageUrl="/images/photoUno.jpg"
        />

        <Countdown targetDate={weddingDate} />
        <LocationSection
          venueName={weddingDetails.venueName}
          venueNameBoda={weddingDetails.valueNameBoda}
          address={weddingDetails.address}
          addressBoda={weddingDetails.addressBoda}
          date={weddingDate}
          dateBoda={weddingDetails.date}
          time={weddingDetails.time}
          timeBoda={weddingDetails.timeBoda}
          mapUrl={weddingDetails.mapUrl}
          mapUrlBoda={weddingDetails.mapUrlBoda}
        />

        <PhotoGallery />

        <PricingSection cateringLogo={'@/public/images/logoCatering.jpg'} cateringName="Bruncher - Cocina con amor" />

        <RSVPForm deadline={new Date(2026, 6, 31)} />

        {!showModal && <AudioControl />}
        <Footer coupleName={weddingDetails.coupleName} />
      </main>
    </>
  );
}
