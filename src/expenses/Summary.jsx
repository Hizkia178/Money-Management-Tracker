import { useEffect } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Summary = ({ filteredTransactions, formatCurrency }) => {
    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 50
        });
        return () => AOS.refresh(); 
    }, []);

    const calculateTotals = () => {
        const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + (t.amount || 0), 0);
        
        const totalCategories = [...new Set(
            filteredTransactions
                .filter(t => t.type === 'expense')
                .map(t => t.category)
        )].length;

        return { totalExpense, totalCategories, transactionCount: filteredTransactions.filter(t => t.type === 'expense').length };
    };

    const totals = calculateTotals();

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" data-aos="fade-down">
                    <div>
                        <h2 className="fw-bold text-dark mb-2">
                            <i className="bx bx-trending-down text-danger me-2"></i>
                            Expense Overview
                        </h2>
                        <p className="text-muted mb-0">Track and manage your expense transactions</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <button className="btn btn-primary btn-lg rounded-3 shadow" data-bs-toggle="tooltip" title="Add Expense">
                            <i className="bx bx-plus me-2"></i>
                            Add Expense
                        </button>
                    </div>
                </div>

                <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-trending-down text-danger fs-2 mb-2"></i>
                                <h5 className="text-danger fw-bold">{formatCurrency(totals.totalExpense)}</h5>
                                <small className="text-muted">Total Expenses</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-list-ul text-info fs-2 mb-2"></i>
                                <h5 className="text-info fw-bold">{totals.transactionCount}</h5>
                                <small className="text-muted">Total Expense Transactions</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-pie-chart-alt text-primary fs-2 mb-2"></i>
                                <h5 className="text-primary fw-bold">{totals.totalCategories}</h5>
                                <small className="text-muted">Expense Categories</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;