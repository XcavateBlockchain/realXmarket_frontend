import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ClickAnimation({
  children,
  onClick,
  className,
  stopPropagation,
  disabled
}: any) {
  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.();
  };
  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(`cursor-pointer ${className}`, { 'pointer-events-none': disabled })}
    >
      {children}
    </motion.div>
  );
}
