import { BoxProps, Container } from '@chakra-ui/react'
import { BackgroundLogo } from '@/components/parts/BackgroundLogo'
import { Noise } from '@/components/parts/Noise'
import { MotionBox } from '@/components/parts/MotionBox'

type Props = {} & BoxProps

/** ページテンプレート */
export const Template: React.FC<Props> = ({ children, ...rest }) => (
  <Container {...rest} maxW='840px' m='auto' p='40px 20px 80px'>
    <MotionBox
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }} // アンマウント時
      position='relative'
      zIndex={20}
    >
      {children}
    </MotionBox>
    <Noise />
    <BackgroundLogo />
  </Container>
)
