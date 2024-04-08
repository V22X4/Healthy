const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  text: { type: String, required: true },
  role: { type: String, enum: ["user", "model"], required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSectionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sectionName: { type: String, required: true },
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

const chatbotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  chatSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "ChatSection" }],
});

const Chat = mongoose.model("Chat", chatSchema);
const ChatSection = mongoose.model("ChatSection", chatSectionSchema);
const Chatbot = mongoose.model("Chatbot", chatbotSchema);

module.exports = { Chat, ChatSection, Chatbot };
