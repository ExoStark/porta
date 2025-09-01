import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LandingHero() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  let progress = 0;
  const { current: elContainer } = ref;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      animate={{
        transform: `translateY(${progress * 20}vh)`,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      ref={ref}
      className="pointer-events-none flex max-h-[1000px] min-h-[calc(100vh-200px)] items-center px-6 sm:px-14 md:h-[calc(100vh-200px)] md:min-h-max md:px-20"
    >
      <div className="w-full">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-2"
            >
              <span className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Hello, I&apos;m
              </span>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h1
                className="pb-2 text-6xl font-bold sm:text-7xl md:text-8xl xl:text-9xl"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #ef4444)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Amit Chauhan
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-2xl font-semibold text-zinc 800 dark:text-zinc-100 md:text-4xl">
                Software Developer
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 max-w-3xl"
            >
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl">
                I am a software developer specializing in building
                high-performance, user-focused web applications. Skilled in{" "}
                <span className="font-semibold text-accent">ReactJS</span>,{" "}
                <span className="font-semibold text-accent">NextJS</span>,{" "}
                <span className="font-semibold text-accent">SolidJS</span>, and
                an expert in{" "}
                <span className="font-semibold text-accent">JavaScript</span>,{" "}
                <span className="font-semibold text-accent">HTML</span> and{" "}
                <span className="font-semibold text-accent">CSS</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="pointer-events-auto mt-12"
            >
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-medium text-white"
                >
                  View My Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full border border-gray-300 px-6 py-3 font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
