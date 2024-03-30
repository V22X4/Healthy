const { Chat, ChatSection, Chatbot } = require("./models/chats"); // Import your Chat and ChatSection models
const mongoose = require('mongoose');

const insertAllChatsIntoAllSections = async () => {
  try {
    // Fetch all chat sections from the chat section database
    // // const section = await ChatSection.findOne({ sectionName : "simple convo" });
    // console.log(ChatSection)
    // return;
    // Fetch all chats from the chat database
    // const allChats = await Chat.find();
    // const allSections = await ChatSection.find();
    // // Iterate over each chat section
    // for (const section of allSections) {
    //   // Insert each chat into the current chat section
    //   for (const chat of allChats) {
    //     // Push the chat's ObjectId into the current chat section's chats array
    //     section.chats.push(chat._id);
    //   }
    //   // Save the updated chat section
    //   await section.save();
    // }

    const allSections = await ChatSection.find();

    // Find all chatbots
    const allChatbots = await Chatbot.find();

    // Iterate over each chatbot
    for (const chatbot of allChatbots) {
      // Add each chat section to the current chatbot
      for (const section of allSections) {
        chatbot.chatSections.push(section._id);
      }
      // Save the updated chatbot
      await chatbot.save();
    }

    return { success: true, message: 'All chats inserted into all chat sections successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

module.exports =insertAllChatsIntoAllSections;


