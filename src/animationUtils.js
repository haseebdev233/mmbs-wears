import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP Animation Presets
export const animateGlow = (element, duration = 2) => {
  gsap.fromTo(
    element,
    { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
    {
      boxShadow: '0 0 50px rgba(0, 212, 255, 1)',
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }
  );
};

export const animateNeon = (element, duration = 1.5) => {
  gsap.to(element, {
    textShadow: [
      '0 0 10px #00D4FF, 0 0 20px #00D4FF',
      '0 0 20px #FF00FF, 0 0 30px #FF00FF',
      '0 0 10px #00D4FF, 0 0 20px #00D4FF',
    ],
    duration,
    repeat: -1,
  });
};

export const animateFloat = (element, distance = 20, duration = 3) => {
  gsap.to(element, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const animateRotate = (element, duration = 10) => {
  gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'none',
  });
};

export const animateParticles = (container) => {
  const particles = container.querySelectorAll('.particle');
  gsap.to(particles, {
    y: -100,
    opacity: 0,
    duration: 2,
    stagger: 0.1,
    repeat: -1,
    ease: 'power1.out',
  });
};

export const staggerAnimateIn = (elements, duration = 0.6) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );
};

export const scrollTriggerAnimation = (element, options = {}) => {
  const {
    from = { opacity: 0, y: 50 },
    to = { opacity: 1, y: 0 },
    duration = 0.8,
    scrub = false,
    markers = false,
  } = options;

  gsap.fromTo(element, from, {
    ...to,
    duration,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub,
      markers,
    },
  });
};

export const typewriter = (element, text, duration = 0.05) => {
  let index = 0;
  element.textContent = '';

  const type = () => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, duration * 1000);
    }
  };

  type();
};

// Framer Motion variants
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const hoverScaleVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export const glowHoverVariants = {
  initial: { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
  hover: {
    boxShadow: '0 0 40px rgba(0, 212, 255, 1)',
    transition: { duration: 0.3 },
  },
};

export default {
  animateGlow,
  animateNeon,
  animateFloat,
  animateRotate,
  animateParticles,
  staggerAnimateIn,
  scrollTriggerAnimation,
  typewriter,
  // Variants
  fadeInVariants,
  slideInVariants,
  scaleUpVariants,
  containerVariants,
  itemVariants,
  hoverScaleVariants,
  glowHoverVariants,
};
