/* eslint-disable react/jsx-key */
import {
  Stack,
  Text,
  Box,
  Image,
  chakra,
  HStack,
  Button,
  Input,
} from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { TextSection } from '@/components/parts/TextSection'
import { LinksSection } from '@/components/parts/LinksSection'
import '@splidejs/react-splide/css'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'
import type { NextPage } from 'next'
import { Template } from '@/components/templates'
import { useSeo } from '@/lib/seo'
import { Link } from '@/components/parts/Link'
import { TransitionBox } from '@/components/parts/TransitionBox'
import {
  microcmsClient,
  NewsContent,
  NewsContentResponse,
} from '@/lib/microcmsClient'
import { News } from '@/components/parts/News'

type FreeMintForm = {
  toAddress: string
}

type Props = { news: NewsContent[] }

const Index: NextPage<Props> = (props) => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: '',
    description: 'WAVES Portfoliio',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessMint, setIsSuccessMint] = useState(false)
  const [tokenId, setTokenId] = useState('')

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

  const schema: yup.SchemaOf<FreeMintForm> = yup.object().shape({
    toAddress: yup
      .string()
      .required('有効なウォレットアドレスを入力してください'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FreeMintForm>({
    resolver: yupResolver(schema),
  })
  const successSubmitHandler: SubmitHandler<FreeMintForm> = async ({
    toAddress,
  }) => {
    // console.log(toAddress)
    setIsLoading(true)
    const response = await axios.post('https://www.waves-jp.com/api/mint/1', {
      toAddress,
    })
    setIsLoading(false)
    setIsSuccessMint(true)
    setTokenId(response.data.value)
    // console.log(response)
  }
  const errorSubmitHandler: SubmitErrorHandler<FreeMintForm> = (err) => {
    // console.log(err)
  }

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />

      <TransitionBox>
        <chakra.main>
          <Stack spacing='80px'>
            <TextSection
              heading='Founder'
              texts={['Ryotaro Hada - 羽田涼太郎']}
            />
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
                  Web Application developer.
                  <br />
                  Offering web application development skills.
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
                  JavaScript / TypeScript / React / Next.js / Node.js / Express
                  / Three.js / Docker / Golang / Solidity / Firebase / AWS /
                  Blender / Adobe XD
                  <br />
                  Web2.0 / 3.0 application development / Project Management
                </Text>,
              ]}
            />
            <TextSection
              heading='BusinessCard NFT'
              texts={[
                <Text
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                >
                  私の名刺をNFTとしてお配りしています。
                  <br />
                  ガス代フリーでミントできます。
                </Text>,
                <Text
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                >
                  <chakra.a
                    href='https://www.sbbit.jp/article/fj/60992'
                    target='_blank'
                    textDecor='underline'
                  >
                    <chakra.span pb='2px'>NFTとは？</chakra.span>
                    <ExternalLinkIcon />
                  </chakra.a>
                </Text>,
                <Text
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                >
                  対応チェーン : Ethereum（Goerli Test Network）
                  <br />
                  コントラクトアドレス :{' '}
                  <chakra.a
                    href='https://goerli.etherscan.io/address/0xED1B71f0002bCE1773997A16305B0955c6329Cbc'
                    target='_blank'
                    textDecor='underline'
                  >
                    0xED1B71f0002bCE1773997A16305B0955c6329Cbc
                  </chakra.a>
                </Text>,
                <Image
                  src='https://waves-jp.s3.ap-northeast-1.amazonaws.com/waves-business-card-v1.jpg'
                  maxWidth='400px'
                  w='100%'
                  alt='BusinessCard NFT'
                />,
                <HStack spacing={8}>
                  <Box borderWidth='1px' borderRadius='md'>
                    <HStack spacing={0}>
                      <Box borderWidth='0 1px 0 0' px={6} py={2}>
                        <chakra.span fontSize={12}>Your Address</chakra.span>
                      </Box>
                      <chakra.form
                        onSubmit={handleSubmit(
                          successSubmitHandler,
                          errorSubmitHandler,
                        )}
                      >
                        <HStack spacing={0}>
                          <Box w='180px'>
                            <Input
                              border='none'
                              borderRadius={0}
                              fontSize={16}
                              {...register('toAddress')}
                            />
                          </Box>
                          <Box borderWidth='0 0 0 1px'>
                            <Button
                              type='submit'
                              fontSize={12}
                              px={16}
                              py={0}
                              backgroundColor='transparent'
                              width='full'
                              borderRadius='0 md md 0'
                              isLoading={isLoading}
                            >
                              <chakra.span fontSize={12}>Mint</chakra.span>
                            </Button>
                          </Box>
                        </HStack>
                      </chakra.form>
                    </HStack>
                  </Box>
                </HStack>,
                <Text
                  fontSize='14px'
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                  color='red.500'
                >
                  {errors.toAddress && '※ ' + errors.toAddress?.message}
                </Text>,
                <Box
                  fontSize='14px'
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                  color='green.300'
                >
                  {isSuccessMint && (
                    <>
                      <HStack spacing={4} align='center'>
                        <CheckCircleIcon />
                        <chakra.span>NFTを付与しました</chakra.span>
                      </HStack>

                      <chakra.span color='#fff' fontWeight='bold'>
                        Token ID : {tokenId}
                      </chakra.span>
                    </>
                  )}
                </Box>,
              ]}
            />
            <TextSection
              heading='Works'
              texts={[
                <Text
                  lineHeight='32px'
                  fontFamily={`'Zen Kaku Gothic New', sans-serif`}
                >
                  開発を担当・携わったプロジェクトや個人開発（公開可能な一部に限る）
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
            <TextSection heading='News' texts={[<News news={props.news} />]} />
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
        </chakra.main>
      </TransitionBox>
    </Template>
  )
}

export async function getStaticProps() {
  const response = (await microcmsClient.get({
    endpoint: 'news',
  })) as NewsContentResponse

  const news = response.contents.map((content) => {
    return {
      ...content,
    }
  })

  return {
    props: { news },
  }
}

export default Index
