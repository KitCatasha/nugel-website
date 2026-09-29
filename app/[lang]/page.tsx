import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NugelPage from "../NugelPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "id" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (lang !== "en" && lang !== "id") {
    return {};
  }

  const isIndonesian = lang === "id";

  const title = isIndonesian
    ? "Konsentrat Minuman Olahraga & Perlengkapan Renang"
    : "Sports Drink Concentrate & Swim Essentials";

  const description = isIndonesian
    ? "NÜGEL menyediakan konsentrat minuman olahraga, tetes anti-fog, dan perlengkapan renang praktis yang dirancang untuk perenang dan gaya hidup aktif."
    : "NÜGEL offers sports drink concentrate, anti-fog drops, and practical swim essentials designed for swimmers and active lifestyles.";

  return {
    title: `${title} | NÜGEL`,
    description,

    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },

    openGraph: {
      title: `NÜGEL | ${title}`,
      description,
      url: `/${lang}`,
      siteName: "NÜGEL",
      locale: isIndonesian ? "id_ID" : "en_US",
      alternateLocale: [
        isIndonesian ? "en_US" : "id_ID",
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `NÜGEL | ${title}`,
      description,
    },
  };
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "en" && lang !== "id") {
    notFound();
  }

  return (
    <NugelPage
      language={lang}
    />
  );
}