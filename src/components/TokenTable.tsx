'use client';
import React, { useState, useMemo } from 'react';
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from '@/components/ui/table';
import SkeletonRow from './SkeletonRow';
import TokenRow from './TokenRow';
import { useTokensLive } from '@/hooks/useTokensLive';
import { Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

type TokenTableProps = { category: 'new' | 'final' | 'migrated' };

const HEADERS = [
  { key: 'name', label: 'Token', tooltip: 'Token name, symbol, and address' },
  { key: 'price', label: 'Price', tooltip: 'Current price (live)' },
  { key: 'mc', label: 'MC', tooltip: 'Market cap' },
  { key: 'liq', label: 'Liquidity', tooltip: 'Current pool liquidity' },
  { key: 'vol', label: 'Volume', tooltip: '24h Trading Volume' },
  { key: 'age', label: 'Age', tooltip: 'Time since launch' },
  { key: 'tx', label: 'TX', tooltip: 'Recent transaction count' },
  { key: 'holders', label: 'Holders', tooltip: 'Unique holders' },
  { key: 'dev', label: 'Dev %', tooltip: 'Top dev wallet %' },
  { key: 'sniper', label: 'Sniper %', tooltip: 'Top sniper wallet %' },
  { key: 'protocol', label: '', tooltip: 'Launch protocol' },
  { key: 'actions', label: '', tooltip: '' },
];

const SORTABLE = ['price', 'mc', 'liq', 'vol', 'age', 'tx'] as const;
type SortableKey = typeof SORTABLE[number];

export default function TokenTable({ category }: TokenTableProps) {
  const { loading, tokens, error } = useTokensLive(category);

  // Sorting state
  const [sortKey, setSortKey] = useState<typeof SORTABLE[number]>('mc');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Search/filter state
  const [search, setSearch] = useState('');

  // Sorted tokens
  const sortedTokens = useMemo(() => {
    if (!SORTABLE.includes(sortKey)) return tokens;
    const sorted = [...tokens].sort((a, b) => {
      let aVal: number | string = a[sortKey];
      let bVal: number | string = b[sortKey];
      if (typeof aVal === "string") aVal = Number.parseFloat(aVal as string) || 0;
      if (typeof bVal === "string") bVal = Number.parseFloat(bVal as string) || 0;
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return sorted;
  }, [tokens, sortKey, sortDir]);

  // Filtered tokens (search)
  const filteredTokens = useMemo(() => {
    if (!search.trim()) return sortedTokens;
    return sortedTokens.filter(token =>
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, sortedTokens]);

  return (
    <div className="overflow-x-auto max-w-full w-full rounded-md border border-[#23232B] bg-[#111117]">
      {/* Search bar */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tokens..."
        className="mb-3 mx-2 px-3 py-2 bg-[#15151A] border border-[#23232B] rounded text-sm w-full sm:w-64"
        aria-label="Search tokens"
      />
      <Table>
        <TableHeader>
          <TableRow>
            {HEADERS.map((h) => (
              <TableHead
                key={h.key}
                className={`py-3 px-2 text-[#CFCFD4] text-xs uppercase font-semibold align-middle bg-[#15151A] 
                  select-none min-w-[95px]
                  ${SORTABLE.includes(h.key as SortableKey) ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                scope="col"
                onClick={() => {
                  if (SORTABLE.includes(h.key as SortableKey)) {
                    if (sortKey === h.key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
                    else { setSortKey(h.key as SortableKey); setSortDir('desc'); }
                  }
                }}
              >
                <div className="flex items-center gap-1">
                  {h.label}
                  {!!h.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="ml-1">
                          <Info className="w-3 h-3 opacity-50" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{h.tooltip}</TooltipContent>
                    </Tooltip>
                  )}
                  {SORTABLE.includes(h.key as SortableKey) && (
                    <span className="pl-1 text-xs">
                      {sortKey === h.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={HEADERS.length} className="py-6 text-center text-red-400">
                Could not fetch tokens. Please refresh.
              </TableCell>
            </TableRow>
          ) : loading ? (
            Array.from({ length: 7 }).map((_, i) => <SkeletonRow key={i} />)
          ) : (
            filteredTokens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={HEADERS.length} className="py-6 text-center text-muted-foreground">No tokens found.</TableCell>
              </TableRow>
            ) : filteredTokens.map(token => <TokenRow key={token.id} token={token} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}
