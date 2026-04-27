import React, { useState } from "react";
import {
  useServices,
  useDeleteService,
  useUpdateService,
  useCreateService
} from "../../hooks/useService";

function Service() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  const { data, isLoading, isError, error } = useServices(filters);
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
  const { mutate: updateService } = useUpdateService();
  const { mutate: createService, isPending: isCreating } = useCreateService();

  const services = data?.data || [];
  const pagination = data?.pagination || null;

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedService(null);
    setFormData({ name: "", price: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setIsEdit(true);
    setSelectedService(service);

    setFormData({
      name: service.name || "",
      price: service.price || "",
      description: service.description || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateService({
        id: selectedService._id,
        ...formData,
      });
    } else {
      createService(formData);
    }

    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedService(null);
    setFormData({ name: "", price: "", description: "" });
  };

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
          <h4 className="mb-0 text-primary-emphasis">Services</h4>
          <button className="btn btn-success" onClick={handleAdd}>
            <i className="fas fa-plus me-2"></i>
            Add New Service
          </button>
        </div>

        <div className="card-body">
          {isLoading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          )}

          {isError && (
            <div className="alert alert-danger">
              {error?.message || "Failed to load services"}
            </div>
          )}

          {!isLoading && !isError && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        No services found.
                      </td>
                    </tr>
                  ) : (
                    services.map((service, index) => (
                      <tr key={service._id}>
                        <td>
                          {(filters.page - 1) * filters.limit + index + 1}
                        </td>

                        <td className="fw-bold">{service.name}</td>

                        <td>₹{service.price}</td>

                        <td style={{ maxWidth: "200px" }}>
                          {service.description || "—"}
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-secondary me-2"
                            onClick={() => handleEdit(service)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(service._id)}
                            disabled={isDeleting}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between mt-3">
              <small>
                Showing{" "}
                {(pagination.page - 1) * pagination.limit + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total}
              </small>

              <ul className="pagination pagination-sm">
                <li
                  className={`page-item ${pagination.page === 1 && "disabled"}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >
                    «
                  </button>
                </li>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <li key={p} className={`page-item ${p === pagination.page && "active"}`}>
                      <button className="page-link" onClick={() => handlePageChange(p)}>
                        {p}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    pagination.page === pagination.totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >
                    »
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEdit ? "Edit Service" : "Add Service"}
                  </h5>
                  <button className="btn-close" onClick={handleClose}></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                      Cancel
                    </button>
                    <button className="btn btn-primary">{isEdit ? "Update" : "Create"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default Service;