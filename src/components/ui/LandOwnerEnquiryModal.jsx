"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "@/services/apiEndpoints";
import axiosInstance from "@/services/axiosInstance";

export default function LandOwnerEnquiryModal({ show, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const reset = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = API_ENDPOINTS.LAND_OWNER_ENQUIRY;

      const response = await axiosInstance.post(apiUrl, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.description,
      });

      toast.success("Your enquiry has been sent successfully!");

      onSubmit?.(form);
      setForm(reset);
      onClose?.();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send enquiry."
      );
      console.error("Error submitting enquiry:", error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "#0000008a" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <span
            className="mod-close"
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "30px",
            }}
          >
            ×
          </span>

          <div className="modal-body">
            <h4 className="modal-header-title">Land Enquiry Form</h4>

            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label>Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label>Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
                <label>Description</label>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Enquiry
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}