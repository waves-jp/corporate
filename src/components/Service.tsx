import { Fragment } from 'react'
import Link from 'next/link'
import { SectionLabel } from './SectionLabel'
import { ViewMoreLink } from './ViewMoreLink'
import { services, phases } from '@/lib/profile'

export function Service() {
  return (
    <section
      id='service'
      className='grid grid-cols-[2fr_1fr] border-b border-foreground max-md:grid-cols-1'
    >
      <div>
        <div className='flex flex-wrap items-end justify-between gap-6 border-b border-foreground px-8 py-16 max-md:px-5 max-md:py-10'>
          <h2 className='text-[clamp(24px,2.5vw,32px)] font-bold leading-[1.5]'>
            知る、活かす、定着させる。
          </h2>
          <ViewMoreLink href='/service' />
        </div>
        <div className='grid grid-cols-3 max-lg:grid-cols-1'>
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`/service#s${i + 1}`}
              className={`flex flex-col gap-[72px] px-8 py-11 transition-colors hover:bg-pale max-lg:gap-6 max-md:px-5 max-md:py-7 ${
                i < services.length - 1
                  ? 'border-r border-foreground max-lg:border-b max-lg:border-r-0'
                  : ''
              }`}
            >
              <div className='font-mono text-xs font-medium'>{service.id}</div>
              <div className='flex flex-col gap-3.5'>
                <h3 className='text-[21px] font-bold'>{service.title}</h3>
                <p className='text-[13px] leading-[1.9] text-muted'>
                  {service.desc.map((line, j) => (
                    <Fragment key={line}>
                      {j > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className='grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch border-t border-foreground max-lg:grid-cols-2 max-md:grid-cols-1'>
          {phases.map((phase, i) => (
            <Fragment key={phase.id}>
              {i > 0 && (
                <div className='flex items-center font-display text-lg text-accent max-lg:hidden'>
                  →
                </div>
              )}
              <div
                className={`flex flex-col gap-1.5 px-8 py-[26px] max-md:px-5 max-md:py-[18px] ${
                  i > 0 ? 'max-md:border-t max-md:border-line-soft' : ''
                }`}
              >
                <div className='font-mono text-[10px] font-medium text-faint'>
                  {phase.id}
                </div>
                <div className='text-sm font-bold'>{phase.label}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <SectionLabel index='02' name='SERVICE' side='right' />
    </section>
  )
}
