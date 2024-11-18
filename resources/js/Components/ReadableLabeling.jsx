import React, { useEffect, useState } from 'react';

const ReadableLabeling = ({ labelingInfo }) => {
    const [summary, setSummary] = useState('');
    const { indications_and_usage, adverse_reactions } = labelingInfo;

    useEffect(() => {
        const generateSummary = async () => {
            const prompt = `
            Create a brief patient summary in the form of a paragraph for the following information:
            Indications and Usage: ${indications_and_usage ? indications_and_usage.join(', ') : 'None'}
            Also create a brief paragraph about the Side Effects: ${adverse_reactions ? adverse_reactions.join(', ') : 'None'}
            `;

            // Request to backend to generate summary using OpenAI API (handled by Laravel)
            const response = await fetch('/generate-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ indications_and_usage, adverse_reactions }),
            });

            if (response.ok) {
                const data = await response.json();
                setSummary(data.summary);
            } else {
                setSummary('Error generating summary.');
            }
        };

        if (indications_and_usage || adverse_reactions) {
            generateSummary();
        }
    }, [indications_and_usage, adverse_reactions]);

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
        </div>
    );
};

export default ReadableLabeling;
