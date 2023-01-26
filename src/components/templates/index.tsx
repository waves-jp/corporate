import { Box, BoxProps, Container, Stack } from '@chakra-ui/react'
import { BackgroundLogo } from '@/components/parts/BackgroundLogo'
import { Noise } from '@/components/parts/Noise'
import { Header } from '../parts/header'
import { Footer } from '../parts/Footer'

type Props = {
  isHideBackgroundLogo?: boolean
} & BoxProps

/** ページテンプレート */
export const Template: React.FC<Props> = ({
  children,
  isHideBackgroundLogo = false,
  ...rest
}) => (
  <Container {...rest} maxW='840px' m='auto' p='40px 20px 80px'>
    <Box position='relative' zIndex={20}>
      <Stack spacing='100px' zIndex='100' position='relative'>
        <Header />
        {children}
        <Footer />
      </Stack>
    </Box>
    <Noise />
    {isHideBackgroundLogo || <BackgroundLogo />}
  </Container>
)
