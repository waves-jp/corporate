import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from './SectionLabel'

export function Seminar() {
  return (
    <section
      id='seminar'
      className='grid grid-cols-[1fr_2fr] border-b border-foreground max-md:grid-cols-1'
    >
      <SectionLabel index='05' name='SEMINAR' />
      <div className='flex flex-col'>
        <div className='flex min-h-[420px] flex-col items-start justify-center gap-4 border-b border-foreground px-8 py-16 max-md:min-h-0 max-md:px-5 max-md:py-10'>
          <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
            COMING SOON
          </div>
          <p className='text-sm leading-[2] text-muted'>
            セミナーは現在準備中です。
            <br />
            公開まで、いましばらくお待ちください。
          </p>
        </div>
        <Link
          href='/seminar'
          className='flex min-h-[88px] items-center gap-2 px-8 py-6 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background max-md:min-h-0 max-md:px-5'
        >
          ALL SEMINARS <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}
