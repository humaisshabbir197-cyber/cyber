const revealTargets = document.querySelectorAll('[data-animate], [data-stagger]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((node, idx) => {
  if (node.hasAttribute('data-stagger')) {
    node.style.transitionDelay = `${Math.min(idx * 50, 350)}ms`;
  }
  observer.observe(node);
});

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
});

window.addEventListener('mousemove', (event) => {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;
  document.querySelectorAll('.blob').forEach((blob, index) => {
    const depth = (index + 1) * 7;
    blob.style.transform = `translate(${(x - 0.5) * depth}px, ${(y - 0.5) * depth}px)`;
  });
});
