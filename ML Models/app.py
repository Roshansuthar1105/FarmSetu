import os
import json
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import joblib  
import pandas as pd
# 1. Rainfall Logic
try:
    from utils.rainfall_model import RainfallPredictor
except ImportError:
    # Handle case where file might be named rainfall_predict inside utils
    try:
        from utils.rainfall_predict import RainfallPredictor
    except:
        print("❌ Could not import RainfallPredictor. Check file naming.")

# 2. Plant Disease Logic
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
# Allow React frontend to talk to this API
CORS(app) 

# --- Configuration ---
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- LOAD MODELS & DATA (Global Variables) ---
print("⏳ Loading ML Models & Data... Please wait.")

# 1. Rainfall
try:
    rainfall_system = RainfallPredictor()
    print("✅ Rainfall System Initialized")
except Exception as e:
    print(f"❌ Error initializing Rainfall System: {e}")
    rainfall_system = None

# 2. Plant Disease & Treatment Tips
try:
    disease_model = load_model('models/best_model.keras')
    
    # Load Treatment Tips from JSON now
    with open('data/treatment_tips.json', 'r', encoding='utf-8') as f:
        treatment_tips = json.load(f)
        
    disease_classes = [
        "Pepper bell Bacterial spot", "Pepper bell healthy", "Potato Early blight",
        "Potato healthy", "Potato Late blight", "Tomato Target Spot",
        "Tomato Tomato mosaic virus", "Tomato Tomato YellowLeaf Curl Virus",
        "Tomato Bacterial spot", "Tomato Early blight", "Tomato healthy",
        "Tomato Late blight", "Tomato Leaf mold", "Tomato Septoria leaf spot",
        "Tomato Spider mites Two spotted spider mite"
    ]
    print("✅ Disease Model & Tips Loaded")
except Exception as e:
    print(f"❌ Error loading Disease Model/Tips: {e}")
    disease_model = None
    treatment_tips = {}

# 3. Crop Recommendation
try:
    crop_model = pickle.load(open('models/minimodel.pkl', 'rb'))
    with open('data/crop_data.json', 'r', encoding='utf-8') as file:
        crop_details_data = json.load(file)
    print("✅ Crop Model & Data Loaded")
except Exception as e:
    print(f"❌ Error loading Crop Model: {e}")
    crop_model = None
# 4. Crop Yield Prediction (NEW REGRESSION MODEL from raj.ipynb)
try:
    # Ensure this file is inside your models folder
    with open('models/crop_yield_model.pkl', 'rb') as f:  # <--- 'rb' is CRITICAL
        yield_model = pickle.load(f)
    print("✅ Crop Yield Prediction Model Loaded")
except Exception as e:
    print(f"❌ Error loading Yield Model: {e}")
    yield_model = None

# --- ROUTES ---

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "FarmSetu ML Server Running", 
        "models": {
            "disease": disease_model is not None,
            "crop": crop_model is not None,
            "rainfall": rainfall_system is not None
        }
    })

# --- 1. RAINFALL ENDPOINT ---
@app.route('/api/predict/rainfall', methods=['POST'])
def predict_rainfall():
    if not rainfall_system:
         return jsonify({'error': 'Rainfall system not initialized'}), 503

    try:
        data = request.json
        print(f"📥 Received Rainfall Request: {data}")
        
        city = data.get('city', '')
        state = data.get('state', '')
        try:
            current_temp = float(data.get('current_temp', 0))
            current_humidity = float(data.get('current_humidity', 0))
        except (ValueError, TypeError):
            return jsonify({'error': 'Temperature and Humidity must be numbers'}), 400
            
        current_month = data.get('current_month')

        if not city or not state:
            return jsonify({'error': 'City and State are required'}), 400

        result = rainfall_system.predict_rainfall(
            city=city,
            state=state,
            current_temp=current_temp,
            current_humidity=current_humidity,
            current_month=current_month
        )
        
        print(f"📤 Sending Result: {result}")
        return jsonify(result)

    except Exception as e:
        print(f"🔥 API Error: {str(e)}")
        return jsonify({'error': f"Server Error: {str(e)}"}), 500
# --- 2. DISEASE ENDPOINT ---
@app.route('/api/predict/disease', methods=['POST'])
def predict_disease():
    if not disease_model:
        return jsonify({'error': 'Disease model is currently unavailable'}), 503
        
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Save temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Process Image
        img = image.load_img(filepath, target_size=(128, 128))
        x = image.img_to_array(img)
        x = x / 255.0
        x = np.expand_dims(x, axis=0)

        # Predict
        preds = disease_model.predict(x)[0]
        predicted_index = np.argmax(preds)
        predicted_class = disease_classes[predicted_index]
        confidence = float(round(preds[predicted_index] * 100, 2))
        
        # Get Info from loaded JSON
        treatment = treatment_tips.get(predicted_class, "No specific treatment info available.")

        return jsonify({
            'disease': predicted_class,
            'confidence': confidence,
            'treatment': treatment
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# --- 3. CROP ENDPOINT ---
@app.route('/api/predict/crop', methods=['POST'])
def predict_crop():
    if not crop_model:
        return jsonify({'error': 'Crop model is currently unavailable'}), 503

    try:
        data = request.json
        features = np.array([
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall']),
            float(data['water_level'])
        ]).reshape(1, -1)

        prediction = crop_model.predict(features)
        crop_name = prediction[0]
        crop_info = crop_details_data.get('crops', {}).get(crop_name, {})
        return jsonify({
            "predicted_crop": crop_name,
            "details": crop_info
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# 5 crop prediction
@app.route('/api/predict/yield', methods=['POST'])
def predict_yield():
    if not yield_model:
        return jsonify({'error': 'Yield model unavailable'}), 503

    try:
        data = request.json
        
        # The pipeline in raj.ipynb expects a DataFrame with specific column names
        # and correct data types (int/float/object)
        input_data = pd.DataFrame([{
            "Crop": str(data['Crop']),
            "Crop_Year": int(data['Crop_Year']),
            "Season": str(data['Season']),
            "State": str(data['State']),
            "Annual_Rainfall": float(data['Annual_Rainfall']),
            "Fertilizer": float(data['Fertilizer']),
            "Pesticide": float(data['Pesticide'])
        }])

        prediction = yield_model.predict(input_data)
        predicted_value = prediction[0]

        return jsonify({
            "predicted_yield": round(predicted_value, 2),
            "unit": "Production (Tonnes/Bales based on crop)" 
        })
    except KeyError as e:
        return jsonify({'error': f"Missing field: {str(e)}"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5050))
    app.run(host='0.0.0.0', port=port)