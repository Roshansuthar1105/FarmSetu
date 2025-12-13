import numpy as np
import joblib
import os
from datetime import datetime

class RainfallPredictor:
    def __init__(self):
        # Define path to the 'models' folder relative to this script
        self.base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.models_dir = os.path.join(self.base_path, 'models')
        
        # Load models immediately on startup
        self.load_models()

    def load_models(self):
        """Loads the 3 pre-trained pickle files and the encoder"""
        try:
            print(f"Loading Rainfall models from: {self.models_dir}")
            self.model_24h = joblib.load(os.path.join(self.models_dir, 'rainfall_24h_model.pkl'))
            self.model_48h = joblib.load(os.path.join(self.models_dir, 'rainfall_48h_model.pkl'))
            self.model_72h = joblib.load(os.path.join(self.models_dir, 'rainfall_72h_model.pkl'))
            self.label_encoders = joblib.load(os.path.join(self.models_dir, 'label_encoders.pkl'))
            self.models_loaded = True
            print("✅ Rainfall Models Loaded Successfully")
        except Exception as e:
            print(f"❌ Error loading Rainfall models: {e}")
            print("⚠️ Ensure you have 'label_encoders.pkl' in the models folder too!")
            self.models_loaded = False

    def predict_rainfall(self, city, state, current_temp, current_humidity, current_month=None):
        """Main prediction function called by app.py"""
        
        # 1. Handle Missing Date
        if current_month is None:
            current_month = datetime.now().month

        # 2. Check if models exist
        if not self.models_loaded:
            return self.get_fallback_prediction(current_temp, current_humidity, current_month, "Models not loaded")

        try:
            # 3. Encode Inputs (Convert City Name -> Number)
            try:
                subdivision_encoded = self.label_encoders['subdivision'].transform([state])[0]
                district_encoded = self.label_encoders['district'].transform([city])[0]
            except:
                print(f"Location '{city}, {state}' not found in training data.")
                return self.get_fallback_prediction(current_temp, current_humidity, current_month, "Location not found")

            # 4. Prepare Data for Model
            # Input format: [Temp, Humidity, Month, State_Code, City_Code]
            features = np.array([[
                current_temp, 
                current_humidity, 
                current_month, 
                subdivision_encoded, 
                district_encoded
            ]])

            # 5. Predict Probabilities
            prob_24h = self.model_24h.predict_proba(features)[0][1]
            prob_48h = self.model_48h.predict_proba(features)[0][1]
            prob_72h = self.model_72h.predict_proba(features)[0][1]

            return {
                "rainfall_24h": "yes" if prob_24h > 0.5 else "no",
                "rainfall_48h": "yes" if prob_48h > 0.5 else "no",
                "rainfall_72h": "yes" if prob_72h > 0.5 else "no",
                "confidence_24h": round(prob_24h * 100, 2),
                "confidence_48h": round(prob_48h * 100, 2),
                "confidence_72h": round(prob_72h * 100, 2),
                "irrigation_recommendation": self.get_irrigation_recommendation(prob_24h, prob_48h, prob_72h)
            }

        except Exception as e:
            print(f"Prediction Error: {e}")
            return self.get_fallback_prediction(current_temp, current_humidity, current_month, str(e))

    def get_irrigation_recommendation(self, p24, p48, p72):
        if p24 > 0.7: return "Delay irrigation - High chance of rainfall in 24 hours"
        elif p48 > 0.6: return "Reduce irrigation - Expected rainfall in 48 hours"
        elif p72 > 0.5: return "Moderate irrigation - Possible rainfall in 72 hours"
        return "Proceed with normal irrigation - Low chance of rainfall"

    def get_fallback_prediction(self, temp, humidity, month, reason):
        """Rule-based backup if ML fails"""
        # Simple logic: High humidity + Monsoon months = High Rain Chance
        is_monsoon = month in [6, 7, 8, 9]
        if humidity > 80 or (is_monsoon and humidity > 70):
             return {
                "rainfall_24h": "yes", "confidence_24h": 65.0,
                "note": f"Fallback prediction used: {reason}"
             }
        return {
            "rainfall_24h": "no", "confidence_24h": 20.0,
            "note": f"Fallback prediction used: {reason}"
        }