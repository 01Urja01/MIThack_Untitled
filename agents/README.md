# Gemini Chatbot with Fetch.ai Agents

This project demonstrates how to create a Gemini-powered chatbot using Fetch.ai agents. It consists of two agents:

1. **First Agent (my_first_sdk_agent.py)**: Implements a Gemini chatbot that can receive prompts and generate responses.
2. **Second Agent (my_second_sdk_agent.py)**: Provides an interface to send prompts to the first agent's chatbot and receive responses.

## Setup

1. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Create a `.env` file with the following variables:
   ```
   AGENT_SECRET_KEY_1=your_first_agent_secret_key
   AGENT_SECRET_KEY_2=your_second_agent_secret_key
   AGENTVERSE_API_KEY=your_agentverse_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

## Running the Agents

1. Start the first agent (Gemini chatbot):
   ```
   python my_first_sdk_agent.py
   ```
   This will run on http://localhost:5002

2. Start the second agent (Interface):
   ```
   python my_second_sdk_agent.py
   ```
   This will run on http://localhost:5005

## Using the Chatbot

You can interact with the Gemini chatbot through the second agent by sending a POST request to:
```
http://localhost:5005/api/ask-gemini
```

With a JSON payload:
```json
{
  "prompt": "Your question or prompt here"
}
```

The response will be in the format:
```json
{
  "status": "success",
  "response": "The Gemini-generated response"
}
```

## Architecture

- The first agent (port 5002) hosts the Gemini chatbot and exposes an API endpoint at `/api/chatbot`.
- The second agent (port 5005) provides an interface to interact with the chatbot and exposes an API endpoint at `/api/ask-gemini`.
- When a request is sent to the second agent, it forwards the prompt to the first agent, which uses Gemini to generate a response.
- The response is then returned to the client through the second agent. 


![tag : innovationlab]
(https://img.shields.io/badge/innovationlab-3D8BD3)