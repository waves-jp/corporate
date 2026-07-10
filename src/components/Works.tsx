import { SectionLabel } from './SectionLabel'

export function Works() {
  return (
    <section
      id='works'
      className='grid grid-cols-[1fr_2fr] border-b border-foreground max-md:grid-cols-1'
    >
      <SectionLabel index='03' name='WORKS' />
      <div className='flex flex-col items-start justify-center gap-4 px-8 py-24 max-md:px-5 max-md:py-10'>
        <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
          COMING SOON
        </div>
        <p className='text-sm leading-[2] text-muted'>
          実績は現在準備中です。
          <br />
          公開まで、いましばらくお待ちください。
        </p>
      </div>
    </section>
  )
}
