import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

const LazyImage = ({ src, alt, className, fallback, ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!isLoaded && fallback && (
        <div className={cn("absolute inset-0", className)}>
          {fallback}
        </div>
      )}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </>
  );
};

export { LazyImage };