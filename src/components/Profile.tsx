import Image from 'next/image'
import { Fragment } from 'react'
import { SectionLabel } from './SectionLabel'
import { profile } from '@/lib/profile'

export function Profile() {
  return (
    <section
      id='profile'
      className='grid grid-cols-[2fr_1fr] border-b border-foreground max-md:grid-cols-1'
    >
      <div className='grid grid-cols-[200px_1fr] gap-10 px-8 py-16 max-md:grid-cols-1 max-md:gap-6 max-md:px-5 max-md:py-10'>
        <Image
          src='/profile.jpg'
          alt={profile.nameJa}
          width={200}
          height={250}
          className='h-[250px] w-[200px] border border-foreground object-cover'
        />
        <div className='flex flex-col gap-3.5'>
          <div className='text-[22px] font-bold'>
            {profile.nameJa}{' '}
            <span className='font-display text-sm font-medium text-muted'>
              / {profile.nameEn}
            </span>
          </div>
          <div className='font-mono text-[11px] font-medium text-accent'>
            {profile.title}
          </div>
          <p className='max-w-[520px] text-[13px] leading-[2] text-muted'>
            {profile.bio.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <SectionLabel index='06' name='PROFILE' side='right' />
    </section>
  )
}
