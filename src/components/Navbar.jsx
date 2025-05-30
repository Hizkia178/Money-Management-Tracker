import { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
    const handleClick = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Add Income",
            text: "Are you sure you want to add income?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: "Sorry",
                text: "This feature is not available yet.",
                icon: "info",
                confirmButtonText: "OK",
            });
        }
    };
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg fixed-top py-3 bg-white shadow" data-aos="fade-down" data-aos-duration="1000">
            <div className="container">
                <a href="#" className="navbar-brand d-flex align-items-center" data-aos="fade-down" data-aos-duration="600">
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
                    <ul className="navbar-nav ms-auto d-flex align-items-center" data-aos="fade-down">
                        <li className="nav-item">
                            <a href="/" className="nav-link active" data-aos-delay="800">
                                <i className="bx bx-home-alt me-1"></i>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/income" className="nav-link" data-aos-delay="700">
                                <i className="bx bx-dollar-circle me-1"></i>
                                Income
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/expenses" className="nav-link" data-aos-delay="600">
                                <i className="bx bx-receipt me-1"></i>
                                Expenses
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/reports" className="nav-link" data-aos-delay="500">
                                <i className="bx bx-bar-chart-alt-2 me-1"></i>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item" data-aos-delay="400">
                            <a
                                href="#"
                                className="btn btn-primary btn-sm ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center shadow-lg justify-content-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                onClick={handleClick}
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