"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PropertyGallery({ images }) {
  return (
    <div className="featured_slick_gallery gray">
      <div className="featured_slick_gallery-slide home-slider">
        <div className="position-relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 0 },
              768: { slidesPerView: 2, spaceBetween: 0 },
            }}
            className="featured_slick_gallery-swiper"
          >
            {images?.map((img, index) => {
              const imageUrl =
                img?.startsWith("http")
                  ? img
                  : `${process.env.NEXT_PUBLIC_SITE_URL}${img}`;

              return (
                <SwiperSlide key={index}>
                  <div
                    className="featured_slick_padd"
                    style={{
                      width: "100%",
                      height: "500px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={`property-${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="custom-swiper-button-prev swiper-button">
            <ChevronLeftIcon />
          </div>

          <div className="custom-swiper-button-next swiper-button">
            <ChevronRightIcon />
          </div>
        </div>
      </div>


      
    </div>
  );
}
