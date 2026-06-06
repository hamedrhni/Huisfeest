import { cn } from "@/lib/utils";

/** Editorial section wrapper with consistent vertical rhythm + anchor id. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28 scroll-mt-24", className)}>
      <div className="container-editorial">{children}</div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="kicker">{kicker}</p>
      <h2 className="mt-4 text-3xl leading-tight text-charcoal md:text-5xl">{title}</h2>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-charcoal-muted">{intro}</p>
      ) : null}
    </div>
  );
}
