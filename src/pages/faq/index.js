// src/pages/faq/FaqList.jsx

import React, { useState } from "react";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  useFaqs,
  useCreateFaq,
  useUpdateFaq,
  useDeleteFaq,
} from "../../hooks/useFaq";

function FaqList() {
  const { data: faqs = [], isLoading, isError, error } = useFaqs();

  const { mutate: createFaq } = useCreateFaq();
  const { mutate: updateFaq } = useUpdateFaq();
  const { mutate: deleteFaq, isPending: isDeleting } = useDeleteFaq();

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    sortOrder: "",
  });

  // ================= Add FAQ =================
  const handleAdd = () => {
    setEditId(null);

    setForm({
      question: "",
      answer: "",
      sortOrder: "",
    });

    setShowModal(true);
  };

  // ================= Edit FAQ =================
  const handleEdit = (faq) => {
    setEditId(faq._id);

    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
      sortOrder: faq.sortOrder || "",
    });

    setShowModal(true);
  };

  // ================= Input Change =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= Submit =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder),
    };

    if (editId) {
      updateFaq(
        { id: editId, data: payload },
        {
          onSuccess: () => handleClose(),
        }
      );
    } else {
      createFaq(payload, {
        onSuccess: () => handleClose(),
      });
    }
  };

  // ================= Close Modal =================
  const handleClose = () => {
    setShowModal(false);
    setEditId(null);

    setForm({
      question: "",
      answer: "",
      sortOrder: "",
    });
  };

  // ================= Delete =================
  const handleDeleteClick = (faq) => {
    setFaqToDelete(faq);
  };

  const handleDelete = () => {
    if (!faqToDelete) return;

    deleteFaq(faqToDelete._id, {
      onSuccess: () => {
        setFaqToDelete(null);
      },
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm">
        {/* Header */}
        <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
          <h4 className="mb-0 text-primary-emphasis">
            FAQ Management
          </h4>

          <button
            className="btn btn-success"
            onClick={handleAdd}
          >
            <i className="fas fa-plus me-2"></i>
            Add New FAQ
          </button>
        </div>

        {/* Body */}
        <div className="card-body">
          {isLoading && (
            <div className="text-center py-4">
              Loading...
            </div>
          )}

          {isError && (
            <div className="alert alert-danger">
              {error?.message || "Failed to load FAQs"}
            </div>
          )}

          {!isLoading && !isError && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Sort Order</th>
                    <th className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {faqs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4"
                      >
                        No FAQ found.
                      </td>
                    </tr>
                  ) : (
                    faqs.map((faq, index) => (
                      <tr key={faq._id}>
                        <td>{index + 1}</td>
                        <td>{faq.question}</td>
                        <td>{faq.answer}</td>
                        <td>{faq.sortOrder}</td>
                        <td className="text-center">
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <button
                                className="btn btn-sm btn-outline-secondary mr-2"
                                onClick={() => handleEdit(faq)}
                                >
                                <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteClick(faq)}
                                >
                                <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                      </tr>
                    ))
                  )}
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
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    {editId
                      ? "Edit FAQ"
                      : "Add New FAQ"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={handleClose}
                  ></button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Question
                      </label>

                      <input
                        type="text"
                        name="question"
                        className="form-control"
                        value={form.question}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Answer
                      </label>

                      <textarea
                        rows="4"
                        name="answer"
                        className="form-control"
                        value={form.answer}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Sort Order
                      </label>

                      <input
                        type="number"
                        name="sortOrder"
                        className="form-control"
                        value={form.sortOrder}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                    >
                      Close
                    </button>

                    <button className="btn btn-primary">
                      {editId
                        ? "Update FAQ"
                        : "Save FAQ"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* ================= Delete Confirmation ================= */}
      <ConfirmationModal
        show={faqToDelete !== null}
        onClose={() => setFaqToDelete(null)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        isLoading={isDeleting}
        confirmButtonVariant="danger"
      >
        <p className="fs-5 text-center">
          Are you sure you want to delete{" "}
          <strong className="text-danger">
            {faqToDelete?.question}
          </strong>
          ?
        </p>
      </ConfirmationModal>
    </div>
  );
}

export default FaqList;