import Image from 'next/image'
import { profile } from '@/lib/profile'

export function Footer() {
  return (
    <footer className='flex items-center justify-between border-t border-line-dark bg-foreground px-8 py-6 font-mono text-[11px] text-[#8b969c] max-md:px-5 max-md:py-4'>
      <Image
        src='/waves-logo.svg'
        alt='WAVES'
        width={70}
        height={12}
        className='h-3 w-auto invert opacity-85'
      />
      <span>
        © {new Date().getFullYear()} {profile.brand}. All rights reserved.
      </span>
    </footer>
  )
}
