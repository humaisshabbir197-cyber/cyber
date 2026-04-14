import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          className="h-24 w-24 rounded-full border-2 border-cyan-400/30 border-t-cyan-300"
        />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.96, 1.08, 0.96] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="absolute text-xs uppercase tracking-[0.4em] text-cyan-200"
        >
          Loading
        </motion.span>
      </div>
    </motion.div>
  );
}
