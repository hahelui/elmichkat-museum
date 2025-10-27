import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Gallery = ({ t }: { t: any }) => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=800&fit=crop",
      alt: "Vintage pottery collection",
      code: "# 01",
    },
    {
      src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop",
      alt: "Handwoven textiles",
      code: "# 02",
    },
    {
      src: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&h=800&fit=crop",
      alt: "Historical artifacts",
      code: "# 03",
    },
    {
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
      alt: "Handmade jewelry",
      code: "# 04",
    },
    {
      src: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=800&fit=crop",
      alt: "Vintage books",
      code: "# 05",
    },
    {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop",
      alt: "Decorative items",
      code: "# 06",
    },
    {
      src: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&h=800&fit=crop",
      alt: "Antique furniture",
      code: "# 07",
    },
    {
      src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop",
      alt: "Traditional crafts",
      code: "# 08",
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=800&fit=crop",
      alt: "Artisan goods",
      code: "# 09",
    },
  ];

  return (
    <section className="mb-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="bg-card/80 backdrop-blur rounded-lg shadow-sm border border-border p-8">
          {/* Header */}
          <div className="mb-8 space-y-4 text-center">
            <h2 className="text-3xl font-semibold text-foreground">
              <span className="relative z-1">
                {t.galleryTitle}
                <span className="bg-primary absolute bottom-1 left-0 -z-1 h-px w-full" aria-hidden="true"></span>
              </span>{" "}
              {t.gallerySubtitle}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.galleryDescription}
            </p>
          </div>

          {/* Hover Expand Gallery */}
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-muted/30 py-12">
            <HoverExpandGallery className="" images={images} />
          </div>
        </div>
      </div>
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
