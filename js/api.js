async function askGemini(question) {

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                question

            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(

                data.error ||

                "Unknown Error"

            );

        }

        return data.answer;

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}
