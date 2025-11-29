import { DollarSign, TrendingUp } from 'lucide-react';

export default function SalaryRange({ salary }) {
    if (!salary) return null;

    const formatSalary = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: salary.currency || 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="salary-range">
            <h3><DollarSign size={20} /> Salary Prediction</h3>

            <div className="salary-bars">
                <div className="salary-item">
                    <span className="salary-label">Minimum</span>
                    <div className="salary-bar min">
                        <span className="salary-value">{formatSalary(salary.min)}</span>
                    </div>
                </div>

                <div className="salary-item">
                    <span className="salary-label">Median</span>
                    <div className="salary-bar median">
                        <span className="salary-value">{formatSalary(salary.median)}</span>
                    </div>
                </div>

                <div className="salary-item">
                    <span className="salary-label">Maximum</span>
                    <div className="salary-bar max">
                        <span className="salary-value">{formatSalary(salary.max)}</span>
                    </div>
                </div>
            </div>

            {salary.market_comparison && (
                <p className="market-comparison">
                    <TrendingUp size={16} />
                    {salary.market_comparison}
                </p>
            )}

            {salary.factors && salary.factors.length > 0 && (
                <div className="salary-factors">
                    <strong>Key Factors:</strong>
                    <ul>
                        {salary.factors.map((factor, idx) => (
                            <li key={idx}>{factor}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
