'use client';

import { useEffect, useState } from 'react';

/** Nav hairline once scrolled, scroll reveals, and the cursor glow on cards. */
export function PageEffects() {
  useEffect(() => {
    const nav = document.getElementById('nav');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
    let io: IntersectionObserver | null = null;
    if (reduced) {
      items.forEach((el) => el.classList.add('in'));
    } else {
      // Anything already on screen animates in right away (no waiting on the observer).
      const pending: HTMLElement[] = [];
      let shown = 0;
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          el.style.transitionDelay = `${Math.min(shown++, 6) * 70}ms`;
          el.classList.add('in');
        } else {
          pending.push(el);
        }
      });
      io = new IntersectionObserver(
        (entries) => {
          entries
            .filter((e) => e.isIntersecting)
            .forEach((e, i) => {
              const el = e.target as HTMLElement;
              el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
              el.classList.add('in');
              io?.unobserve(el);
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      pending.forEach((el) => io?.observe(el));
    }

    const cards = document.querySelectorAll<HTMLElement>('.card');
    const onMove = (e: PointerEvent) => {
      const card = e.currentTarget as HTMLElement;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener('pointermove', onMove));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
      cards.forEach((c) => c.removeEventListener('pointermove', onMove));
    };
  }, []);

  return null;
}

const CALC_SCRIPT = ['1', '12', '128', '1284', '1284 =', '', '24', '24×', '24×7', '168'];

/** The calculator card types a PIN, presses "=", then does a normal sum, in a loop. */
export function CalcTyping() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => n + 1), 650);
    return () => clearInterval(id);
  }, []);
  return <span>{CALC_SCRIPT[i % CALC_SCRIPT.length]}</span>;
}
