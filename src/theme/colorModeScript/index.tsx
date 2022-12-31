import { ColorModeScript } from '@chakra-ui/react'
import { customColorMode } from '@/theme/options'

export const WrapColorModeScript: React.FC = () => (
  <ColorModeScript {...customColorMode} />
)
