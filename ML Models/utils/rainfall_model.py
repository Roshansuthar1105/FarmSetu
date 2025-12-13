import numpy as np
import joblib
import os
from datetime import datetime

class RainfallPredictor:
    def __init__(self):
        # Define path to the 'models' folder relative to this script
        self.base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.models_dir = os.path.join(self.base_path, 'models')
        
        # Month mapping for string to int conversion
        self.month_map = {
            "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
            "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12
        }
        
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
            self.models_loaded = False

    def get_month_int(self, month_input):
        """Converts month name or number to integer 1-12"""
        if isinstance(month_input, int):
            return month_input
        if isinstance(month_input, str):
            clean_month = month_input.lower().strip()
            return self.month_map.get(clean_month, datetime.now().month)
        return datetime.now().month

    def predict_rainfall(self, city, state, current_temp, current_humidity, current_month=None):
        """Main prediction function"""
        
        # 1. Handle Month Conversion
        month_int = self.get_month_int(current_month)

        # 2. Check if models exist
        if not self.models_loaded:
            print("⚠️ Models not loaded. Using Fallback.")
            return self.get_fallback_prediction(current_temp, current_humidity, month_int, "Models not loaded")

        try:
            # 3. Clean & Normalize inputs (Force UPPERCASE)
            clean_state = state.strip().upper()
            clean_city = city.strip().upper()

            print(f"🔍 Attempting to match Location: CITY={clean_city}, STATE={clean_state}")

            # 4. Encode Inputs
            try:
                # Try finding the specific location code
                subdivision_encoded = self.label_encoders['subdivision'].transform([clean_state])[0]
                district_encoded = self.label_encoders['district'].transform([clean_city])[0]
                method = "ML Model"
            except Exception as e:
                print(f"⚠️ Location '{clean_city}, {clean_state}' not found in training data. Switching to Fallback Logic.")
                # We do NOT return error here; we switch to heuristic prediction
                return self.get_fallback_prediction(current_temp, current_humidity, month_int, "Location not found in ML data")

            # 5. Prepare Data [Temp, Humidity, Month, State_Code, City_Code]
            features = np.array([[
                float(current_temp), 
                float(current_humidity), 
                month_int, 
                subdivision_encoded, 
                district_encoded
            ]])

            # 6. Predict using ML Models
            prob_24h = self.model_24h.predict_proba(features)[0][1]
            prob_48h = self.model_48h.predict_proba(features)[0][1]
            prob_72h = self.model_72h.predict_proba(features)[0][1]

            return {
                "rainfall_24h": "YES" if prob_24h > 0.5 else "NO",
                "rainfall_48h": "YES" if prob_48h > 0.5 else "NO",
                "rainfall_72h": "YES" if prob_72h > 0.5 else "NO",
                "confidence_24h": round(prob_24h * 100, 1),
                "confidence_48h": round(prob_48h * 100, 1),
                "confidence_72h": round(prob_72h * 100, 1),
                "irrigation_recommendation": self.get_irrigation_recommendation(prob_24h, prob_48h, prob_72h),
                "method": method
            }

        except Exception as e:
            print(f"❌ Prediction Logic Error: {e}")
            # Ensure the app never crashes, even on internal logic errors
            return self.get_fallback_prediction(current_temp, current_humidity, month_int, str(e))

    def get_irrigation_recommendation(self, p24, p48, p72):
        if p24 > 0.6: return "Delay irrigation - High chance of rainfall in 24 hours"
        elif p48 > 0.6: return "Reduce irrigation - Expected rainfall in 48 hours"
        elif p72 > 0.6: return "Moderate irrigation - Possible rainfall in 72 hours"
        return "Proceed with normal irrigation - Low chance of rainfall"

    def get_fallback_prediction(self, temp, humidity, month, reason):
        """
        Rule-based backup if ML fails (Location not found).
        Logic: High humidity (>80%) + Monsoon months (June-Sept) = Higher chance of rain.
        """
        is_monsoon = month in [6, 7, 8, 9] # June to Sept
        
        # Simple heuristic logic based on humidity and season
        if float(humidity) > 85 or (is_monsoon and float(humidity) > 75):
             prob = 0.85 # High chance
             res = "YES"
             rec = "Delay irrigation - High humidity indicates potential rain"
        elif float(humidity) > 60:
             prob = 0.40 # Moderate
             res = "NO"
             rec = "Monitor soil moisture - Moderate humidity"
        else:
             prob = 0.10 # Low
             res = "NO"
             rec = "Proceed with normal irrigation"

        print(f"ℹ️ Using Fallback: {reason} | Humidity: {humidity}% | Result: {res}")

        return {
            "rainfall_24h": res, 
            "rainfall_48h": res, 
            "rainfall_72h": res, 
            "confidence_24h": round(prob * 100, 1),
            # Decrease confidence for longer timelines in fallback mode
            "confidence_48h": round((prob * 0.9) * 100, 1), 
            "confidence_72h": round((prob * 0.8) * 100, 1),
            "irrigation_recommendation": rec,
            "note": f"Using rule-based fallback: {reason}",
            "method": "Fallback Logic"
        }