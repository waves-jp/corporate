'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'

const nav = [
  { label: 'VISION', href: '/vision' },
  { label: 'SERVICE', href: '/service' },
  { label: 'WORKS', href: '/works' },
  { label: 'BLOG', href: '/blog' },
  { label: 'SEMINAR', href: '/seminar' },
  { label: 'PROFILE', href: '/#profile' },
]

const cellBase =
  'flex items-center border-r border-foreground px-8 py-5 font-display text-[11px] font-medium tracking-[0.12em] max-md:px-3.5 max-md:py-3.5'

export function Header() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-50 grid grid-cols-8 border-b border-foreground bg-background max-md:grid-cols-3'>
      <Link href='/' className={`${cellBase} cursor-pointer max-md:border-b`}>
        <Image
          src='/waves-logo.svg'
          alt='WAVES'
          width={87}
          height={15}
          className='h-[15px] w-auto max-md:h-[11px]'
        />
      </Link>
      {nav.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${cellBase} transition-colors hover:bg-pale ${
            pathname === item.href ||
            (item.href !== '/#profile' && pathname.startsWith(item.href))
              ? 'bg-pale'
              : ''
          } ${i < 5 ? 'max-md:border-b' : ''} ${
            // モバイル3列: 各行の右端セル（SERVICE, SEMINAR）はborder-rを外す
            i === 1 || i === 4 ? 'max-md:border-r-0' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href='/#contact'
        className='flex items-center justify-between bg-foreground px-8 py-5 font-display text-[11px] font-medium tracking-[0.12em] text-background transition-colors hover:bg-accent max-md:col-span-2 max-md:px-3.5 max-md:py-3.5'
      >
        CONTACT <ArrowUpRight size={14} strokeWidth={2} />
      </Link>
    </header>
  )
}
