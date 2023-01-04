import type { AppProps } from 'next/app'
import { Global, css } from '@emotion/react'
import { AnimatePresence } from 'framer-motion'
import { Head } from '@/components/parts/head'
import { WrapChakraProvider } from '@/theme'

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap');

  @font-face {
    font-family: 'StereoGothic-550';
    src: url('/https://waves-jp.s3.ap-northeast-1.amazonaws.com/Stereo+Gothic+550.ttf');
  }

  html,
  body {
    background-color: #000;
  }
`

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => (
  <WrapChakraProvider>
    <Head />
    <Global styles={globalStyle} />
    <AnimatePresence mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
      <Component key={router.asPath} {...pageProps} />
    </AnimatePresence>
  </WrapChakraProvider>
)

export default MyApp
