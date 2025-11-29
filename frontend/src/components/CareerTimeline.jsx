import { TrendingUp, Calendar } from 'lucide-react';

export default function CareerTimeline({ projection }) {
    if (!projection) return null;

    return (
        <div className="career-timeline">
            <h3><TrendingUp size={20} /> Career Path Projection</h3>

            <div className="timeline-container">
                <div className="timeline-item two-year">
                    <div className="timeline-marker">
                        <Calendar size={20} />
                        <span>2 Years</span>
                    </div>
                    <div className="timeline-content">
                        <h4>{projection.two_year?.likely_role || 'Senior Position'}</h4>
                        {projection.two_year?.estimated_salary_range && (
                            <p className="salary-projection">
                                💰 {projection.two_year.estimated_salary_range}
                            </p>
                        )}
                        {projection.two_year?.skills_to_develop && projection.two_year.skills_to_develop.length > 0 && (
                            <div className="skills-to-develop">
                                <strong>Skills to Develop:</strong>
                                <div className="skills-tags">
                                    {projection.two_year.skills_to_develop.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="timeline-connector" />

                <div className="timeline-item five-year">
                    <div className="timeline-marker">
                        <Calendar size={20} />
                        <span>5 Years</span>
                    </div>
                    <div className="timeline-content">
                        <h4>{projection.five_year?.likely_role || 'Leadership Position'}</h4>
                        {projection.five_year?.estimated_salary_range && (
                            <p className="salary-projection">
                                💰 {projection.five_year.estimated_salary_range}
                            </p>
                        )}
                        {projection.five_year?.skills_to_develop && projection.five_year.skills_to_develop.length > 0 && (
                            <div className="skills-to-develop">
                                <strong>Skills to Develop:</strong>
                                <div className="skills-tags">
                                    {projection.five_year.skills_to_develop.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {projection.development_priorities && projection.development_priorities.length > 0 && (
                <div className="development-priorities">
                    <h4>🎯 Development Priorities</h4>
                    <ul>
                        {projection.development_priorities.map((priority, idx) => (
                            <li key={idx}>{priority}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
