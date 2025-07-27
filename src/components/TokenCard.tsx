'use client';

import React from 'react';
import { BadgeDollarSign, Clock3, Flame, Info, Search } from 'lucide-react';

interface Token {
  id: number;
  name: string;
  description: string;
  symbol: string;
  age: string;
  mc: string;
  volume: string;
  price: string;
  tags: string[];
  address: string;
}

interface TokenCardProps {
  token: Token;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  return (
    <div className="bg-[#15151A] border border-[#2C2C34] rounded-xl p-4 text-white hover:shadow-md transition">
      <div className="flex items-center justify-between mb-2">
        {/* Token Symbol Icon */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-[#2C2C34] flex items-center justify-center text-lg font-bold">
            {token.symbol}
          </div>
          <div>
            <div className="font-semibold">{token.name}</div>
            <div className="text-xs text-gray-400">{token.description}</div>
          </div>
        </div>

        {/* Age Badge */}
        <div className="text-xs bg-[#1B1B21] text-gray-300 px-2 py-1 rounded">
          {token.age}
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex justify-between mt-3 text-sm">
        <div>
          <div className="text-gray-400">MC</div>
          <div>{token.mc}</div>
        </div>
        <div>
          <div className="text-gray-400">Price</div>
          <div>{token.price}</div>
        </div>
        <div>
          <div className="text-gray-400">Volume</div>
          <div>{token.volume}</div>
        </div>
      </div>

      {/* Tags and Footer */}
      <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
        {token.tags.map((tag, i) => (
          <div
            key={i}
            className="bg-[#2C2C34] px-2 py-1 rounded text-gray-300"
          >
            {tag}
          </div>
        ))}
        <div className="ml-auto text-gray-500 text-xs">{token.address}</div>
      </div>
    </div>
  );
};

export default TokenCard;
