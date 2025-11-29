import { Radar } from 'react-chartjs-2';

export default function EnhancedRadar({ scores }) {
    if (!scores) return null;

    const data = {
        labels: [
            'ATS Score',
            'Technical Skills',
            'Experience',
            'Job Alignment',
            'Soft Skills',
            'Education',
            'Integrity',
            'Overall Fit'
        ],
        datasets: [
            {
                label: 'Candidate Profile',
                data: [
                    scores.ats_score || 0,
                    scores.technical_skills || 0,
                    scores.experience_level || 0,
                    scores.job_alignment || 0,
                    scores.soft_skills || 0,
                    scores.education_match || 0,
                    scores.integrity_score || 0,
                    scores.overall_fit || 0
                ],
                backgroundColor: 'rgba(0, 255, 136, 0.2)',
                borderColor: 'rgba(0, 255, 136, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 255, 136, 1)',
                pointBorderColor: '#fff'
            }
        ]
    };

    const options = {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 20,
                    color: '#a0a0a0'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: '#e0e0e0',
                    font: {
                        size: 11
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="enhanced-radar">
            <h3>📊 Comprehensive Score Analysis</h3>
            <div className="chart-container">
                <Radar data={data} options={options} />
            </div>
        </div>
    );
}
