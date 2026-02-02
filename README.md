# 🌉 Digital Bridge: AI-Powered Text Simplifier & Translator

**Digital Bridge** is a Chrome Extension designed to break down language barriers and cognitive walls. Using cutting-edge **Gemini 3 Flash Preview** models, it transforms complex, jargon-heavy English text into simple, easy-to-understand language and translates it into Malayalam instantly.



## 🚀 Features

* **AI Simplification:** Converts academic or technical jargon into language suitable for a child.
* **Malayalam Translation:** Bridges the gap for native speakers by providing accurate translations.
* **The Stress-O-Meter:** A real-time UI component that visualizes text complexity based on linguistic density.
* **Instant TTS (Text-to-Speech):** High-quality audio playback for both English and Malayalam using the Web Speech API.
* **Sidepanel Integration:** Non-intrusive UI that stays with you as you browse.

---

## 🛠️ Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | JavaScript (ES6+), HTML5, CSS3 | Chrome Extension UI & Logic |
| **Backend** | Python 3.10+, Flask | REST API & AI Orchestration |
| **AI Engine** | **Gemini 3 Flash Preview** | Natural Language Processing & Translation |
| **Speech** | Web Speech API | Client-side audio synthesis |
| **Security** | Flask-CORS | Cross-origin resource sharing |

---

## ⚙️ Installation & Setup

### 1. Backend Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pip install flask flask-cors google-genai
    ```
3.  Add your Gemini API Key in `app.py`.
4.  Run the server:
    ```bash
    python app.py
    ```

### 2. Extension Setup
1.  Open Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer Mode** (top right).
3.  Click **Load unpacked** and select the folder containing the extension files.
4.  Pin the extension and open the side panel!

---

## 🧠 How It Works: The "Stress-O-Meter"
The **Stress-O-Meter** uses a local heuristic algorithm to analyze the ratio of complex words (9+ characters) to total words. This provides the user with an instant visual "difficulty score" before the AI even finishes its processing, ensuring a responsive and "glanceable" user experience.



## 🎤 The "Hackathon" Impact
Digital Bridge was built to solve the "Digital Divide." By making information accessible to children, non-native speakers, and those with learning difficulties, we are making the internet a truly inclusive space.

---

## 🛠️ Troubleshooting

* **429 Quota Error:** If the API limit is reached, wait 60 seconds for the free tier to reset or rotate the API key.
* **SSL Certificate Fail:** The backend includes a security bypass for local development environments to ensure stable API connections.
* **No Malayalam Voice:** Ensure your operating system has the Malayalam language pack installed for the Web Speech API to function.
