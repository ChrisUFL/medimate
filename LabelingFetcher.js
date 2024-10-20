// LabelingFetcher.js

// Add these into the component you want to use the API call with

// import React from 'react';
// import LabelingFetcher from './LabelingFetcher';


import React, { useState } from 'react';
import ReadableLabeling from './ReadableLabeling'; // Import the new component

const LabelingFetcher = () => {
    const [medicationName, setMedicationName] = useState('');
    const [labelingInfo, setLabelingInfo] = useState(null);
    const [error, setError] = useState('');

    const fetchLabeling = async () => {
        const url = `https://api.fda.gov/drug/label.json?search=spl_product_data_elements:${encodeURIComponent(medicationName)}&limit=1`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setLabelingInfo(data.results[0]);
                setError('');
            } else {
                setLabelingInfo(null);
                setError('No results found.');
            }
        } catch (err) {
            setLabelingInfo(null);
            setError('Error fetching data: ' + err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchLabeling();
    };

    return (
        <div>
            <h1>FDA Labeling Information</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    placeholder="Enter medication name"
                    required
                />
                <button type="submit">Fetch Labeling</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {labelingInfo && <ReadableLabeling labelingInfo={labelingInfo} />}
        </div>
    );
};

export default LabelingFetcher;
