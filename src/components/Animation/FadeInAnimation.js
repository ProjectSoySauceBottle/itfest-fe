"use client";
import { useEffect, useRef } from "react";

/**
 * Props:
 * - direction: 'left' | 'right' | 'bottom' (default: 'bottom')
 * - delay: number (ms, default: 0)
 * - duration: number (ms, default: 700)
 * - once: boolean (default: false) — apakah hanya trigger sekali
 */
export default function FadeIn({
  children,
  direction = "bottom",
  delay = 0,
  duration = 500,
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const animationClassMap = {
      up: "animate-fade-in-up",
      bottom: "animate-fade-in-bottom",
      right: "animate-fade-in-right",
      left: "animate-fade-in-left",
    };

    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.style.animationDuration = `${duration}ms`;
          el.classList.add(
            animationClassMap[direction] || animationClassMap.bottom
          );
        } else if (!once) {
          el.classList.remove(
            animationClassMap[direction] || animationClassMap.bottom
          );
        }

        // Hanya unobserve jika animasi cukup sekali
        if (entry.isIntersecting && once) {
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [direction, delay, duration, once]);

  return (
    <div ref={ref} className={`opacity-0 transition-all ease-out`}>
      {children}
    </div>
  );
}
