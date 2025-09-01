import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeUp from "@/animation/fade-up";

export default function LandingHero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particles setup
    const particles: {
      x: number; 
      y: number; 
      size: number; 
      speedX: number; 
      speedY: number;
      color: string;
    }[] = [];

    // Create initial particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `hsla(${Math.random() * 360}, 70%, 60%, ${Math.random() * 0.4 + 0.1})`
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    setIsVisible(true);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const gradientVariants = {
    hidden: { 
      backgroundPosition: '0% 50%',
      opacity: 0 
    },
    visible: { 
      backgroundPosition: '100% 50%',
      opacity: 1,
      transition: {
        backgroundPosition: {
          duration: 8,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        },
        opacity: { duration: 0.8 }
      }
    }
  };

  return (
    <motion.section
      animate={{
        transform: `translateY(${progress * 20}vh)`,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      ref={ref}
      className="pointer-events-none flex max-h-[1000px] min-h-[calc(100vh-200px)] items-center px-6 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20 relative overflow-hidden"
    >
      {/* Animated background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ zIndex: -1 }}
      />
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: 'linear-gradient(270deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)',
          backgroundSize: '400% 400%',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="w-full relative z-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <motion.span 
                className="text-lg font-medium text-zinc-700 dark:text-zinc-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Hello, I'm
              </motion.span>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-6xl font-bold sm:text-7xl md:text-8xl xl:text-9xl pb-2"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #ef4444)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Amit Chauhan
              </motion.h1>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <motion.span 
                className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 md:text-4xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                Software Developer
              </motion.span>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8 max-w-3xl">
              <motion.p 
                className="text-lg font-medium text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                I am a software developer specializing in building
                high-performance, user-focused web applications. Skilled in{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >ReactJS</motion.span>,{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >NextJS</motion.span>,{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >SolidJS</motion.span>, and
                an expert in{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >JavaScript</motion.span>,{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >HTML</motion.span> and{" "}
                <motion.span 
                  className="font-semibold text-accent"
                  whileHover={{ scale: 1.05 }}
                >CSS</motion.span>
              </motion.p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-12 pointer-events-auto"
            >
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -10px rgba(99, 102, 241, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full"
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full"
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
