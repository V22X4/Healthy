const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { ChatSection, Chat } = require("./models/chats"); // Import your ChatSection and Chat models

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  withCredentials: true,
};

app.use(cors(corsOptions));

// API endpoint for adding a chat to a chat section
app.post("/chatsection/:name/", async (req, res) => {
  const chatSectionName = req.params.name;
  const { text, role } = req.body;

  try {
    // Find the chat section by its ID
    const chatSection = await ChatSection.findOne({ sectionName: chatSectionName });

    if (!chatSection) {
      return res.status(404).json({ message: "Chat section not found" });
    }

    // Create a new chat
    const newChat = new Chat({ text, role });

    // Save the new chat
    await newChat.save();

    // Add the new chat to the chat section
    chatSection.chats.push(newChat);

    // Save the updated chat section
    await chatSection.save();

    return res.status(201).json({
      message: "Chat added to the chat section successfully",
      chatSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint for getting all IDs of chat sections
app.get("/chatsection", async (req, res) => {
  try {
    // Fetch all chat sections and extract their IDs
    const chatSections = await ChatSection.find({});
    const sectionNames = chatSections.map((section) => section.sectionName);

    return res.status(200).json({ sectionNames : sectionNames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint for getting all chats of a specific chat section
app.get("/chatsection/:sectionName", async (req, res) => {
  const chatSectionName = req.params.sectionName;

  try {
    // Find the chat section by its ID and populate its chats with content
    const chatSection = await ChatSection.findOne({ 
      sectionName: chatSectionName
    })
      .populate(
      "chats"
    );

    if (!chatSection) {
      return res.status(404).json({ message: "Chat section not found" });
    }

    return res.status(200).json({ chats: chatSection.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
