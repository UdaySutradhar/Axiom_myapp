'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Copy, ExternalLink, Info, Search, DollarSign } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { Token } from '@/hooks/useTokensLive';

const protocolInfo = {
  pump: { label: 'Pump.fun', color: '#FC7C2B' },
  raydium: { label: 'Raydium', color: '#8175FC' },
  bonk: { label: 'Bonk', color: '#FFC700' },
};

const chainBadge = {
  ETH: { label: 'ETH', className: 'bg-[#627EEA] text-white' },
  SOL: { label: 'SOL', className: 'bg-[#00FFA3] text-black' },
};

export default function TokenRow({ token }: { token: Token }) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef(token.price);

  useEffect(() => {
    if (token.price > prevPrice.current) setFlash('up');
    else if (token.price < prevPrice.current) setFlash('down');
    prevPrice.current = token.price;
    if (flash) {
      const t = setTimeout(() => setFlash(null), 480);
      return () => clearTimeout(t);
    }
  }, [token.price, flash]);

  const handleCopy = () => navigator.clipboard.writeText(token.address);

  return (
    <tr className="group bg-transparent hover:bg-[#17171f] transition">
      {/* Name cell */}
      <td className="pl-2 py-2 flex items-center gap-2 max-w-[220px]">
        {/* Symbol/icon */}
        <div className="w-8 h-8 rounded-full bg-[#23232b] flex items-center justify-center font-bold text-lg shadow-sm">
          {token.symbol}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-white">{token.name}</span>
          <div className="flex gap-1 text-xs text-[#AFAFC0]">
            <span className={cn('px-1 py-0.5 rounded font-semibold', chainBadge[token.chain].className)}>
              {chainBadge[token.chain].label}
            </span>
            <span className="hidden sm:inline-block opacity-80">{token.address.slice(0, 5)}...{token.address.slice(-4)}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleCopy} aria-label="Copy address" className="ml-1 hover:text-white opacity-70 hover:opacity-100">
                  <Copy size={13} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy Address</TooltipContent>
            </Tooltip>
            <a
              href={`https://dexscreener.com/search?q=${token.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white opacity-70 hover:opacity-100 ml-1"
              aria-label="Open in Dexscreener"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </td>
      <td className="px-2 py-2 font-mono min-w-[84px]">
        <span
          className={cn(
            'transition',
            flash === 'up' && 'bg-green-900 text-green-400 px-2 py-1 rounded-md shadow-sm duration-500',
            flash === 'down' && 'bg-red-900 text-red-400 px-2 py-1 rounded-md shadow-sm duration-500'
          )}
        >
          ${token.price.toFixed(5)}
        </span>
      </td>
      <td className="px-2 py-2">${Math.round(token.mc).toLocaleString()}</td>
      <td className="px-2 py-2">${token.liq.toLocaleString()}</td>
      <td className="px-2 py-2">${token.vol.toLocaleString()}</td>
      <td className="px-2 py-2">{token.age}</td>
      <td className="px-2 py-2">{token.tx}</td>
      <td className="px-2 py-2">{token.holders}</td>
      <td className="px-2 py-2">{token.dev}%</td>
      <td className="px-2 py-2">{token.sniper}%</td>
      <td className="px-2 py-[0.7rem]">
        <span className="inline-flex items-center px-1.5 rounded text-xs font-semibold"
              style={{
                background: `${protocolInfo[token.protocol].color}20`, // faded
                color: protocolInfo[token.protocol].color
              }}>
          {protocolInfo[token.protocol].label}
        </span>
      </td>
      <td className="px-2 py-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:bg-[#20202B] p-1 rounded" aria-label="View options">
              <Search size={16} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-[230px]">
            <div className="flex flex-col gap-2">
              <div className="text-xs text-gray-400 mb-1">Quick Actions</div>
              <button onClick={handleCopy} className="flex items-center gap-2 hover:text-white transition"><Copy size={14} /> Copy Address</button>
              <a
                href={`https://dexscreener.com/search?q=${token.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <ExternalLink size={14} /> View on Dexscreener
              </a>
              <button className="flex items-center gap-2 hover:text-white transition disabled:opacity-50" disabled>
                <DollarSign size={14} /> Trade (Coming Soon)
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}
