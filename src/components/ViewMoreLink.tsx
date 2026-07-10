import Link from 'next/link'

type Props = {
  href: string
  label?: string
}

export function ViewMoreLink({ href, label = 'VIEW MORE' }: Props) {
  return (
    <Link
      href={href}
      className='self-start border border-foreground px-[22px] py-3 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background'
    >
      {label} ↗
    </Link>
  )
}
