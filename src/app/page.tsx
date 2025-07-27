'use client';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TokenTable from '@/components/TokenTable';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'new' | 'final' | 'migrated'>('new');
  return (
    <main className="flex min-h-screen flex-col p-4 bg-[#0B0B0F] text-white font-sans">
      <h1 className="text-2xl font-bold mb-6 text-white">Pulse</h1>
      <Tabs value={activeTab} onValueChange={(v) => {
        if (v === 'new' || v === 'final' || v === 'migrated') setActiveTab(v);
      }}>
        <TabsList className="bg-[#1B1B21] border border-[#2C2C34] rounded-md overflow-hidden w-fit mb-4">
          <TabsTrigger value="new" className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black">
            New Pairs
          </TabsTrigger>
          <TabsTrigger value="final" className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black">
            Final Stretch
          </TabsTrigger>
          <TabsTrigger value="migrated" className="px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black">
            Migrated
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <TokenTable category="new" />
        </TabsContent>
        <TabsContent value="final">
          <TokenTable category="final" />
        </TabsContent>
        <TabsContent value="migrated">
          <TokenTable category="migrated" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
