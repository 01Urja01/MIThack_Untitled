from flask import Flask, request, jsonify
from flask_cors import CORS
from uagents.crypto import Identity
from fetchai import fetch
from fetchai.registration import register_with_agentverse
from fetchai.communication import parse_message_from_agent, send_message_to_agent
import logging
import os
from dotenv import load_dotenv
import google.generativeai as genai
import uuid
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)

# Initialize Gemini model
gemini_model = None

# Dictionary to store user chat histories
user_contexts = {}

# Initialising client identity to get registered on agentverse
client_identity = None 
agent_response = None

# System prompt for SwiftClaim assistant
SYSTEM_PROMPT = """You are Claim Saathi, an AI assistant for Swift Claim - an insurance claims processing platform.

Your personality:
- Friendly and empathetic
- Professional but approachable
- Expert in insurance claims
- Uses simple language, avoiding jargon
- Keeps responses concise (2-3 sentences max)

Your capabilities:
- Guide users through claim filing process
- Explain insurance terms simply
- Check claim status
- Provide policy information
- Help with document requirements
- Offer claim processing estimates

When responding:
1. Be empathetic to user concerns
2. Give clear, actionable steps
3. Use positive language
4. Maintain a helpful tone
5. If unsure, ask for clarification

Current conversation context: Insurance claims assistance"""

# Dictionary to determine the mood based on response content
def get_mood_from_content(content):
    """Determine the mood based on response content"""
    lowerContent = content.lower()
    if "sorry" in lowerContent or "unfortunately" in lowerContent:
        return "grumpy"
    if "great" in lowerContent or "approved" in lowerContent:
        return "excited"
    if "help" in lowerContent or "guide" in lowerContent:
        return "winking"
    if "error" in lowerContent or "invalid" in lowerContent:
        return "angry"
    if "processing" in lowerContent or "checking" in lowerContent:
        return "neutral"
    if "success" in lowerContent or "completed" in lowerContent:
        return "dancing"
    return "happy"

# Function to register agent
def init_client():
    """Initialize and register the client agent."""
    global client_identity, gemini_model
    try:
        # Load the agent secret key from environment variables
        client_identity = Identity.from_seed(os.getenv("AGENT_SECRET_KEY_1"), 0)
        logger.info(f"Client agent started with address: {client_identity.address}")

        # Initialize Gemini
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        gemini_model = genai.GenerativeModel('gemini-2.0-flash')
        logger.info("Gemini model initialized")

        readme = """
            ![domain:innovation-lab](https://img.shields.io/badge/innovation--lab-3D8BD3)
            domain:domain-of-your-agent

            <description>This Agent can receive a message from another agent in string format and respond using Gemini AI.</description>
            <use_cases>
                <use_case>To receive a message from another agent and respond with AI-generated content.</use_case>
            </use_cases>
            <payload_requirements>
            <description>This agent requires a message in the text format.</description>
            <payload>
                <requirement>
                    <parameter>message</parameter>
                    <description>The agent can receive any kind of message.</description>
                </requirement>
            </payload>
            </payload_requirements>
        """
        

        # Register the agent with Agentverse
        register_with_agentverse(
            identity=client_identity,
            url="http://localhost:5002/api/webhook",
            agentverse_token=os.getenv("AGENTVERSE_API_KEY"),
            agent_title="Quickstart Agent 1",
            readme=readme
        )

        logger.info("Quickstart agent registration complete!")

    except Exception as e:
        logger.error(f"Initialization error: {e}")
        raise

# app route to recieve the messages from other agents
@app.route('/api/webhook', methods=['POST'])
def webhook():
    """Handle incoming messages"""
    global agent_response
    try:
        # Parse the incoming webhook message
        data = request.get_data().decode("utf-8")
        logger.info("Received response")

        message = parse_message_from_agent(data)
        agent_response = message.payload

        logger.info(f"Processed response: {agent_response}")
        return jsonify({"status": "success"})

    except Exception as e:
        logger.error(f"Error in webhook: {e}")
        return jsonify({"error": str(e)}), 500

# Route to handle chatbot requests
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Handle chatbot requests using Gemini"""
    try:
        data = request.json
        prompt = data.get('prompt')
        user_id = data.get('user_id')
        
        # If no user_id is provided, generate one
        if not user_id:
            user_id = str(uuid.uuid4())
            
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400
        
        logger.info(f"Received chatbot prompt from user {user_id}: {prompt}")
        
        # Initialize context for new users
        if user_id not in user_contexts:
            logger.info(f"Creating new context for user {user_id}")
            user_contexts[user_id] = {
                "history": [],
                "created_at": datetime.now().isoformat(),
                "last_interaction": datetime.now().isoformat()
            }
        else:
            logger.info(f"Found existing context for user {user_id} with {len(user_contexts[user_id]['history'])} previous messages")
            
        # Debug all existing contexts
        logger.info(f"All user_ids in context: {list(user_contexts.keys())}")
        
        # Update last interaction time
        user_contexts[user_id]["last_interaction"] = datetime.now().isoformat()
        
        # Add the current prompt to history
        user_contexts[user_id]["history"].append({"role": "user", "content": prompt})
        logger.info(f"Added user prompt to history. New history length: {len(user_contexts[user_id]['history'])}")
        
        # Build context string from history
        context_string = ""
        for entry in user_contexts[user_id]["history"][-10:]:
            role_label = "user" if entry["role"] == "user" else "Claim Saathi"
            context_string += f"{role_label}: {entry['content']}\n"
        
        logger.info(f"Built context string:\n{context_string}")
        
        # Generate response using Gemini with system prompt and context
        full_prompt = f"{SYSTEM_PROMPT}\n\n{context_string}\n\nClaim Saathi:"
        logger.info(f"Sending full prompt to Gemini:\n{full_prompt}")
        
        response = gemini_model.generate_content(full_prompt)
        response_text = response.text
        
        # Determine mood based on response
        mood = get_mood_from_content(response_text)
        
        # Add the response to history
        user_contexts[user_id]["history"].append({"role": "model", "content": response_text})
        logger.info(f"Added bot response to history. New history length: {len(user_contexts[user_id]['history'])}")
        
        logger.info(f"Generated response for user {user_id}: {response_text}")
        
        return jsonify({
            "status": "success",
            "user_id": user_id,
            "response": response_text,
            "mood": mood
        })
        
    except Exception as e:
        logger.error(f"Error in chatbot: {e}")
        return jsonify({"error": str(e)}), 500

# New route to get a user's chat history
@app.route('/api/chat-history/<user_id>', methods=['GET'])
def get_chat_history(user_id):
    """Get the chat history for a specific user"""
    if user_id not in user_contexts:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "status": "success",
        "user_id": user_id,
        "history": user_contexts[user_id]["history"]
    })

if __name__ == "__main__":
    load_dotenv()       # Load environment variables
    init_client()       #Register your agent on Agentverse
    app.run(host="0.0.0.0", port=5002)      