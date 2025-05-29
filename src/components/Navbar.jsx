const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top py-3 bg-white shadow">
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center">
                    <i className="bx bx-wallet fs-4 me-2"></i>
                    Money Management Tracker
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item">
                            <a href="#" className="nav-link active">
                                <i className="bx bx-home-alt me-1"></i>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bx bx-dollar-circle me-1"></i>
                                Income
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bx bx-receipt me-1"></i>
                                Expenses
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="bx bx-bar-chart-alt-2 me-1"></i>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="#"
                                className="btn btn-primary btn-sm ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center shadow-lg justify-content-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Add Income"
                            >
                                <i className="bx bx-plus me-1"></i>
                                Add Income
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
