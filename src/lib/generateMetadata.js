import { getSEO } from "@/lib/getSEO";
import { cache } from "react";

  export const  generateMetadata = cache(async (id) => {
  const pageKey = `property_detail_${id}`;

  const seo = await getSEO(pageKey);

  if (!seo) {
    return {
      title: "Property Details",
      description: "View property details",
    };
  }

  const image =
    seo.image?.startsWith("http")
      ? seo.image
      : `${process.env.NEXT_PUBLIC_SITE_URL}${seo.image}`;

  const url =
    seo.url ||
    `${process.env.NEXT_PUBLIC_SITE_URL}/property/${params.id}/${params.title}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.key,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: "website",
      siteName: "Unicorn App",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
});