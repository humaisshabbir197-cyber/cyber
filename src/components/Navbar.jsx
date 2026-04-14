import { motion } from 'framer-motion';

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="sticky top-4 z-40 mx-auto mt-4 w-[92%] max-w-6xl"
    >
      <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3 shadow-glow">
        <a href="#home" className="text-sm font-semibold tracking-[0.22em] text-cyan-200 uppercase">
          CYBER STUDIO
        </a>
        <div className="hidden items-center gap-5 sm:flex">
          {links.map((link) => (
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              key={link.href}
              href={link.href}
              className="text-sm text-slate-200 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
