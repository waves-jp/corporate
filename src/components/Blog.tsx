import { SectionLabel } from './SectionLabel'
import { ViewMoreLink } from './ViewMoreLink'

export function Blog() {
  return (
    <section
      id='blog'
      className='grid grid-cols-[1fr_2fr] border-b border-foreground max-md:grid-cols-1'
    >
      <SectionLabel index='04' name='BLOG' />
      <div className='flex flex-col gap-[26px] px-8 py-24 max-md:px-5 max-md:py-10'>
        <h2 className='text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.6]'>
          AIを、現場で活かすための知見。
        </h2>
        <p className='max-w-[620px] text-sm leading-[2] text-muted'>
          AI活用やソフトウェア開発について、
          <br />
          日々の実践から得た考えや気づきを発信しています。
        </p>
        <ViewMoreLink href='/blog' label='VIEW BLOG' />
      </div>
    </section>
  )
}
