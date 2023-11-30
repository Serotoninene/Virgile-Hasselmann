export const getAnimations = (
  delay: number,
  duration: number,
  ease: string | number[]
) => {
  return {
    containerAnim: {
      hidden: {},
      show: {
        transition: {
          delayChildren: delay,
          staggerChildren: 0.07,
        },
      },
      exit: {
        transition: {
          delayChildren: delay,
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
      },
    },

    letterAnim: {
      hidden: {
        y: "110%",
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
    },
  };
};
