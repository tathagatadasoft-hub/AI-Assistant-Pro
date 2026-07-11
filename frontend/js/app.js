// ======================================================
// AI Assistant Pro v2
// app.js
// ======================================================

// Elements

const chatContainer =
document.getElementById("chatContainer");

const promptInput =
document.getElementById("prompt");

const sendButton =
document.getElementById("send");

const newChatButton =
document.getElementById("newChat");

const historyContainer =
document.getElementById("history");

// Current Chat

let chatHistory = [];

// ==========================================
// Initialize
// ==========================================

document.title =
APP_NAME;

window.onload = () => {

    promptInput.focus();

};

// ==========================================
// Auto Resize Textarea
// ==========================================

promptInput.addEventListener("input", () => {

    promptInput.style.height = "auto";

    promptInput.style.height =
        promptInput.scrollHeight + "px";

});

// ==========================================
// Enter to Send
// ==========================================

promptInput.addEventListener("keydown", async (e) => {

    if (

        e.key === "Enter" &&

        !e.shiftKey

    ) {

        e.preventDefault();

        sendMessage();

    }

});

// ==========================================
// Send Button
// ==========================================

sendButton.addEventListener(

    "click",

    sendMessage

);

// ==========================================
// New Chat
// ==========================================

newChatButton.addEventListener(

    "click",

    clearChat

);

// ==========================================
// Send Message
// ==========================================

async function sendMessage() {

    const question =
        promptInput.value.trim();

    if (!question) {

        return;

    }

    addUserMessage(question);

    promptInput.value = "";

    promptInput.style.height = "58px";

    showTyping();

    sendButton.disabled = true;

    try {

        const answer =
            await askGemini(question);

        removeTyping();

        addAssistantMessage(answer);

        saveChat(question, answer);

    }

    catch (error) {

        removeTyping();

        addAssistantMessage(

            "❌ " + error.message

        );

    }

    finally {

        sendButton.disabled = false;

        promptInput.focus();

    }

}
// ==========================================
// Add User Message
// ==========================================

function addUserMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message user";

    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    bubble.textContent = text;

    wrapper.appendChild(bubble);

    chatContainer.appendChild(wrapper);

    scrollToBottom();

}

// ==========================================
// Add AI Message
// ==========================================

function addAssistantMessage(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message assistant";

    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    if (ENABLE_MARKDOWN) {

        bubble.innerHTML =
            marked.parse(text);

    }
    else {

        bubble.textContent =
            text;

    }

    wrapper.appendChild(bubble);

    chatContainer.appendChild(wrapper);

    if (

        ENABLE_CODE_HIGHLIGHT &&

        window.hljs

    ) {

        bubble.querySelectorAll("pre code")
            .forEach((block) => {

                hljs.highlightElement(block);

            });

    }

    scrollToBottom();

}

// ==========================================
// Typing Indicator
// ==========================================

function showTyping() {

    removeTyping();

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message assistant";

    wrapper.id =
        "typingMessage";

    wrapper.innerHTML = `

<div class="bubble">

<div class="typing">

<span></span>

<span></span>

<span></span>

</div>

</div>

`;

    chatContainer.appendChild(wrapper);

    scrollToBottom();

}

// ==========================================
// Remove Typing
// ==========================================

function removeTyping() {

    const typing =
        document.getElementById("typingMessage");

    if (typing) {

        typing.remove();

    }

}

// ==========================================
// Scroll
// ==========================================

function scrollToBottom() {

    if (!AUTO_SCROLL)
        return;

    chatContainer.scrollTop =
        chatContainer.scrollHeight;

}
// ==========================================
// Save Chat
// ==========================================

function saveChat(question, answer) {

    chatHistory.push({

        question,

        answer,

        time: new Date().toLocaleString()

    });

    if (

        chatHistory.length >

        MAX_HISTORY

    ) {

        chatHistory.shift();

    }

    localStorage.setItem(

        "aiChatHistory",

        JSON.stringify(chatHistory)

    );

    renderHistory();

}

// ==========================================
// Load Chat History
// ==========================================

function loadHistory() {

    const data = localStorage.getItem(

        "aiChatHistory"

    );

    if (!data)
        return;

    chatHistory = JSON.parse(data);

    renderHistory();

}

// ==========================================
// Render Sidebar History
// ==========================================

function renderHistory() {

    historyContainer.innerHTML = "";

    [...chatHistory]

        .reverse()

        .forEach((chat) => {

            const item =

                document.createElement("div");

            item.className =

                "history-item";

            item.innerHTML = `

<strong>

${chat.question.substring(0,35)}

</strong>

`;

            item.onclick = () => {

                chatContainer.innerHTML = "";

                addUserMessage(

                    chat.question

                );

                addAssistantMessage(

                    chat.answer

                );

            };

            historyContainer.appendChild(item);

        });

}

// ==========================================
// Clear Chat
// ==========================================

function clearChat() {

    if (

        !confirm(

            "Start a new chat?"

        )

    ) {

        return;

    }

    chatContainer.innerHTML = `

<div class="welcome">

<h1>

Hello 👋

</h1>

<p>

I'm powered by Google Gemini.

</p>

<p>

Ask me anything.

</p>

</div>

`;

    promptInput.value = "";

    promptInput.focus();

}

// ==========================================
// Initialize
// ==========================================

loadHistory();

console.log(

    APP_NAME,

    APP_VERSION,

    "Loaded Successfully"

);
