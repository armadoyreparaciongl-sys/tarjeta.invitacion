"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Camera,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Photo {
  id: string;
  url: string;
  uploadedBy?: string;
}

const PREVIEW_COUNT = 6;

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: "1", url: "/images/gallery-1.jpg", uploadedBy: "Los Novios" },
    { id: "2", url: "/images/gallery-2.jpg", uploadedBy: "Los Novios" },
    { id: "3", url: "/images/gallery-3.jpg", uploadedBy: "Los Novios" },
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const previewPhotos = photos.slice(0, PREVIEW_COUNT);
  const hasMorePhotos = photos.length > PREVIEW_COUNT;
  const remainingCount = photos.length - PREVIEW_COUNT;

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      setIsUploading(true);

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            url: e.target?.result as string,
            uploadedBy: "Invitado",
          };
          setPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      });

      setTimeout(() => setIsUploading(false), 500);
      event.target.value = "";
    },
    []
  );

  const handlePrevious = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const previousIndex =
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setSelectedPhoto(photos[previousIndex]);
  }, [selectedPhoto, photos]);

  const handleNext = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setSelectedPhoto(photos[nextIndex]);
  }, [selectedPhoto, photos]);

  const openGalleryAtPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <section id="galeria" className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4 font-sans">
            Recuerdos
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Galería de Fotos
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground font-sans max-w-md mx-auto">
            Comparte tus fotos de la boda con nosotros y revive los mejores
            momentos
          </p>
        </motion.div>

        {/* Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              <span className="font-sans">Subir Fotos</span>
            </div>
          </label>
        </motion.div>

        {/* Preview Photo Grid */}
        {photos.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {previewPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => openGalleryAtPhoto(photo)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={photo.url}
                    alt={`Foto subida por ${photo.uploadedBy}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                    <Camera className="w-8 h-8 text-card opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Show +N overlay on last preview photo if there are more */}
                  {index === PREVIEW_COUNT - 1 && hasMorePhotos && (
                    <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                      <span className="text-card font-serif text-3xl md:text-4xl">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mt-8"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllPhotos(true)}
                className="gap-2 rounded-full px-8 hover:bg-primary/10"
              >
                <Images className="w-5 h-5" />
                <span className="font-sans">
                  Ver todas las fotos ({photos.length})
                </span>
              </Button>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground font-sans">
              Aun no hay fotos. Sube tus fotos para compartir!
            </p>
          </div>
        )}

        {/* Full Gallery Modal */}
        <AnimatePresence>
          {showAllPhotos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
            >
              <div className="min-h-screen p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-8 sticky top-0 bg-background/90 backdrop-blur-sm py-4 -mx-4 px-4 z-10">
                    <div>
                      <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                        Todas las Fotos
                      </h3>
                      <p className="text-muted-foreground font-sans text-sm">
                        {photos.length} fotos compartidas
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowAllPhotos(false)}
                      className="rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Upload in Modal */}
                  <div className="flex justify-center mb-8">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm">
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        <span className="font-sans">Subir mas fotos</span>
                      </div>
                    </label>
                  </div>

                  {/* All Photos Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => {
                          setShowAllPhotos(false);
                          setTimeout(() => openGalleryAtPhoto(photo), 100);
                        }}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                      >
                        <Image
                          src={photo.url}
                          alt={`Foto subida por ${photo.uploadedBy}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                          <Camera className="w-6 h-6 text-card opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="text-card text-xs font-sans bg-foreground/50 px-2 py-1 rounded-full">
                            {photo.uploadedBy}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Single Photo Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-foreground/90 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-card hover:bg-card/20 z-10"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/20 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/20 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl max-h-[80vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.url}
                  alt="Foto ampliada"
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/50 px-4 py-2 rounded-full">
                  <span className="text-card text-sm font-sans">
                    {photos.findIndex((p) => p.id === selectedPhoto.id) + 1} /{" "}
                    {photos.length}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
