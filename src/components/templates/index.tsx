import { Box, BoxProps } from '@chakra-ui/react'

type Props = {} & BoxProps

/** ページテンプレート */
export const Template: React.FC<Props> = ({
  children,
  ...rest
}): JSX.Element => (
  <Box {...rest} maxW='840px' m='auto' p='40px 20px 80px'>
    {children}
  </Box>
)
