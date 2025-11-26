import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Countdown Timer
const graduationDate = new Date('December 13, 2025 15:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = graduationDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = "¡Es hoy!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = String(days).padStart(2, '0');
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Animations with GSAP
gsap.from(".hero-content", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out",
  delay: 0.5
});

gsap.utils.toArray("section").forEach(section => {
  gsap.from(section.children, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });
});

// Music Control
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '<span class="icon">🎵</span>';
  } else {
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '<span class="icon">⏸</span>';
  }
  isPlaying = !isPlaying;
});

// Simple Particle Effect (Canvas)
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '0';
document.body.prepend(canvas);

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `rgba(212, 175, 55, ${Math.random() * 0.5})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
