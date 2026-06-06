import type { Dictionary } from "@/content";
import { Section } from "@/components/ui/Section";

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const { how } = dict;
  return (
    <Section id="how" className="bg-olive-dark text-cream">
      <div className="max-w-3xl">
        <p className="kicker text-champagne">{how.kicker}</p>
        <h2 className="mt-4 text-3xl leading-tight md:text-5xl">{how.title}</h2>
      </div>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {how.steps.map((step) => (
          <li key={step.step} className="border-t border-cream/25 pt-5">
            <span className="font-serif text-4xl text-champagne">{step.step}</span>
            <h3 className="mt-3 text-xl">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-cream/75">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
