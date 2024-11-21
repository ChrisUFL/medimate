import "../../css/app.css"; // Import custom CSS
import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react"; // Inertia Head for setting the page title
import Navbar from "../Components/Navbar"; // Navbar component
import Footer from "../Components/Footer"; // Footer component
import axios from "axios";

const Medications = ({ labelingInfo: initialLabelingInfo, error: initialError, medicationName: initialMedicationName }) => {
    const [medicationName, setMedicationName] = useState(initialMedicationName || '');
    const [labelingInfo, setLabelingInfo] = useState(initialLabelingInfo || null);
    const [error, setError] = useState(initialError || '');
    const [summary, setSummary] = useState('');

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

    useEffect(() => {
        const generateSummary = async () => {
            if (!labelingInfo) return;

            const { indications_and_usage, adverse_reactions } = labelingInfo;
            const prompt = `
            Create a brief patient summary in the form of a paragraph for the following information:
            Indications and Usage: ${indications_and_usage ? indications_and_usage.join(', ') : 'None'}
            Also create a brief paragraph about the
            Side Effects: ${adverse_reactions ? adverse_reactions.join(', ') : 'None'}
            `;

            console.log('Generating summary with prompt:', prompt);
            console.log(process.env);

            for (let attempt = 0; attempt < 5; attempt++) {
                try {
                    const response = await axios.post(
                        'https://api.openai.com/v1/chat/completions',
                        {
                            model: 'gpt-4o-mini',
                            messages: [{ role: 'user', content: prompt }],
                            max_tokens: 400,
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${process.env.VITE_APP_OPENAI_API_KEY}`,
                                'OpenAI-Organization': process.env.VITE_APP_OPENAI_ORG_ID,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    setSummary(response.data.choices[0].message.content);

                    return; // Exit if successful
                } catch (error) {
                    if (error.response && error.response.status === 429) {
                        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
                        console.log(`Rate limit hit. Waiting for ${waitTime} ms before retrying...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime)); // Wait before retrying
                    } else {
                        console.error('Error fetching summary:', error.response ? error.response.data : error.message);
                        setSummary('Error generating summary.');
                        return; // Exit on other errors
                    }
                }
            }
        };

        generateSummary();
    }, [labelingInfo]);

    return (
        <div className="wrapper flex-col min-h-screen grow">
            <Head title="FDA Labeling Information" />

            {/* Navbar */}
            <Navbar />

            <div className="m-auto z-10">
                <section className="content p-4">
                    {/* Main Content */}
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">FDA Labeling Information</h1>

                    {/* Form for Medication Name */}
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                        <input
                            type="text"
                            value={medicationName}
                            onChange={(e) => setMedicationName(e.target.value)}
                            placeholder="Enter medication name"
                            required
                            className="border border-gray-300 p-2 rounded-lg w-full mb-4"
                        />
                        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg w-full">
                            Fetch Labeling
                        </button>
                    </form>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Labeling Information */}
                    {labelingInfo && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Readable Labeling Information</h2>
                            <h3 className="text-xl font-semibold text-gray-800">Summary:</h3>
                            {summary ? (
                                <ul className="text-gray-800">
                                    {summary.split('\n').map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-800">Generating summary...</p>
                            )}
                        </div>
                    )}
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Medications;
