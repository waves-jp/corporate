import useSWR from 'swr'
import { API_ENDPOINT } from '@/constants/env'

export type User = {
  userId: number
  title: string
  completed: boolean
}

type FetchUserResponse = { users: User[] }

// FIXME: 多分アップデートでuseSWRの使い方変わったので既存のコードじゃレスポンス取れなくなった
export const useFetchUser = (userId: number) => {
  return useSWR<FetchUserResponse>(`${API_ENDPOINT}/todos/${String(userId)}`)
}
