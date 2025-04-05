"use server"

// This is a mock implementation of the Gemini API integration
// In a real application, you would use the actual Gemini API client

export async function generateChatResponse(messages: any[]) {
  // In a real implementation, this would call the Gemini API with the provided API key
  // const apiKey = "AIzaSyBvIEb59ECl1PDVBShPGWKsteBODB2usfE";

  // For the mockup, we'll return a predefined response
  const responses = [
    "I can help you file a new claim! Just provide some basic details about the incident and upload any relevant documentation.",
    "Our blockchain verification ensures that all your data is securely stored and every step of the verification process is transparent.",
    "The smart contract automatically checks your policy coverage and triggers payment when the claim is verified.",
    "Swift Claim uses blockchain to create an immutable record of your claim, preventing fraud and ensuring transparency.",
    "Your claim is being processed through our secure blockchain network. You'll receive updates in real-time as it progresses.",
  ]

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a random response
  return {
    text: responses[Math.floor(Math.random() * responses.length)],
    status: "success",
  }
}

export async function getSystemPrompt() {
  return `You are Claim Saathi, an AI assistant for Swift Claim - a blockchain-powered insurance claims platform.

Your primary goals are to:
1. Help users understand how to file and track insurance claims
2. Explain the blockchain verification process in simple terms
3. Guide users through the onboarding process
4. Answer questions about insurance policies and coverage
5. Provide updates on claim status when requested

Always be helpful, friendly, and concise in your responses. If you don't know something, admit it and offer to connect the user with a human agent.

When explaining blockchain technology, avoid technical jargon and focus on the benefits: security, transparency, faster processing, and fraud prevention.`
}

