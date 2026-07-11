import { HeroVisual } from './HeroVisual'

export function Hero() {
  return (
    <section className='border-b border-foreground'>
      <div className='relative flex flex-col gap-[30px] overflow-hidden px-8 pb-12 pt-[120px] max-md:px-5 max-md:pb-8 max-md:pt-16'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 max-md:hidden'
        >
          <HeroVisual />
        </div>
        <p className='reveal relative font-mono text-xs font-medium tracking-[0.18em] text-accent max-md:text-[10px] max-md:tracking-[0.12em]'>
          AI CONSULTING &amp; SOFTWARE DEVELOPMENT — BASED IN FUKUYAMA,
          HIROSHIMA
        </p>
        <h1 className='reveal relative font-display text-[clamp(48px,9.5vw,138px)] font-bold leading-[1.05] tracking-[-0.03em]'>
          Make AI
          <br />
          ordinary<span className='text-faint'>.</span>
        </h1>
        <div
          aria-hidden
          className='pointer-events-none relative hidden h-[240px] w-full max-md:-mx-5 max-md:block max-md:w-[calc(100%+40px)]'
        >
          <HeroVisual offsetX={0} />
        </div>
      </div>
      <div className='grid grid-cols-[2fr_1fr] border-t border-foreground max-md:grid-cols-1'>
        <div className='flex items-center border-r border-foreground px-8 py-7 text-[clamp(17px,1.6vw,22px)] font-bold leading-[1.7] max-md:border-b max-md:border-r-0 max-md:px-5'>
          AIをあたりまえの力に。個人活用から企業戦略と実用まで。
        </div>
        <div className='flex items-center px-8 py-7 text-[13px] leading-[1.9] text-muted max-md:px-5'>
          <p>
            少数精鋭のAIパートナー。
            <br />
            意思決定から現場の定着まで伴走します。
          </p>
        </div>
      </div>
    </section>
  )
}
