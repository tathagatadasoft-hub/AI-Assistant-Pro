// =========================
// AI Assistant Pro
// app.js
// =========================

const chatContainer = document.getElementById("chatContainer");
const sendButton = document.getElementById("send");
const promptBox = document.getElementById("prompt");

function removeWelcome() {
    const welcome = document.querySelector(".welcome");
    if (welcome) {
        welcome.remove();
    }
}

function scrollBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addMessage(role, text) {

    removeWelcome();

    const wrapper = document.createElement("div");
    wrapper.className = "message " + role;

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    bubble.innerHTML = marked.parse(text);

    wrapper.appendChild(bubble);

    chatContainer.appendChild(wrapper);

    document.querySelectorAll("pre code").forEach(el => {
        hljs.highlightElement(el);
    });

    scrollBottom();
}

function showTyping() {

    const wrapper = document.createElement("div");

    wrapper.className = "message ai";
    wrapper.id = "typing";

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

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }

}

async function sendMessage() {

    const question = promptBox.value.trim();

    if (!question) return;

    addMessage("user", question);

    promptBox.value = "";

    sendButton.disabled = true;

    showTyping();

    try {

        const answer = await askGemini(question);

        hideTyping();

        addMessage("ai", answer);

    } catch (err) {

        hideTyping();

        addMessage("ai", "❌ " + err.message);

    }

    sendButton.disabled = false;

    promptBox.focus();

}

sendButton.addEventListener("click", sendMessage);

promptBox.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {

        e.preventDefault();

        sendMessage();

    }

});
