import Link from 'next/link'

type Props = {
  index?: string
  name: string
  desc: React.ReactNode
}

/** 下層ページ共通のヒーロー。パンくず＋大見出し＋補足文。 */
export function PageHero({ index, name, desc }: Props) {
  return (
    <div className='border-b border-foreground'>
      <div className='flex flex-col gap-12 px-8 pb-16 pt-[100px] max-md:gap-8 max-md:px-5 max-md:pb-10 max-md:pt-16'>
        <div className='font-mono text-xs font-medium tracking-[0.18em] text-accent max-md:text-[10px] max-md:tracking-[0.12em]'>
          <Link href='/' className='transition-colors hover:text-foreground'>
            TOP
          </Link>{' '}
          / {index ? `(${index}) ` : ''}
          {name}
        </div>
        <div className='grid grid-cols-[1fr_minmax(0,480px)] items-end gap-10 max-md:grid-cols-1'>
          <h1 className='font-display text-[clamp(44px,7vw,104px)] font-bold leading-[1.05] tracking-[-0.03em]'>
            {name}
            <span className='text-faint'>.</span>
          </h1>
          <p className='text-sm leading-[2.2] text-muted'>{desc}</p>
        </div>
      </div>
    </div>
  )
}
