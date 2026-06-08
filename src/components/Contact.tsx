import { Section } from "./Section";
import { profile } from "@/lib/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      index="04"
      label="Contact / 連絡先"
      title={
        <>
          <span className="text-accent">仕組み</span>で解きたい課題が、ありますか。
        </>
      }
    >
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted">
        AIを使った業務改善、フルサイクルでの開発、
        「作って終わり」にならない仕組みづくり——
        相談したいことがあれば、気軽にご連絡ください。
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="group inline-flex items-center gap-4 border border-line-strong px-6 py-5 transition-colors hover:border-accent"
      >
        <span className="label">Email</span>
        <span className="font-mono text-lg sm:text-xl">{profile.email}</span>
        <span className="text-accent transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>

      {profile.links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-6">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </Section>
  );
}
