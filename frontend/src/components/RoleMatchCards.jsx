import { Target, TrendingUp } from 'lucide-react';

export default function RoleMatchCards({ matches }) {
    if (!matches || matches.length === 0) return null;

    return (
        <div className="role-matches">
            <h3><Target size={20} /> Top 5 Job Role Matches</h3>
            <div className="role-cards-grid">
                {matches.slice(0, 5).map((match, idx) => (
                    <div key={idx} className="role-card">
                        <div className="role-header">
                            <span className="role-rank">#{idx + 1}</span>
                            <span className="role-match">{match.match_percentage}%</span>
                        </div>
                        <h4>{match.role}</h4>
                        <p className="role-reasoning">{match.reasoning}</p>
                        <div className="match-bar">
                            <div
                                className="match-fill"
                                style={{ width: `${match.match_percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
