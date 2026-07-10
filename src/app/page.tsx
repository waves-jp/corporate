import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Vision } from '@/components/Vision'
import { Service } from '@/components/Service'
import { Works } from '@/components/Works'
import { Profile } from '@/components/Profile'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { profile } from '@/lib/profile'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: profile.brand,
  url: 'https://www.waves-jp.com',
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
  founder: {
    '@type': 'Person',
    name: profile.nameJa,
    alternateName: profile.nameEn,
    jobTitle: 'AIコンサルタント / ソフトウェアエンジニア',
    sameAs: profile.links.map((l) => l.href),
  },
  sameAs: profile.links.map((l) => l.href),
}

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Vision />
        <Service />
        <Works />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
