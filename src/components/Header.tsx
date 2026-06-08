import Link from "next/link";

const nav = [
  { label: "Value", href: "#value" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-sm tracking-wide">
          RYOTARO<span className="text-accent">.</span>HADA
        </Link>
        <nav className="hidden gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="label border border-line-strong px-3 py-1.5 transition-colors hover:border-accent hover:text-accent"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
