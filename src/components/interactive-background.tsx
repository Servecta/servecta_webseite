'use client';

import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.size > 0.2) this.size -= 0.05;

      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const createParticle = (e?: MouseEvent) => {
      const x = e ? e.x : Math.random() * canvas.width;
      const y = e ? e.y : Math.random() * canvas.height;
      const size = Math.random() * 5 + 1;
      const speedX = Math.random() * 3 - 1.5;
      const speedY = Math.random() * 3 - 1.5;
      const color = `oklch(0.55 0.2 250 / ${Math.random() * 0.5 + 0.2})`;
      particlesRef.current.push(new Particle(x, y, size, speedX, speedY, color));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update(canvas);
        particlesRef.current[i].draw(ctx);

        if (particlesRef.current[i].size <= 0.3) {
          particlesRef.current.splice(i, 1);
          i--;
        }
      }
      requestAnimationFrame(animate);
    };

    // Initial particles
    for (let i = 0; i < 50; i++) {
      createParticle();
    }

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        createParticle(e);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-bg" />;
};

export default InteractiveBackground;
