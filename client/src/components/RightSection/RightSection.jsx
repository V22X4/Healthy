import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./RightSection.module.css";
import chatgptlogo2 from "../../assets/chatgptlogo2.png";
import chatgptlogo from "../../assets/chatgptlogo.png";
import nouserlogo from "../../assets/nouserlogo.png";
import trainingPrompt from "../../utils/trainingPrompt.js";
import {
  sendMessage as getModelRes,
  fetchChatsBySectionName,
} from "../../actions/messageActions.js";
import { useDispatch, useSelector } from "react-redux";

import { HashLoader } from "react-spinners";

const API_KEY = process.env.REACT_APP_PUBLIC_GEMINI_API;

const RightSection = () => {
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(true);
    const [allMessages, setAllMessages] = useState([]);
    const CurrentSection = useSelector((state) => state.message.sectionName);
    const [sectionChange, setSectionChange] = useState(0);
    const [renderedChats, setRenderedChats] = useState([]);
    const dispatch = useDispatch();
    const submitMessage = useRef();
    

    useEffect(() => {
        fetchChatsBySectionName(CurrentSection, dispatch).then((data) => {
        setAllMessages(data);
        });
    }, [CurrentSection]);

    const [windowWidth, setWindowWidth] = useState(1536);
    const [isWideScreen, setisWideScreen] = useState(false);

    useEffect(() => {
        // Function to update window width state
        const handleResize = () => {
            setisWideScreen(window.innerWidth >= windowWidth * 0.66);
        };

        // Call handleResize initially
        handleResize();

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    const reRenderChats = () => {
        if (allMessages.length > 0) {
        console.log(allMessages);
        const chats = allMessages.map((msg, index) => (
            <div key={index} className={styles.message}>
            <img
                src={msg?.role === "user" ? nouserlogo : chatgptlogo2}
                width={50}
                height={50}
                alt=""
            />
            <div className={styles.details}>
                <h2>{msg?.role === "user" ? "You" : "Doc"}</h2>
                <ReactMarkdown className={styles.msg} children={msg?.text} />
            </div>
            </div>
        ));
        setRenderedChats(chats);
        } else setRenderedChats([]);
    };

    useEffect(() => {
        console.log(CurrentSection);
        reRenderChats();
    }, [allMessages, CurrentSection]);

    const getModelResponse = async () => {
        if (message.length) {
            
            setIsSent(false);
            await getModelRes(message, CurrentSection, dispatch)
                .then((data) => {
                    setAllMessages(data);
                    return data;
                })
                .then((data) => {
                  reRenderChats();
                  setIsSent(true);
                  setMessage('')
                });
        }
    };

  const handleContactPractitioner = () => {
    window.location.href = `/contact/${CurrentSection}`;
  };

  return (
    <div className={styles.rightSection}>
      <div className={styles.rightin}>
        <div className={styles.chatgptversion}>
          <p className={styles.text1}>Chat</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          {isWideScreen && (
            <>
              <div
                className={styles.shareddocpfp}
                onMouseEnter={() => console.log("Hovered")}
              >
                <img
                  className={styles.oneshareddocpfp}
                  src={nouserlogo}
                  width={20}
                  height={20}
                  alt=""
                />
                <img
                  className={styles.oneshareddocpfp}
                  src={nouserlogo}
                  width={20}
                  height={20}
                  alt=""
                />
                <img
                  className={styles.oneshareddocpfp}
                  src={nouserlogo}
                  width={20}
                  height={20}
                  alt=""
                />
                <img
                  className={styles.oneshareddocpfp}
                  src={nouserlogo}
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <button className={styles.shareButton}>
                Share Medical History
              </button>
              <button
                className={styles.contactButton}
                onClick={() =>
                  (window.location.href = `/contact/${CurrentSection}`)
                }
              >
                Contact Real Practitioner
              </button>
            </>
          )}
        </div>
        {renderedChats && renderedChats.length > 0 ? (
          <div className={styles.messages}>{renderedChats}</div>
        ) : (
          <div className={styles.nochat}>
            <div className={styles.s1}>
              {/* <Image src={chatgptlogo} alt="chatgpt" height={70} width={70} /> */}
              <h1>How can I help you today?</h1>
            </div>
            <div className={styles.s2}>
              <div className={styles.suggestioncard}>
                <h2>Recommend activities</h2>
                <p>psychology behind decision-making</p>
              </div>
              <div className={styles.suggestioncard}>
                <h2>Recommend activities</h2>
                <p>psychology behind decision-making</p>
              </div>
              <div className={styles.suggestioncard}>
                <h2>Recommend activities</h2>
                <p>psychology behind decision-making</p>
              </div>
              <div className={styles.suggestioncard}>
                <h2>Recommend activities</h2>
                <p>psychology behind decision-making</p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.bottomsection}>
          <div className={styles.messagebar}>
            <input
              type="text"
              placeholder="To Your Doc..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {isSent ? (
                <svg
                    ref={ submitMessage}
                    onClick={getModelResponse}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            ) : (
              <HashLoader color="#36d7b7" size={30} />
            )}
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
 
