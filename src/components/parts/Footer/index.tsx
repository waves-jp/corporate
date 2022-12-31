import { Box, chakra, Text } from '@chakra-ui/react'

export const Footer: React.FC = () => {
  return (
    <chakra.footer borderTop='1px solid #8B8B8B'>
      <Box py='40px' fontFamily='StereoGothic-550'>
        <img src='/images/footer-logo.png' alt='' />
      </Box>
      <Text lineHeight='24px'>
        WAVES
        <br />
        〒721-0955
        <br />
        広島県福山市新涯町6-8-3-205
      </Text>
    </chakra.footer>
  )
}
