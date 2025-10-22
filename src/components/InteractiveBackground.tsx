import { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const bubblePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize bubble position
    bubblePos.current = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly move bubble towards mouse (easing)
      bubblePos.current.x += (mousePos.current.x - bubblePos.current.x) * 0.05;
      bubblePos.current.y += (mousePos.current.y - bubblePos.current.y) * 0.05;

      // Create gradient for bubble
      const gradient = ctx.createRadialGradient(
        bubblePos.current.x,
        bubblePos.current.y,
        0,
        bubblePos.current.x,
        bubblePos.current.y,
        300
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(226, 232, 240, 0.08)');
      gradient.addColorStop(1, 'rgba(226, 232, 240, 0)');

      // Draw bubble
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(bubblePos.current.x, bubblePos.current.y, 300, 0, Math.PI * 2);
      ctx.fill();

      // Add secondary smaller bubble with offset
      const offsetX = Math.sin(Date.now() * 0.001) * 100;
      const offsetY = Math.cos(Date.now() * 0.001) * 100;
      
      const gradient2 = ctx.createRadialGradient(
        bubblePos.current.x + offsetX,
        bubblePos.current.y + offsetY,
        0,
        bubblePos.current.x + offsetX,
        bubblePos.current.y + offsetY,
        150
      );
      
      gradient2.addColorStop(0, 'rgba(241, 245, 249, 0.12)');
      gradient2.addColorStop(0.5, 'rgba(226, 232, 240, 0.06)');
      gradient2.addColorStop(1, 'rgba(226, 232, 240, 0)');

      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.arc(
        bubblePos.current.x + offsetX,
        bubblePos.current.y + offsetY,
        150,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default InteractiveBackground;
