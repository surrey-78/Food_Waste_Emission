import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [features, setFeatures] = useState([]);
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e, index) => {
        const newFeatures = [...features];
        newFeatures[index] = parseFloat(e.target.value);
        setFeatures(newFeatures);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                features: features
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("There was an error making the request", error);
        }
    };

    return (
        <div className="app-container">
            <h1>ML Model Prediction</h1>

            <div className="input-container">
                <label>Feature 1:</label>
                <input type="number" onChange={(e) => handleChange(e, 0)} className="input-field" />
            </div>
            <div className="input-container">
                <label>Feature 2:</label>
                <input type="number" onChange={(e) => handleChange(e, 1)} className="input-field" />
            </div>
            {/* Add more input fields as required */}
            
            <button onClick={handleSubmit} className="predict-button">Predict</button>

            {prediction && (
                <div className="prediction-container">
                    <h2>Prediction: {prediction}</h2>
                </div>
            )}
        </div>
    );
}

export default App;