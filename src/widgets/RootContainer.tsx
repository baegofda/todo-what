import { motion } from 'motion/react';
import { Outlet } from 'react-router-dom';

const RootContainer = () => {
  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      className={'flex flex-col py-2 items-start px-4 gap-y-2'}
    >
      <Outlet />
    </motion.main>
  );
};

export default RootContainer;
