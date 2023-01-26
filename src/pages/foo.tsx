import type { NextPage } from 'next'
import { Template } from '@/components/templates'
import { useSeo } from '@/lib/seo'
import { TransitionBox } from '@/components/parts/TransitionBox'

const FooPage: NextPage = () => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: '',
    description: 'WAVES Portfoliio',
  })

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />
      <TransitionBox>foo</TransitionBox>
    </Template>
  )
}

export default FooPage
