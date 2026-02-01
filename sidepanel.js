const API_KEY = "YOUR_GEMINI_API_KEY_HERE";

document.getElementById('simplifyBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;
    if (!text) return;

    // 1. Calculate Stress-O-Meter
    const words = text.split(/\s+/);
    const complex = words.filter(w => w.length > 8).length;
    const ratio = Math.min((complex / words.length) * 100 * 2, 100);
    const bar = document.getElementById('stress-bar');
    bar.style.width = ratio + "%";
    bar.style.background = ratio > 60 ? "#e74c3c" : ratio > 30 ? "#f1c40f" : "#2ecc71";

    // 2. Call Gemini API
    document.getElementById('englishOutput').innerText = "Thinking...";
    document.getElementById('malayalamOutput').innerText = "ചിന്തിക്കുന്നു...";

    const prompt = `Simplify this text for a 10-year-old. Provide only a JSON response with keys "english" and "malayalam". \nText: ${text}`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const rawResult = data.candidates[0].content.parts[0].text;
        const cleanedJson = JSON.parse(rawResult.replace(/```json|```/g, ""));

        document.getElementById('englishOutput').innerText = cleanedJson.english;
        document.getElementById('malayalamOutput').innerText = cleanedJson.malayalam;
    } catch (e) {
        document.getElementById('englishOutput').innerText = "Error simplifying text.";
    }
});

// 3. Malayalam Voice Output
document.getElementById('speakBtn').addEventListener('click', () => {
    const mlText = document.getElementById('malayalamOutput').innerText;
    // Native Google Malayalam TTS trick
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(mlText)}&tl=ml&client=tw-ob`;
    const audio = new Audio(url);
    audio.play();
});