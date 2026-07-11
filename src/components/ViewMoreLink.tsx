import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  href: string
  label?: string
}

export function ViewMoreLink({ href, label = 'VIEW MORE' }: Props) {
  return (
    <Link
      href={href}
      className='inline-flex items-center gap-1.5 self-start border border-foreground px-[22px] py-3 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background'
    >
      {label} <ArrowUpRight size={14} strokeWidth={2} />
    </Link>
  )
}
