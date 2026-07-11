// ===============================
// Gemini API
// ===============================

async function askGemini(question) {

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

    console.log(data);

    if (!response.ok) {

        throw new Error(

            data.error?.message ||

            "Gemini API Error"

        );

    }

    return data.candidates[0].content.parts[0].text;

}

        const data = await response.json();

        console.log("Gemini Response:", data);

        if (!response.ok) {

            throw new Error(

                data.error?.message ||

                "Gemini request failed."

            );

        }

        if (
            !data.candidates ||
            !data.candidates.length
        ) {

            throw new Error(
                "No response returned by Gemini."
            );

        }

        return data.candidates[0]
            .content
            .parts[0]
            .text;

    }

    catch (error) {

        console.error(error);

        return `❌ ${error.message}`;

    }

}
