import { SectionLabel } from './SectionLabel'
import { ViewMoreLink } from './ViewMoreLink'

export function Vision() {
  return (
    <section
      id='vision'
      className='grid grid-cols-[1fr_2fr] border-b border-foreground max-md:grid-cols-1'
    >
      <SectionLabel index='01' name='VISION' />
      <div className='flex flex-col gap-[26px] px-8 py-24 max-md:px-5 max-md:py-10'>
        <h2 className='text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.6]'>
          AIがインフラになる時代、
          <br />
          目指すのは、誰もがAIを使いこなせること。
        </h2>
        <p className='max-w-[620px] text-sm leading-[2] text-muted'>
          近い未来、「AI」は私たちにとって切っても切り離せない存在になるでしょう。
          <br />
          この先で重要なのは「AIの扱い方を知る」こと、そしてその「実践」と考えます。
        </p>
        <ViewMoreLink href='/vision' />
      </div>
    </section>
  )
}
