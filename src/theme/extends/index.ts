import { extendTheme } from '@chakra-ui/react'
import {
  customComponentsOptions,
  customColorMode,
  customColorsOptions,
  customFontsOptions,
  customSpaceOptions,
} from '@/theme/options'

export const customTheme = extendTheme({
  ...customComponentsOptions,
  ...customColorMode,
  ...customColorsOptions,
  ...customFontsOptions,
  ...customSpaceOptions,
})
