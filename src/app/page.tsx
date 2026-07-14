import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Vision } from '@/components/Vision'
import { Service } from '@/components/Service'
import { Works } from '@/components/Works'
import { Blog } from '@/components/Blog'
import { Profile } from '@/components/Profile'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { JsonLd } from '@/components/JsonLd'
import { profile, services } from '@/lib/profile'

const BASE_URL = 'https://www.waves-jp.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#organization`,
  name: profile.brand,
  url: BASE_URL,
  logo: `${BASE_URL}/waves-logo.svg`,
  image: `${BASE_URL}/ogp.png`,
  slogan: 'AIを、あたりまえの力に。',
  description:
    '広島県福山市を拠点とするAIコンサルティング＆ソフトウェア開発。課題の可視化から戦略設計、開発・実装、定着・内製化まで伴走する。',
  email: `mailto:${profile.email}`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
    addressRegion: '広島県',
    addressLocality: '福山市',
    streetAddress: '新海町6-8-3-205',
    postalCode: '721-0955',
  },
  areaServed: 'JP',
  founder: {
    '@type': 'Person',
    name: profile.nameJa,
    alternateName: profile.nameEn,
    jobTitle: 'AIコンサルタント / ソフトウェアエンジニア',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'サービス',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        url: `${BASE_URL}/service`,
      },
    })),
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: profile.brand,
  url: BASE_URL,
  inLanguage: 'ja',
  publisher: { '@id': `${BASE_URL}/#organization` },
}

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Header />
      <main>
        <Hero />
        <Vision />
        <Service />
        <Works />
        <Blog />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
