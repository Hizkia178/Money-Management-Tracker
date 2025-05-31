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
        <>
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
                            <button 
                                className="btn btn-primary btn-lg rounded-3 shadow" 
                                data-bs-toggle="modal" 
                                data-bs-target="#addTransactionModal" 
                                title="Add Transaction"
                            >
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

            {/* Add Transaction Modal */}
            <div className="modal fade" id="addTransactionModal" tabIndex="-1" aria-labelledby="addTransactionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0 shadow" data-aos="zoom-in" data-aos-duration="300">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title fw-bold" id="addTransactionModalLabel">
                                <i className="bx bx-plus-circle me-2"></i>
                                Add New Transaction
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-transfer me-1 text-primary"></i>
                                            Transaction Type
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Type</option>
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-category me-1 text-primary"></i>
                                            Category
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Category</option>
                                            <option value="food">Food & Dining</option>
                                            <option value="transport">Transportation</option>
                                            <option value="shopping">Shopping</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="bills">Bills & Utilities</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="education">Education</option>
                                            <option value="salary">Salary</option>
                                            <option value="freelance">Freelance</option>
                                            <option value="investment">Investment</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-money me-1 text-primary"></i>
                                            Amount
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">Rp</span>
                                            <input type="number" className="form-control" placeholder="0" min="0" step="0.01" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-calendar me-1 text-primary"></i>
                                            Date
                                        </label>
                                        <input type="date" className="form-control" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-text me-1 text-primary"></i>
                                            Description
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter transaction description" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-note me-1 text-primary"></i>
                                            Notes (Optional)
                                        </label>
                                        <textarea className="form-control" rows="3" placeholder="Additional notes..."></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-credit-card me-1 text-primary"></i>
                                            Payment Method
                                        </label>
                                        <select className="form-select">
                                            <option value="">Select Payment Method</option>
                                            <option value="cash">Cash</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="e_wallet">E-Wallet</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-tag me-1 text-primary"></i>
                                            Tags (Optional)
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter tags separated by comma" />
                                        <small className="form-text text-muted">e.g: work, urgent, monthly</small>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                <i className="bx bx-x me-1"></i>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                <i className="bx bx-check me-1"></i>
                                Save Transaction
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;