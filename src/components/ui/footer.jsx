"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/store/filterStore";

const Footer = () => {
  const router = useRouter();
  const { setSelectedRent } = useFilterStore();

  const handleRentSelection = (rentType) => {
    setSelectedRent(rentType);
    window.scrollTo(0, 0);
    router.push("/property-list");
  };

  return (
    <footer className="dark-footer skin-dark-footer">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <Link href="/" className="nav-footer-logo">
                <Image
                  src="/property/images/logo.jpg"
                  alt="footer logo"
                  width={150}
                  height={120}
                  style={{
                    maxHeight: "120px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </Link>

              <div className="footer-add">
                <p>info@unicorn.com</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="widget-title">Navigations</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/blogs">Blog</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlights */}
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="widget-title">The Highlights</h4>
              <ul className="footer-menu">
                <li>
                  <button
                    className="footer-rent-btn"
                    onClick={() => handleRentSelection("Buy")}
                  >
                    Buy
                  </button>
                </li>
                <li>
                  <button
                    className="footer-rent-btn"
                    onClick={() => handleRentSelection("Rent")}
                  >
                    Rent
                  </button>
                </li>
                <li>
                  <Link href="/feature-property-list">
                    Feature Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Account */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">My Account</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="/user/my-profile">My Profile</Link>
                </li>
                <li>
                  <Link href="/user/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/user/change-password">
                    Change Password
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p className="mb-0">
                © {new Date().getFullYear()} Lowcommissionqatar. Develop with ❤️ By{" "}
                <Link
                  href="https://amrithaa.com/"
                  target="_blank"
                >
                  Amrithaa
                </Link>
              </p>
            </div>

            <div className="col-lg-6 col-md-6 text-right">
              <ul className="footer-bottom-social">
                <li>
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/" target="_blank">
                    <i className="fa-brands fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/company/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

