import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/config";
import { CinematicHero } from "@/components/marketing/CinematicHero";
import { Positioning } from "@/components/marketing/Positioning";
import { Occasions } from "@/components/marketing/Occasions";
import { Packages } from "@/components/marketing/Packages";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Gallery } from "@/components/marketing/Gallery";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Faq } from "@/components/marketing/Faq";
import { InquirySection } from "@/components/marketing/InquirySection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <CinematicHero dict={dict} />
      <Positioning dict={dict} />
      <Occasions dict={dict} />
      <Packages dict={dict} />
      <HowItWorks dict={dict} />
      <Gallery dict={dict} />
      {siteConfig.showTestimonials && <Testimonials dict={dict} />}
      <Faq dict={dict} />
      <InquirySection dict={dict} locale={locale} />
    </>
  );
}
