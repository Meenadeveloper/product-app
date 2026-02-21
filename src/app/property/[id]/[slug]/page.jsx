import { notFound } from "next/navigation";
import Image from "next/image";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import { formatPrice } from "@/utils/formatPrice";
import PropertyDetail from "@/components/property/PropertyDetail";
import DetailSidebar from "@/components/property/DetailSidebar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";

/* -----------------------------
   Fetch Property (Server Side)
------------------------------ */
async function getProperty(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.PROPERTY_DETAIL}/${id}`,
      {
        cache: "no-store", // or revalidate: 60
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

/* -----------------------------
   Dynamic SEO (MNC Level)
------------------------------ */
export async function generateMetadata({ params }) {
  const property = await getProperty(params.id);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  const image =
    property?.property_images?.[0] || property?.thumbnail || "";

  return {
    title: property.title,
    description: `${property.title} located at ${property.address}. Price: ${property.property_price}`,
    openGraph: {
      title: property.title,
      description: property.address,
      images: [image],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/property/${params.id}/${params.title}`,
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      images: [image],
    },
  };
}

/* -----------------------------
   Page Component (Server)
------------------------------ */
export default async function PropertyPage({ params }) {
  const property = await getProperty(params.id);

  if (!property) return notFound();

  const images = property?.property_images || [];

  return (
    <>
      {/* Gallery */}
      <div className="featured_slick_gallery gray">
        <div className="container">
          <div className="row">
            {images.map((img, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div style={{ position: "relative", height: 400 }}>
                  <Image
                    src={img}
                    alt={`property-${index}`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="gray-simple">
        <div className="container">
          <div className="row">

            {/* Left Content */}
            <div className="col-lg-8">
              <div className="property_block_wrap style-2 p-4">

                <span className="label text-light bg-success">
                  For {property?.offering_type?.name}
                </span>

                <h1 className="mt-3">{property?.title}</h1>

                <div className="d-flex align-items-center">
                  <LocationOnIcon sx={{ color: "red", mr: 1 }} />
                  {property?.address}
                </div>

                <h2 className="text-primary mt-3">
                  {formatPrice(property?.property_price, { withCurrency: true })}
                </h2>

                <div className="list-fx-features mt-3">

                  {property?.rooms && (
                    <div>{property.rooms} Bedrooms</div>
                  )}

                  {property?.bothrooms && (
                    <div>{property.bothrooms} Bathrooms</div>
                  )}

                  {property?.property_size && (
                    <div>{property.property_size} Sqft</div>
                  )}

                  {property?.total_floors && (
                    <div className="d-flex align-items-center">
                      <ApartmentIcon sx={{ mr: 1 }} />
                      {property.total_floors} Floors
                    </div>
                  )}

                </div>
              </div>

              {/* <PropertyDetail data={property} /> */}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* <DetailSidebar data={property} /> */}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}