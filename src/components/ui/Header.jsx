"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

import useUserStore from "@/store/userStore";
import { fetchFilterMaster } from "@/services/propertyAPI";
import axiosInstance from "@/services/axiosInstance";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import FabMenu from "./FabMenu";
import LoginModel from "./LoginModel";

const Header = ({ transparent = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { profile, fetchProfile, clearUser } = useUserStore();

  const [menuItems, setMenuItems] = useState([]);
  const [hasToken, setHasToken] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [login, setLogin] = useState(false);

  /* ---------------- TOKEN CHECK ---------------- */

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      const result = await fetchProfile();
      if (isMounted) {
        setHasToken(!!result?.ok);
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [fetchProfile]);

  /* ---------------- FETCH MENU ---------------- */

  useEffect(() => {
    const loadMenu = async () => {
      const res = await fetchFilterMaster();

      if (res?.success) {
        const offering =
          res.data?.offering_types?.map((item) => ({
            type: "offering",
            name: item.name,
          })) || [];

        const category =
          res.data?.categories?.map((item) => ({
            type: "category",
            name: item.name,
            id: item.id,
          })) || [];

        setMenuItems([...offering, ...category]);
      }
    };

    loadMenu();
  }, []);

  /* ---------------- SCROLL EFFECT ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    try {
      await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearUser();
      setHasToken(false);
      router.push("/");
    }
  };

  /* ---------------- MENU CLICK ---------------- */

  const isActive = (item) => {
    if (!searchParams) return false;

    if (item.type === "offering") {
      return searchParams.get("offeringtype") === item.name;
    }

    if (item.type === "category") {
      return searchParams.get("category") === item.name;
    }

    return false;
  };

    // 🔹 Handle menu click
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);

    const handlerScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handlerScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handlerScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  /* ---------------- UI ---------------- */

  return (

    <>
    <header
       className={`header ${scroll ? "header-fixed" : ""} ${
          transparent ? "header-transparent dark" : "header-light head-shadow"
        }`}
    >
       <div className="" style={{ width:"100%", maxWidth:"1300px", margin:"0 auto"}}>
      <nav
        id="navigation"
        className={
          windowWidth > 991
            ? "navigation navigation-landscape"
            : "navigation navigation-portrait"
        }
      >

        {/* LOGO */}
        <div className="nav-header  p-2" style={{ lineHeight: "0" }}>
          <div 
          // href="/" 
          className="nav-brand text-logo"  style={{
                  width: "100%", // allow image to size naturally
                  height: "auto", // let image control height
                  // marginRight: "50px",
                  display: "block", // helps with layout
                  alignItems: "center",
                }}>
            <img src="/property/images/logo.png" alt="Logo"   style={{
                    maxHeight: "80px", // controls height of logo
                    maxWidth: "200px", // prevents horizontal overflow
                    width:"100%",
                    objectFit: "contain", // maintains aspect ratio
                  }} />
          </div>

          <div
            className="nav-toggle"
            onClick={() => setToggle(!toggle)}
          />

          <div className="mobile_nav">
                <ul>
                  <li>
                    {hasToken ? (
                      <Link href="/user/my-profile">
                        <img src="/property/images/placeholder.png" alt="profile" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setLogin(true)}
                        className="btn btn-primary"
                      >
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>

        </div>

        {/* MENU */}
        <div
          className={`nav-menus-wrapper ${
            toggle ? "nav-menus-wrapper-open" : ""
          }`}

           style={{ transitionProperty: toggle ? "none" : "left" }}
        >
          <span
            className="nav-menus-wrapper-close-button"
            onClick={() => setToggle(false)}
          >
            ✕
          </span>
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className={isActive(item) ? "active" : ""}>
                <Link
                  href={
                    item.type === "offering"
                      ? `/property-list?offeringtype=${encodeURIComponent(
                          item.name
                        )}`
                      : `/property-list?category=${item.name}`
                  }
                  onClick={() => setToggle(false)}
                  className={`menu-btn text-primary ${
                    isActive(item) ? "active-menu" : ""
                  }`}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#333",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    padding: "8px 15px",
                  }}
                >
                  {item.name}
                </Link>
              </li>

              
            ))}

             <li>
                  <FabMenu />
                </li>
          </ul>

          {/* RIGHT SIDE */}
           {!hasToken ? (
                <>
                  <ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex gap-3">
                   
                    <li>
                      <button
                        className="unicorn-find-btn w-100"
                        onClick={() => setLogin(true)}
                      >
                        Login
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  {" "}
                  <ul className="nav-menu nav-menu-social align-to-right d-none d-lg-inline-flex">
                    <ul className="nav-menu nav-menu-social align-to-right">
                     
                      <li>
                        <div className="btn-group account-drop">
                          <button
                            type="button"
                            className="btn btn-order-by-filt dropdown-toggle"
                            onClick={() => setUserMenu(!userMenu)}
                          >
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                overflow: "hidden",
                                borderRadius: "50%",
                                marginRight: "7px",
                              }}
                            >
                              <img
                                src={profile?.profile_url || "/property/images/user.png"}
                                className=""
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            Hi, {profile?.name || "User"}
                          </button>
                          <div
                            className="dropdown-menu pull-right animated flipInX"
                            style={{ display: userMenu ? "block" : "none" }}
                          >
                            <Link href="/user/my-profile">
                              <i className="fa-solid fa-address-card"></i>My
                              Profile
                            </Link>
                            <Link href="/user/wishlist">
                              <i className="fa-solid fa-bookmark"></i>Wishlist
                              Property
                            </Link>
                            <Link href="/user/change-password">
                              <i className="fa-solid fa-unlock"></i>Change
                              Password
                            </Link>

                            <div onClick={handleLogout}>
                              <i className="fa-solid fa-power-off"></i> Logout
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </ul>
                </>
              )}



        </div>


         <div
              className="nav-overlay-panel"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: toggle ? "block" : "none",
              }}
            ></div>
      </nav>
      </div>
    </header>

     <div className="clearfix"></div>

      {/* Login Modal */}
      {login && (
        <LoginModel
          onClose={() => setLogin(false)}
          onSuccess={async () => {
            setHasToken(true);
            await fetchProfile();
          }}
        />
      )}
    </>
  );
};

export default Header;

