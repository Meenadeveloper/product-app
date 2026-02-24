"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LandOwnerEnquiryModal from "./LandOwnerEnquiryModal";

const FabMenu = () => {
  const router = useRouter();

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  return (
    <>
      <LandOwnerEnquiryModal
        show={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        onSubmit={(formData) => {
          console.log("Enquiry submitted:", formData);
          setShowEnquiryModal(false);
        }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        
        {/* Advertise Property Button */}
        <button
          onClick={() => setShowEnquiryModal(true)}
          className="revealbtn btn-border-reveal"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Image
            src="/property/images/agency-1.png"
            alt="Advertise"
            width={30}
            height={30}
          />
          <span
            style={{
              width: "100%",
              maxWidth: "160px",
              color: "#000",
              fontSize: "14px",
            }}
          >
            If you want us to advertise your property
          </span>
        </button>

        {/* Career Button */}
        <button
          onClick={() => router.push("/career")}
          className="revealbtn btn-border-reveal"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <Image
            src="/property/images/job.png"
            alt="Career"
            width={30}
            height={30}
          />
          <span
            style={{
              width: "100%",
              maxWidth: "140px",
              color: "#000",
              fontSize: "14px",
            }}
          >
            If you want to work with us
          </span>
        </button>
      </div>
    </>
  );
};

export default FabMenu;
