'use client'

import { useState } from 'react'
import { workCategories, works, type WorkCategoryKey } from '@/lib/profile'

/** 実績一覧。カテゴリで絞り込めるカードグリッド。 */
export function WorksGrid() {
  const [cat, setCat] = useState<WorkCategoryKey>('all')
  const shown = cat === 'all' ? works : works.filter((w) => w.cat === cat)

  return (
    <div className='flex flex-col gap-10 px-8 pb-[110px] pt-14 max-md:px-5 max-md:pb-20 max-md:pt-12'>
      <div className='flex flex-wrap gap-2.5'>
        {workCategories.map((c) => (
          <button
            key={c.key}
            type='button'
            onClick={() => setCat(c.key)}
            className={`cursor-pointer border border-foreground px-[18px] py-[9px] font-mono text-[11px] font-medium tracking-[0.08em] transition-colors ${
              cat === c.key
                ? 'bg-foreground text-background'
                : 'bg-transparent hover:bg-pale'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
        {shown.map((work) => (
          <div
            key={work.num}
            className='flex flex-col gap-4 border border-foreground bg-white px-8 py-9 transition-colors hover:bg-pale max-md:p-5'
          >
            <div className='flex items-center justify-between gap-3'>
              <div className='flex flex-wrap gap-2.5 font-mono text-[11px] font-medium text-accent'>
                <span className='border border-accent px-2.5 py-[3px]'>
                  {work.industry}
                </span>
                <span className='border border-accent px-2.5 py-[3px]'>
                  {work.catLabel}
                </span>
              </div>
              <div className='font-mono text-[11px] font-medium text-faint'>
                {work.num}
              </div>
            </div>
            <div className='text-[19px] font-bold leading-[1.7]'>
              {work.title}
            </div>
            <div className='text-xs font-medium text-accent'>
              {work.company}
            </div>
            <div className='text-[13px] leading-[1.9] text-muted'>
              {work.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
