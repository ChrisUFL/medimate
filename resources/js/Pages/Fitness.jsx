import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Fitness = ({ data }) => {
    const { data: formData, setData, post, reset, errors } = useForm({
        steps: '',
        calories: '',
        duration: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('fitness.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Fitness Tracker</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Steps:</label>
                        <input
                            type="number"
                            value={formData.steps}
                            onChange={(e) => setData('steps', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter steps"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Calories Burned:</label>
                        <input
                            type="number"
                            value={formData.calories}
                            onChange={(e) => setData('calories', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter calories burned"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Exercise Duration (mins):</label>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter duration in minutes"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Log Activity
                    </button>
                </form>
                
                {errors && (
                    <div className="mt-4">
                        {Object.keys(errors).map((key) => (
                            <p key={key} className="text-red-500 text-sm">
                                {errors[key]}
                            </p>
                        ))}
                    </div>
                )}
                
                {data && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Previous Activities</h2>
                        <ul className="space-y-2">
                            {data.map((entry, index) => (
                                <li key={index} className="bg-gray-200 p-3 rounded-lg">
                                    {entry.steps} steps, {entry.calories} calories, {entry.duration} mins
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Fitness;
