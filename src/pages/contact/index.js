import React, { useState, useEffect } from "react";
import { useContact, useUpdateContact } from "../../hooks/useContacts";

function ContactPage() {
  const { data: contact, isLoading, isError, error } = useContact();
  const { mutate: saveContact, isLoading: isSaving } = useUpdateContact();

  const [form, setForm] = useState({
    contact: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (contact) {
      setForm({
        contact: contact.contact || "",
        email: contact.email || "",
        address: contact.address || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveContact(form); 
  };

  if (isLoading) return <div className="text-center py-5">Loading...</div>;
  if (isError) return <div className="alert alert-danger">Error: {error?.message}</div>;

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h4>Contact Details</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter address"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : contact ? "Update Contact" : "Create Contact"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;