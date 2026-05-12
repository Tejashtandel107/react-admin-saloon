import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import httpService from "../../common/http.service";
import dashboardCards from "../../common/dashboardCards";

function DashboardCard({ card, count, loading }) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-12 mb-4">
      <Link to={card.path} className="text-decoration-none">
        <div className={`dashboard-card ${card.bgClass} h-100 shadow-sm`}>
          <div className="card-body d-flex align-items-center" style={{ minHeight: 140 }}>
            <div className="flex-grow-1">
              <div className="h2 mb-0 font-weight-bold text-white">
                {loading ? (
                  <div className="spinner-border spinner-border-sm text-light" />
                ) : (
                  count
                )}
              </div>

              <div className="text-uppercase font-weight-bold text-white small">
                {card.name}
                {card.subText && (
                  <>
                    <br />
                    <span style={{ fontSize: 10, opacity: 0.8 }}>{card.subText}</span>
                  </>
                )}
              </div>
            </div>

            <div className="icon-wrapper text-white-50">
              <em className={`${card.icon} fa-2x`} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await httpService.get("/dashboard");
      setDashboard(data?.data || {});
    } catch (err) {
      setError("Failed to load dashboard stats.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <>
      <div className="content-wrapper">
        <div className="content-heading">
          <h4 className="mb-0">Dashboard Management</h4>
        </div>
      </div>

      <div className="row m-3">
        {error && <div className="alert alert-danger w-100">{error}</div>}

        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.valueKey}
            card={card}
            count={dashboard?.[card.valueKey] ?? 0}
            loading={loading}
          />
        ))}
      </div>
    </>
  );
}