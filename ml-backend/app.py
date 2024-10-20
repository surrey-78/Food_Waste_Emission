from flask import Flask, request, jsonify
import joblib
import numpy as np

# Initialize the Flask app
app = Flask(__name__)

# Load the saved ML model
model = joblib.load('ml_model.pkl')  # Ensure you have this file in the directory

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    # Extract the input features from the request
    input_features = np.array(data['features']).reshape(1, -1)
    
    # Make predictions using the model
    prediction = model.predict(input_features)
    
    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
