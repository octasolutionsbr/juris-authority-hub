import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

// Hexagon Icon component that matches the brand
const HexagonIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 60 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Top left hexagon */}
    <path
      d="M8 8 L18 3 L28 8 L28 18 L18 23 L8 18 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Top right hexagon */}
    <path
      d="M32 8 L42 3 L52 8 L52 18 L42 23 L32 18 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Bottom center hexagon */}
    <path
      d="M20 25 L30 20 L40 25 L40 35 L30 40 L20 35 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const Logo = ({ variant = "light", className }: LogoProps) => {
  const isDark = variant === "dark";
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Text Section */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-script text-3xl tracking-wide",
            isDark ? "text-primary" : "text-white"
          )}
        >
          Juris
        </span>
        <span
          className={cn(
            "font-heading text-sm tracking-[0.3em] uppercase -mt-1",
            isDark ? "text-foreground" : "text-white"
          )}
        >
          Company
        </span>
      </div>
      
      {/* Hexagon Icon */}
      <HexagonIcon 
        className={cn(
          "w-10 h-10",
          isDark ? "text-primary" : "text-white"
        )} 
      />
    </div>
  );
};

export default Logo;
