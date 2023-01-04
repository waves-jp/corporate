import type { NextPage } from 'next'
import { Stack } from '@chakra-ui/react'
import { Template } from '@/components/templates'
import { useSeo } from '@/lib/seo'
import { Header } from '@/components/parts/header'
import { Footer } from '@/components/parts/Footer'
import { BackgroundLogo } from '@/components/parts/BackgroundLogo'
import { Noise } from '@/components/parts/Noise'
import { Main } from '@/components/parts/Main'

const Index: NextPage = () => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: '',
    description: 'WAVES Portfoliio',
  })

  return (
    <Template onLoad={() => console.log('foo')}>
      <DefaultSeo />
      <NextSeo />

      <Stack spacing='100px' zIndex='100' position='relative'>
        <Header />
        <Main />
        <Footer />
      </Stack>

      <Noise />
      <BackgroundLogo />
    </Template>
  )
}

export default Index
