import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import 'aos/dist/aos.css';
import AOS from 'aos';

const Addform = () => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
        source: '',
        frequency: '',
        tags: ''
    });

    useBootstrapTooltips();

    useEffect(() => {
        AOS.init({ 
            duration: 1000, 
            once: true,
            offset: 100
        });
    }, []);

  
    const formFields = [
        {
            id: 'title',
            label: 'Income Title',
            type: 'text',
            icon: 'bx-edit-alt',
            placeholder: 'Enter income title...',
            required: true,
            colSize: 'col-md-6'
        },
        {
            id: 'amount',
            label: 'Amount',
            type: 'number',
            icon: 'bx-dollar-circle',
            placeholder: '0.00',
            required: true,
            colSize: 'col-md-6',
            step: '0.01',
            min: '0'
        },
        {
            id: 'date',
            label: 'Date',
            type: 'date',
            icon: 'bx-calendar',
            required: true,
            colSize: 'col-md-6'
        },
        {
            id: 'source',
            label: 'Income Source',
            type: 'text',
            icon: 'bx-buildings',
            placeholder: 'e.g., Company Name, Client, etc.',
            required: true,
            colSize: 'col-md-6'
        }
    ];

    // Select fields configuration
    const selectFields = [
        {
            id: 'category',
            label: 'Category',
            icon: 'bx-category',
            required: true,
            colSize: 'col-md-6',
            options: [
                { value: '', label: 'Select Category' },
                { value: 'salary', label: 'Salary' },
                { value: 'freelance', label: 'Freelance' },
                { value: 'business', label: 'Business' },
                { value: 'investment', label: 'Investment' },
                { value: 'bonus', label: 'Bonus' },
                { value: 'commission', label: 'Commission' },
                { value: 'rental', label: 'Rental Income' },
                { value: 'dividend', label: 'Dividend' },
                { value: 'royalty', label: 'Royalty' },
                { value: 'gift', label: 'Gift' },
                { value: 'other', label: 'Other' }
            ]
        },
        {
            id: 'frequency',
            label: 'Frequency',
            icon: 'bx-repeat',
            required: true,
            colSize: 'col-md-6',
            options: [
                { value: '', label: 'Select Frequency' },
                { value: 'one-time', label: 'One Time' },
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'bi-weekly', label: 'Bi-Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'yearly', label: 'Yearly' }
            ]
        }
    ];


    const textareaFields = [
        {
            id: 'description',
            label: 'Description',
            icon: 'bx-text',
            placeholder: 'Add description (optional)...',
            rows: 3,
            colSize: 'col-md-8'
        },
        {
            id: 'tags',
            label: 'Tags',
            icon: 'bx-tag',
            placeholder: 'Enter tags separated by commas...',
            rows: 2,
            colSize: 'col-md-4'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
        console.log('Form Data:', formData);
    };

    const handleReset = () => {
        setFormData({
            title: '',
            amount: '',
            category: '',
            date: '',
            description: '',
            source: '',
            frequency: '',
            tags: ''
        });
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">
                       
                        <div className="text-center mb-5" data-aos="fade-down">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                                <i className="bx bx-plus-circle text-primary" style={{ fontSize: '2.5rem' }}></i>
                            </div>
                            <h2 className="fw-bold text-dark mb-2">Add New Income</h2>
                            <p className="text-muted">Track your income sources and manage your financial growth</p>
                        </div>

                    
                        <div className="card shadow-lg border-0 rounded-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="card-header bg-gradient text-white border-0 rounded-top-4 p-4">
                                <div className="d-flex align-items-center">
                                    <i className="bx bx-money text-white fs-4 me-2"></i>
                                    <h5 className="mb-0 fw-semibold">Income Information</h5>
                                </div>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                     
                                        {formFields.map((field, index) => (
                                            <div 
                                                key={field.id} 
                                                className={field.colSize}
                                                data-aos="fade-up" 
                                                data-aos-delay={300 + (index * 100)}
                                            >
                                                <label htmlFor={field.id} className="form-label fw-semibold text-dark">
                                                    <i className={`bx ${field.icon} me-2 text-primary`}></i>
                                                    {field.label}
                                                    {field.required && <span className="text-danger">*</span>}
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        <i className={`bx ${field.icon} text-muted`}></i>
                                                    </span>
                                                    <input
                                                        type={field.type}
                                                        className="form-control border-start-0 ps-0"
                                                        id={field.id}
                                                        name={field.id}
                                                        placeholder={field.placeholder}
                                                        value={formData[field.id]}
                                                        onChange={handleInputChange}
                                                        required={field.required}
                                                        step={field.step}
                                                        min={field.min}
                                                        data-bs-toggle="tooltip"
                                                        title={`Enter ${field.label.toLowerCase()}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                    
                                        {selectFields.map((field, index) => (
                                            <div 
                                                key={field.id} 
                                                className={field.colSize}
                                                data-aos="fade-up" 
                                                data-aos-delay={700 + (index * 100)}
                                            >
                                                <label htmlFor={field.id} className="form-label fw-semibold text-dark">
                                                    <i className={`bx ${field.icon} me-2 text-primary`}></i>
                                                    {field.label}
                                                    {field.required && <span className="text-danger">*</span>}
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        <i className={`bx ${field.icon} text-muted`}></i>
                                                    </span>
                                                    <select
                                                        className="form-select border-start-0"
                                                        id={field.id}
                                                        name={field.id}
                                                        value={formData[field.id]}
                                                        onChange={handleInputChange}
                                                        required={field.required}
                                                        data-bs-toggle="tooltip"
                                                        title={`Select ${field.label.toLowerCase()}`}
                                                    >
                                                        {field.options.map(option => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}

                                      
                                        {textareaFields.map((field, index) => (
                                            <div 
                                                key={field.id} 
                                                className={field.colSize}
                                                data-aos="fade-up" 
                                                data-aos-delay={900 + (index * 100)}
                                            >
                                                <label htmlFor={field.id} className="form-label fw-semibold text-dark">
                                                    <i className={`bx ${field.icon} me-2 text-primary`}></i>
                                                    {field.label}
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0 align-items-start pt-3">
                                                        <i className={`bx ${field.icon} text-muted`}></i>
                                                    </span>
                                                    <textarea
                                                        className="form-control border-start-0 ps-0"
                                                        id={field.id}
                                                        name={field.id}
                                                        rows={field.rows}
                                                        placeholder={field.placeholder}
                                                        value={formData[field.id]}
                                                        onChange={handleInputChange}
                                                        data-bs-toggle="tooltip"
                                                        title={`Enter ${field.label.toLowerCase()}`}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        ))}

                                     
                                        <div className="col-12" data-aos="fade-up" data-aos-delay="1100">
                                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary btn-lg px-5 py-3 rounded-3 shadow-lg"
                                                    data-bs-toggle="tooltip"
                                                    title="Save Income Record"
                                                >
                                                    <i className="bx bx-check-circle me-2"></i>
                                                    Add Income
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-3"
                                                    onClick={handleReset}
                                                    data-bs-toggle="tooltip"
                                                    title="Clear All Fields"
                                                >
                                                    <i className="bx bx-refresh me-2"></i>
                                                    Reset Form
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .bg-gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .form-control:focus, .form-select:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                }
                .input-group-text {
                    background-color: #f8f9fa;
                }
                .card {
                    transition: transform 0.3s ease;
                }
                .btn {
                    transition: all 0.3s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </section>
    );
};

export default Addform;