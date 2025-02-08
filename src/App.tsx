import { motion } from 'motion/react';

function App() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Motion HI!
    </motion.div>
  );
}

export default App;
