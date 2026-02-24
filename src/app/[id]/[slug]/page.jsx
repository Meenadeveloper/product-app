import { notFound } from "next/navigation";
import Image from "next/image";
import { cache } from "react";
import axiosInstance from "@/services/axiosInstance";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import { formatPrice } from "@/utils/formatPrice";
import { getProperty } from "@/lib/getProperty";
import { getSEO } from "@/lib/getSEO";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropertyDetailClient from "@/components/property/PropertyDetailClient";
import DetailSidebar from "@/components/property/DetailSidebar";
import PropertyGalleryClient from "@/components/property/PropertyGalleryClient";

/* ---------------------------------
   Cache only the SEO fetch
---------------------------------- */
const getCachedSEO = cache(async (pageKey) => {
  return await getSEO(pageKey);
});

/* ---------------------------------
   Proper Next.js generateMetadata
---------------------------------- */

export async function generateMetadata(props) {
  const resolvedParams = await props.params; // ✅ MUST unwrap
  const id = resolvedParams.id; // ✅ safe
  const slug = resolvedParams.slug;

  const pageKey = `property_detail_${id}`;

  const seo = await getCachedSEO(pageKey);
  console.log("SEO data:", seo); // Debug log

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
    tag : seo.tags,
    alternates: {
      canonical: url,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      keywords: seo.key,
    tag : seo.tags,
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
}

/* =====================================================
   3️⃣  Property Page Component
===================================================== */

export default async function PropertyPage(props) {
  const resolvedParams = await props.params; // ✅ MUST unwrap
  const id = resolvedParams.id; // ✅ safe
  const slug = resolvedParams.slug;

  const property = await getProperty(id);
  console.log("Property data:", property);

  if (!property) {
    notFound();
  }

  return (
    <>
      <PropertyGalleryClient images={property.property_images} />

      <section className="gray-simple">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="property_block_wrap style-2 p-4">
                <div className="prt-detail-title-desc">
                  <span className="label text-light bg-success">
                    For {property?.offering_type?.name}
                  </span>

                  {property?.property_type?.name && (
                    <span
                      className="label text-light bg-success"
                      style={{ marginLeft: 10 }}
                    >
                      Type : {property?.property_type?.name}
                    </span>
                  )}

                  <h3 className="mt-3">
                    {property?.title ? property?.title : "N/A"}
                  </h3>
                  <span className="d-flex align-items-center">
                    <LocationOnIcon
                      style={{ fontSize: 20, color: "red", marginRight: 6 }}
                    />
                    {property?.address}
                  </span>

                  <h3 className="prt-price-fix text-primary mt-2">
                    {/* {property?.property_price}  */}
                    {formatPrice(property?.property_price, { withCurrency: true })}
                  </h3>

                  <span className="label text-light bg-success mt-2">
                    For {property?.category?.name}
                  </span>

                  <div className="list-fx-features mt-3">
                    {property?.rooms && (
                      <div className="listing-card-info-icon">
                        <div className="inc-fleat-icon me-1">
                          <img src="/property/images/bed.svg" width="13" alt="" />
                        </div>
                        {property?.rooms} Bedrooms
                      </div>
                    )}

                    {property?.bothrooms && (
                      <div className="listing-card-info-icon">
                        <div className="inc-fleat-icon me-1">
                          <img src="/property/images/bathtub.svg" width="13" alt="" />
                        </div>
                        {property?.bothrooms} Bathrooms
                      </div>
                    )}

                    {property?.property_size && (
                      <div className="listing-card-info-icon">
                        <div className="inc-fleat-icon me-1">
                          <img src="/property/images/move.svg" width="13" alt="" />
                        </div>
                        {property?.property_size} Size
                      </div>
                    )}

                    {property?.land_size && (
                      <div className="listing-card-info-icon">
                        <div className="inc-fleat-icon me-1">
                          <img src="/property/images/move.svg" width="13" alt="" />
                        </div>
                        {property?.land_size} Sqft
                      </div>
                    )}

                    {property?.total_floors && (
                      <div className="listing-card-info-icon d-flex align-items-center">
                        <ApartmentIcon
                          style={{ fontSize: 18, marginRight: 6 }}
                        />
                        <span>{property?.total_floors} Floors</span>
                      </div>
                    )}
                  </div>
                  {/* {property?.view_count > 0 && (
                    <span className="label text-light bg-success mt-2">
                      Visited Count {property?.view_count}
                    </span>
                  )} */}
                </div>
              </div>

              <PropertyDetailClient data={property} propertyId={id} />
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              <DetailSidebar data={property} propertyId={id} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

