import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Gallery = ({ t }) => {
  // We can programmatically generate the array if the structure is consistent
  const images = Array.from({ length: 9 }, (_, i) => {
    const id = i + 1;
    return {
      src: `/assets/${id}.jpg`, // Path relative to the public folder
      alt: t(`gallery.alt.${id}`), // Assuming you have translations for alt text
      code: `# ${id.toString().padStart(2, '0')}`,
    };
  });

  return (
    <section className="max-w-5xl mx-auto mb-16">
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-foreground">
            <span className="relative z-1">
              {t.galleryTitle}
              <span className="bg-primary absolute bottom-1 left-0 -z-1 h-px w-full" aria-hidden="true"></span>
            </span>{" "}
            {t.gallerySubtitle}
          </CardTitle>
          <p className="text-muted-foreground text-lg text-center mt-2">
            {t.galleryDescription}
          </p>
        </CardHeader>
        <CardContent>
          {/* Hover Expand Gallery */}
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-muted/30 py-12">
            <HoverExpandGallery className="" images={images} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const HoverExpandGallery = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full flex-col items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ height: "2.5rem", width: "24rem" }}
              animate={{
                height: activeImage === index ? "24rem" : "2.5rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/50 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end px-4 pb-5"
                  >
                    <p className="text-left text-xs text-white/50">
                      {image.code}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img
                src={image.src}
                className="size-full object-cover"
                alt={image.alt}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Gallery;
