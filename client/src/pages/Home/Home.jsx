import styles from "./Home.module.css";
import LeftSection from "../../components/LeftSection/LeftSection";
import RightSection from "../../components/RightSection/RightSection";
import { useEffect, useState } from 'react';

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(1536);
  const [isWideScreen, setisWideScreen] = useState(false);

  useEffect(() => {
    // Function to update window width state
    const handleResize = () => {
      // console.log(window.innerWidth, windowWidth, windowWidth*0.8)
      setisWideScreen(window.innerWidth >= windowWidth*0.8)
    };

    // Call handleResize initially
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={styles.mainpage}>
      <div className={styles.leftOut} style={{ width: isWideScreen ? '16%' : '0%' }}>
        <LeftSection />
      </div>
      <div className={styles.rightOut} style={{ width: isWideScreen ? '84%' : '100%' }}>
        <RightSection />
      </div>
    </div>
  );
}
