// --- CONFIGURATION ---
const BACKEND_URL = 'http://127.0.0.1:5000/simplify';

// --- UI LOGIC ---
document.getElementById('simplifyBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;
    if (!text) {
        alert("Please paste some text first!");
        return;
    }

    // 1. Calculate Stress-O-Meter (Local Logic)
    calculateStress(text);

    // 2. Update UI for Loading State
    document.getElementById('englishOutput').innerText = "Simplifying...";
    document.getElementById('malayalamOutput').innerText = "പരിഭാഷപ്പെടുത്തുന്നു...";

    try {
        // 3. Call your Flask Backend
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) throw new Error("Backend server is not responding.");

        const data = await response.json();

        // 4. Display Results
        document.getElementById('englishOutput').innerText = data.english;
        document.getElementById('malayalamOutput').innerText = data.malayalam;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('englishOutput').innerText = "Error: Make sure your Python backend is running!";
        document.getElementById('malayalamOutput').innerText = "സർവർ പ്രവർത്തിക്കുന്നില്ല.";
    }
});

// --- HELPER FUNCTIONS ---

// Stress-O-Meter Calculation
function calculateStress(text) {
    const words = text.split(/\s+/);
    // Logic: Words longer than 9 characters are usually jargon
    const complexWords = words.filter(word => word.length > 9).length;
    const score = Math.min((complexWords / words.length) * 100 * 1.5, 100);
    
    const bar = document.getElementById('stress-bar');
    bar.style.width = score + "%";
    
    // Color change based on stress
    if (score < 30) bar.style.background = "#2ecc71"; // Green
    else if (score < 60) bar.style.background = "#f1c40f"; // Yellow
    else bar.style.background = "#e74c3c"; // Red
}

// Malayalam Voice Output
// Malayalam Voice Output using Web Speech API
document.getElementById('speakBtn').addEventListener('click', () => {
    const mlText = document.getElementById('malayalamOutput').innerText;
    
    // 1. Check if we have text to speak
    if (!mlText || mlText.includes("പരിഭാഷപ്പെടുത്തുന്നു") || mlText === "...") return;

    // 2. The "Hack" URL - Use the 'tw-ob' client ID to bypass some blocks
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(mlText)}&tl=ml&client=tw-ob`;
    
    // 3. Play via an Audio object
    const audio = new Audio(url);
    audio.play().catch(e => {
        console.error("Audio failed. Your browser might still be blocking the external URL.", e);
        // Fallback to system TTS if the URL is blocked
        const utterance = new SpeechSynthesisUtterance(mlText);
        utterance.lang = 'ml-IN';
        window.speechSynthesis.speak(utterance);
    });
});