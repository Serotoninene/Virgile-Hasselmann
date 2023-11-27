// Framer motion variants
export const containerAnim = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};
export const itemsAnim = {
  hidden: { y: -50, opacity: 0 },
  shown: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      transition: [0.3, 0.01, -0.05, 0.95],
    },
  },
};
