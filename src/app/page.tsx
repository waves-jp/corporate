import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Value } from "@/components/Value";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { profile } from "@/lib/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.nameJa,
  alternateName: profile.nameEn,
  jobTitle: "AI業務改善のフルサイクルエンジニア",
  description:
    "課題発見から実装、改善され続ける仕組みまでを一人で作りきるフルサイクルエンジニア。",
  email: `mailto:${profile.email}`,
  sameAs: profile.links.map((l) => l.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Value />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
