"use client";

import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";

export default function EnhancedAgentInfo({ data }) {
  const agent = data?.agent;
  const name = agent?.name || "Agent";
  const email = agent?.email || "agent@example.com";
  const phone = agent?.mobile || "N/A";

  return (

    <>
    
    
    <style>{`
        .enhanced-agent-card {
          background: linear-gradient(135deg, #921942 0%, #FF73A3 100%);
          border-radius: 16px;
          padding: 18px;
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }

        .enhanced-agent-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .enhanced-agent-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .enhanced-agent-avatar-wrapper {
          position: relative;
        }

        .enhanced-agent-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .enhanced-agent-verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: #4CAF50;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
        }

        .enhanced-agent-name-section {
          flex: 1;
        }

        .enhanced-agent-name {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: white;
        }

        .enhanced-agent-title {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .enhanced-agent-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 6px;
        }

        .enhanced-agent-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .enhanced-stat-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 12px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .enhanced-stat-number {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          color: white;
        }

        .enhanced-stat-label {
          font-size: 11px;
          opacity: 0.9;
          margin: 4px 0 0 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .enhanced-agent-contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .enhanced-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .enhanced-contact-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }

        .enhanced-contact-icon {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .enhanced-contact-details {
          flex: 1;
        }

        .enhanced-contact-label {
          font-size: 11px;
          opacity: 0.8;
          margin: 0 0 2px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .enhanced-contact-value {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .enhanced-agent-action-btn {
          width: 100%;
          background: white;
          color: #667eea;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .enhanced-agent-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .enhanced-agent-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .enhanced-agent-avatar {
            width: 70px;
            height: 70px;
          }
          
          .enhanced-agent-name {
            font-size: 18px;
          }
        }
      `}</style>
    
     <div className="enhanced-agent-card" style={{ marginBottom: "20px" }}>
        <div className="enhanced-agent-header">
          <div className="enhanced-agent-avatar-wrapper">
            
             <div style={{ marginRight: 12 }} >
            <Image
              src={data?.agent?.profile_url || "/images/placeholder.png"}
              alt={name}
              width={56}
              height={56}
              style={{ borderRadius: "50%", objectFit: "cover" }}
               className="enhanced-agent-avatar"
            />
          </div>
            <div className="enhanced-agent-verified-badge">
              <VerifiedIcon style={{ fontSize: 16, color: "white" }} />
            </div>
          </div>

          <div className="enhanced-agent-name-section">
            <h3 className="enhanced-agent-name">
              {name || "Professional Agent"}
            </h3>
            <p className="enhanced-agent-title">
              <PersonIcon style={{ fontSize: 16 }} />
              Licensed Real Estate Agent
            </p>
            {/* <div className="enhanced-agent-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  style={{ fontSize: 16, color: "#FFD700" }}
                />
              ))}
              <span style={{ fontSize: 13, marginLeft: 4 }}>
                5.0 (234 reviews)
              </span>
            </div> */}
          </div>
        </div>

        {/* <div className="enhanced-agent-stats">
          <div className="enhanced-stat-box">
            <p className="enhanced-stat-number">150+</p>
            <p className="enhanced-stat-label">Properties</p>
          </div>
          <div className="enhanced-stat-box">
            <p className="enhanced-stat-number">5 Yrs</p>
            <p className="enhanced-stat-label">Experience</p>
          </div>
          <div className="enhanced-stat-box">
            <p className="enhanced-stat-number">98%</p>
            <p className="enhanced-stat-label">Success Rate</p>
          </div>
        </div> */}

        <div className="enhanced-agent-contact-info">
          {/* {data?.agent?.mobile && (
            <div className="enhanced-contact-item">
              <div className="enhanced-contact-icon">
                <PhoneIcon style={{ fontSize: 20, color: "white" }} />
              </div>
              <div className="enhanced-contact-details">
                <p className="enhanced-contact-label">Phone Number</p>
                <p className="enhanced-contact-value">{data?.agent?.mobile}</p>
              </div>
            </div>
          )} */}

          {/* {data?.agent?.email && (
            <div className="enhanced-contact-item">
              <div className="enhanced-contact-icon">
                <EmailIcon style={{ fontSize: 20, color: "white" }} />
              </div>
              <div className="enhanced-contact-details">
                <p className="enhanced-contact-label">Email Address</p>
                <p className="enhanced-contact-value">{data?.agent?.email}</p>
              </div>
            </div>
          )} */}
        </div>

        {/* <button className="enhanced-agent-action-btn">Contact Agent Now</button> */}
      </div>
    
    
     {/* <div className="sides-widget">
      <div className="sides-widget-header bg-primary">
        <div className="sides-widget-details">
          <h4>Agent Info</h4>
        </div>
        <div className="clearfix"></div>
      </div>
      <div className="sides-widget-body">
        <div className="d-flex align-items-center">
          <div style={{ marginRight: 12 }}>
            <Image
              src="/images/user-6.jpg"
              alt={name}
              width={56}
              height={56}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="fw-bold">{name}</div>
            <div className="text-muted">{email}</div>
            <div className="text-muted">{phone}</div>
          </div>
        </div>
      </div>
    </div> */}
    
    
    
    
    
    
    
    </>
   
  );
}
