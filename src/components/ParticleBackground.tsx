"use client";

import { useEffect, useRef } from "react";

// انواع داده مشخص برای CreateJS
interface CreateJSGraphics {
  beginFill: (color: string) => CreateJSGraphics;
  drawCircle: (x: number, y: number, r: number) => CreateJSGraphics;
  beginStroke: (color: string) => CreateJSGraphics;
  setStrokeStyle: (width: number) => CreateJSGraphics;
}

// ++ خطا برطرف شد: به جای interface خالی از type object استفاده می‌کنیم ++
type CreateJSFilter = object;

interface CreateJSShape {
  alpha: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  graphics: CreateJSGraphics;
  filters: CreateJSFilter[];
  cache: (...args: number[]) => void;

  // پراپرتی‌های سفارشی ما
  initX: number;
  initY: number;
  speed: number;
  distance: number;
  alphaMax: number;
  ballwidth: number;
  flag: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createjs: any;
    TweenMax: {
      to: (target: object, duration: number, vars: object) => void;
    };
    Cubic: {
      easeInOut: object;
    };
  }
}

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || !canvasRef.current) return;
    isInitialized.current = true;

    let cleanupFunction: (() => void) | null = null;

    const initialize = async () => {
      try {
        await loadScript("https://code.createjs.com/1.0.0/createjs.min.js");
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js"
        );
      } catch (error) {
        console.error("Failed to load animation scripts:", error);
        return;
      }

      const canvas = canvasRef.current;
      if (
        !canvas ||
        typeof window.createjs === "undefined" ||
        typeof window.TweenMax === "undefined"
      ) {
        return;
      }

      const range = (min: number, max: number) =>
        min + (max - min) * Math.random();
      const weightedRange = (
        to: number,
        from: number,
        decimalPlaces: number,
        weightedRange: [number, number],
        weightStrength: number
      ) => {
        let ret;
        if (Math.random() <= weightStrength) {
          ret =
            Math.random() * (weightedRange[1] - weightedRange[0]) +
            weightedRange[0];
        } else {
          ret = Math.random() * (to - from) + from;
        }
        return parseFloat(ret.toFixed(decimalPlaces));
      };

      const stage = new window.createjs.Stage(canvas);
      stage.compositeOperation = "lighter";

      let totalWidth = (canvas.width = canvas.offsetWidth);
      let totalHeight = (canvas.height = canvas.offsetHeight);

      const particleSettings = [
        {
          num: 300,
          ballwidth: 3,
          alphamax: 0.4,
          areaHeight: 0.5,
          color: "#0cdbf3",
          fill: false,
        },
        {
          num: 100,
          ballwidth: 8,
          alphamax: 0.3,
          areaHeight: 1,
          color: "#6fd2f3",
          fill: true,
        },
        {
          num: 10,
          ballwidth: 30,
          alphamax: 0.2,
          areaHeight: 1,
          color: "#93e9f3",
          fill: true,
        },
      ];

      const animateBall = (ball: CreateJSShape) => {
        const scale = range(0.3, 1);
        const xpos = range(
          ball.initX - ball.distance,
          ball.initX + ball.distance
        );
        const ypos = range(
          ball.initY - ball.distance,
          ball.initY + ball.distance
        );

        window.TweenMax.to(ball, ball.speed, {
          scaleX: scale,
          scaleY: scale,
          x: xpos,
          y: ypos,
          onComplete: animateBall,
          onCompleteParams: [ball],
          ease: window.Cubic.easeInOut,
        });
        window.TweenMax.to(ball, ball.speed / 2, {
          alpha: range(0.1, ball.alphaMax),
          onComplete: fadeout,
          onCompleteParams: [ball],
        });
      };
      const fadeout = (ball: CreateJSShape) => {
        ball.speed = range(2, 10);
        window.TweenMax.to(ball, ball.speed / 2, { alpha: 0 });
      };

      particleSettings.forEach((ball) => {
        for (let s = 0; s < ball.num; s++) {
          const circle = new window.createjs.Shape() as CreateJSShape;
          if (ball.fill) {
            circle.graphics
              .beginFill(ball.color)
              .drawCircle(0, 0, ball.ballwidth);
            const blurFilter = new window.createjs.BlurFilter(
              ball.ballwidth / 2,
              ball.ballwidth / 2,
              1
            );
            circle.filters = [blurFilter];
            const bounds = blurFilter.getBounds();
            circle.cache(
              -50 + bounds.x,
              -50 + bounds.y,
              100 + bounds.width,
              100 + bounds.height
            );
          } else {
            circle.graphics
              .beginStroke(ball.color)
              .setStrokeStyle(1)
              .drawCircle(0, 0, ball.ballwidth);
          }

          circle.alpha = range(0.1, 0.1);
          circle.alphaMax = ball.alphamax;
          circle.distance = ball.ballwidth * 2;
          circle.speed = range(2, 10);
          circle.initY = weightedRange(
            totalHeight,
            0,
            1,
            [
              (totalHeight * (2 - ball.areaHeight / 2)) / 4,
              (totalHeight * (2 + ball.areaHeight / 2)) / 4,
            ],
            0.8
          );
          circle.initX = weightedRange(
            totalWidth,
            0,
            1,
            [totalWidth / 4, (totalWidth * 3) / 4],
            0.6
          );
          circle.y = circle.initY;
          circle.x = circle.initX;
          circle.ballwidth = ball.ballwidth;
          circle.flag = "";

          stage.addChild(circle);
          animateBall(circle);
        }
      });

      const ticker = (event: object) => stage.update(event);
      window.createjs.Ticker.addEventListener("tick", ticker);

      const onResize = () => {
        if (!canvas) return;
        totalWidth = canvas.width = canvas.offsetWidth;
        totalHeight = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener("resize", onResize);

      cleanupFunction = () => {
        window.removeEventListener("resize", onResize);
        if (window.createjs && window.createjs.Ticker) {
          window.createjs.Ticker.removeEventListener("tick", ticker);
        }
        stage.removeAllChildren();
      };
    };

    initialize();

    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="projector"
        className="absolute top-0 left-0 h-full w-full"
      />
      <style jsx global>{`
        body {
          background: #191d1e;
          background: linear-gradient(0deg, #191d1e 50%, #283139 100%);
          background-attachment: fixed;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default ParticleBackground;
