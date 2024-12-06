import React, { useRef, useEffect } from 'react';


class Firefly {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth; // Firefly's x-coordinate
    this.y = Math.random() * canvasHeight; // Firefly's y-coordinate
    this.size = Math.random() * 2 + 1; // Size of the firefly
    this.speedX = (Math.random() - 0.5) * 2; // Speed and direction of the firefly on the x-axis
    this.speedY = (Math.random() - 0.5) * 2; // Speed and direction of the firefly on the y-axis
    this.color = 'rgba(255, 255, 0, 0.7)'; // Color of the firefly
  }
  // Method to update the firefly's position
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Use this.canvasWidth and this.canvasHeight instead of canvas.width and canvas.height
    if (this.x < 0 || this.x > this.canvasWidth) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > this.canvasHeight) {
      this.speedY *= -1;
    }
  }


  // Method to draw the firefly on the canvas
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    // Set the shadow or glow effect
    ctx.shadowBlur = 10; // Adjust the blur radius to get the desired glow effect
    ctx.shadowColor = this.color; // Use the same color for the glow
    
    ctx.fillStyle = this.color;
    ctx.fill();
    
    // Reset the shadow or glow effect so it doesn't affect other canvas elements
    ctx.shadowBlur = 0;
  }
}

const Fireflies = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Firefly class setup would go here (see previous JavaScript example)

    let fireflies = [];
    for (let i = 0; i < Math.floor(Math.random() * (25 - 15 + 1)) + 15; i++) {
      // Initialize fireflies
      fireflies.push(new Firefly(canvas.width, canvas.height));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw(ctx);
      });
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Handle window resizing
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize fireflies to new canvas size
      fireflies = [];
      for (let i = 0; i < 50; i++) {
        fireflies.push(new Firefly(canvas.width, canvas.height));
      }
    }

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cancel the animation frame request when the component unmounts
      const id = window.requestAnimationFrame(() => {});
      window.cancelAnimationFrame(id);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireflies-canvas" />;
};

export default Fireflies;

