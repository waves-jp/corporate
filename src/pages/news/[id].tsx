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
import { Box, Heading, Text } from '@chakra-ui/react'
import { convertYYYYMMDD } from '@/lib/day'

type Props = NewsContent

const NewsPage: NextPage<Props> = (props) => {
  const { DefaultSeo, NextSeo } = useSeo({
    title: 'WAVES | ' + props.title,
    description: props.title,
  })

  return (
    <Template>
      <DefaultSeo />
      <NextSeo />
      <TransitionBox>
        <Text
          lineHeight='32px'
          fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          marginBottom='8px'
          color='white'
        >
          {convertYYYYMMDD(props.createdAt)}
        </Text>
        <Heading
          as='h2'
          fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          marginBottom='64px'
          color='white'
        >
          {props.title}
        </Heading>
        <Box
          dangerouslySetInnerHTML={{ __html: props.content }}
          sx={{
            p: {
              fontSize: '16px',
              lineHeight: '32px',
              fontFamily: `'Zen Kaku Gothic New', sans-serif`,
              color: '#fff',
            },
          }}
        />
      </TransitionBox>
    </Template>
  )
}

export async function getStaticProps(context: any) {
  const response = (await microcmsClient.get({
    endpoint: 'news',
    contentId: context.params.id,
  })) as NewsContent

  // console.log(response)

  return {
    props: response,
  }
}

export async function getStaticPaths() {
  const response = (await microcmsClient.get({
    endpoint: 'news',
  })) as NewsContentResponse

  const paths = response.contents.map((content) => {
    return {
      params: { id: content.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export default NewsPage
