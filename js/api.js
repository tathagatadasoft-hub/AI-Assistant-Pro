// ==========================================================
// AI Assistant Pro
// Gemini API
// ==========================================================

async function askAI(question) {

    try {

        console.log("Sending request to Gemini...");
        console.log(question);

        const response = await fetch(GEMINI_API_URL, {

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
                ],

                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048
                }

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

            throw new Error(
                "Gemini returned an empty response."
            );

        }

        const candidate = data.candidates[0];

        if (
            !candidate.content ||
            !candidate.content.parts ||
            candidate.content.parts.length === 0
        ) {

            throw new Error(
                "Gemini returned an invalid response."
            );

        }

        const answer = candidate.content.parts
            .map(part => part.text || "")
            .join("");

        return answer;

    }

    catch (error) {

        console.error(error);

        return "❌ " + error.message;

    }

}



// ==========================================
// Optional Connectivity Test
// ==========================================

async function testGemini() {

    const result = await askAI("Say Hello");

    console.log(result);

}
