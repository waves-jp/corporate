import type { NextPage } from 'next'
import { Stack } from '@chakra-ui/react'
import { Template } from '@/components/templates'
import { useSeo } from '@/lib/seo'
import { Header } from '@/components/parts/header'
import { Footer } from '@/components/parts/Footer'
import { useRouter } from 'next/router'

const WorkPage: NextPage = () => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: '',
    description: 'WAVES Portfoliio',
  })
  const router = useRouter()
  const { id } = router.query

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />

      <Stack spacing='100px' zIndex='100' position='relative'>
        <Header />
        {id}
        <Footer />
      </Stack>
    </Template>
  )
}

export default WorkPage
