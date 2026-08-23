import { useEffect, useMemo } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ&@#';

interface Char {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: boolean;
}

function makeChars(count: number): Char[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    char: CHARS[Math.floor(Math.random() * CHARS.length)],
    left: Math.random() * 100,
    size: 18 + Math.random() * 64,
    duration: 14 + Math.random() * 22,
    delay: Math.random() * 20,
    drift: Math.random() > 0.5,
  }));
}

export default function AlphabetBackground() {
  const chars = useMemo(() => makeChars(40), []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = chars
      .map(
        (c) =>
          `.char-${c.id} { animation: floatUp ${c.duration}s linear ${c.delay}s infinite; }`,
      )
      .join('\n');
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [chars]);

  return (
    <div className="alphabet-bg" aria-hidden="true">
      {chars.map((c) => (
        <span
          key={c.id}
          className={`alphabet-char char-${c.id}`}
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}px`,
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
}
