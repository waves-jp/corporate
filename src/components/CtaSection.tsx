import Link from 'next/link'

type Props = {
  id?: string
  label?: string
  title?: string
  text: React.ReactNode
}

/** 下層ページ共通のダークCTA。トップのコンタクトセクションへ誘導する。 */
export function CtaSection({ id, label = 'CONTACT', title, text }: Props) {
  return (
    <section id={id} className='scroll-mt-[60px] bg-foreground text-background'>
      <div className='flex flex-col gap-8 px-8 py-[110px] max-md:px-5 max-md:py-10'>
        <div className='font-mono text-xs font-medium tracking-[0.14em] text-pale'>
          {label}
        </div>
        {title && (
          <h2 className='text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.7]'>
            {title}
          </h2>
        )}
        <p className='text-sm leading-[2] text-[#9aa6ac]'>{text}</p>
        <Link
          href='/#contact'
          className='self-start bg-pale px-[26px] py-3.5 font-display text-xs font-medium tracking-[0.12em] text-foreground transition-colors hover:bg-background'
        >
          CONTACT ↗
        </Link>
      </div>
    </section>
  )
}
