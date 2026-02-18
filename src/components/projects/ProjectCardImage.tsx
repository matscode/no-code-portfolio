"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/components/Tag/Tag";
import { useProjectHintStore } from "@/lib/store/project-hint-store";
import { cn } from "@/lib/utils";

interface ProjectCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProjectCardImage({ src, alt, className }: ProjectCardImageProps) {
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const hasInteracted = useProjectHintStore((state) => state.hasInteracted);
  const hasHydrated = useProjectHintStore((state) => state.hasHydrated);
  const setInteracted = useProjectHintStore((state) => state.setInteracted);
  const canZoomOut = isLoaded && scale > 1.02;
  const showHint = hasHydrated && !hasInteracted && canZoomOut;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isClicked) {
      timer = setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isClicked]);

  const handleClick = () => {
    if (!canZoomOut) return;
    setIsClicked(true);
    if (!hasInteracted) {
      setInteracted();
    }
  };

  const calculateScale = (img: HTMLImageElement) => {
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const imgAspect = naturalWidth / naturalHeight;

    if (containerRef.current && naturalWidth > 0 && naturalHeight > 0) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const containerAspect = containerWidth / containerHeight;

      const scaleFactor = Math.max(imgAspect / containerAspect, containerAspect / imgAspect);
      setScale(scaleFactor);
      setIsLoaded(true);
    }
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    calculateScale(event.currentTarget);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      calculateScale(imgRef.current);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-shadow-grey-100 dark:bg-shadow-grey-800",
        className,
      )}
      onMouseEnter={handleClick}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${alt} details`}
    >
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: 1,
          scale: isClicked ? 1 : (isLoaded ? (canZoomOut ? scale : 1) : 1.1),
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: {
            duration: isClicked ? 0.3 : 1.2,
            ease: isClicked ? "easeOut" : [0.22, 1, 0.36, 1]
          },
        }}
        onLoad={handleImageLoad}
      />
      
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute bottom-3 right-3 z-10"
          >
            <Tag>
              Tap / Hover
            </Tag>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
