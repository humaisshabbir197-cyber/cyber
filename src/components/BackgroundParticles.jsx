import { motion } from 'framer-motion';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 5 + (i % 5) * 3,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  duration: 5 + (i % 6),
  delay: (i % 4) * 0.4,
}));

export default function BackgroundParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/30 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 5, 0],
            x: [0, 12, -6, 0],
            opacity: [0.1, 0.55, 0.22, 0.1],
            scale: [1, 1.3, 0.85, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
