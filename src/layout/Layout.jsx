import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-hero-gradient" />
      <AnimatePresence mode="wait">{loading ? <Loader key="loader" /> : null}</AnimatePresence>
      {!loading && (
        <>
          <Navbar />
          <main>{children}</main>
        </>
      )}
    </div>
  );
}
