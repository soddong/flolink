import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const pageVariants = {
  initial: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }),
  in: {
    x: 0,
    opacity: 1,
    position: 'relative'
  },
  out: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  })
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const AnimatedLayout = ({ children }) => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location.pathname);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocation;
    
    if (currentPath !== prevPath) {
      setDirection(currentPath > prevPath ? 1 : -1);
    }

    setPrevLocation(currentPath);
  }, [location, prevLocation]);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={location.pathname}  
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
