export type TocItem = {
  id: string
  num: string
  label: string
}

type Props = {
  toc: readonly TocItem[]
  children: React.ReactNode
}

/** 下層ページ共通の本文レイアウト。左に追従する INDEX、右に本文セクション。 */
export function ArticleLayout({ toc, children }: Props) {
  return (
    <div className='grid grid-cols-[300px_1fr] border-b border-foreground max-md:grid-cols-1'>
      <aside className='border-r border-foreground px-8 py-14 max-md:border-b max-md:border-r-0 max-md:p-5'>
        <nav className='sticky top-24 flex flex-col gap-[18px] font-mono text-[11px] font-medium tracking-[0.1em] max-md:static max-md:flex-row max-md:flex-wrap max-md:gap-x-[18px] max-md:gap-y-2.5'>
          <div className='tracking-[0.18em] text-faint'>INDEX</div>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className='flex gap-2.5 transition-colors hover:text-accent'
            >
              <span className='text-faint'>{item.num}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className='flex flex-col gap-[110px] px-16 py-24 max-md:gap-16 max-md:px-5 max-md:py-12'>
        {children}
      </div>
    </div>
  )
}
