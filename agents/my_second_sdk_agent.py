from flask import Flask, request, jsonify
from flask_cors import CORS
from uagents.crypto import Identity
from fetchai import fetch
from fetchai.registration import register_with_agentverse
from fetchai.communication import parse_message_from_agent, send_message_to_agent
import logging
import os
from dotenv import load_dotenv
import requests
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
app = Flask(__name__)
CORS(app)

# Initialising client identity to get registered on agentverse
client_identity = None 
agent_response = None

# Function to register agent
def init_client():
    """Initialize and register the client agent."""
    global client_identity
    try:
        # Load the agent secret key from environment variables
        client_identity = Identity.from_seed(os.getenv("AGENT_SECRET_KEY_2"), 0)
        logger.info(f"Client agent started with address: {client_identity.address}")

        readme = """
            ![domain:innovation-lab](https://img.shields.io/badge/innovation--lab-3D8BD3)
            domain:domain-of-your-agent

            <description>This Agent can send a message to another agent in string format and interact with a Gemini chatbot.</description>
            <use_cases>
                <use_case>To send a message to another agent.</use_case>
                <use_case>To interact with a Gemini chatbot through another agent.</use_case>
            </use_cases>
            <payload_requirements>
            <description>This agent can send a message in the text format.</description>
            <payload>
                <requirement>
                    <parameter>message</parameter>
                    <description>The agent can send a message to another agent.</description>
                </requirement>
            </payload>
            </payload_requirements>
        """

        # Register the agent with Agentverse
        register_with_agentverse(
            identity=client_identity,
            url="http://localhost:5005/api/webhook",
            agentverse_token=os.getenv("AGENTVERSE_API_KEY"),
            agent_title="Quickstart Agent 2",
            readme=readme
        )

        logger.info("Quickstart agent registration complete!")

    except Exception as e:
        logger.error(f"Initialization error: {e}")
        raise


@app.route('/api/send-data', methods=['POST'])
def send_data():
   """Send payload to the selected agent based on provided address."""
   global agent_response
   agent_response = None

   try:
       # Parse the request payload
       data = request.json
       payload = data.get('payload')  # Extract the payload dictionary
       agent_address = data.get('agentAddress')  # Extract the agent address

       # Validate the input data
       if not payload or not agent_address:
           return jsonify({"error": "Missing payload or agent address"}), 400

       logger.info(f"Sending payload to agent: {agent_address}")
       logger.info(f"Payload: {payload}")

       # Send the payload to the specified agent
       send_message_to_agent(
           client_identity,  # Frontend client identity
           agent_address,    # Agent address where we have to send the data
           payload           # Payload containing the data
       )

       return jsonify({"status": "request_sent", "agent_address": agent_address, "payload": payload})

   except Exception as e:
       logger.error(f"Error sending data to agent: {e}")
       return jsonify({"error": str(e)}), 500

# Route to interact with the Gemini chatbot through the first agent
@app.route('/api/ask-gemini', methods=['POST'])
def ask_gemini():
    """Send a prompt to the first agent's Gemini chatbot and get a response"""
    try:
        data = request.json
        prompt = data.get('prompt')
        user_id = data.get('user_id')
        
        # If no user_id is provided, generate one
        if not user_id:
            user_id = str(uuid.uuid4())
            logger.info(f"Generated new user_id: {user_id}")
        else:
            logger.info(f"Using provided user_id: {user_id}")
        
        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400
        
        logger.info(f"Sending prompt to Gemini chatbot for user {user_id}: {prompt}")
        
        # Log the full request payload
        request_payload = {"prompt": prompt, "user_id": user_id}
        logger.info(f"Request payload to first agent: {request_payload}")
        
        # Send request to the first agent's chatbot endpoint with user_id
        response = requests.post(
            "http://localhost:5002/api/chatbot",
            json=request_payload
        )
        
        if response.status_code != 200:
            logger.error(f"Error from chatbot: {response.text}")
            return jsonify({"error": "Failed to get response from chatbot"}), 500
        
        chatbot_response = response.json()
        logger.info(f"Received response from chatbot for user {user_id}: {chatbot_response}")
        
        return jsonify({
            "status": "success",
            "user_id": user_id,
            "response": chatbot_response.get("response"),
            "mood": chatbot_response.get("mood", "happy")
        })
        
    except Exception as e:
        logger.error(f"Error in ask-gemini: {e}")
        return jsonify({"error": str(e)}), 500

# New route to get chat history for a specific user
@app.route('/api/chat-history/<user_id>', methods=['GET'])
def get_chat_history(user_id):
    """Get chat history for a specific user from the first agent"""
    try:
        # Forward the request to the first agent
        response = requests.get(f"http://localhost:5002/api/chat-history/{user_id}")
        
        if response.status_code != 200:
            logger.error(f"Error fetching chat history: {response.text}")
            return jsonify({"error": "Failed to get chat history"}), 500
            
        return jsonify(response.json())
        
    except Exception as e:
        logger.error(f"Error fetching chat history: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    load_dotenv()   # Load environment variables
    init_client()   #Register your Agent on Agentverse
    app.run(host="0.0.0.0", port=5005)