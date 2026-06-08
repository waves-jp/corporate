type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

export function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <div className="mb-12 flex items-baseline gap-4 border-b border-line pb-6">
          <span className="label text-accent">{index}</span>
          <span className="label">{label}</span>
        </div>
        <h2 className="mb-12 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
