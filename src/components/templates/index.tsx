import { Box, BoxProps } from '@chakra-ui/react'

type Props = {} & BoxProps

/** ページテンプレート */
export const Template: React.FC<Props> = ({
  children,
  p = 40,
  ...rest
}): JSX.Element => (
  <Box p={p} {...rest}>
    {children}
  </Box>
)
