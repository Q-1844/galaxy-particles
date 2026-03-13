import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export function Galaxy() {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const showBackButton = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      showBackButton.current = true;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        src="./galaxy.html"
        className="absolute inset-0 w-full h-full border-0"
        title="银河粒子3D场景"
      />
      
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 bg-black/30 hover:bg-black/50 backdrop-blur-md transition-all duration-300 text-white/80 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="tracking-widest text-sm">返回星海边缘</span>
      </motion.button>
    </div>
  );
}