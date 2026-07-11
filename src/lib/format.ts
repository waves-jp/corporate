/** ISO日時を「2026.07.11」形式にフォーマットする */
export function formatDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

/** ISO日時を「2026.07.11 (土) 19:00」形式（日本時間）にフォーマットする */
export function formatDateTime(iso: string) {
  const d = new Date(
    new Date(iso).toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
  )
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${y}.${m}.${day} (${WEEKDAYS[d.getDay()]}) ${hh}:${mm}`
}
