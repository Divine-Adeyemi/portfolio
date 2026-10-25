import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WORD = "DIVINE";
const BRAND = "#22c55e";

const easeIn = gsap.parseEase("expo.out");
const easeOut = gsap.parseEase("sine.inOut");
const clamp01 = (v) => Math.max(0, Math.min(1, v));

export const IntroLoader = ({ onReveal, onComplete }) => {
  const loaderRef = useRef(null);
  const canvasRef = useRef(null);
  // Keep the latest callbacks without restarting the timeline on re-render
  const callbacks = useRef({ onReveal, onComplete });
  useEffect(() => {
    callbacks.current = { onReveal, onComplete };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let alive = true;
    let tl;

    const run = async () => {
      try {
        await document.fonts.load('700 100px "Clash Display"');
      } catch {
        /* fall back to the default font */
      }
      if (!alive) return;

      window.scrollTo(0, 0);

      const ink =
        getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#fff";

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.floor(window.innerWidth * dpr);
      const H = Math.floor(window.innerHeight * dpr);
      canvas.width = W;
      canvas.height = H;

      // Render the word once, then sample it into pixel targets
      const src = document.createElement("canvas");
      src.width = W;
      src.height = H;
      const sctx = src.getContext("2d", { willReadFrequently: true });
      const fontSize = Math.min(W / (WORD.length * 0.62), H * 0.4);
      sctx.fillStyle = "#fff";
      sctx.textAlign = "center";
      sctx.textBaseline = "middle";
      sctx.font = `700 ${fontSize}px "Clash Display", Inter, sans-serif`;
      sctx.fillText(WORD, W / 2, H / 2);
      const data = sctx.getImageData(0, 0, W, H).data;

      const gap = Math.max(3, Math.round(fontSize / 38));
      const size = Math.max(2, gap - 1);
      const particles = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] < 128) continue;
          particles.push({
            tx: x,
            ty: y,
            sx: Math.random() * W,
            sy: Math.random() * H,
            // on exit the pixels drift gently upward and sideways, like dust settling into the stars
            ex: x + (Math.random() - 0.5) * W * 0.3,
            ey: y - H * (0.05 + Math.random() * 0.25),
            delay: Math.random() * 0.45,
            exitDelay: Math.random() * 0.3,
            color: Math.random() < 0.12 ? BRAND : ink,
          });
        }
      }

      // gather: 0 = scattered, 1 = word; leave: 0 = word, 1 = scattered away
      const state = { gather: 0, leave: 0 };

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) {
          const g = easeIn(clamp01((state.gather - p.delay) / (1 - 0.45)));
          const l = easeOut(clamp01((state.leave - p.exitDelay) / (1 - 0.3)));
          let x = p.sx + (p.tx - p.sx) * g;
          let y = p.sy + (p.ty - p.sy) * g;
          x += (p.ex - p.tx) * l;
          y += (p.ey - p.ty) * l;
          ctx.globalAlpha = Math.min(g * 2, 1) * (1 - l);
          if (ctx.globalAlpha <= 0.01) continue;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.round(x), Math.round(y), size, size);
        }
        ctx.globalAlpha = 1;
      };

      draw();

      tl = gsap.timeline({
        onComplete: () => callbacks.current.onComplete?.(),
        onUpdate: draw,
      });

      tl.to(state, { gather: 1, duration: 2, ease: "none", delay: 0.3 })
        .to({}, { duration: 0.5 }) // hold the finished word
        // One continuous hand-off: the pixels drift off while the dark overlay dissolves
        // and the page rises in underneath, all overlapping
        .to(state, { leave: 1, duration: 1.8, ease: "none" })
        .to(
          loaderRef.current,
          {
            opacity: 0,
            duration: 1.4,
            ease: "sine.inOut",
            onStart: () => callbacks.current.onReveal?.(),
          },
          "<0.1"
        );
    };

    run();

    return () => {
      alive = false;
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-void overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label={WORD}
      />
    </div>
  );
};
