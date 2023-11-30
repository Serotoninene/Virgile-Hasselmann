export const containerAnim = {
  hidden: {},
  show: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
  exit: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
};

export const letterAnim = {
  hidden: {
    y: 400,
    transition: {
      ease: ease,
      duration: duration,
    },
  },
  show: {
    y: 0,
    transition: {
      ease: ease,
      duration: duration,
    },
  },
  exit: {
    y: -400,
    transition: {
      ease: ease,
      duration: duration,
    },
  },
};
