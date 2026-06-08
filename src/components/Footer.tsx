import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-sm">
            RYOTARO<span className="text-accent">.</span>HADA
          </p>
          <p className="label mt-1">Full-cycle AI Engineer</p>
        </div>
        <p className="label">
          © {new Date().getFullYear()} {profile.nameEn}
        </p>
      </div>
    </footer>
  );
}
