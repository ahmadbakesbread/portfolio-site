import React, { useState, useEffect } from "react";
import Car from "../Entities/Car";
import '../Styles/projects.css';
import pongImg from '../images/pong.png';
import githubIcon from '../images/Tools/github1.svg';
import predictionImg from '../images/prediction.png';
import auctionImg from '../images/auction.jpeg';
import attendance from '../images/attendance2.jpg';
import keys from '../images/keys.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Projects = () => {
    const [useCar, setUseCar] = useState(false);
    const [useCursor, setUseCursor] = useState(true);
    const [isOverlapping, setIsOverlapping] = useState({ project1: false, project2: false, project3: false, project4: false });
    const [showDetails, setShowDetails] = useState({
        project1: false,
        project2: false,
        project3: false,
        project4: false,
      });
      
    useEffect(() => {
        const checkOverlap = () => {
            const car = document.querySelector(".car");
            const projects = document.querySelectorAll(".project");

            // Initialize an object to keep track of overlaps for each project
            let overlaps = { project1: false, project2: false, project3: false, project4: false };

            // Loop through each project and check for overlap
            projects.forEach((project, index) => {
                const carRect = car.getBoundingClientRect();
                const projectRect = project.getBoundingClientRect();

                const overlap = !(
                    carRect.right < projectRect.left ||
                    carRect.left > projectRect.right ||
                    carRect.bottom < projectRect.top ||
                    carRect.top > projectRect.bottom
                );

                // Use the index to set the specific project overlap status
                overlaps[`project${index + 1}`] = overlap;
            });

            // Update the state with the new overlaps object
            setIsOverlapping(overlaps);

            requestAnimationFrame(checkOverlap); // Continuous check with requestAnimationFrame
        };

        // Start the checking loop
        checkOverlap();

        // Cleanup function to cancel the animation frame when the component unmounts
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    const handleIconClick = () => {
        window.open("https://github.com/ahmadbakesbread/PongFPGA", "_blank", "noopener,noreferrer");
    };    

    // Store the animation frame ID to be able to cancel it on cleanup
    let animationFrameId;

    useEffect(() => {
        const newShowDetails = Object.keys(isOverlapping).reduce((details, key) => {
            // Copy existing state but update based on isOverlapping
            details[key] = isOverlapping[key];
            return details;
        }, {});
    
        setShowDetails(newShowDetails);
    }, [isOverlapping]); // Depend on isOverlapping to trigger updates
    

    
    return (
        <body>
            <div className="background"></div>
            <div className="text fade-in" style={{position: 'absolute', top: '10%', left: '10%'}}>projects</div>
            <div className="sphere fade-in" style={{top: '15.5%', left: '21.5%'}}></div>
            <Car className="fade-in" /> {/* Car component, now with a class name */}
            <div className="project fade-in fade-out" style={{
                position: 'absolute',
                left: '10%',
                top: '20%',
                color: 'white',
                backgroundImage: showDetails.project1 ? `url(${attendance})` : 'none',
                backgroundColor: isOverlapping.project1 ? '#666785' : '#505168', // Color changes based on overlap
            }}>
            {showDetails.project1 ? (
                <div className="project-details fade-in fade-out">
                    <h3 style={{ top: '-48%', right: '5%' }}>AttendU</h3>
                    <p style={{ position: 'absolute',top: '40%' }}>a robust system that streamlines attendance tracking through facial recognition, utilizing Python and OpenCV.</p>
                </div>
            ) : (
                "AttendU?"
            )}
        </div>
            <div className="project fade-in fade-out" style={{
                position: 'absolute',
                left: '55%',
                top: '20%',
                color: 'white',
                backgroundImage: showDetails.project2 ? `url(${pongImg})` : 'none',
                backgroundColor: isOverlapping.project2 ? '#666785' : '#505168', // Color changes based on overlap
            }}>
            {showDetails.project2 ? (
                <div className="project-details fade-in fade-out">
                    <h3 style={{ top: '-48%', right: '5%' }}>PongFPGA</h3>
                    <p style={{ position: 'absolute',top: '40%' }}>a classic pong game reimagined through Verilog programming 
                    on an FPGA, brought to life on a VGA display</p>
                </div>
            ) : (
                "PongFPGA?"
            )}
        </div>

            <div className="project fade-in fade-out" style={{
                position: 'abolute',
                left: '10%',
                top: '60%',
                color: 'white',
                backgroundImage: showDetails.project3 ? `url(${auctionImg})` : 'none',
                backgroundColor: isOverlapping.project3 ? '#666785' : '#505168', // Color changes based on overlap
                backgroundPosition: 'center', // Adjust this property to move the background image
            }}>
            {showDetails.project3 ? (
                <div className="project-details fade-in fade-out">
                    <h3 style={{ top: '-48%', right: '5%' }}>Auction Site</h3>
                    <p style={{ position: 'absolute',top: '40%' }}>a dynamic e-commerce auction platform powered by Spring Boot, enabling users to engage in forward and Dutch auctions.</p>
                </div>
            ) : (
                "Auction Site?"
            )}
        </div>

            <div className="project fade-in fade-out" style={{
                position: 'absolute',
                left: '55%',
                top: '60%',
                color: 'white',
                backgroundImage: showDetails.project4 ? `url(${predictionImg})` : 'none',
                backgroundColor: isOverlapping.project4 ? '#666785' : '#505168', // Color changes based on overlap
            }}>
            {showDetails.project4 ? (
                <div className="project-details fade-in fade-out">
                    <h3 style={{ top: '-48%', right: '5%' }}>ToyPredictor</h3>
                    <p style={{ position: 'absolute',top: '40%' }}>a machine learning project leveraging techniques to predict outcomes, developed in Python.</p>
                </div>
            ) : (
                "ToyPredictor?"
            )}
        </div>
        
        <div>
        <button onClick={() => {
                setUseCar(!useCar);
                setUseCursor(!useCursor);
            }}>
                {useCar ? "Use Cursor" : "Use Puck"}
        </button>
        </div>


        <div>
        <Link
          to="/"
          className="links"
          style={{
            position: 'absolute',
            top: '14%',
            left: '88%',
            transform: 'translate(-50%, -50%)',
            opacity: 1
          }}
        >
          back home. →
        </Link>
        </div>
        <div>
            <img style={{width: '100px', height: '100px', position: 'absolute', top: '3%', left: '47%'}} src={keys}>
            </img>
        </div>
        <div><p className="keys-text"style={{position: 'absolute', top: '12%', left: '47%'}}>move puck. </p></div>
        </body>

    );
}

export default Projects;
