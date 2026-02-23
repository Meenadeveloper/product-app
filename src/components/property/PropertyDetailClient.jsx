"use client";

import { useState, useCallback, useMemo, useTransition, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axiosInstance from "@/services/axiosInstance";
import Swal from "sweetalert2";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Rating from "@mui/material/Rating";
import { Visibility } from "@mui/icons-material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Custom Lightbox Component
const CustomLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  useEffect(() => {
    // Store original overflow value
    const originalOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore original overflow or set to visible
      document.body.style.overflow = originalOverflow || "visible";
    };
  }, []);

  return (
    <div
      className="custom-lightbox-overlay"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        className="lightbox-content"
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "30px",
            cursor: "pointer",
            zIndex: 10001,
            padding: "5px",
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            style={{
              position: "absolute",
              left: "2%",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(94, 93, 93, 0.59)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "15px",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        {/* Image */}
        <img
          src={images[currentIndex]}
          alt={`Gallery ${currentIndex + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            style={{
              position: "absolute",
              right: "2%",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(122, 122, 122, 0.41)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "15px",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
            aria-label="Next"
          >
            ›
          </button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontSize: "14px",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "5px 10px",
              borderRadius: "15px",
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};


export default function PropertyDetailClient({
  data,
  propertyId,
  token,
}) {

  // Inside your component:
  const [isOpen, setIsOpen] = useState(false);
  let [open, setOpen] = useState(true);
  let [open2, setOpen2] = useState(true);
  let [open3, setOpen3] = useState(true);
  let [open4, setOpen4] = useState(false);
  let [open5, setOpen5] = useState(false);
  let [open6, setOpen6] = useState(false);
  let [open7, setOpen7] = useState(false);
  let [open8, setOpen8] = useState(true);
  let [open9, setOpen9] = useState(true);
  let [open10, setOpen10] = useState(true);
  let [show, setShow] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
    

// Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  /* ------------------------------------
     Memoized derived values
  ------------------------------------ */
  const ratingPercentage = useMemo(() => {
    return ((data?.rating || 0) / 5) * 100;
  }, [data?.rating]);

  /* ------------------------------------
     Submit Review (Optimized)
  ------------------------------------ */
  const handleSubmitReview = useCallback(
    async (e) => {
      e.preventDefault();

      if (!rating) return toast.error("Select rating");
      if (!comment.trim()) return toast.error("Write comment");

      startTransition(async () => {
        try {
          await axiosInstance.post(
            `/user/ratting`,
            {
              property_id: propertyId,
              rating,
              comment,
            },
            {
              withCredentials: true, // IMPORTANT
              skipAuthRedirect: true,
            }
          );

          toast.success("Review submitted");
          setRating(0);
          setComment("");
        } catch (err) {
          toast.error(err?.response?.data?.message ||"Failed to submit review");
        }
      });
    },
    [rating, comment, propertyId]
  );

    const onImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Ensure scrolling is restored
    setTimeout(() => {
      document.body.style.overflow = "visible";
    }, 100);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data?.property_images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data?.property_images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* ================================= */}
      {/* PROPERTY DETAILS */}
      {/* ================================= */}

      <div className="property_block_wrap style-2">
        <div className="property_block_wrap_header">
          <Link
            href="#"
            onClick={() => setOpen(!open)}
            className={open ? "" : "collapsed"}
          >
            <h4 className="property_block_title">
              Detail & Features
              <span className="property_block_wrap_icon">
                <ExpandMoreIcon fontSize="small" />
              </span>
            </h4>
          </Link>
        </div>
        <div
          id="clOne"
          className={`panel-collapse collapse ${open ? "show" : ""}`}
        >
          <div className="block-body">
            <ul className="deatil_features">
              {/* {propertyFeature.map((item, index) => {
                  const IconComponent = item.icon; // Use as a component
                  return (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ marginRight: "10px", color: "#921942" }}>
                        <IconComponent />
                      </span>
                      <span>
                        <strong>{item.title}</strong> {item.value}
                      </span>
                    </li>
                  );
                })} */}

              {data?.rooms && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <BedIcon />
                  </span>
                  <span>
                    <strong>Bedrooms</strong> {data?.rooms}
                  </span>
                </li>
              )}

              {data?.bothrooms && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <BathtubIcon />
                  </span>
                  <span>
                    <strong>Bathroom</strong> {data?.bothrooms}
                  </span>
                </li>
              )}

              {data?.property_size && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <SquareFootIcon />
                  </span>
                  <span>
                    <strong>Property Size</strong> {data?.property_size}
                  </span>
                </li>
              )}

              {data?.land_size && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <SquareFootIcon />
                  </span>
                  <span>
                    <strong>Land Size</strong> {data?.land_size} sq ft
                  </span>
                </li>
              )}

              {data?.total_floors && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <ApartmentIcon />
                  </span>
                  <span>
                    <strong>Total Floor</strong> {data?.total_floors}
                  </span>
                </li>
              )}

              {data?.plot_number && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <ApartmentIcon />
                  </span>
                  <span>
                    <strong>Plot Number</strong> {data?.plot_number}
                  </span>
                </li>
              )}

              {data?.floor_number && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <ApartmentIcon />
                  </span>
                  <span>
                    <strong>Floor Number</strong> {data?.floor_number}
                  </span>
                </li>
              )}

              {data?.status && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <CheckCircleIcon />
                  </span>
                  <span>
                    <strong>Status</strong> {data?.status}
                  </span>
                </li>
              )}

              {data?.view_count > 0 && (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ marginRight: "10px", color: "#921942" }}>
                    <Visibility />
                  </span>
                  <span>
                    <strong>View Count</strong> {data?.view_count}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

       <div className="property_block_wrap style-2">
        <div className="property_block_wrap_header">
          <Link
            
            href="#"
            onClick={() => setOpen2(!open2)}
            className={open2 ? "" : "collapsed"}
          >
            <h4 className="property_block_title">
              Description
              <span className="property_block_wrap_icon">
                <ExpandMoreIcon fontSize="small" />
              </span>
            </h4>
          </Link>
        </div>
        <div
          id="clTwo"
          className={`panel-collapse collapse ${open2 ? "show" : ""}`}
        >
          <div className="block-body">
            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
          </div>
        </div>
      </div>


<div className="property_block_wrap style-2">
        <div className="property_block_wrap_header">
          <Link
            href="#"
            onClick={() => setOpen3(!open3)}
            className={open3 ? "" : "collapsed"}
          >
            <h4 className="property_block_title">
              Amenities
              <span className="property_block_wrap_icon">
                <ExpandMoreIcon fontSize="small" />
              </span>
            </h4>
          </Link>
        </div>
        <div
          id="clThree"
          className={`panel-collapse collapse ${open3 ? "show" : ""}`}
        >
          <div className="block-body">
            <ul className="avl-features third color">
              {data?.amenities &&
                data?.amenities?.map((item) => (
                  <li key={item?.id ?? item?.name}>
                    <span className="avl-features-icon">
                      <CheckCircleIcon fontSize="small" />
                    </span>
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

 {/* virtual tour */}
      {data?.video_tour_url && (
        <div className="property_block_wrap style-2">
          <div className="property_block_wrap_header">
            <Link
              href="#"
              onClick={() => setOpen4(!open4)}
              className={open4 ? "" : "collapsed"}
            >
              <h4 className="property_block_title">
                Video
                <span className="property_block_wrap_icon">
                  <ExpandMoreIcon fontSize="small" />
                </span>
              </h4>
            </Link>
          </div>
          <div
            id="clFive"
            className={`panel-collapse collapse ${open4 ? "show" : ""}`}
          >
            <div className="block-body">
              <a
                href={data?.video_tour_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open Video Tour
              </a>
            </div>
          </div>
        </div>
      )}



      <div className="property_block_wrap style-2">
        <div className="property_block_wrap_header">
          <Link
            href="#"
            onClick={() => setOpen6(!open6)}
            className={open6 ? "" : "collapsed"}
          >
            <h4 className="property_block_title">
              Location
              <span className="property_block_wrap_icon">
                <ExpandMoreIcon fontSize="small" />
              </span>
            </h4>
          </Link>
        </div>
        <div
          id="clSix"
          className={`panel-collapse collapse ${open6 ? "show" : ""}`}
        >
          <div className="block-body">
            <div className="map-container">
              <iframe
                src={`https://www.google.com/maps?q=${data?.latitude},${data?.longitude}&hl=es;z=14&output=embed`}
                width="100%"
                height="450"
                style={{ border: "0" }}
                loading="lazy"
                title={data?.address}
              ></iframe>
            </div>
          </div>
        </div>
      </div>

    


      {/* ================================= */}
      {/* GALLERY (Optimized Image) */}
      {/* ================================= */}
   <div className="property_block_wrap style-2">
        <div className="property_block_wrap_header">
          <Link
            href="#"
            onClick={() => setOpen7(!open7)}
            className={open7 ? "" : "collapsed"}
          >
            <h4 className="property_block_title">
              Gallery
              <span className="property_block_wrap_icon">
                <ExpandMoreIcon fontSize="small" />
              </span>
            </h4>
          </Link>
        </div>

        <div
          id="clSev"
          className={`panel-collapse collapse ${open7 ? "show" : ""}`}
        >
          <div className="block-body">
            <ul className="list-gallery-inline">
              {data?.property_images?.map((item, index) => {
                return (
                  <li key={index}>
                    <button
                      type="button"
                      className="mfp-gallery"
                      onClick={() => onImageClick(index)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        key={index}
                        src={item}
                        className="img-fluid mx-auto"
                        alt={`Gallery ${index + 1}`}
                        style={{
                          width: "100%", // Fixed width (adjust as needed)
                          height: "170px", // Fixed height (adjust as needed)
                          objectFit: "cover", // Ensures cropped fit without stretching
                          borderRadius: "6px", // Optional: rounded corners
                          display: "block",
                        }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <CustomLightbox
              images={data?.property_images}
              currentIndex={currentImageIndex}
              isOpen={lightboxOpen}
              onClose={closeLightbox}
              onNext={nextImage}
              onPrev={prevImage}
            />
          </div>
        </div>
      </div> 
     

      {/* ================================= */}
      {/* RATING OVERVIEW */}
      {/* ================================= */}

      {/* <div className="rating-overview">
        <strong>{data?.rating || 0}</strong>

        <div
          style={{
            height: 6,
            width: "100%",
            background: "#eee",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              width: `${ratingPercentage}%`,
              height: "100%",
              background: "#ffb400",
              borderRadius: 5,
            }}
          />
        </div>
      </div> */}

      {/* ================================= */}
      {/* REVIEW FORM (Only if Logged In) */}
      {/* ================================= */}

    
      <div className="rating-overview">
        <div className="rating-overview-box">
          <span className="rating-overview-box-total">
            {" "}
            {data?.rating || 0}
          </span>
          <span className="rating-overview-box-percent">out of 5.0</span>
          <div className="star-rating" data-rating="5">
            <i className="fas fa-star fs-xs mx-1"></i>
            <i className="fas fa-star fs-xs mx-1"></i>
            <i className="fas fa-star fs-xs mx-1"></i>
            <i className="fas fa-star fs-xs mx-1"></i>
            <i className="fas fa-star fs-xs mx-1"></i>
          </div>
        </div>

        <div className="rating-bars">
          <div className="rating-bars-item">
            <span className="rating-bars-name">Client Satisfication</span>
            <span className="rating-bars-inner">
              <span
                className="rating-bars-rating good"
                data-rating={data?.rating || 0}
              >
                <span
                  className="rating-bars-rating-inner"
                  style={{
                    width: `${((data?.rating || 0) / 5) * 100}%`,
                  }}
                ></span>
              </span>
              <strong>{data?.rating || 0}</strong>
            </span>
          </div>
        </div>
      </div>

      {token && (
        <div className="property_block_wrap style-2">
          <div className="property_block_wrap_header">
            <Link
              href="#"
              onClick={() => setOpen10(!open10)}
              className={open10 ? "" : "collapsed"}
            >
              <h4 className="property_block_title">
                Write a Review
                <span className="property_block_wrap_icon">
                  <ExpandMoreIcon fontSize="small" />
                </span>
              </h4>
            </Link>
          </div>
          <div
            id="clTen"
            className={`panel-collapse collapse ${open10 ? "show" : ""}`}
          >
            <div className="block-body">
              <form className="form-submit" onSubmit={handleSubmitReview}>
                <div className="row">
                  {/* Rating Component */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ marginBottom: "10px", display: "block" }}>
                        Your Rating
                      </label>
                      <Rating
                        name="property-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        size="large"
                        precision={1}
                        sx={{
                          fontSize: 60, // ✅ This increases star size (number = px)
                          color: "#ffb400", // Optional: gold color
                        }}
                      />
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <textarea
                        className="form-control ht-40"
                        placeholder="Write your review here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        style={{ height: "80px" }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <button
                        className="btn btn-primary fw-medium px-lg-5 rounded"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

