import { useBootstrapTooltips } from "../functions/Tooltip";

const TransactionTable = ({
    currentTransactions,
    totalPages,
    currentPage,
    setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    filteredTransactions,
    formatCurrency,
    formatDate,
    getTypeColor,
    getStatusColor,
    handleDelete
}) => {
    useBootstrapTooltips(); 

    return (
        <div className="row">
            <div className="col-12">
                <div className="card border-0 shadow" data-aos="fade-up" data-aos-delay="400">
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
                                    {currentTransactions.length > 0 ? (
                                        currentTransactions.map((transaction, index) => (
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
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">
                                                <i className="bx bx-info-circle text-muted fs-3 me-2"></i>
                                                <span className="text-muted">No data here</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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
    );
};

export default TransactionTable;