import { AnimatePresence, motion } from "framer-motion";

export const PageTurn = ({ isVisible, direction, children, zIndex }) => {
    const variants = {
      enter: (direction) => ({
        rotateY: direction === "next" ? 90 : -90,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
        zIndex: zIndex || 10
      }),
      center: {
        rotateY: 0,
        boxShadow: "5px 0px 20px rgba(0, 0, 0, 0.2)",
        zIndex: zIndex || 20
      },
      exit: (direction) => ({
        rotateY: direction === "next" ? -90 : 90,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.2)",
        zIndex: zIndex || 10
      })
    };
  
    return (
      <AnimatePresence initial={false} custom={direction}>
        {isVisible && (
          <motion.div
            className="absolute inset-0 will-change-transform origin-left perspective-container"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            custom={direction}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden"
            }}
          >
            <div className="absolute inset-0 bg-background">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };