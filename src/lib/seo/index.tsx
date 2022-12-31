import { DefaultSeo, NextSeo } from 'next-seo'
import { DEFAULT_FRONTEND_ORIGIN } from '../../constants/env'

export type UseSeoOptions = {
  title: string
  description: string
}

const ogImageWidth = 1200
const ogImageHeight = 630

const MyDefaultSeo = (): JSX.Element => {
  const siteName = '$site-name'
  const titleTemplate = `${siteName} | %s`
  const description = '$site-description'
  const ogImageUrl = `${DEFAULT_FRONTEND_ORIGIN}${'$og-image-path'}`
  const canonical = DEFAULT_FRONTEND_ORIGIN

  return (
    <DefaultSeo
      defaultTitle={siteName}
      titleTemplate={titleTemplate}
      description={description}
      canonical={canonical}
      openGraph={{
        description,
        title: siteName,
        images: [
          {
            url: ogImageUrl,
            height: ogImageHeight,
            width: ogImageWidth,
            alt: siteName,
          },
        ],
        type: 'website',
        site_name: siteName,
        url: canonical,
      }}
    />
  )
}

export const useSeo = (options?: UseSeoOptions) => ({
  DefaultSeo: MyDefaultSeo,
  NextSeo: options
    ? () => <NextSeo title={options.title} description={options.description} />
    : () => <NextSeo />,
})
