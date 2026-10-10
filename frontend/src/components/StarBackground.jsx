import { useEffect, useRef } from "react";

export default function StarBackground({ density = 9000 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars = [];
    let frame;
    let lastWidth = 0;

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      lastWidth = w;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((w * h) / density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.25,
        drift: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 0.002 + 0.0005,
        cyan: Math.random() < 0.15,
      }));
    };

    const draw = (t) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const pulse = 0.5 + 0.5 * Math.sin(t * s.twinkle + s.phase);
        ctx.globalAlpha = reduceMotion ? 0.7 : 0.3 + 0.7 * pulse;
        ctx.fillStyle = s.cyan ? "#67e8f9" : "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (!reduceMotion) {
          s.y += s.drift;
          if (s.y > h) {
            s.y = 0;
            s.x = Math.random() * w;
          }
        }
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const onResize = () => {
      // Ignore height-only changes (mobile address bar) so stars don't jump.
      if (window.innerWidth === lastWidth) return;
      init();
      if (reduceMotion) requestAnimationFrame(draw);
    };

    init();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}