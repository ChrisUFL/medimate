// ReadableLabeling.jsx
import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/react'; // Import Inertia for routing

const ReadableLabeling = ({ labelingInfo }) => {
    const [summary, setSummary] = useState('');
    const { indications_and_usage, adverse_reactions } = labelingInfo;

    useEffect(() => {
        const generateSummary = async () => {
            const prompt = `
            Create a bullet-point summary for the following information:
            Indications and Usage: ${indications_and_usage ? indications_and_usage.join(', ') : 'None'}
            Side Effects: ${adverse_reactions ? adverse_reactions.join(', ') : 'None'}
            `;
        
        
            for (let attempt = 0; attempt < 5; attempt++) {
                try {
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                            'OpenAI-Organization': process.env.REACT_APP_OPENAI_ORG_ID,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            model: 'gpt-4o-mini',
                            messages: [{ role: 'user', content: prompt }],
                            max_tokens: 150,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setSummary(data.choices[0].message.content);
                    return; // Exit if successful
                } catch (error) {
                    if (error.message.includes('429')) {
                        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
                        console.log(`Rate limit hit. Waiting for ${waitTime} ms before retrying...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime)); // Wait before retrying
                    } else {
                        console.error('Error fetching summary:', error);
                        setSummary('Error generating summary.');
                        return; // Exit on other errors
                    }
                }
            }
        };

        if (indications_and_usage || adverse_reactions) {
            generateSummary();
        }
    }, [indications_and_usage, adverse_reactions]);

    const handleNavigation = () => {
        Inertia.get('/new-route'); // Replace with your desired route
    };

    return (
        <div>
            <h2>Readable Labeling Information</h2>
            <h3>Summary:</h3>
            {summary ? (
                <ul>
                    {summary.split('\n').map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            ) : (
                <p>Generating summary...</p>
            )}
            <button onClick={handleNavigation}>Go to New Route</button>
        </div>
    );
};

export default ReadableLabeling;