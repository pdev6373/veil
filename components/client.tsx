'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const MENU_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#calculator', label: 'The calculator' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#faq', label: 'Questions' },
];

/** Full-screen menu for small screens. Escape closes it; focus stays inside while open. */
export function MobileMenu({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the dialog itself: keyboard users Tab into the links, touch users see no stray ring.
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab' || !panel.current) return;
      const items = panel.current.querySelectorAll<HTMLElement>('a, button');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const btn = button.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      btn?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      {open && (
        <div ref={panel} id="mobile-menu" className="menu" role="dialog" aria-modal="true" aria-label="Menu" tabIndex={-1}>
          <div className="menu-top">
            <span className="menu-title">Veil</span>
            <button type="button" className="menu-toggle" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav aria-label="Sections">
            {MENU_LINKS.map((l, i) => (
              <a key={l.href} href={l.href} style={{ animationDelay: `${60 + i * 50}ms` }} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="menu-foot">{children}</div>
        </div>
      )}
    </>
  );
}

const DEMO_PIN = '1284';
const VAULT_TONES = ['#c98f7a', '#7d9bb8', '#93a98a', '#c9b27a', '#a08bc0', '#7fb0ab', '#b9879e', '#8a93b8'];

type Key = { label: string; kind: 'num' | 'fn' | 'op'; aria?: string };
const KEYS: Key[] = [
  { label: 'AC', kind: 'fn', aria: 'Clear' }, { label: '±', kind: 'fn', aria: 'Plus minus' }, { label: '%', kind: 'fn', aria: 'Percent' }, { label: '÷', kind: 'op', aria: 'Divide' },
  { label: '7', kind: 'num' }, { label: '8', kind: 'num' }, { label: '9', kind: 'num' }, { label: '×', kind: 'op', aria: 'Multiply' },
  { label: '4', kind: 'num' }, { label: '5', kind: 'num' }, { label: '6', kind: 'num' }, { label: '−', kind: 'op', aria: 'Minus' },
  { label: '1', kind: 'num' }, { label: '2', kind: 'num' }, { label: '3', kind: 'num' }, { label: '+', kind: 'op', aria: 'Plus' },
  { label: '0', kind: 'num' }, { label: '.', kind: 'num', aria: 'Decimal point' }, { label: '=', kind: 'op', aria: 'Equals' },
];

const isOp = (c: string) => '+−×÷'.includes(c);

/** Left-to-right with × ÷ before + −. No eval(). */
function evaluate(input: string): string {
  const expr = input.startsWith('−') ? `0${input}` : input;
  const tokens = expr.match(/(\d*\.?\d+|[+−×÷])/g);
  if (!tokens) return '0';
  const nums: number[] = [];
  const ops: string[] = [];
  tokens.forEach((t) => (isOp(t) ? ops.push(t) : nums.push(parseFloat(t))));
  if (nums.length !== ops.length + 1) return 'Error';
  for (let i = 0; i < ops.length; ) {
    if (ops[i] === '×' || ops[i] === '÷') {
      const r = ops[i] === '×' ? nums[i] * nums[i + 1] : nums[i] / nums[i + 1];
      nums.splice(i, 2, r);
      ops.splice(i, 1);
    } else i++;
  }
  const total = ops.reduce((acc, op, i) => (op === '+' ? acc + nums[i + 1] : acc - nums[i + 1]), nums[0]);
  if (!Number.isFinite(total)) return 'Error';
  return String(Math.round(total * 1e8) / 1e8);
}

/** A working calculator. Typing the demo PIN then "=" opens the vault, exactly like the app. */
export function TryCalculator() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const press = (k: Key) => {
    if (k.label === 'AC') {
      setExpr('');
      setResult(null);
      return;
    }
    if (k.label === '=') {
      if (expr === DEMO_PIN) return setOpen(true);
      if (!expr) return;
      const clean = isOp(expr.slice(-1)) ? expr.slice(0, -1) : expr;
      setResult(evaluate(clean));
      return;
    }
    if (k.label === '±' || k.label === '%') {
      if (!expr || isOp(expr.slice(-1))) return;
      if (k.label === '±') setExpr(expr.startsWith('−') ? expr.slice(1) : `−${expr}`);
      else setResult(evaluate(`${expr}÷100`));
      return;
    }

    const base = result !== null && result !== 'Error' ? (k.kind === 'op' ? result : '') : expr;
    setResult(null);
    if (k.kind === 'op') {
      if (!base) return;
      setExpr(isOp(base.slice(-1)) ? base.slice(0, -1) + k.label : base + k.label);
    } else if (base.length < 14) {
      setExpr(base + k.label);
    }
  };

  const shown = result ?? (expr || '0');

  return (
    <div className="calc">
      <div className="display" aria-live="polite">
        <div className="expr">{result !== null ? expr : ''}</div>
        <div className="value" style={{ fontSize: shown.length > 9 ? 36 : undefined }}>
          {shown}
        </div>
      </div>
      <div className="keys">
        {KEYS.map((k) => (
          <button
            key={k.label}
            type="button"
            className={[k.kind === 'op' && 'op', k.kind === 'fn' && 'fn', k.label === '0' && 'zero'].filter(Boolean).join(' ') || undefined}
            aria-label={k.aria ?? k.label}
            onClick={() => press(k)}
          >
            {k.label}
          </button>
        ))}
      </div>

      {open && (
        <div className="vault-open" role="dialog" aria-label="Vault opened">
          <div className="title">Vault</div>
          <div className="sub">8 apps hidden</div>
          <div className="apps">
            {VAULT_TONES.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setExpr('');
              setResult(null);
            }}
          >
            Lock again
          </button>
        </div>
      )}
    </div>
  );
}
