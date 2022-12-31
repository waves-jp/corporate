import type { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'
import { Head } from '@/components/parts/head'
import { WrapChakraProvider } from '@/theme'

const globalStyle = css`
  html,
  body {
    background-color: #101010;
  }
`

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <WrapChakraProvider>
    <Head />
    <Global styles={globalStyle} />
    <Component {...pageProps} />
  </WrapChakraProvider>
)

export default MyApp
