import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatgptlogo from "../../assets/chatgptlogo.png";
import nouserlogo from "../../assets/nouserlogo.png";
import styles from "./LeftSection.module.css";
import { fetchSectionNames, updateSection } from "../../actions/messageActions.js";
import { ClimbingBoxLoader } from "react-spinners";

const LeftSection = () => {
  const [sectionNames, setSectionNames] = useState([]);
  const dispatch = useDispatch();
  const currentSection = useSelector(state => state.message.sectionName);

  useEffect(() => {
    // Call the fetchSectionNames function when the component mounts
     const temp = async() => {
       const data = await fetchSectionNames(); 
      //  console.log(data)
       setSectionNames(data);
     }
     
    temp();
      
  }, []);

  const handleSectionClick = (sectionName) => {
    dispatch(updateSection(sectionName));
  };


  return (
    <div className={styles.leftSection}>
      <div className={styles.newChat}>
        <div>
          <img src={chatgptlogo} alt="ChatGPT" width={50} height={50} />
          <p className={styles.text1}>Healthy</p>
        </div>

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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </div>
      <div className={styles.allChats}>
        
        {sectionNames.map((sectionName, index) => (
          <div key={index} className={styles.chat} onClick={() => handleSectionClick(sectionName)}>
          <p className={`${styles.text1} ${currentSection === sectionName ? styles.highlighted : ''}`} onClick={() => handleSectionClick(sectionName)}>{sectionName}</p>
        </div>
        ))}
      </div>
      <div className={styles.newChat}>
        <div>
          <img src={nouserlogo} alt="ChatGPT" width={50} height={50} />
          <p className={styles.text1}>Vishal Singh</p>
        </div>
      </div>
      
    </div>
  );
};

export default LeftSection;
