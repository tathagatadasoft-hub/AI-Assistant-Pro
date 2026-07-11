// ===============================
// Gemini API
// ===============================

async function askGemini(question) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: question
                            }
                        ]
                    }
                ]
            })

        });

        const data = await response.json();

        console.log("Gemini Response:", data);

        if (!response.ok) {
            throw new Error(
                data.error?.message || "Gemini API Error"
            );
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("No response returned by Gemini.");
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {

        console.error(error);

        throw error;

    }

}
