
const input = document.getElementById("message");
const chatBox = document.getElementById("chat-box");
const welcome = document.getElementById("welcome");
const sendButton = document.getElementById("send-button");

let messages = [];
let conversations = [];

function addMessage(role, text) {
    const row = document.createElement("div");

    row.className = "message " +
        (role === "user" ? "user-message" : "bot-message");

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = role === "user" ? "N" : "🤖";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    row.appendChild(avatar);
    row.appendChild(content);
    chatBox.appendChild(row);

    chatBox.scrollTop = chatBox.scrollHeight;

    return content;
}

async function sendMessage() {
    const message = input.value.trim();

    if (!message || sendButton.disabled) return;

    welcome.style.display = "none";

    addMessage("user", message);

    messages.push({
        role: "user",
        content: message
    });

    input.value = "";
    sendButton.disabled = true;

    const loading = addMessage("assistant", "Thinking...");

    try {
        const response = await fetch(CHAT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },
            body: JSON.stringify({
                messages: messages.slice(-12)
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Server error: ${response.status}`);
        }

        if (!data.reply) {
            throw new Error("The AI returned an empty response.");
        }

        loading.textContent = data.reply;

        messages.push({
            role: "assistant",
            content: data.reply
        });

        saveConversation(message);

    } catch (error) {
        console.error("Chat error:", error);
        loading.textContent = "Error: " + error.message;

    } finally {
        sendButton.disabled = false;
        input.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(
                cookie.substring(name.length + 1)
            );
        }
    }

    return "";
}

function newChat() {
    messages = [];
    chatBox.innerHTML = "";
    welcome.style.display = "block";
    input.value = "";
    input.focus();
}

function askSuggestion(text) {
    input.value = text;
    sendMessage();
}

function saveConversation(title) {
    if (messages.length === 2) {
        conversations.unshift({
            title: title,
            messages: [...messages]
        });
        renderHistory();
    } else if (conversations.length > 0) {
        conversations[0].messages = [...messages];
    }
}

function renderHistory() {
    const history = document.getElementById("history-list");
    history.innerHTML = "";

    conversations.forEach((conversation) => {
        const button = document.createElement("button");
        button.className = "history-item";
        button.textContent = "💬 " + conversation.title;

        button.onclick = () => {
            messages = [...conversation.messages];
            chatBox.innerHTML = "";
            welcome.style.display = "none";

            messages.forEach(item => {
                addMessage(item.role, item.content);
            });
        };

        history.appendChild(button);
    });
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

input.addEventListener("input", function() {
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
});

function toggleTheme() {
    document.body.classList.toggle("light-theme");
}
