import { useEffect, useState } from 'react';

export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  mc: number;
  liq: number;
  vol: number;
  age: string;
  tx: number;
  holders: number;
  dev: number;
  sniper: number;
  protocol: 'pump' | 'raydium' | 'bonk';
  chain: 'ETH' | 'SOL';
  address: string;
};

const all = [
  {
    id: '1',
    name: 'brokguy',
    symbol: 'B',
    price: 0.0023,
    mc: 5120,
    liq: 2500,
    vol: 430,
    age: '0s',
    tx: 4,
    holders: 15,
    dev: 13,
    sniper: 6,
    protocol: 'pump',
    chain: 'ETH',
    address: '0xabc...def',
  },
  {
    id: '2',
    name: 'TUTUDududu',
    symbol: '🎧',
    price: 0.022,
    mc: 7000,
    liq: 3100,
    vol: 545,
    age: '5s',
    tx: 12,
    holders: 21,
    dev: 8,
    sniper: 3,
    protocol: 'bonk',
    chain: 'SOL',
    address: 'FxZZ...kL98',
  },
  {
    id: '3',
    name: 'DogWave',
    symbol: '🐶',
    price: 0.00009,
    mc: 42000,
    liq: 15500,
    vol: 6011,
    age: '13s',
    tx: 21,
    holders: 82,
    dev: 6,
    sniper: 1,
    protocol: 'raydium',
    chain: 'ETH',
    address: '0xFFF...999',
  },
  // ... Add any more mock tokens you want!
] as const;

function getMockTokens(category: string): Token[] {
  if (category === 'new') return all.slice(0, 6).map(t => ({ ...t }));
  if (category === 'final') return all.slice(1, 4).map(t => ({ ...t }));
  if (category === 'migrated') return all.slice(0, 2).map(t => ({ ...t }));
  return [];
}

// Simulate fetch then live-updating prices
export function useTokensLive(category: string) {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true); setError(null);
    const t = setTimeout(() => {
      try {
        setTokens(getMockTokens(category));
        setLoading(false);
      } catch {
        setError('Fetch failed');
        setLoading(false);
      }
    }, 900 + Math.random() * 300);
    return () => clearTimeout(t);
  }, [category]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setTokens(prev =>
        prev.map(tok => {
          const changePct = (Math.random() - 0.5) * 0.04;
          return {
            ...tok,
            price: +(tok.price * (1 + changePct)).toFixed(6),
            vol: Math.max(0, tok.vol + Math.round(Math.random() * 30)),
            mc: Math.max(0, +tok.mc * (1 + changePct)),
            liq: Math.max(0, Math.round(tok.liq * (1 + (Math.random() - 0.5) * 0.07))),
          }
        })
      );
    }, 1700);
    return () => clearInterval(interval);
  }, [loading]);

  return { loading, tokens, error };
}
