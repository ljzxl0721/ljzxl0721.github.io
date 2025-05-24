// Particle class definition
class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = options.x || Math.random() * canvas.width;
    this.y = options.y || Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = options.color || '#ff3333';
    this.opacity = Math.random() * 0.5 + 0.3;
    this.blinking = Math.random() > 0.5;
    this.blinkSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;

    if (this.blinking) {
      this.opacity += Math.sin(Date.now() * this.blinkSpeed) * 0.01;
      this.opacity = Math.max(0.2, Math.min(0.8, this.opacity));
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
    this.ctx.fill();
    this.ctx.restore();
  }
}

// ParticleSystem class definition
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrameId = null;
    this.options = {
      particleCount: options.particleCount || 100,
      colors: options.colors || ['#ff3333', '#0099cc'],
      connectionRadius: options.connectionRadius || 100,
      connectionOpacity: options.connectionOpacity || 0.3
    };

    this.init();
    this.animate();
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  init() {
    this.container.appendChild(this.canvas);
    this.resize();

    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push(
        new Particle(this.canvas, {
          color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)]
        })
      );
    }
  }

  resize() {
    this.canvas.width = this.container.offsetWidth || window.innerWidth;
    this.canvas.height = this.container.offsetHeight || window.innerHeight;
  }

  handleResize() {
    this.resize();
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectionRadius) {
          const opacity = (1 - distance / this.options.connectionRadius) * this.options.connectionOpacity;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.particles = [];
  }
}

// Export the classes for use in other files
window.ParticleSystem = ParticleSystem;
window.Particle = Particle; 