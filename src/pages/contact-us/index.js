// src/pages/contact-us/ContactUsList.jsx

import React, { useState } from "react";
import { useContacts } from "../../hooks/useContactUs";

function ContactUsList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useContacts(page, limit);

  const contacts = data?.contacts || [];
  const pagination = data?.pagination || {};

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= pagination.totalPages
    ) {
      setPage(newPage);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm">
        {/* Header */}
        <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
          <h4 className="mb-0 text-primary-emphasis">
            Contact Requests
          </h4>
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
              {error?.message ||
                "Failed to load contacts"}
            </div>
          )}

          {!isLoading && !isError && (
            <>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4"
                        >
                          No Contact Found.
                        </td>
                      </tr>
                    ) : (
                      contacts.map(
                        (item, index) => (
                          <tr key={item._id}>
                            <td>
                              {(page - 1) * limit +
                                index +
                                1}
                            </td>

                            <td>{item.name}</td>

                            <td>
                              {item.email}
                            </td>

                            <td>
                              {item.phone}
                            </td>

                            <td
                              style={{
                                maxWidth:
                                  "300px",
                                whiteSpace:
                                  "normal",
                                wordBreak:
                                  "break-word",
                              }}
                            >
                              {item.message}
                            </td>

                            <td>
                              {new Date(
                                item.createdAt
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-end mt-3">
                  <nav>
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          page === 1
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handlePageChange(
                              page - 1
                            )
                          }
                        >
                          Prev
                        </button>
                      </li>

                      {[
                        ...Array(
                          pagination.totalPages
                        ),
                      ].map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            page === i + 1
                              ? "active"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePageChange(
                                i + 1
                              )
                            }
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          page ===
                          pagination.totalPages
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handlePageChange(
                              page + 1
                            )
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUsList;