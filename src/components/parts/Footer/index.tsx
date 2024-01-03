import { Box, chakra, Text, Image } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
    <chakra.footer borderTop='1px solid #8B8B8B'>
      <Box py='40px' fontFamily='StereoGothic-550'>
        <Image src='/images/footer-logo.svg' alt='' w={120} />
      </Box>
      <Text lineHeight='24px' color='white'>
        6-8-3-205 Shingaicho,
        <br />
        Fukuyama-shi,
        <br />
        Hiroshima-ken 721-0955 Japan
      </Text>
    </chakra.footer>
  )
}
