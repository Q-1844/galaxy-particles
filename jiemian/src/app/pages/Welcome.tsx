import { useState, FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { StarfieldCanvas, GalaxyPhase } from '../components/StarfieldCanvas';
import { StarlightText } from '../components/StarlightText';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

const VALID_NAMES = ['caoer', '孔甜玉', '张玲华'];

export function Welcome() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errorStr, setErrorStr] = useState('');
  const [shake, setShake] = useState(false);
  
  const [step, setStep] = useState<'input' | 'animating_galaxy' | 'showing_quote' | 'quote_fading' | 'final_button'>('input');
  
  const handleNameSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    if (!VALID_NAMES.includes(name.trim().toLowerCase())) {
      setErrorStr('姓名有误，似乎星辰未曾铭记这个名字。');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    
    setErrorStr('');
    setStep('animating_galaxy');
  };

  useEffect(() => {
    if (step === 'animating_galaxy') {
      const t1 = setTimeout(() => setStep('showing_quote'), 3000);
      return () => clearTimeout(t1);
    }
    if (step === 'showing_quote') {
      // 所有的星辰都奔向那里，所有的爱也都流向那里。银河的中央，是爱的归处，也是我曾守候的初心。
      // Wait for reading
      const t2 = setTimeout(() => setStep('quote_fading'), 9000);
      return () => clearTimeout(t2);
    }
    if (step === 'quote_fading') {
      const t3 = setTimeout(() => setStep('final_button'), 1500);
      return () => clearTimeout(t3);
    }
  }, [step]);

  const canvasPhase: GalaxyPhase = 
    step === 'input' ? 'idle' : 
    (step === 'animating_galaxy' || step === 'showing_quote') ? 'gathering' : 'flowing';

  return (
    <div className="relative w-screen h-screen overflow-hidden text-slate-100 font-sans selection:bg-purple-500/30">
      <StarfieldCanvas phase={canvasPhase} />
      
      {/* Dim overlay that darkens the background subtly when input is active */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none transition-colors",
          step === 'input' ? "bg-black/20" : "bg-black/0"
        )}
        style={{ transitionDuration: '3000ms' }}
      />

      {/* STEP 1: INPUT */}
      <AnimatePresence>
        {step === 'input' && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div 
              className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.1)] w-[90%] max-w-md overflow-hidden"
              animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {/* Decorative glows inside card */}
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <Sparkles className="w-10 h-10 text-purple-300 mb-6 drop-shadow-[0_0_15px_rgba(216,180,254,0.5)]" />
                <h2 className="text-2xl md:text-3xl font-medium tracking-wider mb-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  星海相逢
                </h2>
                <p className="text-sm text-purple-200/60 mb-8 font-light tracking-widest">
                  请输入你的姓名以唤醒星辰
                </p>

                <form onSubmit={handleNameSubmit} className="w-full flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="请输入你的姓名"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-lg placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all shadow-inner"
                    />
                    {errorStr && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-0 w-full text-xs text-pink-400 text-center"
                      >
                        {errorStr}
                      </motion.p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-2xl text-white bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all overflow-hidden mt-4"
                  >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-2xl opacity-30 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"></span>
                    <span className="relative flex items-center gap-2">
                      验证身份
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 2: SHOWING QUOTE */}
      <AnimatePresence>
        {(step === 'showing_quote' || step === 'quote_fading') && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: step === 'showing_quote' ? 1 : 0 }}
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="max-w-2xl text-center flex flex-col items-center">
              <StarlightText 
                text="所有的星辰都奔向那里，"
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-[0.2em] leading-loose mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                delay={0}
              />
              <StarlightText 
                text="所有的爱也都流向那里。"
                className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-[0.2em] leading-loose mb-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                delay={1}
              />
              <StarlightText 
                text="银河的中央，是爱的归处，"
                className="text-xl md:text-2xl lg:text-3xl font-light text-purple-200/80 tracking-[0.15em] leading-relaxed mb-4 drop-shadow-[0_0_8px_rgba(216,180,254,0.3)]"
                delay={2}
              />
              <StarlightText 
                text="也是我曾守候的初心。"
                className="text-xl md:text-2xl lg:text-3xl font-light text-purple-200/80 tracking-[0.15em] leading-relaxed drop-shadow-[0_0_8px_rgba(216,180,254,0.3)]"
                delay={3}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 3: FINAL BUTTON */}
      <AnimatePresence>
        {step === 'final_button' && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-12"
            >
              <StarlightText 
                text={`【${name}】，轻滑滚轮，向中心亮点进发；抵达后，拖动视野`}
                className="text-sm md:text-base lg:text-lg font-light text-blue-100/90 tracking-widest drop-shadow-[0_0_8px_rgba(191,219,254,0.6)] animate-pulse"
                delay={0}
              />
            </motion.div>

            <motion.button
              onClick={() => navigate('/galaxy')}
              className="group relative px-10 py-5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1, type: "spring" }}
            >
              {/* Button internal glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              
              <span className="relative flex items-center gap-3 text-lg md:text-xl font-medium tracking-[0.2em] text-white">
                进入爱河
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}