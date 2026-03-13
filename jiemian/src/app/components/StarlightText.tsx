import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface Props {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function StarlightText({ text, delay = 0, className, onComplete }: Props) {
  const letters = Array.from(text);
  
  return (
    <motion.div 
      className={cn("flex flex-wrap justify-center", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          }
        }
      }}
      onAnimationComplete={onComplete}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="relative inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, filter: 'blur(10px) brightness(2)', y: 10 },
            visible: { 
              opacity: 1, 
              filter: 'blur(0px) brightness(1)', 
              y: 0,
              transition: { duration: 1, ease: "easeOut" }
            }
          }}
        >
          {char}
          {/* Subtle particle flash on reveal */}
          <motion.span
            className="absolute inset-0 bg-blue-300 rounded-full blur-[4px] mix-blend-screen pointer-events-none"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: { 
                opacity: [0, 0.8, 0], 
                scale: [0.5, 1.5, 0],
                transition: { duration: 1, times: [0, 0.2, 1] }
              }
            }}
          />
        </motion.span>
      ))}
    </motion.div>
  );
}