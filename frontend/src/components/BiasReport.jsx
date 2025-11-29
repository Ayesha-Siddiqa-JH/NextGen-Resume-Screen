import { AlertCircle, CheckCircle } from 'lucide-react';

export default function BiasReport({ bias }) {
    if (!bias) return null;

    const getBiasLevel = (score) => {
        if (score < 20) return { level: 'Minimal', color: '#00ff88' };
        if (score < 50) return { level: 'Low', color: '#ffaa00' };
        if (score < 75) return { level: 'Moderate', color: '#ff8800' };
        return { level: 'High', color: '#ff4444' };
    };

    const biasInfo = getBiasLevel(bias.bias_score || 0);

    return (
        <div className="bias-report">
            <h3><AlertCircle size={20} /> Bias Detection & Neutralization</h3>

            <div className="bias-score-display">
                <div className="bias-meter">
                    <div
                        className="bias-fill"
                        style={{
                            width: `${bias.bias_score || 0}%`,
                            backgroundColor: biasInfo.color
                        }}
                    />
                </div>
                <div className="bias-info">
                    <span className="bias-level" style={{ color: biasInfo.color }}>
                        {biasInfo.level} Bias Detected
                    </span>
                    <span className="bias-score">{bias.bias_score || 0}/100</span>
                </div>
            </div>

            {bias.detected_biases && bias.detected_biases.length > 0 ? (
                <div className="detected-biases">
                    <h4>Detected Bias Indicators</h4>
                    {bias.detected_biases.map((item, idx) => (
                        <div key={idx} className="bias-item">
                            <div className="bias-type-badge">{item.type}</div>
                            <div className="bias-content">
                                <p className="original-text">
                                    <strong>Original:</strong> "{item.text}"
                                </p>
                                <p className="suggestion">
                                    <CheckCircle size={16} />
                                    <strong>Suggestion:</strong> {item.suggestion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-bias">
                    <CheckCircle size={24} color="#00ff88" />
                    <p>No significant bias detected. Resume appears neutral and professional.</p>
                </div>
            )}
        </div>
    );
}
