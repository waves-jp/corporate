import crypto from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * microCMSのWebhookを受けてブログのキャッシュを再検証する。
 * シークレットはmicroCMS側のカスタム通知設定と MICROCMS_WEBHOOK_SECRET を一致させる。
 */
export async function POST(request: NextRequest) {
  const secret = process.env.MICROCMS_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json(
      { message: 'Webhook secret is not configured' },
      { status: 503 },
    )
  }

  const signature = request.headers.get('x-microcms-signature')
  const body = await request.text()
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  if (
    !signature ||
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
  }

  revalidateTag('blogs')
  revalidateTag('seminars')
  return NextResponse.json({ revalidated: true })
}
