'use client'

import { useState } from 'react'

// Googleフォームの送信先。フォーム編集画面の「事前入力したリンクを取得」で
// 発行されるURLから、viewform→formResponseへの変換とentry IDを取得する。
const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSc-912DupW_snIvhlm-qL7TcW6F80V8SxVNOVANTVsRhvZ8zQ/formResponse'
const FIELD = {
  name: 'entry.37486697',
  email: 'entry.1265406830',
  message: 'entry.1537171714',
} as const

const inputClass =
  'border border-line-dark bg-transparent px-[18px] py-4 text-sm text-background outline-none focus:border-pale disabled:opacity-50'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = new URLSearchParams()
    payload.set(FIELD.name, String(data.get('name') ?? ''))
    payload.set(FIELD.email, String(data.get('email') ?? ''))
    payload.set(FIELD.message, String(data.get('message') ?? ''))

    setStatus('submitting')
    try {
      // Googleフォームはno-corsでのみ受け付け、レスポンス内容は読めない仕様。
      // fetchが例外なく完了した時点で送信成功とみなす。
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: payload,
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className='flex flex-col items-start gap-3 border border-line-dark p-6'>
        <p className='text-sm leading-[2]'>
          送信しました。ご連絡ありがとうございます。
          <br />
          内容を確認の上、折り返しご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        name='name'
        placeholder='お名前'
        aria-label='お名前'
        required
        disabled={status === 'submitting'}
        className={inputClass}
      />
      <input
        type='email'
        name='email'
        placeholder='メールアドレス'
        aria-label='メールアドレス'
        required
        disabled={status === 'submitting'}
        className={inputClass}
      />
      <textarea
        name='message'
        placeholder='ご相談内容'
        aria-label='ご相談内容'
        rows={4}
        required
        disabled={status === 'submitting'}
        className={`${inputClass} resize-none`}
      />
      {status === 'error' && (
        <p className='text-xs leading-[1.8] text-red-300'>
          送信に失敗しました。お手数ですが、上記のメールアドレス宛に直接ご連絡ください。
        </p>
      )}
      <button
        type='submit'
        disabled={status === 'submitting'}
        className='cursor-pointer bg-pale p-[18px] text-sm font-bold tracking-[0.1em] text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60'
      >
        {status === 'submitting' ? '送信中…' : '送信する →'}
      </button>
    </form>
  )
}
