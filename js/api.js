// ==========================================================
// AI Assistant Pro
// Frontend API
// ==========================================================

// Ask Gemini AI
async function askGemini(question) {

    try {

        const response = await fetch(`${API_BASE}/api/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        console.log("Response:", data);

        if (!response.ok) {

            throw new Error(
                data.error || "Unknown server error."
            );

        }

        return data.answer;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}
