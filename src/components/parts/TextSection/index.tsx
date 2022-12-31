import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'

type Props = {
  heading: string
  texts: (string | JSX.Element)[]
}

export const TextSection: React.FC<Props> = ({ heading, texts }) => {
  return (
    <Box>
      <HStack>
        <Heading
          as='h2'
          fontSize='24px'
          fontWeight='bold'
          fontFamily={`'Zen Kaku Gothic New', sans-serif`}
          pb='32px'
          display='flex'
          alignItems='center'
          _before={{
            content: `""`,
            width: '4px',
            height: '24px',
            backgroundColor: '#fff',
            mr: '16px',
          }}
        >
          {heading}
        </Heading>
      </HStack>
      <Stack spacing='24px'>
        {texts.map((value, index) => (
          <Box key={index}>{value}</Box>
        ))}
      </Stack>
    </Box>
  )
}
