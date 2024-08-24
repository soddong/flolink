import { motion, AnimatePresence } from 'framer-motion';

const AnimatedLayout2 = ({ children }) => {
    return (
        <AnimatePresence>
            <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimatedLayout2;