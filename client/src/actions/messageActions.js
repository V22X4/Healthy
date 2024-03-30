// // actions.js

import trainingPrompt from "../utils/trainingPrompt";

import { updateSection as UPDATE_SECTION } from "../reducers/messageReducers";


const GEMINI_API_KEY = process.env.REACT_APP_PUBLIC_GEMINI_API;
const openAiAPI = process.env.REACT_APP_PUBLIC_OPENAI_API;
// console.log(GEMINI_API_KEY);
// console.log(process.env)


const transformMessages = (messages) => {
    return messages.map(message => ({
        role: message.role,
        parts: [{
            text: message.text
        }]
    }));
};


const fetchChatsBySectionName = async (sectionName, dispatch) => {
    try {
        const response = await fetch(`http://localhost:1234/chatsection/${sectionName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch section names');
        }
        const data = await response.json();
        dispatch({ type: 'SET_CHATS', payload: data.chats });
        // console.log(data.chats, "bgghggghhg")
        return data.chats;
      } catch (error) {
        console.error(error);
        return [];
      }
};



const fetchSectionNames = async () => {
    try {
      const response = await fetch('http://localhost:1234/chatsection');
      if (!response.ok) {
        throw new Error('Failed to fetch section names');
      }
        const data = await response.json();
      return data.sectionNames;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

const addMessageToSection = async (sectionName, message, role) => {
    try {
      const response = await fetch(`http://localhost:1234/chatsection/${sectionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: message, role: role })
      });
      if (!response.ok) {
        throw new Error(`Failed to add message to chat section ${sectionName}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

const ChatGPT = async(allMessages, message) => {
    // console.log(message)
    const url = "https://api.openai.com/v1/chat/completions"

    const token = `Bearer ${openAiAPI}`
    const model = 'gpt-3.5-turbo'

    const messagesToSend = [
        ...allMessages,
        {
            role: 'user',
            content: message
        }
    ]

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            messages: messagesToSend
        })
    })
    const resjson = await res.json()
    if (resjson) {
        return resjson.choices[0].message
    }
}

const Gemini = async (allMessages, message, sectionName) => {

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=` + GEMINI_API_KEY

    // console.log(allMessages)

    allMessages = transformMessages(allMessages);

    // console.log(allMessages, "transformed messages")
   

    const messagesToSend = [
        {
            "role": "user",
            "parts": [{
                "text": `You are a ${sectionName}, act like one`
            }],
        },
        {
            "role": "model",
            "parts": [{
                "text": "sure, I will help you with that"
            }],
        },
        ...allMessages,
    ]


    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contents": messagesToSend
        })
    })


    const resjson = await res.json()

    const responseMessage = resjson.candidates[0].content.parts[0].text

    // console.log(responseMessage)

    return responseMessage;

}

const sendMessage = async (message, sectionName, dispatch) => {
    let res_chat;
    let modelres;

    await addMessageToSection(sectionName, message, "user");

    await Promise.all([
        fetchChatsBySectionName(sectionName, dispatch).then(async (allMessages_) => {
            res_chat = allMessages_;
            // console.log(allMessages_, "allMessages_")
        modelres = await Gemini(allMessages_, message, sectionName);
        res_chat.push(
            { message: modelres, role: "model" }
        );
        await addMessageToSection(sectionName, modelres, "model");
        }),
    ]);

    // console.log(res_chat, "res_chat")
    return res_chat;
    // return  [...allMessages, { message: message, role: "user" }, { message: modelres , role : "model"}];
};
    

    


const updateSection = (sectionName) => ({
    type: UPDATE_SECTION,
    payload: sectionName,
});

export { sendMessage, fetchSectionNames, updateSection, fetchChatsBySectionName};
