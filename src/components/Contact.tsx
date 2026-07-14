import { ContactForm } from './ContactForm'
import { profile } from '@/lib/profile'

export function Contact() {
  return (
    <section id='contact' className='bg-foreground text-background'>
      <div className='grid grid-cols-2 gap-[60px] px-8 py-24 max-md:grid-cols-1 max-md:gap-9 max-md:px-5 max-md:py-10'>
        <div className='flex flex-col gap-6'>
          <div className='font-mono text-xs font-medium tracking-[0.14em] text-pale'>
            (07) CONTACT
          </div>
          <h2 className='text-[clamp(26px,3vw,38px)] font-bold leading-[1.5]'>
            お気軽にご相談ください
          </h2>
          <p className='text-sm leading-[2] text-[#9aa6ac]'>
            個人でも企業でもどなたでも。
            <br />
            AIに興味があれば、まずはご相談ください。
            <br />
            <br />
            軽い談笑だけでも歓迎です。
            <br />
            何かしらお力になれればと思います。
          </p>
          <a
            href={`mailto:${profile.email}`}
            className='self-start border-b border-pale pb-1 font-mono text-[13px] font-medium tracking-[0.06em] text-pale transition-colors hover:border-background hover:text-background'
          >
            {profile.email}
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
