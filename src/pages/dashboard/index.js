import { Fragment } from "react";
import { Link } from "react-router-dom";
import dashboardCards from "../../common/dashboardCards";
import { useDashboardStats } from "../../hooks/useDashboard"; 

function Dashboard() {
  const { data: dashboard, isLoading, isError } = useDashboardStats();
  console.log("Dashboard stats:", dashboard, "Loading:", isLoading, "Error:", isError);

  const renderCard = (
    title,
    count,
    icon,
    bgClass,
    path,
    subText,
    isInactive = false
  ) => (
    <div className="col-xl-3 col-lg-6 col-md-12 mb-4">
      <Link to={path} style={{ textDecoration: "none" }}>
        <div
          className={`dashboard-card ${bgClass} h-100 shadow-sm`}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            filter: isInactive ? "brightness(0.85) saturate(0.8)" : "none",
          }}
        >
          <div
            className="card-body d-flex flex-column justify-content-center"
            style={{ minHeight: "140px" }}
          >
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">
                <div className="h2 mb-0 font-weight-bold text-white">
                  {isLoading ? "..." : count}
                </div>
                <div className="text-uppercase font-weight-bold text-white small">
                  {title} <br />
                  <span style={{ fontSize: "10px", opacity: 0.8 }}>
                    {subText}
                  </span>
                </div>
              </div>
              <div className="icon-wrapper text-white-50">
                <em className={`${icon} fa-2x`}></em>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <>
      <div className="content-wrapper">
        <div className="content-heading">
          <div className="d-flex align-items-center">
            <div className="mr-auto">
              <div className="">Dashboard Management</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3">
        {isError && (
          <div className="alert alert-danger w-100">Failed to load dashboard stats.</div>
        )}

        {Array.isArray(dashboardCards) &&
          dashboardCards.map((card) => {
            const count = dashboard?.[card.valueKey] || 0;
            
            return (
              <Fragment key={card.valueKey}>
                {renderCard(
                  card.name,
                  count,
                  card.icon,
                  card.bgClass,
                  card.path,
                )}
              </Fragment>
            );
          })}
      </div>
    </>
  );
}

export default Dashboard;