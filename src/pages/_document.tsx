import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { WrapColorModeScript } from '@/theme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <WrapColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
