// ======================================================
// AI Assistant Pro v2
// api.js
// ======================================================

// This file communicates with the Vercel backend.
// The Gemini API key is NEVER exposed in the browser.

// ===============================================
// Ask Gemini
// ===============================================

async function askGemini(question) {

    try {

        const response = await fetch(

            `${API_BASE}/api/chat`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    question: question

                })

            }

        );

        const data = await response.json();

        console.log("Backend Response:", data);

        if (!response.ok) {

            throw new Error(

                data.error ||

                "Backend Error"

            );

        }

        if (!data.answer) {

            throw new Error(

                "Empty response from server."

            );

        }

        return data.answer;

    }

    catch (error) {

        console.error(

            "API Error:",

            error

        );

        throw error;

    }

}
