import { convertYYYYMMDD } from '@/lib/day'
import { NewsContent } from '@/lib/microcmsClient'
import { Box, chakra, Stack, Text } from '@chakra-ui/react'
import { Link } from '../Link'

type Props = {
  news: NewsContent[]
  onClick: () => void
}

export const News: React.FC<Props> = (props) => {
  return (
    <Box>
      <chakra.ul listStyleType='none'>
        <Stack spacing='24px'>
          {props?.news.map((content) => {
            return (
              <chakra.li key={content.id}>
                <Text fontFamily={`'Zen Kaku Gothic New', sans-serif`}>
                  <chakra.span marginRight='16px'>
                    {convertYYYYMMDD(content.publishedAt)}:
                  </chakra.span>
                  <chakra.span
                    textDecoration='underline'
                    textUnderlineOffset='4px'
                    onClick={props.onClick}
                  >
                    <Link href={'/news/' + content.id} scroll={false}>
                      {content.title}
                    </Link>
                  </chakra.span>
                </Text>
              </chakra.li>
            )
          })}
        </Stack>
      </chakra.ul>
    </Box>
  )
}
