import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const convertYYYYMMDD = (date: string | Date) => {
  return dayjs.utc(date).tz('Asia/Tokyo').format('YYYY-MM-DD')
}
