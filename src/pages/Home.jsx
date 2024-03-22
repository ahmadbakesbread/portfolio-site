import React, { useState, useEffect } from 'react';
import '../Styles/home.css';
import Fireflies from '../Entities/Fireflies';
import redpanda from '../images/redpanda.png'
import LinkedInImg from '../images/Tools/linkedin1.svg'
import githubImg from '../images/Tools/github1.svg';
import gmailImg from '../images/Tools/gmail.svg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const Home = () => {
  const [isPageLoaded, setPageLoaded] = useState(false);
  const [showEnglishText, setShowEnglishText] = useState(false);
  const [showArabicText, setShowArabicText] = useState(false);
  const [moveArabicText, setMoveArabicText] = useState(false);
  const [showFrenchText, setShowFrenchText] = useState(false); // New state for French text visibility
  const [moveFrenchText, setMoveFrenchText] = useState(false); // New state for moving French text up
  const [showCoolText, setShowCoolText] = useState(false); // State to control visibility of the cool text
  const [showTypingText, setShowTypingText] = useState(false);
  const [logMessages, setLogMessages] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  const addLogMessage = (message) => {
    setLogMessages((prevLogs) => [...prevLogs, message]);
  };

  useEffect(() => {
    const animationInfo = sessionStorage.getItem("animationPlayed");
    const currentTime = new Date().getTime();
    
    let shouldPlayAnimation = true;
  
    if (animationInfo) {
      const { timestamp } = JSON.parse(animationInfo);
      const timePassed = (currentTime - timestamp) / (1000 * 60); // Convert to minutes
  
      if (timePassed < 40) { // Check if less than 40 minutes have passed
        shouldPlayAnimation = false;
      }
    }
  
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const runAnimations = async () => {
      if (shouldPlayAnimation) {
        await delay(1000); // Wait for 1 second
        setShowEnglishText(true);
        await delay(3000); // Wait for English text to be visible for a while
        setShowArabicText(true);
        await delay(1000); // Wait for Arabic text to be visible for a while
        setShowEnglishText(false); // English text starts to fade out
        await delay(1000); // Short delay before starting the movement for a smoother transition 
        setMoveArabicText(true); // Start moving Arabic text up
        await delay(2000); 
        setShowArabicText(false); // Arabic text fades out/moves up
  
        // Since animation is played, set the current timestamp in sessionStorage
        sessionStorage.setItem("animationPlayed", JSON.stringify({ timestamp: currentTime }));
      }
    };
    
    runAnimations();
  
    const pageLoadTimeout = setTimeout(() => {
      setPageLoaded(true);
    }, 2000);
    
    const coolTextTimeout = setTimeout(() => {
      setShowCoolText(true); // This will show the cool text at the end
    }, shouldPlayAnimation ? 9000 : 0); // Adjust timing based on animation playback
    
    const typingTextTimeout = setTimeout(() => {
      setShowTypingText(true); // This will show the cool text at the end
    }, shouldPlayAnimation ? 9000 : 0); // Adjust timing based on animation playback
    
    const coolImageTimeout = setTimeout(() => {
      setShowImage(true); // This will show the cool text at the end
    }, shouldPlayAnimation ? 9000 : 0); // Adjust timing based on animation playback
    
    return () => {
      clearTimeout(pageLoadTimeout);
      clearTimeout(coolTextTimeout);
      clearTimeout(typingTextTimeout);
      clearTimeout(coolImageTimeout);
    };
  }, []);
    
  return (
    <div>
      <Fireflies />
      <div className={`page ${isPageLoaded ? 'page-enter' : ''}`}>
        <h1
        className={`fade-in ${showEnglishText ? '' : 'slide-up'} english-text`}
          style={{
            color: 'beige',
            textAlign: 'center',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: showEnglishText ? 2 : 1,
          }}
        >
          <span>hi, my name is ahmad.</span>
        </h1>
        <h1
          className={`fade-in ${showArabicText ? (moveArabicText ? 'move-up' : '') : 'slide-up'} arabic-text`}
          style={{
            color: 'beige',
            textAlign: 'center',
            position: 'absolute',
            top: moveArabicText ? '40%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span>مرحباً، اسمي أحمد</span>
        </h1>
        {/*
        <h1
          className={`fade-in ${showFrenchText ? (moveFrenchText ? 'move-up' : '') : 'fade-out'} french-text`}
          style={{
            color: 'beige',
            textAlign: 'center',
            position: 'absolute',
            top: moveFrenchText ? '40%' : '51%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        >
          <span>salut, je m'appelle ahmad.</span>
        </h1>
        */}
      </div>
      {showImage && (
        <img
          className="panda fade-in"
          src={redpanda}
          alt="Cool Image"
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '15%',
            height: '28%'
          }}
        />
      )}
  
      {showCoolText && (
        <h1
          className="cool-text fade-in"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '48px',
            opacity: 0
          }}
        >
          I LIKE TO MAKE COOL STUFF
        </h1>
      )}
  
      {showTypingText && (
        <div
          className="typing-text fade-in"
          style={{
            position: 'absolute',
            top: '63%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        >
          <span></span>
        </div>
      )}
  
      {showCoolText && (
        <Link
          to="/projects"
          className="links"
          style={{
            position: 'absolute',
            top: '70%',
            left: '38%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        >
          ← my projects.
        </Link>
      )}
  
      {showCoolText && (
        <Link
          to="/about-me"
          className="links"
          style={{
            position: 'absolute',
            top: '70%',
            left: '62%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        >
          about me. →
        </Link>
      )}

    {showImage && (
        <a href="https://www.linkedin.com/in/ahmad-kanoun-8270a2265/">
        <img
          className="icon fade-in"
          src={LinkedInImg}
          alt="Cool Image"
          style={{
            position: 'absolute',
            top: '90%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '5%',
            height: '5%',
          }}
        />
        </a>
    )}

      {showImage && (
        <a href="https://github.com/ahmadbakesbread">
        <img
          className="icon fade-in"
          src={githubImg}
          alt="Cool Image"
          style={{
            position: 'absolute',
            top: '90%',
            left: '45%',
            transform: 'translate(-50%, -50%)',
            width: '5%',
            height: '5%',
          }}
        />
        </a>
    )}

    {showImage && (
            <a href="mailto:ahmadkanoun123@gmail.com">
            <img
              className="icon fade-in"
              src={gmailImg}
              alt="Cool Image"
              style={{
                position: 'absolute',
                top: '90%',
                left: '55%',
                transform: 'translate(-50%, -50%)',
                width: '6%',
                height: '6%',
                }}
            />
            </a>
    )}

    </div>
  );
}
export default Home;  