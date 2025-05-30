import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Hero = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userName] = useState("John Doe"); 
    
  
    const [financialData] = useState({
        totalIncome: 8450,
        monthlyIncome: 3200,
        highestResource: "Freelance Work",
        averageIncome: 2840
    });

    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 100
        });
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getCurrentMonth = () => {
        return currentTime.toLocaleString('default', { month: 'long' });
    };

    return (
        <section className="py-5  min-vh-100">
            <div className="container" style={{ paddingTop: "100px" }}>
            
                <div className="row mb-5">
                    <div className="col-12">
                        <div 
                            className="bg-white rounded-4 shadow p-4 mb-4 border-0"
                            data-aos="fade-down"
                            data-aos-duration="1000"
                        >
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                                <div>
                                    <h2 className="fw-bold text-dark mb-2" data-aos="fade-right" data-aos-delay="200">
                                        {getGreeting()}, {userName}! 👋
                                    </h2>
                                    <p className="text-muted mb-0 lead" data-aos="fade-right" data-aos-delay="300">
                                        Welcome back to your financial overview. Here's how your finances are performing this month.
                                    </p>
                                </div>
                                <div className="mt-3 mt-md-0" data-aos="fade-left" data-aos-delay="400">
                                    <div className="d-flex align-items-center bg-primary bg-opacity-10 rounded-pill px-3 py-2">
                                        <i className="bx bx-calendar text-primary me-2"></i>
                                        <span className="text-primary fw-semibold">
                                            {currentTime.toLocaleDateString('en-US', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="row g-4 mb-5">
               
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="500"
                            data-bs-toggle="tooltip"
                            title="Your total accumulated income"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-primary bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-wallet-alt text-primary fs-3"></i>
                                    </div>
                                    <div className="badge bg-success bg-opacity-10 text-success">
                                        <i className="bx bx-trending-up me-1"></i>
                                        +12.5%
                                    </div>
                                </div>
                                <h3 className="fw-bold text-primary mb-1">
                                    {formatCurrency(financialData.totalIncome)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Total Income</p>
                                <small className="text-muted">All time earnings</small>
                            </div>
                        </div>
                    </div>

                
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            data-bs-toggle="tooltip"
                            title={`Income earned in ${getCurrentMonth()}`}
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-success bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-line-chart text-success fs-3"></i>
                                    </div>
                                    <div className="badge bg-info bg-opacity-10 text-info">
                                        <i className="bx bx-calendar me-1"></i>
                                        This Month
                                    </div>
                                </div>
                                <h3 className="fw-bold text-success mb-1">
                                    {formatCurrency(financialData.monthlyIncome)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Income This Month</p>
                                <small className="text-muted">{getCurrentMonth()} earnings</small>
                            </div>
                        </div>
                    </div>

                  
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="700"
                            data-bs-toggle="tooltip"
                            title="Your most profitable income source"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-warning bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-crown text-warning fs-3"></i>
                                    </div>
                                    <div className="badge bg-warning bg-opacity-10 text-warning">
                                        <i className="bx bx-star me-1"></i>
                                        Top Source
                                    </div>
                                </div>
                                <h3 className="fw-bold text-warning mb-1">
                                    {formatCurrency(1850)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Highest Resource</p>
                                <small className="text-muted">{financialData.highestResource}</small>
                            </div>
                        </div>
                    </div>

                  
                    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                        <div 
                            className="card border-0 shadow h-100 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay="800"
                            data-bs-toggle="tooltip"
                            title="Your average monthly income"
                        >
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="bg-info bg-opacity-15 rounded-circle p-3">
                                        <i className="bx bx-bar-chart-alt-2 text-info fs-3"></i>
                                    </div>
                                    <div className="badge bg-primary bg-opacity-10 text-primary">
                                        <i className="bx bx-math me-1"></i>
                                        Average
                                    </div>
                                </div>
                                <h3 className="fw-bold text-info mb-1">
                                    {formatCurrency(financialData.averageIncome)}
                                </h3>
                                <p className="text-muted mb-0 fw-medium">Average Income</p>
                                <small className="text-muted">Monthly average</small>
                            </div>
                        </div>
                    </div>
                </div>

         
            </div>

            <style jsx>{`
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
                }
                .bg-gradient-to-br {
                    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
                }
            `}</style>
        </section>
    );
};

export default Hero;