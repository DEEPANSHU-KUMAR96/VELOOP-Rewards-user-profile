import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

/**
 * Hook for staggering profile section entrances and interactive GSAP animations
 */
export const useGsapAnimations = (containerRef, dependencies = []) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for header and sections
      gsap.fromTo(
        '.gsap-fade-in',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      // 2. Avatar scale & glow burst (only when the element exists)
      if (containerRef.current.querySelectorAll('.gsap-avatar').length) {
        gsap.fromTo(
          '.gsap-avatar',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 }
        );
      }

      // 3. Progress bar smooth grow (only when the element exists)
      if (containerRef.current.querySelectorAll('.gsap-progress-fill').length) {
        gsap.fromTo(
          '.gsap-progress-fill',
          { width: '0%' },
          {
            width: (i, target) => target.getAttribute('data-width') || '0%',
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.4,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);
};

/**
 * Animate a counter number from start to end
 */
export const animateCounter = (element, targetValue, duration = 1.2) => {
  if (!element) return;
  const obj = { val: 0 };
  const isNumber = !isNaN(Number(targetValue));
  if (!isNumber) {
    element.innerText = targetValue;
    return;
  }

  gsap.to(obj, {
    val: Number(targetValue),
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.innerText = Math.floor(obj.val).toLocaleString();
    },
  });
};

/**
 * Micro-bounce click animation
 */
export const animateClickBounce = (element) => {
  if (!element) return;
  gsap.timeline()
    .to(element, { scale: 0.92, duration: 0.1, ease: 'power1.in' })
    .to(element, { scale: 1.05, duration: 0.18, ease: 'back.out(2)' })
    .to(element, { scale: 1, duration: 0.12, ease: 'power1.out' });
};

/**
 * Trigger celebration confetti
 */
export const triggerConfetti = () => {
  confetti({
    particleCount: 65,
    spread: 60,
    origin: { y: 0.75 },
    colors: ['#ff6b00', '#ff9e42', '#ffd700', '#ffffff', '#ff3b00'],
  });
};
