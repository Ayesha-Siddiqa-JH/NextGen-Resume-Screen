import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function PersonalityChart({ personality }) {
    if (!personality) return null;

    const data = {
        labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
        datasets: [
            {
                label: 'OCEAN Personality Traits',
                data: [
                    personality.openness || 50,
                    personality.conscientiousness || 50,
                    personality.extraversion || 50,
                    personality.agreeableness || 50,
                    personality.neuroticism || 50
                ],
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderColor: 'rgba(0, 212, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 212, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 212, 255, 1)'
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
                        size: 12
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
        <div className="personality-chart">
            <h3>🧠 Personality Analysis (OCEAN Model)</h3>
            <div className="chart-container">
                <Radar data={data} options={options} />
            </div>
            {personality.summary && (
                <p className="personality-summary">{personality.summary}</p>
            )}
        </div>
    );
}
