import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FitnessDashboard = ({ data }) => {
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
