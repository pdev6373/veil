'use client';

import { useState } from 'react';

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
