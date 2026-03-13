import { useEffect, useRef } from 'react';

export type GalaxyPhase = 'idle' | 'gathering' | 'flowing';

interface Star {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  orbitRadius: number;
}

export function StarfieldCanvas({ phase }: { phase: GalaxyPhase }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // To track mouse interactions
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX - width / 2;
      mouse.current.y = e.clientY - height / 2;
      mouse.current.active = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color palette for stars
    const colors = ['#ffffff', '#e0f2fe', '#c084fc', '#818cf8', '#38bdf8'];
    
    const STARS_COUNT = 1500;
    const stars: Star[] = [];

    // Initialize stars
    for (let i = 0; i < STARS_COUNT; i++) {
      // Idle base position: spread uniformly in a large sphere
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 200 + Math.random() * 1000;

      const baseX = r * Math.sin(phi) * Math.cos(theta);
      const baseY = r * Math.sin(phi) * Math.sin(theta);
      const baseZ = r * Math.cos(phi);

      // Target position: spiral galaxy
      const armIndex = i % 3; // 3 spiral arms
      const orbitRadius = Math.random() * 600 + 20; // Distance from center
      const angleOffset = (armIndex * 2 * Math.PI) / 3;
      // The further out, the more it spirals
      const spiralAngle = angleOffset + orbitRadius * 0.01;
      
      const targetX = Math.cos(spiralAngle) * orbitRadius;
      const targetZ = Math.sin(spiralAngle) * orbitRadius;
      // Galaxy disk is thin
      const targetY = (Math.random() - 0.5) * (15000 / (orbitRadius + 50));

      stars.push({
        x: baseX,
        y: baseY,
        z: baseZ,
        baseX,
        baseY,
        baseZ,
        targetX,
        targetY,
        targetZ,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 0.5,
        angle: spiralAngle,
        speed: 0.002 + Math.random() * 0.003,
        orbitRadius,
      });
    }

    let transitionProgress = phase === 'idle' ? 0 : 1;
    let globalRotation = 0;
    let animationFrameId: number;
    let lastTime = performance.now();

    // Mouse trailing particles
    const trails: {x: number, y: number, life: number, maxLife: number, vx: number, vy: number, color: string}[] = [];

    const draw = (time: number) => {
      const dt = Math.min(time - lastTime, 50); // limit dt to avoid jumps
      lastTime = time;

      // Update transition progress smoothly
      if (phase === 'gathering' || phase === 'flowing') {
        transitionProgress = Math.min(1, transitionProgress + dt * 0.0003); // ~3 seconds to gather
      } else if (phase === 'idle') {
        transitionProgress = Math.max(0, transitionProgress - dt * 0.0003);
      }

      globalRotation += dt * 0.0002;

      // Deep space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#02000d');
      gradient.addColorStop(0.5, '#07051a');
      gradient.addColorStop(1, '#0f0c29');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 400;

      // Draw stars
      stars.forEach(star => {
        // Interpolate between base sphere and target spiral disk
        const ease = 1 - Math.pow(1 - transitionProgress, 3); // easeOutCubic
        
        // If gathering/flowing, slowly rotate the spiral angles
        if (ease > 0) {
          star.angle += star.speed * dt * 0.05 * ease;
          star.targetX = Math.cos(star.angle) * star.orbitRadius;
          star.targetZ = Math.sin(star.angle) * star.orbitRadius;
        }

        let currentX = star.baseX * (1 - ease) + star.targetX * ease;
        let currentY = star.baseY * (1 - ease) + star.targetY * ease;
        let currentZ = star.baseZ * (1 - ease) + star.targetZ * ease;

        // Apply a global 3D tilt and rotation to view the galaxy nicely
        // Rotate around Y
        const ry = globalRotation;
        const x1 = currentX * Math.cos(ry) - currentZ * Math.sin(ry);
        const z1 = currentZ * Math.cos(ry) + currentX * Math.sin(ry);
        
        // Tilt around X
        const rx = 0.6; // tilt angle
        const y2 = currentY * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = z1 * Math.cos(rx) + currentY * Math.sin(rx);
        
        const x2 = x1;

        // Add slow constant drift if idle
        if (phase === 'idle') {
          star.baseY += dt * 0.02;
          if (star.baseY > 1000) star.baseY = -1000;
        }

        // Project 3D to 2D
        const scale = fov / (fov + z2 + 800); // 800 is distance from camera
        
        if (z2 + 800 > 0) { // behind camera check
          const px = x2 * scale + centerX;
          const py = y2 * scale + centerY;
          
          // Parallax mouse effect
          const mouseOffsetX = mouse.current.active ? (mouse.current.x * scale * 0.5) : 0;
          const mouseOffsetY = mouse.current.active ? (mouse.current.y * scale * 0.5) : 0;
          
          const finalX = px - mouseOffsetX;
          const finalY = py - mouseOffsetY;

          const size = Math.max(0.1, star.size * scale * (1 + ease * 0.5));
          
          // Slight glow effect for stars
          ctx.beginPath();
          ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
          
          // Fade alpha based on distance
          const alpha = Math.min(1, Math.max(0, scale * 1.5));
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha * (0.3 + 0.7 * Math.random()); // twinkle
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Mouse trails logic
      if (mouse.current.active && Math.random() > 0.3) {
        trails.push({
          x: mouse.current.x + centerX,
          y: mouse.current.y + centerY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: 20 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life++;
        t.x += t.vx;
        t.y += t.vy;
        
        if (t.life >= t.maxLife) {
          trails.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2 * (1 - t.life / t.maxLife), 0, Math.PI * 2);
          ctx.fillStyle = t.color;
          ctx.globalAlpha = 1 - t.life / t.maxLife;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10 bg-[#02000d]"
    />
  );
}