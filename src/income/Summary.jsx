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
        const totalIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + (t.amount || 0), 0);
        
        const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + (t.amount || 0), 0);
        
        return { totalIncome, totalExpense, netAmount: totalIncome - totalExpense };
    };

    const totals = calculateTotals();

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4" data-aos="fade-down">
                    <div>
                        <h2 className="fw-bold text-dark mb-2">
                            <i className="bx bx-table text-primary me-2"></i>
                            Transaction History
                        </h2>
                        <p className="text-muted mb-0">Manage and track all your financial transactions</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <button className="btn btn-primary btn-lg rounded-3 shadow">
                            <i className="bx bx-plus me-2"></i>
                            Add Transaction
                        </button>
                    </div>
                </div>

                <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="col-md-3">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-trending-up text-success fs-2 mb-2"></i>
                                <h5 className="text-success fw-bold">{formatCurrency(totals.totalIncome)}</h5>
                                <small className="text-muted">Total Income</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-trending-down text-danger fs-2 mb-2"></i>
                                <h5 className="text-danger fw-bold">{formatCurrency(totals.totalExpense)}</h5>
                                <small className="text-muted">Total Expense</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className={`bx bx-wallet ${totals.netAmount >= 0 ? 'text-success' : 'text-danger'} fs-2 mb-2`}></i>
                                <h5 className={totals.netAmount >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                    {formatCurrency(totals.netAmount)}
                                </h5>
                                <small className="text-muted">Net Amount</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow h-100">
                            <div className="card-body text-center">
                                <i className="bx bx-list-ul text-info fs-2 mb-2"></i>
                                <h5 className="text-info fw-bold">{filteredTransactions.length}</h5>
                                <small className="text-muted">Total Transactions</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;