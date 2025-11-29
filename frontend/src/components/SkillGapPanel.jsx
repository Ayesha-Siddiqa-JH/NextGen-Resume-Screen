import { BookOpen, Clock } from 'lucide-react';

export default function SkillGapPanel({ skillGap }) {
    if (!skillGap) return null;

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return '#ff4444';
            case 'medium': return '#ffaa00';
            case 'low': return '#00ff88';
            default: return '#00d4ff';
        }
    };

    return (
        <div className="skill-gap-panel">
            <h3><BookOpen size={20} /> Skill Gap Analysis & Learning Roadmap</h3>

            {skillGap.missing_skills && skillGap.missing_skills.length > 0 && (
                <div className="missing-skills">
                    <h4>Missing Skills</h4>
                    <div className="skills-tags">
                        {skillGap.missing_skills.map((skill, idx) => (
                            <span key={idx} className="skill-tag missing">{skill}</span>
                        ))}
                    </div>
                </div>
            )}

            {skillGap.learning_roadmap && skillGap.learning_roadmap.length > 0 && (
                <div className="learning-roadmap">
                    <h4>Personalized Learning Roadmap</h4>
                    {skillGap.learning_roadmap.map((item, idx) => (
                        <div key={idx} className="roadmap-item">
                            <div className="roadmap-header">
                                <span className="skill-name">{item.skill}</span>
                                <span
                                    className="priority-badge"
                                    style={{ backgroundColor: getPriorityColor(item.priority) }}
                                >
                                    {item.priority || 'Medium'} Priority
                                </span>
                            </div>
                            {item.estimated_time && (
                                <div className="estimated-time">
                                    <Clock size={14} />
                                    {item.estimated_time}
                                </div>
                            )}
                            {item.resources && item.resources.length > 0 && (
                                <ul className="resources-list">
                                    {item.resources.map((resource, ridx) => (
                                        <li key={ridx}>{resource}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {skillGap.verified_additions && skillGap.verified_additions.length > 0 && (
                <div className="verified-additions">
                    <h4>✅ Verified Resume Additions</h4>
                    <ul>
                        {skillGap.verified_additions.map((addition, idx) => (
                            <li key={idx}>{addition}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
