const formatRentalPeriod = period => {
  if (!period) return "";
  return period.replace(/_/g, " ");
};

const formatDate = value => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

const getImageUrl = property => {
  if (property?.image) return property.image;
  if (Array.isArray(property?.images) && property.images.length > 0) {
    const first = property.images[0];
    if (typeof first === "string") return first;
    if (first?.url) return first.url;
  }
  return "";
};

const PropertyDetails = ({ property }) => {
  const details = property?.data ?? property;
  if (!details) {
    return (
      <div className="property-details">
        <p>Property details are unavailable.</p>
      </div>
    );
  }
  const imageUrl = getImageUrl(details);
  return (
    <div className="property-details">
      <h1>{details?.title}</h1>
      {details?.short_description ? <p>{details.short_description}</p> : null}
      {imageUrl ? (
        <img src={imageUrl} alt={details?.title || "Property"} className="w-full rounded" />
      ) : null}
      <div className="property-info">
        <p>Price: {details?.property_price || "N/A"}</p>
        <p>Address: {details?.address || "N/A"}</p>
        <p>Bedrooms: {details?.rooms || "N/A"}</p>
        <p>Bathrooms: {details?.bothrooms || "N/A"}</p>
        <p>Size: {details?.property_size || "N/A"}</p>
        <p>Rental Period: {formatRentalPeriod(details?.rental_period) || "N/A"}</p>
        <p>Availability: {details?.availability || "N/A"}</p>
        <p>Available From: {formatDate(details?.from_date) || "N/A"}</p>
        <p>Reference: {details?.reference || "N/A"}</p>
        <p>Unique Code: {details?.unique_code || "N/A"}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
