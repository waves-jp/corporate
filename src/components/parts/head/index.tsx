import NextHead from 'next/head'

export const Head: React.FC = () => {
  return (
    <NextHead>
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@ryotarohada' />
    </NextHead>
  )
}
