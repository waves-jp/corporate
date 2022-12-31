import type { NextPage } from 'next'
import { useCallback } from 'react'
import { Heading, Button, useToast } from '@chakra-ui/react'
import { Template } from '@/components/templates'
import { useFetchUser } from '@/services'
import { useSeo } from '@/lib/seo'
import { ItemCard } from '@/components/parts/ItemCard'

const Index: NextPage = () => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: 'Index',
    description: 'Indexの説明',
  })

  const USER_ID = 1
  const { data, error, mutate } = useFetchUser(USER_ID)
  const onMutate = useCallback(() => mutate(data), [data, mutate])

  const toast = useToast()

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />
      <Heading as='h1'>Hello, Boilerplate_Next!</Heading>
      {data?.users.map((item) => (
        <ItemCard {...item} key={item.title} />
      ))}
      {error &&
        toast({
          title: 'Error!',
          description: '通信エラーが発生しました',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })}
      <Button variant='contained' onClick={onMutate}>
        update
      </Button>
    </Template>
  )
}

export default Index
