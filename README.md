# 🤖 AI Chatbot – Django & Ollama

An AI-powered chatbot built using Python, Django, HTML, CSS, JavaScript, and Ollama. It provides an interactive chat interface and generates responses using a locally running Large Language Model (LLM).

## ✨ Features

- Modern and responsive chatbot interface
- Real-time AI conversation
- Local AI responses using Ollama
- Chat history interface
- New Chat functionality
- Light and dark theme toggle
- Suggested prompts for Python, Django, career guidance, and more
- Django backend with JSON-based chat API

## 🛠️ Technologies Used

- **Backend:** Python, Django
- **Frontend:** HTML, CSS, JavaScript
- **AI Integration:** Ollama
- **AI Model:** Llama 3.2 (1B)
- **Database:** SQLite (Django default)

## 📁 Project Structure

```text
AI_Chatbot/
│
├── chatbot/
│   ├── static/
│   │   └── chatbot/
│   │       ├── style.css
│   │       └── script.js
│   ├── templates/
│   │   └── chatbot/
│   │       └── index.html
│   ├── views.py
│   ├── urls.py
│   └── ...
│
├── chatbot_project/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── manage.py
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/nandhinimanivella3/AI-Chatbot-Django.git
cd AI-Chatbot-Django
```

### 2. Create and activate a virtual environment

Windows PowerShell:

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install django ollama
```

### 4. Install Ollama

Download Ollama from:

https://ollama.com/download

Pull the AI model:

```powershell
ollama pull llama3.2:1b
```

Make sure the Ollama application/server is running.

### 5. Apply Django migrations

```powershell
python manage.py migrate
```

### 6. Start the Django server

```powershell
python manage.py runserver
```

Open the application:

http://127.0.0.1:8000/

## 🧠 How It Works

1. The user enters a message in the chatbot interface.
2. JavaScript sends the conversation to the Django backend.
3. Django processes the request and communicates with Ollama.
4. The locally running Llama model generates a response.
5. Django returns the response to the frontend.
6. The chatbot displays the AI-generated answer.

## 🔒 Privacy

The chatbot uses a locally running Ollama model for AI responses. No OpenAI API key is required.

## 🚀 Future Improvements

- User authentication
- Persistent chat history
- Markdown-formatted AI responses
- Code syntax highlighting
- Chat export functionality
- Deployment to a cloud platform

## 👩‍💻 Author

**Nandhini Manivela**

AI Chatbot Project | Python Full Stack Development
