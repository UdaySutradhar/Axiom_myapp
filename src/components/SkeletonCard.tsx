import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-[#15151A] border border-[#2C2C34] rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded bg-[#2C2C34]"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#2C2C34] rounded w-1/2" />
          <div className="h-3 bg-[#2C2C34] rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-[#2C2C34] rounded w-full" />
        <div className="h-3 bg-[#2C2C34] rounded w-3/4" />
        <div className="h-3 bg-[#2C2C34] rounded w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
