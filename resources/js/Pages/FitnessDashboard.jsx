import React, { useState } from 'react';
import Navbar from "@/Components/Navbar";
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

    const [goalForm, setGoalForm] = useState({
        currentWeight: '',
        desiredWeight: '',
        feet: '',
        inches: '',
        age: '',
        gender: 'male',
        activityLevel: 'sedentary',
    });
    const [goalResults, setGoalResults] = useState(null);

    const handleGoalCalculation = () => {
        const { currentWeight, desiredWeight, feet, inches, age, gender, activityLevel } = goalForm;

    // Convert weight to kilograms and height to cm
    const weightInKg = parseFloat(currentWeight) * 0.453592;
    const goalWeightInKg = parseFloat(desiredWeight) * 0.453592;
    const heightInCm = (parseFloat(feet) * 30.48) + (parseFloat(inches) * 2.54);
    const ageInYears = parseInt(age);

    // Calculate BMR
    let bmr = 0;
    if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears + 5;
    } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * ageInYears - 161;
    }

    // Calculate TDEE
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        veryActive: 1.725,
    };
    const tdee = bmr * activityFactors[activityLevel];

    // Adjust caloric intake based on goal
    let dailyCalories = tdee; // Default: maintenance
    if (parseFloat(desiredWeight) > parseFloat(currentWeight)) {
        // Weight gain: increase by 500 kcal
        dailyCalories += 500;
    } else if (parseFloat(desiredWeight) < parseFloat(currentWeight)) {
        // Weight loss: decrease by 500 kcal
        dailyCalories -= 500;
    }

    setGoalResults({
        dailyCalories: dailyCalories.toFixed(0),
        });
    };

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
        <>
            <Navbar />

            <div>
                {/* Display the averages */}
                <div style={{ width: '80%', margin: 'auto', textAlign: 'center', padding: '20px' }}>
                    <h2>Daily Averages</h2>
                    <p><strong>Average Steps:</strong> {averages.avgSteps}</p>
                    <p><strong>Average Calories Burned:</strong> {averages.avgCalories}</p>
                    <p><strong>Average Exercise Duration:</strong> {averages.avgDuration} mins</p>
                </div>

                {/* Goal Setting Section */}
                <div className="goal-setting bg-white shadow-md rounded-lg p-6 mt-6" style={{ width: '80%', margin: 'auto' }}>
                    <h2 className="text-xl font-bold mb-4">Set Your Fitness Goal</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Current Weight (lbs):</label>
                            <input
                                type="number"
                                value={goalForm.currentWeight}
                                onChange={(e) => setGoalForm({ ...goalForm, currentWeight: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your current weight"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Desired Weight (lbs):</label>
                            <input
                                type="number"
                                value={goalForm.desiredWeight}
                                onChange={(e) => setGoalForm({ ...goalForm, desiredWeight: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your desired weight"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Height:</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={goalForm.feet}
                                    onChange={(e) => setGoalForm({ ...goalForm, feet: e.target.value })}
                                    className="w-1/2 p-2 border border-gray-300 rounded-lg"
                                    placeholder="Feet"
                                />
                                <input
                                    type="number"
                                    value={goalForm.inches}
                                    onChange={(e) => setGoalForm({ ...goalForm, inches: e.target.value })}
                                    className="w-1/2 p-2 border border-gray-300 rounded-lg"
                                    placeholder="Inches"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Age:</label>
                            <input
                                type="number"
                                value={goalForm.age}
                                onChange={(e) => setGoalForm({ ...goalForm, age: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your age"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Gender:</label>
                            <select
                                value={goalForm.gender}
                                onChange={(e) => setGoalForm({ ...goalForm, gender: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Activity Level:</label>
                            <select
                                value={goalForm.activityLevel}
                                onChange={(e) => setGoalForm({ ...goalForm, activityLevel: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="veryActive">Very Active</option>
                            </select>
                        </div>
                        <button
                            onClick={handleGoalCalculation}
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Calculate
                        </button>
                    </div>

                    {goalResults && (
                        <div className="mt-6 bg-gray-200 p-4 rounded-lg">
                            <h3 className="text-lg font-bold mb-2">Your Daily Goals</h3>
                            <p><strong>Daily Caloric Intake:</strong> {goalResults.dailyCalories} kcal</p>
                        </div>
                    )}
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
        </>
    );
};

export default FitnessDashboard;
