"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginUser } from "@/services/propertyAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginModel({ onClose, onSuccess }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");
    try {
      const response = await loginUser(data);
      toast.success(response?.message || "Login successful");
      onClose?.();
      onSuccess?.();
      router.push("/user/my-profile");
    } catch (error) {
      let message = "Login failed. Invalid Credential.";
      if (error?.response) {
        if (error.response.status === 401) {
          message = error.response?.message || "Unauthorized access";
        } else {
          message = error.response?.data?.message || message;
        }
      }
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    onClose?.();
    router.push("/create-account");
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    onClose?.();
    router.push("/forgot-password");
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "#0000008a" }}
    >
      <div className="modal-dialog modal-dialog-centered login-pop-form">
        <div className="modal-content" id="registermodal">
          <span className="mod-close" onClick={onClose}>
            <span className="svg-icon text-primary svg-icon-2hx">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.3"
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                ></rect>
                <rect
                  x="7"
                  y="15.3137"
                  width="12"
                  height="2"
                  rx="1"
                  transform="rotate(-45 7 15.3137)"
                  fill="currentColor"
                ></rect>
                <rect
                  x="8.41422"
                  y="7"
                  width="12"
                  height="2"
                  rx="1"
                  transform="rotate(45 8.41422 7)"
                  fill="currentColor"
                ></rect>
              </svg>
            </span>
          </span>

          <div className="modal-body">
            <h4 className="modal-header-title">Log In</h4>

            {serverError && (
              <p className="text-danger mb-3">{serverError}</p>
            )}

            <div className="login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  <label>Email address</label>
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                <div
                  className="form-floating mb-3"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <label>Password</label>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password.message}
                    </small>
                  )}

                  <span
                    onClick={togglePassword}
                    style={{
                      position: "absolute",
                      top: "30%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#999",
                      fontSize: "1.2rem",
                      userSelect: "none",
                    }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") togglePassword();
                    }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="flex-shrink-0 flex-first"></div>
                    <div className="flex-shrink-0 flex-first">
                      <Link
                        href="#"
                        className="link fw-medium"
                        onClick={handleForgotPasswordClick}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary fw-medium full-width rounded-2"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "LogIn"}
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center">
              <p className="mt-4">
                Haven't Any Account?{" "}
                <Link
                  href="#"
                  className="link fw-medium"
                  onClick={handleLinkClick}
                >
                  Create An Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
