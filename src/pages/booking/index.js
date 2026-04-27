import React, { useState } from "react";
import { useBookings } from "../../hooks/useBooking";

function BookingList() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, isLoading, isError, error } = useBookings(filters);
  const bookings = data?.data || data || [];
  const pagination = data?.pagination || null;
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm">
        <div className="card-header bg-light p-3">
          <h4 className="mb-0 text-primary-emphasis">Bookings</h4>
        </div>

        <div className="card-body">
          {isLoading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
          {isError && <div className="alert alert-danger">{error?.message || "Failed to load bookings"}</div>}

          {!isLoading && !isError && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">No bookings found.</td>
                    </tr>
                  ) : (
                    bookings.map((booking, index) => (
                      <tr key={booking._id}>
                        <td>{(filters.page - 1) * filters.limit + index + 1}</td>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.phone}</td>
                        <td>{booking.serviceId?.name || "—"}</td>
                        <td>{new Date(booking.bookingDateTime).toLocaleString()}</td>
                        <td>{booking.status || "Pending"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <small>
                Showing {(pagination.page - 1) * pagination.limit + 1}–
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </small>

              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${pagination.page === 1 && "disabled"}`}>
                  <button className="page-link" onClick={() => handlePageChange(pagination.page - 1)}>«</button>
                </li>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                  <li key={p} className={`page-item ${p === pagination.page && "active"}`}>
                    <button className="page-link" onClick={() => handlePageChange(p)}>{p}</button>
                  </li>
                ))}
                <li className={`page-item ${pagination.page === pagination.totalPages && "disabled"}`}>
                  <button className="page-link" onClick={() => handlePageChange(pagination.page + 1)}>»</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingList;