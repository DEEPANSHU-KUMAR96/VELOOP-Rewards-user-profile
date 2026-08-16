import React from 'react';

const Sh = ({ w, h, rounded = 'rounded-xl', extra = '' }) => (
  <div className={`shimmer ${rounded} ${extra}`} style={{ width: w, height: h }} />
);

export const SkeletonLoader = () => (
  <div className="min-h-screen bg-[#080a0f] flex">
    {/* Sidebar skeleton */}
    <div className="hidden lg:flex flex-col w-64 bg-[#0b0d14] border-r border-white/[0.05] p-6 gap-6 shrink-0">
      <Sh w="140px" h="36px" rounded="rounded-xl" />
      <div className="space-y-3 mt-4">
        {[...Array(6)].map((_, i) => <Sh key={i} w="100%" h="40px" rounded="rounded-xl" />)}
      </div>
      <div className="mt-auto">
        <Sh w="100%" h="56px" rounded="rounded-2xl" />
      </div>
    </div>

    {/* Main area */}
    <div className="flex-1 flex flex-col">
      {/* TopNav */}
      <div className="h-16 border-b border-white/[0.05] px-6 flex items-center gap-4">
        <Sh w="200px" h="36px" rounded="rounded-2xl" />
        <div className="ml-auto flex gap-3">
          <Sh w="36px" h="36px" rounded="rounded-xl" />
          <Sh w="100px" h="36px" rounded="rounded-2xl" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
        {/* Hero */}
        <Sh w="100%" h="280px" rounded="rounded-3xl" />

        {/* Stats row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Sh key={i} w="100%" h="120px" rounded="rounded-2xl" />)}
        </div>

        {/* Assets */}
        <Sh w="100%" h="180px" rounded="rounded-3xl" />

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Sh w="100%" h="280px" rounded="rounded-3xl" extra="lg:col-span-1" />
          <Sh w="100%" h="280px" rounded="rounded-3xl" />
          <Sh w="100%" h="280px" rounded="rounded-3xl" />
        </div>
      </div>
    </div>
  </div>
);
