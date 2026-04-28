import React, { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  useServices,
  useDeleteService,
  useUpdateService,
  useCreateService,
} from "../../hooks/useService";

function Service() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });

  const { data, isLoading, isError, error } = useServices(filters);
  const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
  const { mutate: updateService } = useUpdateService();
  const { mutate: createService } = useCreateService();

  const services = data?.data || [];
  const pagination = data?.pagination || null;

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // ✅ Delete Modal State
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  // ✅ Open Delete Modal
  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
  };

  // ✅ Confirm Delete
  const handleDelete = () => {
    if (!serviceToDelete) return;

    deleteService(serviceToDelete._id, {
      onSuccess: () => {
        setServiceToDelete(null);
      },
    });
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
    setFormData({
      name: "",
      price: "",
      description: "",
    });
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
          {isLoading && <div className="text-center">Loading...</div>}

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
                  {services.map((service, index) => (
                    <tr key={service._id}>
                      <td>
                        {(filters.page - 1) * filters.limit + index + 1}
                      </td>
                      <td>{service.name}</td>
                      <td>₹{service.price}</td>
                      <td>{service.description || "—"}</td>
                      <td className="text-center" style={{ minWidth: "95px" }}>
                        <div className="d-flex justify-content-center align-items-center flex-nowrap gap-2">                         
                          <button
                            className="btn btn-sm btn-outline-secondary mr-2"
                            onClick={() => handleEdit(service)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteClick(service)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ================= Add/Edit Modal ================= */}
      {showModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{isEdit ? "Edit Service" : "Add Service"}</h5>
                  <button className="btn-close" onClick={handleClose}></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <input
                      className="form-control mb-3"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <input
                      className="form-control mb-3"
                      name="price"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                    />

                    <textarea
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>

                    <button className="btn btn-primary">
                      {isEdit ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* ================= Delete Confirmation Modal ================= */}
      <ConfirmationModal
        show={serviceToDelete !== null}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        isLoading={isDeleting}
        confirmButtonVariant="danger"
      >
        <p className="fs-5 text-center">
          Are you sure you want to delete{" "}
          <strong className="text-danger">
            {serviceToDelete?.name}
          </strong>
          ?
        </p>
      </ConfirmationModal>
    </div>
  );
}

export default Service;