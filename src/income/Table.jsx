import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Table = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 50
        });
        
        // Sample transaction data
        const sampleData = [
            {
                id: 1,
                title: "Salary Payment",
                type: "income",
                category: "salary",
                amount: 3500.00,
                date: "2025-05-28",
                source: "ABC Company",
                description: "Monthly salary payment",
                status: "completed",
                tags: ["work", "monthly"]
            },
            {
                id: 2,
                title: "Grocery Shopping",
                type: "expense",
                category: "food",
                amount: 125.50,
                date: "2025-05-27",
                source: "Supermarket XYZ",
                description: "Weekly grocery shopping",
                status: "completed",
                tags: ["food", "weekly"]
            },
            {
                id: 3,
                title: "Freelance Project",
                type: "income",
                category: "freelance",
                amount: 850.00,
                date: "2025-05-26",
                source: "Client ABC",
                description: "Web development project",
                status: "pending",
                tags: ["freelance", "project"]
            },
            {
                id: 4,
                title: "Electric Bill",
                type: "expense",
                category: "utilities",
                amount: 89.25,
                date: "2025-05-25",
                source: "Electric Company",
                description: "Monthly electricity bill",
                status: "completed",
                tags: ["bills", "utilities"]
            },
            {
                id: 5,
                title: "Investment Return",
                type: "income",
                category: "investment",
                amount: 245.75,
                date: "2025-05-24",
                source: "Stock Portfolio",
                description: "Dividend payment",
                status: "completed",
                tags: ["investment", "dividend"]
            },
            {
                id: 6,
                title: "Restaurant Dinner",
                type: "expense",
                category: "dining",
                amount: 67.80,
                date: "2025-05-23",
                source: "Italian Restaurant",
                description: "Dinner with family",
                status: "completed",
                tags: ["dining", "family"]
            },
            {
                id: 7,
                title: "Consulting Fee",
                type: "income",
                category: "business",
                amount: 1200.00,
                date: "2025-05-22",
                source: "Tech Startup",
                description: "Business consultation",
                status: "completed",
                tags: ["consulting", "business"]
            },
            {
                id: 8,
                title: "Car Fuel",
                type: "expense",
                category: "transport",
                amount: 45.00,
                date: "2025-05-21",
                source: "Gas Station",
                description: "Car refueling",
                status: "completed",
                tags: ["transport", "fuel"]
            }
        ];
        
        setTransactions(sampleData);
        setFilteredTransactions(sampleData);
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = transactions.filter(transaction => {
            const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                transaction.source.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesType = filterType === 'all' || transaction.type === filterType;
            const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
            
            return matchesSearch && matchesType && matchesCategory;
        });

        // Sort transactions
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (sortBy === 'amount') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            } else if (sortBy === 'date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredTransactions(filtered);
        setCurrentPage(1);
    }, [transactions, searchTerm, filterType, filterCategory, sortBy, sortOrder]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    // Filter options
    const filterOptions = {
        types: [
            { value: 'all', label: 'All Types', icon: 'bx-list-ul' },
            { value: 'income', label: 'Income', icon: 'bx-trending-up' },
            { value: 'expense', label: 'Expense', icon: 'bx-trending-down' }
        ],
        categories: [
            { value: 'all', label: 'All Categories', icon: 'bx-category' },
            { value: 'salary', label: 'Salary', icon: 'bx-briefcase' },
            { value: 'freelance', label: 'Freelance', icon: 'bx-laptop' },
            { value: 'business', label: 'Business', icon: 'bx-buildings' },
            { value: 'investment', label: 'Investment', icon: 'bx-line-chart' },
            { value: 'food', label: 'Food', icon: 'bx-restaurant' },
            { value: 'utilities', label: 'Utilities', icon: 'bx-home' },
            { value: 'dining', label: 'Dining', icon: 'bx-food-menu' },
            { value: 'transport', label: 'Transport', icon: 'bx-car' }
        ],
        sortOptions: [
            { value: 'date', label: 'Date', icon: 'bx-calendar' },
            { value: 'amount', label: 'Amount', icon: 'bx-dollar' },
            { value: 'title', label: 'Title', icon: 'bx-text' }
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        return type === 'income' ? 'success' : 'danger';
    };

    const getStatusColor = (status) => {
        return status === 'completed' ? 'success' : 'warning';
    };

    const handleDelete = (id) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const calculateTotals = () => {
        const totalIncome = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        return { totalIncome, totalExpense, netAmount: totalIncome - totalExpense };
    };

    const totals = calculateTotals();

    return (
        <section className="py-5 bg-light min-vh-100">
            <div className="container" style={{ paddingTop: "80px" }}>
                
                {/* Header */}
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
                                <button className="btn btn-primary btn-lg rounded-3 shadow-lg">
                                    <i className="bx bx-plus me-2"></i>
                                    Add Transaction
                                </button>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <i className="bx bx-trending-up text-success fs-2 mb-2"></i>
                                        <h5 className="text-success fw-bold">{formatCurrency(totals.totalIncome)}</h5>
                                        <small className="text-muted">Total Income</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <i className="bx bx-trending-down text-danger fs-2 mb-2"></i>
                                        <h5 className="text-danger fw-bold">{formatCurrency(totals.totalExpense)}</h5>
                                        <small className="text-muted">Total Expense</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <i className={`bx bx-wallet ${totals.netAmount >= 0 ? 'text-success' : 'text-danger'} fs-2 mb-2`}></i>
                                        <h5 className={`${totals.netAmount >= 0 ? 'text-success' : 'text-danger'} fw-bold`}>
                                            {formatCurrency(totals.netAmount)}
                                        </h5>
                                        <small className="text-muted">Net Amount</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 shadow-sm h-100">
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

                {/* Filters and Search */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-body">
                                <div className="row g-3 align-items-end">
                                    {/* Search */}
                                    <div className="col-md-3">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-search me-1"></i>Search
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search transactions..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Type Filter */}
                                    <div className="col-md-2">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-filter me-1"></i>Type
                                        </label>
                                        <select
                                            className="form-select"
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                        >
                                            {filterOptions.types.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div className="col-md-2">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-category me-1"></i>Category
                                        </label>
                                        <select
                                            className="form-select"
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                        >
                                            {filterOptions.categories.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Sort By */}
                                    <div className="col-md-2">
                                        <label className="form-label fw-semibold">
                                            <i className="bx bx-sort me-1"></i>Sort By
                                        </label>
                                        <select
                                            className="form-select"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            {filterOptions.sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Sort Order */}
                                    <div className="col-md-2">
                                        <label className="form-label fw-semibold">Order</label>
                                        <select
                                            className="form-select"
                                            value={sortOrder}
                                            onChange={(e) => setSortOrder(e.target.value)}
                                        >
                                            <option value="desc">Descending</option>
                                            <option value="asc">Ascending</option>
                                        </select>
                                    </div>

                                    {/* Clear Filters */}
                                    <div className="col-md-1">
                                        <button
                                            className="btn btn-outline-secondary w-100"
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilterType('all');
                                                setFilterCategory('all');
                                                setSortBy('date');
                                                setSortOrder('desc');
                                            }}
                                            data-bs-toggle="tooltip"
                                            title="Clear all filters"
                                        >
                                            <i className="bx bx-refresh"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow-lg" data-aos="fade-up" data-aos-delay="400">
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">
                                                    <i className="bx bx-hash me-1"></i>ID
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-text me-1"></i>Title
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-category me-1"></i>Type
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-dollar me-1"></i>Amount
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-calendar me-1"></i>Date
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-buildings me-1"></i>Source
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-check-circle me-1"></i>Status
                                                </th>
                                                <th scope="col">
                                                    <i className="bx bx-cog me-1"></i>Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentTransactions.map((transaction, index) => (
                                                <tr key={transaction.id} data-aos="fade-up" data-aos-delay={500 + (index * 50)}>
                                                    <td className="fw-semibold">#{transaction.id}</td>
                                                    <td>
                                                        <div>
                                                            <div className="fw-semibold">{transaction.title}</div>
                                                            <small className="text-muted">{transaction.description}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`badge bg-${getTypeColor(transaction.type)} bg-opacity-15 text-${getTypeColor(transaction.type)} rounded-pill`}>
                                                            <i className={`bx ${transaction.type === 'income' ? 'bx-trending-up' : 'bx-trending-down'} me-1`}></i>
                                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`fw-bold text-${getTypeColor(transaction.type)}`}>
                                                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                        </span>
                                                    </td>
                                                    <td className="text-muted">{formatDate(transaction.date)}</td>
                                                    <td>
                                                        <div>
                                                            <div className="fw-semibold">{transaction.source}</div>
                                                            <small className="text-muted text-capitalize">{transaction.category}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`badge bg-${getStatusColor(transaction.status)} bg-opacity-15 text-${getStatusColor(transaction.status)} rounded-pill`}>
                                                            <i className={`bx ${transaction.status === 'completed' ? 'bx-check' : 'bx-time'} me-1`}></i>
                                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary"
                                                                data-bs-toggle="tooltip"
                                                                title="Edit Transaction"
                                                            >
                                                                <i className="bx bx-edit"></i>
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-info"
                                                                data-bs-toggle="tooltip"
                                                                title="View Details"
                                                            >
                                                                <i className="bx bx-show"></i>
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDelete(transaction.id)}
                                                                data-bs-toggle="tooltip"
                                                                title="Delete Transaction"
                                                            >
                                                                <i className="bx bx-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center p-4 border-top">
                                        <div className="text-muted">
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} entries
                                        </div>
                                        <nav>
                                            <ul className="pagination mb-0">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                    >
                                                        <i className="bx bx-chevron-left"></i>
                                                    </button>
                                                </li>
                                                {[...Array(totalPages)].map((_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                        <button 
                                                            className="page-link"
                                                            onClick={() => setCurrentPage(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button 
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        <i className="bx bx-chevron-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .table th {
                    border: none;
                    padding: 1rem;
                    font-weight: 600;
                }
                .table td {
                    border: none;
                    padding: 1rem;
                    vertical-align: middle;
                }
                .table-hover tbody tr:hover {
                    background-color: rgba(0,0,0,0.02);
                }
                .btn-group .btn {
                    margin: 0 2px;
                }
                .page-link {
                    border: none;
                    padding: 0.5rem 0.75rem;
                    margin: 0 2px;
                    border-radius: 0.375rem;
                }
                .page-item.active .page-link {
                    background-color: #0d6efd;
                    border-color: #0d6efd;
                }
            `}</style>
        </section>
    );
};

export default Table;