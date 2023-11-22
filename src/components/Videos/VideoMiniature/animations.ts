// animations.tsx
export const duration = 0.7;
export const ease = [0.6, 0.01, 0.05, 0.95];

export const containerAnim = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.4,
    },
  },
};

export const photoAnim = {
  hidden: { y: "-100%", transition: { duration: 0.4 } },
  visible: { y: 0, transition: { duration, ease } },
};

export const textAnim = {
  hidden: { opacity: 0, transition: { duration } },
  visible: {
    opacity: 1,
    transition: { duration, ease },
  },
};
