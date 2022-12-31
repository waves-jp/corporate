/* eslint-disable react/jsx-key */
import type { NextPage } from 'next'
import { Stack, Text, Box } from '@chakra-ui/react'
import { Template } from '@/components/templates'
import { useSeo } from '@/lib/seo'
import { Header } from '@/components/parts/header'
import { TextSection } from '@/components/parts/TextSection'
import { LinksSection } from '@/components/parts/LinksSection'
import { Footer } from '@/components/parts/Footer'
import { BackgroundLogo } from '@/components/parts/BackgroundLogo'

const Index: NextPage = () => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: '',
    description: 'WAVES Portfoliio',
  })

  const links = [
    {
      name: 'GitHub',
      path: 'https://github.com/ryotarohada',
    },
    {
      name: 'Twitter',
      path: 'https://twitter.com/ryotarohada',
    },
    {
      name: 'Zenn',
      path: 'https://zenn.dev/ryotarohada',
    },
  ]

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />

      <Stack spacing='100px'>
        <Header />
        <Stack spacing='80px'>
          <TextSection
            heading='Founder'
            texts={['Ryotaro Hada - 羽田涼太郎']}
          />
          <TextSection
            heading='About'
            texts={[
              <Text lineHeight='32px'>
                Web Application developer. Offering web application development
                <br />
                skills. I provide web application development skills under the
                <br />
                trade name “WAVES”. And, developing my project now.
              </Text>,
              <Text lineHeight='32px'>
                フリーランスWeb開発者の羽田と申します。
                <br />
                屋号「WAVES」としてWebアプリケーションの開発スキルを提供しています。
                <br />
                また、個人開発も行なっています。
              </Text>,
            ]}
          />
          <TextSection
            heading='Skills'
            texts={[
              <Text lineHeight='32px'>
                JavaScript / TypeScript / React / Next.js / Node.js / Express /
                Docker / Golang / Solidity / Firebase / AWS
                <br />
                Web2.0 / 3.0 application development / Project Management
              </Text>,
            ]}
          />
          <TextSection
            heading='Links'
            texts={[
              <Box>
                {links.map(({ name, path }, index) => (
                  <LinksSection
                    name={name}
                    path={path}
                    hideSeparate={index === 0}
                  />
                ))}
              </Box>,
            ]}
          />
          <TextSection
            heading='Contact'
            texts={[
              <Text lineHeight='32px'>Email : info@waves-jp.com</Text>,
              <Text lineHeight='32px'>Twitter : @ryotarohada</Text>,
              <Text lineHeight='32px'>Discord : ryotarohada#2417</Text>,
            ]}
          />
        </Stack>
        <Footer />
      </Stack>
      <BackgroundLogo />
    </Template>
  )
}

export default Index
