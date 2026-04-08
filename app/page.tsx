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

export default function WeddingPage() {
  const weddingDate = useMemo(
    () => new Date(2026, 7, 15),
    []
  );
  const [showModal, setShowModal] = useState(true);

  const weddingDetails = {
    coupleName: "Iris & Leo",
    date: "15 de Agosto, 2026",
    venueName: "Parroquia ",
    valueNameBoda: "Salon municipal",
    address: "Benjamín Matienzo, Benjamín Gould, Córdoba",
    addressBoda: "Benjamín Matienzo, Benjamín Gould, Córdoba",
    time: "20:00 horas",
    timeBoda: "21:00 horas",
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

        <PricingSection />

        <RSVPForm />

        <Footer coupleName={weddingDetails.coupleName} />
      </main>
    </>
  );
}
