import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GalleryProps {
  t: {
    galleryTitle: string;
    gallerySubtitle: string;
    galleryDescription: string;
    tapTo: string;
    [key: string]: any;
  };
  isRTL?: boolean;
}

const Gallery = ({ t, isRTL = false }: GalleryProps) => {
  const images = Array.from({ length: 11 }, (_, i) => {
    const id = i + 1;
    return {
      // Use new URL to resolve files from src/assets during build
      src: new URL(`../assets/${id}.jpg`, import.meta.url).href,
      alt: t[`gallery.alt.${id}`] || `Gallery image ${id}`,
      code: `# ${id.toString().padStart(2, '0')}`,
    };
  });

  return (
    <section className="max-w-5xl mx-auto mb-12 sm:mb-16">
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-3xl text-center text-foreground">
            <span className="relative z-1">
              {t.galleryTitle}
              <span className="bg-primary absolute bottom-1 left-0 -z-1 h-px w-full" aria-hidden="true"></span>
            </span>{" "}
            {t.gallerySubtitle}
          </CardTitle>
          <p 
            className="text-muted-foreground text-sm sm:text-base md:text-lg text-center mt-2 px-2"
            style={{ direction: isRTL ? 'rtl' : 'ltr', unicodeBidi: 'embed' }}
          >
            {t.galleryDescription}
          </p>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-muted/30 py-8 sm:py-12">
            <HoverExpandGallery images={images} tapTo={t.tapTo} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const HoverExpandGallery = ({
  images,
  tapTo,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  tapTo?: string;
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(0);
  const [isTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // Handle image interaction
  const handleImageClick = (index: number) => {
    setActiveImage(index);
  };

  const handleMouseEnter = (index: number) => {
    if (!isTouchDevice) {
      setActiveImage(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full max-w-6xl px-3 sm:px-5", className)}
    >
      <div className="flex w-full flex-col items-center justify-center gap-0.5 sm:gap-1">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl w-full"
            initial={{ height: "2.5rem" }}
            animate={{
              height: activeImage === index 
                ? "24rem"
                : "2.5rem",
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.23, 1, 0.32, 1]
            }}
            onClick={() => handleImageClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {/* Gradient Overlay - Only on expanded */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />
              )}
            </AnimatePresence>
            
            {/* Image Info - Only on expanded */}
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 z-20 flex flex-col items-start justify-end p-4 sm:p-6"
                >
                  <p className="text-white font-mono text-xs opacity-70">
                    {image.code}
                  </p>
                  <p className="text-white text-xs sm:text-sm font-medium">
                    {image.alt}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Image */}
            <img
              src={image.src}
              className="absolute inset-0 size-full object-cover"
              alt={image.alt}
              loading={index < 3 ? "eager" : "lazy"}
            />
            
            {/* Tap indicator - Only on mobile, only on collapsed state */}
            {isTouchDevice && (
              <AnimatePresence>
                {activeImage !== index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex items-center justify-end pr-3 sm:pr-4"
                  >
                    <div className="bg-white/30 dark:bg-gray-800/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                      <p className="text-xs font-medium text-gray-900 dark:text-white">
                        {tapTo || 'Tap to view'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;
