from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import json
import os
import ssl

# --- THE SSL FIX ---
if not os.environ.get('PYTHONHTTPSVERIFY', '') and getattr(ssl, '_create_unverified_context', None):
    ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
CORS(app) 

# Using your API key
client = genai.Client(api_key="")  #add api key

@app.route('/simplify', methods=['POST'])
def simplify():
    try:
        data = request.json
        user_text = data.get('text', '')
        
        prompt = (
            f"Simplify this for a 13-year-old and translate to Malayalam. "
            f"Output MUST be strictly JSON with keys 'english' and 'malayalam'. "
            f"Text: {user_text}"
        )

        response = client.models.generate_content(
            model="gemini-3-flash-preview", 
            contents=prompt
        )

        raw_text = response.text.strip().replace('```json', '').replace('```', '')
        return jsonify(json.loads(raw_text))

    except Exception as e:
        print(f"!!! BACKEND CRASHED: {e}", flush=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)