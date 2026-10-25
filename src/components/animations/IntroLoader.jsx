import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const WORD = "DIVINE";
const BRAND = "#22c55e";

const easeIn = gsap.parseEase("expo.out");
const easeOut = gsap.parseEase("power3.in");
const clamp01 = (v) => Math.max(0, Math.min(1, v));

export const IntroLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const canvasRef = useRef(null);

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
            ex: x + (Math.random() - 0.5) * W * 0.8,
            ey: y + (Math.random() - 0.5) * H * 0.8,
            delay: Math.random() * 0.45,
            exitDelay: Math.random() * 0.4,
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
          const l = easeOut(clamp01((state.leave - p.exitDelay) / (1 - 0.4)));
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
        onComplete: () => onComplete && onComplete(),
        onUpdate: draw,
      });

      tl.to(state, { gather: 1, duration: 2, ease: "none", delay: 0.3 })
        .to({}, { duration: 0.6 }) // hold the finished word
        .to(state, { leave: 1, duration: 0.9, ease: "none" })
        .to(
          loaderRef.current,
          { y: "-100%", duration: 0.5, ease: "expo.inOut" },
          "-=0.2"
        );
    };

    run();

    return () => {
      alive = false;
      if (tl) tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-void overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label={WORD}
      />
    </div>
  );
};
