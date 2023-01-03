/* eslint-disable react/jsx-key */
import { Stack, Text, Box, Image, chakra } from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { TextSection } from '@/components/parts/TextSection'
import { LinksSection } from '@/components/parts/LinksSection'
import '@splidejs/react-splide/css'

export const Main: React.FC = () => {
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
    <Stack spacing='80px'>
      <TextSection heading='Founder' texts={['Ryotaro Hada - 羽田涼太郎']} />
      <Image
        src='/images/i.jpeg'
        alt=''
        w='200px'
        filter='grayscale(100%) contrast(150%)'
        userSelect='none'
        pointerEvents='none'
      />
      <TextSection
        heading='About'
        texts={[
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            Web Application developer. Offering web application development
            skills.
            <br />
            I provide web application development skills under the trade name
            “WAVES”.
            <br />
            And, developing my project now.
          </Text>,
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
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
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            JavaScript / TypeScript / React / Next.js / Node.js / Express /
            Three.js / Docker / Golang / Solidity / Firebase / AWS / Blender /
            Adobe XD
            <br />
            Web2.0 / 3.0 application development / Project Management
          </Text>,
        ]}
      />
      <TextSection
        heading='Works'
        texts={[
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            開発を担当・携わったプロジェクトや個人開発など
          </Text>,
          <Splide
            options={{
              type: 'loop',
              gap: '16px',
              drag: 'free',
              arrows: false,
              pagination: false,
              fixedWidth: 250,
              fixedHeight: 160,
              perPage: 3,
              autoScroll: {
                pauseOnHover: false,
                pauseOnFocus: false,
                rewind: false,
                speed: 1,
              },
            }}
            extensions={{ AutoScroll }}
          >
            <SplideSlide>
              <chakra.a
                href='https://waves-jp.com'
                target='_blank'
                rel='noreferrer'
                h='full'
              >
                <Image
                  src='/images/work1.jpg'
                  alt='waves'
                  h='full'
                  objectFit='cover'
                />
              </chakra.a>
            </SplideSlide>
            <SplideSlide>
              <chakra.a
                href='https://ritmo.co.jp'
                target='_blank'
                rel='noreferrer'
                h='full'
              >
                <Image
                  src='/images/work2.jpg'
                  alt='ritmo'
                  h='full'
                  objectFit='cover'
                />
              </chakra.a>
            </SplideSlide>
            <SplideSlide>
              <chakra.a href='#' h='full'>
                <Image
                  src='/images/comingsoon.jpg'
                  alt='ritmo'
                  h='full'
                  objectFit='cover'
                />
              </chakra.a>
            </SplideSlide>
          </Splide>,
        ]}
      />
      <TextSection
        heading='Links'
        texts={[
          <Box>
            {links.map(({ name, path }, index) => (
              <LinksSection
                key={index}
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
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            Email : info@waves-jp.com
          </Text>,
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            Twitter : @ryotarohada
          </Text>,
          <Text
            lineHeight='32px'
            fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          >
            Discord : ryotarohada#2417
          </Text>,
        ]}
      />
    </Stack>
  )
}
