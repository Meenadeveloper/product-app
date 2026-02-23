"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/services/axiosInstance";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import useUserStore from "@/store/userStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { formatPrice } from "@/utils/formatPrice";
import EnquiryModal from "@/components/property/EnquiryModal";
import EnhancedAgentInfo from "@/components/property/EnhancedAgentInfo";

import "swiper/css";
import "swiper/css/pagination";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function DetailSidebar({ data, token, propertyId }) {
  const router = useRouter();
  const { profile, fetchProfile } = useUserStore();

  const [featureProperty, setFeatureProperty] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "I'm interested in this property.",
  });

  useEffect(() => {
    if (token) {
      fetchProfile?.();
    }
  }, [token, fetchProfile]);

 

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      }));
    }
  }, [profile]);

  const userId = profile?.id || null;

  const propertyUrl = useMemo(() => {
    if (!data?.id) return "";
    const slug = slugify(data?.title);
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/property/${data.id}/${slug}`;
  }, [data?.id, data?.title]);

  const handleWhatsAppClick = async (e) => {
    e.preventDefault();

    const propertyId = data?.id;
    const propertyTitle = data?.title;
    const whatsappNumber = data?.agent?.whatsapp || "";

    if (!whatsappNumber) {
      toast.error("WhatsApp number not available for this property.");
      return;
    }

    const message = `Hello, I am interested in your property.\n\nLink: ${
      propertyUrl || `/property/${propertyId}/${slugify(propertyTitle)}`
    }\n`;
    const encodedMsg = encodeURIComponent(message);

    if (!token) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMsg}`,
        "_blank"
      );
      return;
    }

    try {
      await axiosInstance.get(
        `user/whatsapp-call-count?property_id=${propertyId}&type=whatsapp&user_id=${userId}`
      );

      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");
    } catch (error) {
      console.error("Error logging WhatsApp click:", error);
      toast.error("Failed to record WhatsApp click.");
    }
  };

  const handleCallClick = async (e) => {
    e.preventDefault();

    const propertyId = data?.id;
    const phoneNumber = data?.agent?.mobile || "";

    if (!phoneNumber) {
      toast.error("Phone number not available for this property.");
      return;
    }

    if (!token) {
      window.open(`tel:${phoneNumber}`, "_self");
      return;
    }

    try {
      await axiosInstance.get(
        `user/whatsapp-call-count?property_id=${propertyId}&type=call&user_id=${userId}`
      );

      window.open(`tel:${phoneNumber}`, "_self");
    } catch (error) {
      console.error("Error logging Call click:", error);
      toast.error("Failed to record Call click.");
    }
  };

  const handleSidebarEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${API_ENDPOINTS.ENQUIRY}?property_id=${data?.id}`;

      await axiosInstance.post(apiUrl, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.description,
      });

      toast.success("Your enquiry has been sent successfully!");
      setForm({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        description: "I'm interested in this property.",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send enquiry.");
      console.error("Error submitting enquiry:", error);
    }
  };

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axiosInstance.get("user/featured-list");
      if (response.data?.success) {
        setFeatureProperty(response?.data?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching featured properties:", error);
      toast.error(
        error.response?.data?.message || "Failed to load featured properties."
      );
    }
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  return (
    <>
      {showEnquiryModal && (
        <EnquiryModal
          show={showEnquiryModal}
          onClose={() => setShowEnquiryModal(false)}
          onSubmit={() => setShowEnquiryModal(false)}
          propertyId={data?.id || 1}
        />
      )}

      <div className="details-sidebar div property-sidebar side_stiky" >
        <div className="like_share_wrap b-0">
          <ul className="like_share_list">
            <li>
              <button
                style={{ height: "fit-content" }}
                 target="_blank"
                rel="noopener noreferrer"
                className="btn btn-likes"
                data-toggle="tooltip"
                data-original-title="Share on WhatsApp"
                onClick={handleWhatsAppClick}
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </button>
            </li>
            <li>
              <button
                style={{ height: "fit-content" }}
                className="btn btn-likes"
                data-toggle="tooltip"
                data-original-title="Call"
                onClick={handleCallClick}
              >
                <i
                  className="fas fa-phone-alt"
                  style={{ transform: "scaleX(-1)" }}
                ></i>{" "}
                Call
              </button>
            </li>
          </ul>
        </div>

        <EnhancedAgentInfo data={data} />

        {token && (
          <div className="sides-widget">
            <div className="sides-widget-header " style={{background:"#ad3964"}}>
              <div className="sides-widget-details">
                <h4>
                  <Link href="#">Enquiry Now</Link>
                </h4>
              </div>
              <div className="clearfix"></div>
            </div>

            <div className="sides-widget-body simple-form">
              <form onSubmit={handleSidebarEnquirySubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone No.</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    placeholder="Your Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-light-primary fw-medium rounded full-width"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="sidebar-widgets">
          <h4>Featured Property</h4>

          <div className="sidebar_featured_property">
            {featureProperty.slice(0, 4).map((item, index) => {
              const slug = slugify(item?.slug || item?.title);
              const href = `/property/${item.id}/${slug}`;
              return (
                <div
                  className="sides_list_property"
                  key={index}
                  onClick={() => router.push(href)}
                >
                  <div className="sides_list_property_thumb">
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      spaceBetween={0}
                      slidesPerView={1}
                      loop={true}
                      autoplay={{ delay: 3000 }}
                      pagination={{ clickable: true }}
                      className="rounded-3 overflow-hidden"
                      style={{ height: "200px" }}
                    >
                      {item.property_images?.map((el, imageIndex) => (
                        <SwiperSlide key={imageIndex}>
                          <Link href={href}>
                            <img
                              src={el}
                              alt={`slide-${imageIndex}`}
                              className="w-100 h-100"
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                display: "block",
                              }}
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="sides_list_property_detail">
                    <h4>
                      <Link href={href}>{item.title}</Link>
                    </h4>
                    <span className="two-line-ellipsis">
                      <i className="fa-solid fa-location-dot mt-2"></i>
                      {item.address}
                    </span>
                    <div className="lists_property_price">
                      <div className="lists_property_types">
                        {item.offering_type?.name === "Sale" && (
                          <div className="property_types_vlix sale">
                            For Sale
                          </div>
                        )}
                        {item.offering_type?.name === "Rent" && (
                          <div className="property_types_vlix">For Rent</div>
                        )}
                      </div>
                      <div className="lists_property_price_value">
                        <h4>
                          {formatPrice(item.property_price, {
                            withCurrency: true,
                          })}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
