import React from "react";
import { useState, useRef, useEffect } from "react";
import "../Styles/aboutme.css"
import cImg from '../images/Tools/C.svg';
import pythonImg from '../images/Tools/python.svg';
import javaImg from '../images/Tools/java.svg';
import javascriptImg from '../images/Tools/javascript.svg';
import typescriptImg from '../images/Tools/typescript.svg';
import bashImg from '../images/Tools/bash.svg';
import linuxImg from '../images/Tools/linux.svg';
import flaskImg from '../images/Tools/flask.svg';
import springImg from '../images/Tools/spring-boot.svg';
import mysqlImg from '../images/Tools/mysql.svg';
import sqliteImg from '../images/Tools/sqllite.svg';
import dockerImg from '../images/Tools/docker.svg';
import kubernetesImg from '../images/Tools/kubernetes.svg';
import reactImg from '../images/Tools/react.svg';
import htmlImg from '../images/Tools/html.svg';
import cssImg from '../images/Tools/css.svg';
import myImage from '../images/ahmad.jpg';
import resume from '../NewResume.pdf'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const technologiesList1 = [
    { name: '', icon: cImg },
    { name: '', icon: pythonImg },
    { name: '', icon: javaImg },
    { name: '', icon: javascriptImg },
    { name: '', icon: typescriptImg },
    { name: '', icon: bashImg },
    { name: '', icon: linuxImg },
    { name: '', icon: flaskImg },    
];
const technologiesList2 = [
    { name: '', icon: springImg },
    { name: '', icon: mysqlImg },
    { name: '', icon: sqliteImg },
    { name: '', icon: dockerImg },
    { name: '', icon: kubernetesImg },
    { name: '', icon: reactImg },
    { name: '', icon: htmlImg },
    { name: '', icon: cssImg },
]


const AboutMe = () => {
    const [showIcons, setShowIcons] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIcons(true);
        }, 100); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
          {showIcons && (
            <div className="aboutme-container">
              <img
                className="fade-in image-container"
                src={myImage}
                alt="My Image"
                style={{ position: "absolute", left: "77%", top: "-7%" }}
              />
              <h1 className="title fade-in" style={{ top: "15%", position: "absolute", left: "12%" }}>
                about me.
              </h1>
              <div className="line fade-in" style={{ top: "32%", position: "absolute", left: "12%" }}></div>
              <div className="aboutme-content fade-in" style={{ top: "35%", position: "absolute", left: "12%", width: "60%" }}>
                <p>
                  Hello World! I'm Ahmad Kanoun, a Canadian-Lebanese software engineer passionate about various fields of computer science, including full-stack development and machine learning. I aspire to create technologies that drive positive change in society!
                </p>
              </div>
              <h1 className="title fade-in" style={{ top: "45%", position: "absolute", left: "12%" }}>
                tools and technologies.
              </h1>
              <div className="line fade-in" style={{ top: "62%", position: "absolute", left: "12%" }}></div>
              <ul className="tech-list" style={{ position: "absolute", left: "12%", top: "63%" }}>
                {technologiesList1.concat(technologiesList2).map((tech, index) => (
                  <li
                    key={index}
                    className="tech-item fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`, // Eacsh item will fade in 0.1 seconds after the previous one
                    }}
                  >
                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                    <div>{tech.name}</div>
                  </li>
                ))}
              </ul>
              <a className='resume fade-in' href={resume}  style = {{position: 'absolute', left: '12%', top: '80%'}}>
              ↓ 
              my resume.
                </a>

            </div>
          )}

<div>
        <Link
          to="/"
          className="links"
          style={{
            position: 'absolute',
            top: '14%',
            left: '8%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        >
          ← back home. 
        </Link>
        </div>

        </div>
      );
                }
export default AboutMe;
