'use client'

import { profile } from '@/lib/profile'

const inputClass =
  'border border-line-dark bg-transparent px-[18px] py-4 text-sm text-background outline-none focus:border-pale'

export function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = `お問い合わせ${name ? `: ${name}` : ''}`
    const body = `お名前: ${name}\nメールアドレス: ${email}\n\n${message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        name='name'
        placeholder='お名前'
        aria-label='お名前'
        className={inputClass}
      />
      <input
        type='email'
        name='email'
        placeholder='メールアドレス'
        aria-label='メールアドレス'
        className={inputClass}
      />
      <textarea
        name='message'
        placeholder='ご相談内容'
        aria-label='ご相談内容'
        rows={4}
        className={`${inputClass} resize-none`}
      />
      <button
        type='submit'
        className='cursor-pointer bg-pale p-[18px] text-sm font-bold tracking-[0.1em] text-foreground transition-colors hover:bg-background'
      >
        送信する →
      </button>
    </form>
  )
}
