import { Box, Image } from '@chakra-ui/react'

export const Noise: React.FC = () => {
  return (
    <Box
      w='100vw'
      h='100vh'
      position='fixed'
      top='0'
      left='0'
      userSelect='none'
      pointerEvents='none'
      zIndex='15'
    >
      <Image
        src='/images/noise-bg.gif'
        alt=''
        w='full'
        h='full'
        opacity='0.2'
      />
    </Box>
  )
}
