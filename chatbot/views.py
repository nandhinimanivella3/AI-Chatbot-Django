
import json
import ollama

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token


def home(request):
    get_token(request)
    return render(request, "chatbot/index.html")


@require_POST
def chat_api(request):
    try:
        data = json.loads(request.body)
        messages = data.get("messages", [])

        if not isinstance(messages, list) or not messages:
            return JsonResponse(
                {"error": "Please enter a message."},
                status=400
            )

        safe_messages = []

        for item in messages[-12:]:
            if not isinstance(item, dict):
                continue

            role = item.get("role")
            content = item.get("content")

            if role not in ["user", "assistant"]:
                continue

            if not isinstance(content, str) or not content.strip():
                continue

            safe_messages.append({
                "role": role,
                "content": content[:4000]
            })

        if not safe_messages or safe_messages[-1]["role"] != "user":
            return JsonResponse(
                {"error": "Invalid conversation."},
                status=400
            )

        response = ollama.chat(
            model="llama3.2:1b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful AI assistant. "
                        "Give clear and friendly answers. "
                        "Explain programming concepts for beginners."
                    )
                },
                *safe_messages
            ]
        )

        reply = response["message"]["content"]

        return JsonResponse({"reply": reply})

    except Exception as e:
        print("Ollama error:", str(e))

        return JsonResponse(
            {"error": "Unable to connect to local AI. Make sure Ollama is running."},
            status=500
        )
