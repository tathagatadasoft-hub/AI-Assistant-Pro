// ==========================================
// AI Assistant Pro
// app.js
// ==========================================

// Chat Elements
const chatContainer = document.getElementById("chatContainer");
const sendButton = document.getElementById("send");
const promptInput = document.getElementById("prompt");
const newChatButton = document.getElementById("newChat");

// Chat History
let messages = [];

// ------------------------------------------
// Initialize
// ------------------------------------------

window.onload = () => {

    promptInput.focus();

};

// ------------------------------------------
// Remove Welcome Screen
// ------------------------------------------

function removeWelcome() {

    const welcome = document.querySelector(".welcome");

    if (welcome) {

        welcome.remove();

    }

}

// ------------------------------------------
// Scroll To Bottom
// ------------------------------------------

function scrollBottom() {

    chatContainer.scrollTop = chatContainer.scrollHeight;

}

// ------------------------------------------
// Create Bubble
// ------------------------------------------

function createBubble(role, text) {

    removeWelcome();

    const wrapper = document.createElement("div");

    wrapper.className = `message ${role}`;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    if (ENABLE_MARKDOWN) {

        bubble.innerHTML = marked.parse(text);

    }

    else {

        bubble.innerText = text;

    }

    wrapper.appendChild(bubble);

    chatContainer.appendChild(wrapper);

    if (ENABLE_CODE_HIGHLIGHT) {

        document.querySelectorAll("pre code").forEach((el) => {

            hljs.highlightElement(el);

        });

    }

    scrollBottom();

}
// ------------------------------------------
// Typing Indicator
// ------------------------------------------

function showTyping() {

    const wrapper = document.createElement("div");

    wrapper.className = "message ai";

    wrapper.id = "typingIndicator";

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

    scrollBottom();

}

function hideTyping() {

    const typing = document.getElementById("typingIndicator");

    if (typing) {

        typing.remove();

    }

}

// ------------------------------------------
// Disable / Enable Send Button
// ------------------------------------------

function setLoading(isLoading) {

    sendButton.disabled = isLoading;

    if (isLoading) {

        sendButton.innerText = "Thinking...";

    }

    else {

        sendButton.innerText = "Send";

    }

}

// ------------------------------------------
// Add Message To History
// ------------------------------------------

function saveMessage(role, text) {

    messages.push({

        role,

        text,

        time: new Date().toLocaleTimeString()

    });

}

// ------------------------------------------
// Send Message
// ------------------------------------------

async function sendMessage() {

    const question = promptInput.value.trim();

    if (question.length === 0) {

        return;

    }

    createBubble("user", question);

    saveMessage("user", question);
    saveHistory();
    promptInput.value = "";

    setLoading(true);

    showTyping();

    try {

        const answer = await askGemini(question);

        hideTyping();

        createBubble("ai", answer);

        saveMessage("ai", answer);
        saveHistory();
    }

    catch (error) {

        hideTyping();

        createBubble(

            "ai",

            "❌ " + error.message

        );

    }

    setLoading(false);

    promptInput.focus();

}
// ------------------------------------------
// New Chat
// ------------------------------------------

function newChat() {

    messages = [];

    chatContainer.innerHTML = `

        <div class="welcome">

            <h1>Hello 👋</h1>

            <p>

                ${WELCOME_MESSAGE}

            </p>

        </div>

    `;

    promptInput.value = "";

    promptInput.focus();

}

// ------------------------------------------
// Enter Key Support
// ------------------------------------------

promptInput.addEventListener("keydown", function (event) {

    if (

        event.key === "Enter" &&

        !event.shiftKey

    ) {

        event.preventDefault();

        sendMessage();

    }

});

// ------------------------------------------
// Send Button
// ------------------------------------------

sendButton.addEventListener(

    "click",

    sendMessage

);

// ------------------------------------------
// New Chat Button
// ------------------------------------------

if (newChatButton) {

    newChatButton.addEventListener(

        "click",

        newChat

    );

}

// ------------------------------------------
// Save Chat History
// ------------------------------------------

function saveHistory() {

    localStorage.setItem(

        "gemini_chat_history",

        JSON.stringify(messages)

    );

}

// ------------------------------------------
// Load Chat History
// ------------------------------------------

function loadHistory() {

    const history = localStorage.getItem(

        "gemini_chat_history"

    );

    if (!history) {

        return;

    }

    messages = JSON.parse(history);

    if (messages.length === 0) {

        return;

    }

    removeWelcome();

    messages.forEach(message => {

        createBubble(

            message.role,

            message.text

        );

    });

}
// ==========================================
// Part 4
// Final Initialization
// ==========================================

// ------------------------------------------
// Clear Chat History
// ------------------------------------------

function clearHistory() {

    localStorage.removeItem("gemini_chat_history");

    messages = [];

    newChat();

}

// ------------------------------------------
// Escape HTML
// ------------------------------------------

function escapeHTML(text) {

    const div = document.createElement("div");

    div.innerText = text;

    return div.innerHTML;

}

// ------------------------------------------
// Auto Resize Textarea
// ------------------------------------------

promptInput.addEventListener("input", () => {

    promptInput.style.height = "70px";

    promptInput.style.height =
        promptInput.scrollHeight + "px";

});

// ------------------------------------------
// Initial Welcome Message
// ------------------------------------------

function initializeApp() {

    document.title = APP_NAME;

    loadHistory();

    if (messages.length === 0) {

        chatContainer.innerHTML = `

            <div class="welcome">

                <h1>Hello 👋</h1>

                <p>

                    ${WELCOME_MESSAGE}

                </p>

            </div>

        `;

    }

    promptInput.focus();

}

// ------------------------------------------
// Start App
// ------------------------------------------

initializeApp();

console.log(`${APP_NAME} ${APP_VERSION} Loaded Successfully`);
