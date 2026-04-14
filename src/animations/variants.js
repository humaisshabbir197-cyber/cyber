export const easeInOut = [0.42, 0, 0.58, 1];

export const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeInOut } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.45, ease: easeInOut } },
};

export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const fadeSlideUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeInOut },
  },
};

export const fadeSlideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeInOut },
  },
};

export const fadeSlideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeInOut },
  },
};
