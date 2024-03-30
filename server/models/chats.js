const mongoose = require("mongoose");

// Define Schema for Chat
const chatSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Content of the chat
  role: { type: String, enum: ["user", "model"], required: true }, // Role of the sender (user or model)
  timestamp: { type: Date, default: Date.now }, // Timestamp of the chat message
});

// Define Schema for Chat Section
const chatSectionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique identifier for the chat section
  sectionName: { type: String, required: true }, // Name or identifier of the chat section
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // Array of chat IDs within the section
});

// Define Schema for Chatbot
const chatbotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique identifier for the chatbot
  chatSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatSection" }], // Array of chat sections
});

// Compile models from schemas
const Chat = mongoose.model("Chat", chatSchema);
const ChatSection = mongoose.model("ChatSection", chatSectionSchema);
const Chatbot = mongoose.model("Chatbot", chatbotSchema);

module.exports = { Chat, ChatSection, Chatbot };
