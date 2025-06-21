import { useEffect } from "react";

export function MatrixRain() {
  useEffect(() => {
    const container = document.getElementById('matrix-container');
    if (!container) return;

    const chars = '01';
    let intervalId: NodeJS.Timeout;

    const createRainDrop = () => {
      if (Math.random() > 0.7) { // Control frequency
        const span = document.createElement('span');
        span.className = 'matrix-rain-char';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        span.style.left = Math.random() * window.innerWidth + 'px';
        span.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        // Add animation
        span.style.animation = `matrix-rain ${Math.random() * 10 + 10}s linear infinite`;
        
        container.appendChild(span);
        
        // Remove after animation
        setTimeout(() => {
          if (span.parentNode) {
            span.parentNode.removeChild(span);
          }
        }, 20000);
      }
    };

    intervalId = setInterval(createRainDrop, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div 
      id="matrix-container" 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(0, 255, 65, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
          linear-gradient(180deg, hsl(0, 0%, 4%) 0%, hsl(0, 0%, 10%) 100%)
        `
      }}
    />
  );
}
