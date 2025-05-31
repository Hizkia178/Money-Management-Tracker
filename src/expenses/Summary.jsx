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
        <>
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
                            <button 
                                className="btn btn-primary btn-lg rounded-3 shadow" 
                                data-bs-toggle="modal" 
                                data-bs-target="#addTransactionModal" 
                                title="Add Expense"
                            >
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

            {/* Add Transaction Modal */}
            <div className="modal fade" id="addTransactionModal" tabIndex="-1" aria-labelledby="addTransactionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0 shadow" data-aos="zoom-in" data-aos-duration="300">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title fw-bold" id="addTransactionModalLabel">
                                <i className="bx bx-plus-circle me-2"></i>
                                Add New Expense
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-transfer me-1 text-danger"></i>
                                            Transaction Type
                                        </label>
                                        <select className="form-select" required>
                                            <option value="expense" selected>Expense</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-category me-1 text-danger"></i>
                                            Expense Category
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
                                            <option value="housing">Housing & Rent</option>
                                            <option value="insurance">Insurance</option>
                                            <option value="personal_care">Personal Care</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-money me-1 text-danger"></i>
                                            Expense Amount
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light">Rp</span>
                                            <input type="number" className="form-control" placeholder="0" min="0" step="0.01" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-calendar me-1 text-danger"></i>
                                            Expense Date
                                        </label>
                                        <input type="date" className="form-control" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-text me-1 text-danger"></i>
                                            Expense Description
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter expense description" required />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-note me-1 text-danger"></i>
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea className="form-control" rows="3" placeholder="Additional notes about this expense..."></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-credit-card me-1 text-danger"></i>
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
                                            <i className="bx bx-tag me-1 text-danger"></i>
                                            Expense Tags (Optional)
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter tags separated by comma" />
                                        <small className="form-text text-muted">e.g: urgent, monthly, recurring</small>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                <i className="bx bx-x me-1"></i>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger">
                                <i className="bx bx-check me-1"></i>
                                Save Expense
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;