import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FitnessDashboard = ({ data }) => {
    const calculateAverages = () => {
        const totalEntries = data.length;
        const totalSteps = data.reduce((sum, entry) => sum + entry.steps, 0);
        const totalCalories = data.reduce((sum, entry) => sum + entry.calories, 0);
        const totalDuration = data.reduce((sum, entry) => sum + entry.duration, 0);

        return {
            avgSteps: (totalSteps / totalEntries).toFixed(1),
            avgCalories: (totalCalories / totalEntries).toFixed(1),
            avgDuration: (totalDuration / totalEntries).toFixed(1),
        };
    };

    const averages = calculateAverages();

    const stepsData = {
        labels: data.map(entry => new Date(entry.created_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Steps',
                data: data.map(entry => entry.steps),
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
        ],
    };

    const caloriesData = {
        labels: data.map(entry => new Date(entry.created_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Calories Burned',
                data: data.map(entry => entry.calories),
                fill: false,
                borderColor: 'red',
                tension: 0.1,
            },
        ],
    };

    const durationData = {
        labels: data.map(entry => new Date(entry.created_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Exercise Duration (mins)',
                data: data.map(entry => entry.duration),
                fill: false,
                borderColor: 'green',
                tension: 0.1,
            },
        ],
    };

    return (
        <div>
            <h1>Fitness Dashboard</h1>

            {/* Display the averages */}
            <div style={{ width: '80%', margin: 'auto', textAlign: 'center', padding: '20px' }}>
                <h2>Daily Averages</h2>
                <p><strong>Average Steps:</strong> {averages.avgSteps}</p>
                <p><strong>Average Calories Burned:</strong> {averages.avgCalories}</p>
                <p><strong>Average Exercise Duration:</strong> {averages.avgDuration} mins</p>
            </div>

            {/* Display the charts */}
            <div style={{ width: '80%', margin: 'auto' }}>
                <h2>Steps Over Time</h2>
                <Line data={stepsData} />

                <h2>Calories Burned Over Time</h2>
                <Line data={caloriesData} />

                <h2>Exercise Duration Over Time</h2>
                <Line data={durationData} />
            </div>
        </div>
    );
};

export default FitnessDashboard;
