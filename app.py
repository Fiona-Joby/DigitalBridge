from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import json

app = Flask(__name__)
# Crucial for the extension to find the backend
CORS(app) 

# Ensure your API key is correct
client = genai.Client(api_key="AIzaSyDwdIjTK69--ymc2xXNHajaxGnvC8q5S4k")

@app.route('/simplify', methods=['POST'])
def simplify():
    try:
        data = request.json
        user_text = data.get('text', '')
        
        prompt = (
            f"Simplify this for a 5-year-old and translate to Malayalam. "
            f"Output MUST be strictly JSON with keys 'english' and 'malayalam'. "
            f"Text: {user_text}"
        )

        # UPDATE: Using the 2026 workhorse model to avoid 404
        response = client.models.generate_content(
        model="gemini-2.5-flash-lite", # Much higher quota than 2.0-flash
        contents=prompt
)

        # Clean the response in case the AI adds markdown text
        raw_text = response.text.strip().replace('```json', '').replace('```', '')
        return jsonify(json.loads(raw_text))

    except Exception as e:
        # This will now show the exact error in your terminal if it fails
        print(f"!!! BACKEND CRASHED: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)