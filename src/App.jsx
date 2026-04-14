import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import { pageTransition } from './animations/variants';

function MotionRoute({ children }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MotionRoute>
                <HomePage />
              </MotionRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
