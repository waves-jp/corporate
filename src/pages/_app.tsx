import type { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'
import { Head } from '@/components/parts/head'
import { WrapChakraProvider } from '@/theme'

const globalStyle = css`
  @font-face {
    font-family: 'StereoGothic-550';
    src: url('/https://waves-jp.s3.ap-northeast-1.amazonaws.com/Stereo+Gothic+550.ttf');
  }

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
