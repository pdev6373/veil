'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SEEN_KEY = 'veil-seen';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Page choreography, opt-in via data attributes:
 *   data-reveal="lines"  children `.line > .line__inner` slide up from a mask
 *   data-reveal="fade"   fades and rises in
 *   data-reveal="words"  `.w` spans light up as the block scrolls through
 *   data-hero            hero lines wait for the intro veil to lift
 * Plus Lenis smooth scrolling and smooth in-page anchors.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const firstVisit = !root.classList.contains('seen');
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {}

    // Failsafe: the intro is a pure-CSS animation, but never let it block the page.
    const introDone = window.setTimeout(() => root.classList.add('intro-done'), firstVisit ? 2400 : 0);

    if (reducedMotion()) {
      root.classList.add('settled');
      return () => window.clearTimeout(introDone);
    }

    // ─── Smooth scroll ───────────────────────────────────────────────
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href') ?? '';
      const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      history.replaceState(null, '', id === '#top' ? location.pathname : id);
      lenis.scrollTo(target, { offset: -72, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    };
    document.addEventListener('click', onClick);

    // ─── Reveals ─────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      const heroDelay = firstVisit ? 1.55 : 0.15;

      gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        const lines = el.querySelectorAll('.line__inner');
        const isHero = el.hasAttribute('data-hero');
        gsap.fromTo(
          lines,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: isHero ? 1.4 : 1.15,
            ease: 'expo.out',
            stagger: isHero ? 0.1 : 0.08,
            delay: isHero ? heroDelay : 0,
            scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        const isHero = el.hasAttribute('data-hero');
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            delay: isHero ? heroDelay + 0.45 : 0,
            scrollTrigger: isHero ? undefined : { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="words"]').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('.w'),
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 52%', scrub: true },
          }
        );
      });
    });
    root.classList.add('settled');

    return () => {
      window.clearTimeout(introDone);
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return null;
}

/** The brand moment: a violet veil that lifts off the page on the first visit of a session. */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro__inner">
        <svg className="intro__mark" viewBox="0 0 1024 1024">
          <use href="#mark" />
        </svg>
        <p className="intro__line">
          <em>Hide apps. Keep your peace.</em>
        </p>
      </div>
    </div>
  );
}
