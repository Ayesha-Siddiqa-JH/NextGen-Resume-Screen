import { AlertTriangle, Shield } from 'lucide-react';

export default function FraudIndicators({ fraud }) {
    if (!fraud) return null;

    const getRiskColor = (score) => {
        if (score < 30) return '#00ff88';
        if (score < 60) return '#ffaa00';
        return '#ff4444';
    };

    const getRiskLevel = (score) => {
        if (score < 30) return 'Low Risk';
        if (score < 60) return 'Medium Risk';
        return 'High Risk';
    };

    return (
        <div className="fraud-indicators">
            <h3><Shield size={20} /> Fraud Detection Analysis</h3>

            <div className="fraud-score-container">
                <div className="fraud-score" style={{ borderColor: getRiskColor(fraud.risk_score) }}>
                    <div className="score-circle" style={{ background: getRiskColor(fraud.risk_score) }}>
                        {fraud.risk_score}
                    </div>
                    <span className="risk-label">{getRiskLevel(fraud.risk_score)}</span>
                </div>

                <div className="authenticity-score">
                    <span>Authenticity Score</span>
                    <strong>{fraud.authenticity_score || 90}%</strong>
                </div>
            </div>

            {fraud.red_flags && fraud.red_flags.length > 0 && (
                <div className="red-flags">
                    <h4><AlertTriangle size={18} /> Red Flags Detected</h4>
                    {fraud.red_flags.map((flag, idx) => (
                        <div key={idx} className={`flag-item severity-${flag.severity}`}>
                            <span className="flag-type">{flag.type}</span>
                            <p>{flag.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {fraud.timeline_analysis && (
                <div className="timeline-analysis">
                    <strong>Timeline Analysis:</strong>
                    <p>{fraud.timeline_analysis}</p>
                </div>
            )}
        </div>
    );
}
