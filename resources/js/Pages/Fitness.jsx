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
        <div>
            <h1>Fitness Tracker</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Steps:</label>
                    <input
                        type="number"
                        value={formData.steps}
                        onChange={(e) => setData('steps', e.target.value)}
                    />
                </div>
                <div>
                    <label>Calories Burned:</label>
                    <input
                        type="number"
                        value={formData.calories}
                        onChange={(e) => setData('calories', e.target.value)}
                    />
                </div>
                <div>
                    <label>Exercise Duration (mins):</label>
                    <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => setData('duration', e.target.value)}
                    />
                </div>
                <button type="submit">Log Activity</button>
            </form>
            {errors && (
                <div>
                    {Object.keys(errors).map((key) => (
                        <p key={key} style={{ color: 'red' }}>
                            {errors[key]}
                        </p>
                    ))}
                </div>
            )}
            {data && (
                <div>
                    <h2>Previous Activities</h2>
                    <ul>
                        {data.map((entry, index) => (
                            <li key={index}>
                                {entry.steps} steps, {entry.calories} calories, {entry.duration} mins
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Fitness;
