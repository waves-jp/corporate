import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from '@/theme/extends'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const WrapChakraProvider: React.FC<Props> = ({ children }) => (
  <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
)
