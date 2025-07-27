'use client';
import React from 'react';

const SkeletonRow = () => (
  <tr>
    {Array.from({ length: 12 }).map((_, i) => (
      <td key={i} className="px-2 py-4">
        <div className="bg-[#22222A] h-4 rounded-md animate-pulse w-full" />
      </td>
    ))}
  </tr>
);

export default SkeletonRow;
