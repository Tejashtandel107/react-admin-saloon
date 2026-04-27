import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <header className="topnavbar-wrapper">
      <nav className="navbar topnavbar">
        <Link className="navbar-brand" to="/" aria-label="Home" />
        <div className="brand-logo" style={{ marginLeft: "3.25rem" }}>
          <img
            className="img-fluid"
            src="/img/logo.png"
            alt="App Logo"
            style={{ width: "90px", height: "50px" }}
          />
        </div>
        <ul
          className="navbar-nav mr-auto flex-row"
          style={{ marginLeft: "3.25rem" }}
        >
          <li className="nav-item">
            <button
              type="button"
              className="nav-link d-none d-md-block d-lg-block d-xl-block p-0 border-0 bg-transparent"
              data-trigger-resize=""
              data-toggle-state="aside-collapsed"
            >
              <em className="fas fa-bars"></em>
            </button>

            <button
              type="button"
              className="nav-link sidebar-toggle d-md-none border-0 bg-transparent"
              data-toggle-state="aside-toggled"
              data-no-persist="true"
            >
              <em className="fas fa-bars"></em>
            </button>

          </li>
        </ul>
        <ul className="navbar-nav flex-row">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link border-0 bg-transparent"
              onClick={handleLogout}
            >
              Log Out
            </button>

          </li>
        </ul>
        <form className="navbar-form" role="search" action="search.html">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Type and hit enter ..."
            />
            <div
              className="fas fa-times navbar-form-close"
              data-search-dismiss=""
            ></div>
          </div>
          <button className="d-none" type="submit">
            Submit
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Header;
