import { useState, useEffect } from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            setCurrentYear(now.getFullYear());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
           
            
            <footer className="bg-dark text-white mt-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="d-flex align-items-center mb-3">
                                <i className='bx bx-wallet fs-2 me-2'></i>
                                <h5 className="mb-0 text-white">Money Management Tracker</h5>
                            </div>
                            <p className="text-white mb-3">
                                Take control of your finances with our comprehensive money management solution.
                                Track income, monitor expenses, and achieve your financial goals.
                            </p>
                            <div className="d-flex gap-3">
                                <a href="#" className="text-white fs-4 social-hover">
                                    <i className='bx bxl-facebook-circle'></i>
                                </a>
                                <a href="#" className="text-white fs-4 social-hover">
                                    <i className='bx bxl-twitter'></i>
                                </a>
                                <a href="#" className="text-white fs-4 social-hover">
                                    <i className='bx bxl-instagram'></i>
                                </a>
                                <a href="#" className="text-white fs-4 social-hover">
                                    <i className='bx bxl-linkedin'></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="text-white mb-3">
                                <i className='bx bx-link me-2'></i>Quick Links
                            </h6>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-home-alt me-1'></i>Home
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-dollar-circle me-1'></i>Income
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-receipt me-1'></i>Expenses
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-bar-chart-alt-2 me-1'></i>Reports
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="text-white mb-3">
                                <i className='bx bx-star me-2'></i>Features
                            </h6>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-pie-chart-alt me-1'></i>Budget Planning
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-trending-up me-1'></i>Financial Goals
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-bell me-1'></i>Notifications
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-shield me-1'></i>Secure Data
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="text-white mb-3">
                                <i className='bx bx-support me-2'></i>Support
                            </h6>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-help-circle me-1'></i>Help Center
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-envelope me-1'></i>Contact Us
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-file me-1'></i>Privacy Policy
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none nav-link-hover">
                                        <i className='bx bx-check-shield me-1'></i>Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-12">
                            <h6 className="text-white">
                                <i className='bx bx-envelope me-2'></i>Stay Updated
                            </h6>
                            <div className="mb-3">
                                <div className="input-group input-group-sm">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        aria-label="Email Subscription" 
                                    />
                                    <button className="btn btn-primary" type="button">
                                        <i className="bx bx-send"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="contact-info">
                                <p className="text-white small mb-1">
                                    <i className='bx bx-phone me-1'></i>+6287760347478
                                </p>
                                <p className="text-white small mb-1">
                                    <i className='bx bx-envelope me-1'></i>support@moneytracker.com
                                </p>
                                <p className="text-white small">
                                    <i className='bx bx-map me-1'></i>Medan, Indonesia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-top border-primary">
                    <div className="container py-3">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="mb-0 text-white small">
                                    <i className='bx bx-copyright me-1'></i>
                                    {currentYear} Money Management Tracker. All rights reserved.
                                </p>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <p className="mb-0 text-white small">
                                    <i className='bx bx-time me-1'></i>
                                    {formatDate(currentTime)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .social-hover {
                        transition: all 0.3s ease;
                    }
                    .social-hover:hover {
                        color: #0d6efd !important;
                        transform: translateY(-2px);
                    }
                    .nav-link-hover {
                        transition: all 0.3s ease;
                    }
                    .nav-link-hover:hover {
                        color: #0d6efd !important;
                        padding-left: 5px;
                    }
                    .input-group .btn {
                        border-left: none;
                    }
                    .input-group .form-control:focus {
                        border-color: #0d6efd;
                        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
                    }
                `}</style>
            </footer>
        </>
    );
};

export default Footer;