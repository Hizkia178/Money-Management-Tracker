import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useCounter from "../functions/useCounter";



const Summary = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);


    const totalIncome = useCounter(12500000);
    const totalExpenses = useCounter(8750000);
    const balance = useCounter(3750000);
    const savingsGoal = useCounter(75); 


    const monthlyData = [
        { month: 'Jan', income: 10500000, expenses: 7200000 },
        { month: 'Feb', income: 11200000, expenses: 8100000 },
        { month: 'Mar', income: 10800000, expenses: 7800000 },
        { month: 'Apr', income: 12000000, expenses: 8500000 },
        { month: 'Mei', income: 11800000, expenses: 8200000 },
        { month: 'Jun', income: 12500000, expenses: 8750000 },
    ];

    const categoryData = [
        { name: 'Makanan & Minuman', value: 3200000, color: '#FF6B6B' },
        { name: 'Transportasi', value: 2100000, color: '#4ECDC4' },
        { name: 'Belanja', value: 1800000, color: '#45B7D1' },
        { name: 'Hiburan', value: 950000, color: '#FFA07A' },
        { name: 'Tagihan', value: 700000, color: '#98D8C8' },
    ];

    const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    return (
        <section className="py-5 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidde min-vh-100">
            <div className="container" style={{paddingTop : '80px'}}>
             
                <div className="row justify-content-center mb-5" data-aos="fade-up">
                    <div className="col-lg-8 text-center">
                        <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="200">
                            <i className="bx bx-line-chart me-2"></i>
                            Financial Summary
                        </span>

                        <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="300">
                            Your Money at a 
                            <span className="text-primary"> Glance</span>
                        </h2>

                        <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="400">
                            Track your financial progress with clear insights and visual reports.
                            See where your money comes from and where it goes.
                        </p>
                    </div>
                </div>

              
                <div className="row g-4 mb-5">
                    {[
                        {
                            icon: "bx-plus-circle",
                            title: "Total Income",
                            amount: totalIncome,
                            color: "success",
                            bgGradient: "from-green-400 to-emerald-500",
                            delay: 500
                        },
                        {
                            icon: "bx-minus-circle", 
                            title: "Total Expenses",
                            amount: totalExpenses,
                            color: "danger",
                            bgGradient: "from-red-400 to-rose-500",
                            delay: 600
                        },
                        {
                            icon: "bx-wallet",
                            title: "Current Balance",
                            amount: balance,
                            color: "primary",
                            bgGradient: "from-blue-400 to-indigo-500",
                            delay: 700
                        }
                    ].map((item, index) => (
                        <div className="col-lg-4 col-md-6" key={index} data-aos="zoom-in" data-aos-delay={item.delay}>
                            <div className="card border-0 shadow h-100 position-relative overflow-hidden">
                                <div className={`position-absolute top-0 start-0 w-100 h-2 bg-gradient-to-r ${item.bgGradient}`}></div>
                                <div className="card-body p-4 text-center">
                                    <div className={`bg-${item.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                                        <i className={`bx ${item.icon} text-${item.color} fs-1`}></i>
                                    </div>
                                    <h6 className="text-muted mb-2">{item.title}</h6>
                                    <h3 className={`text-${item.color} fw-bold mb-0`}>
                                        Rp {item.amount.toLocaleString('id-ID')}
                                    </h3>
                                    {index === 2 && (
                                        <div className="mt-3">
                                            <div className="progress" style={{ height: '8px' }}>
                                                <div 
                                                    className="progress-bar bg-primary" 
                                                    style={{ width: `${savingsGoal}%` }}
                                                ></div>
                                            </div>
                                            <small className="text-muted mt-1 d-block">{savingsGoal}% of savings goal</small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

              
                <div className="row g-4">
                 
                    <div className="col-lg-8" data-aos="fade-right" data-aos-delay="800">
                        <div className="card border-0 shadow h-100">
                            <div className="card-header bg-white border-0 pb-0">
                                <div className="d-flex align-items-center">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="bx bx-bar-chart text-primary fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 fw-bold">Monthly Income vs Expenses</h5>
                                        <small className="text-muted">Last 6 months comparison</small>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
                                        <Tooltip 
                                            formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
                                            labelStyle={{ color: '#666' }}
                                        />
                                        <Legend />
                                        <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="expenses" fill="#EF4444" name="Expenses" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                   
                    <div className="col-lg-4" data-aos="fade-left" data-aos-delay="900">
                        <div className="card border-0 shadow h-100">
                            <div className="card-header bg-white border-0 pb-0">
                                <div className="d-flex align-items-center">
                                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                                        <i className="bx bx-pie-chart text-warning fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-0 fw-bold">Expense Categories</h5>
                                        <small className="text-muted">This month breakdown</small>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`} />
                                    </PieChart>
                                </ResponsiveContainer>
                                
                              
                                <div className="mt-3">
                                    {categoryData.map((category, index) => (
                                        <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                                            <div className="d-flex align-items-center">
                                                <div 
                                                    className="rounded-circle me-2" 
                                                    style={{ 
                                                        width: '12px', 
                                                        height: '12px', 
                                                        backgroundColor: COLORS[index] 
                                                    }}
                                                ></div>
                                                <small className="text-muted">{category.name}</small>
                                            </div>
                                            <small className="fw-semibold">
                                                {((category.value / totalExpenses) * 100).toFixed(1)}%
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="row mt-5" data-aos="fade-up" data-aos-delay="1000">
                    <div className="col-12">
                        <div className="card border-0 shadow bg-gradient-to-r from-purple-500 to-pink-500 text-dark">
                            <div className="card-body p-4">
                                <div className="row text-center">
                                    <div className="col-md-3 col-6 mb-3 mb-md-0">
                                        <i className="bx bx-trending-up fs-2 mb-2"></i>
                                        <h4 className="fw-bold mb-1">+15%</h4>
                                        <small className="opacity-75">Income Growth</small>
                                    </div>
                                    <div className="col-md-3 col-6 mb-3 mb-md-0">
                                        <i className="bx bx-target-lock fs-2 mb-2"></i>
                                        <h4 className="fw-bold mb-1">8/10</h4>
                                        <small className="opacity-75">Goals Achieved</small>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <i className="bx bx-time fs-2 mb-2"></i>
                                        <h4 className="fw-bold mb-1">25</h4>
                                        <small className="opacity-75">Days Left in Month</small>
                                    </div>
                                    <div className="col-md-3 col-6">
                                        <i className="bx bx-star fs-2 mb-2"></i>
                                        <h4 className="fw-bold mb-1">Excellent</h4>
                                        <small className="opacity-75">Financial Health</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Summary;