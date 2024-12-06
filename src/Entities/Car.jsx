import React from 'react';
import '../Styles/projects.css';

class Car extends React.Component {
    
    canvasRef = React.createRef()
    trailPositions = []; // Keep track of the trail positions

    constructor(props) {
        super(props);
        // Use window dimensions directly
        this.state = {
            x: window.innerWidth / 2 - 25, // Set x-coordinate to center horizontally
            y: window.innerHeight / 1.75 - 15, // Set y-coordinate to center vertically
                keys: {
                ArrowUp: false,
                ArrowDown: false,
                ArrowLeft: false,
                ArrowRight: false,
            },
            speedX: 0,
            speedY: 0,
            maxSpeed: 8,
            acceleration: 0.15,
            deceleration: 0.94,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
        };
        //this.carImage = new Image(); // Create a new Image object for the car sprite
        //this.carImage.src = carSprite; // Set the source of the Image object to your imported sprite
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('resize', this.handleResize);
        this.animationFrameID = requestAnimationFrame(this.animate);

        const canvas = this.canvasRef.current;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'rgba(37, 10, 107, 0.1)'; // Semi-transparent white for the trail

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
        window.removeEventListener('resize', this.handleResize);
        cancelAnimationFrame(this.animationFrameID);
    }

    handleResize = () => {
        this.setState({
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
        });
    };


    handleKeyDown = (event) => {
        const { keys } = this.state;
        if (event.key in keys) {
            this.setState({ keys: { ...keys, [event.key]: true } });
        }
    };


    handleKeyUp = (event) => {
        const { keys } = this.state;
        if (event.key in keys) {
            this.setState({ keys: { ...keys, [event.key]: false } });
        }
    };

    drawCar = () => {
        if (this.ctx) { // Check if the context is available
            //this.ctx.drawImage(this.carImage, this.state.x, this.state.y, 50, 30); // Draw the car image
        }
    };


    drawTrail = () => {
        // Loop over the trail positions
        for (let i = this.trailPositions.length - 1; i >= 0; i--) {
            const trailPosition = this.trailPositions[i];
            this.ctx.fillStyle = `rgba(49, 32, 114, ${trailPosition.opacity})`; // Set the opacity for the trail part
            
            // Begin path for circle
            this.ctx.beginPath();
            // Draw circle: arc(x, y, radius, startAngle, endAngle)
            this.ctx.arc(trailPosition.x + 15, trailPosition.y + 15, 15, 0, Math.PI * 2);
            this.ctx.fill(); // Fill the circle
    
            // Decrease the opacity for the next frame
            trailPosition.opacity -= 0.01;
        }
    
        // Remove the trail parts that are fully faded
        this.trailPositions = this.trailPositions.filter(trailPosition => trailPosition.opacity > 0);
    };
    
    


    animate = () => {
        let dx = 0, dy = 0;
        const { keys, acceleration, deceleration, maxSpeed } = this.state;

        if (keys.ArrowLeft) dx -= acceleration;
        if (keys.ArrowRight) dx += acceleration;
        if (keys.ArrowUp) dy -= acceleration;
        if (keys.ArrowDown) dy += acceleration;

        this.moveCar(dx, dy);

        // Deceleration logic here (if no keys are pressed)
        if (!Object.values(keys).some(value => value)) {
            this.setState(prevState => ({
                speedX: prevState.speedX * deceleration,
                speedY: prevState.speedY * deceleration,
            }));
        }

        // Update position and schedule next animation frame
        this.setState(prevState => ({
            x: Math.min(Math.max(0, prevState.x + prevState.speedX), prevState.canvasWidth - 40), // Use prevState.canvasWidth instead of this.props.canvasWidth
            y: Math.min(Math.max(0, prevState.y + prevState.speedY), prevState.canvasHeight - 20), // Use prevState.canvasHeight instead of this.props.canvasHeight
            speedX: Math.max(Math.min(prevState.speedX, maxSpeed), -maxSpeed),
            speedY: Math.max(Math.min(prevState.speedY, maxSpeed), -maxSpeed),
        }));


        // Add the current position to the beginning of the trailPositions array
        this.trailPositions.unshift({
            x: this.state.x,
            y: this.state.y,
            opacity: 0.6 // Starting opacity for the new trail part
        });

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);

        this.drawCar();

        // Draw the trail
        this.drawTrail();

        // ... rest of the animate logic ...
        this.animationFrameID = requestAnimationFrame(this.animate);
    };



    moveCar = (dx, dy) => {
        this.setState(prevState => ({
            speedX: prevState.speedX + 1.2*dx,
            speedY: prevState.speedY + 1.2*dy,
        }));
    };

    render() {
        return (
            <>
                <canvas
                    ref={this.canvasRef}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
                />
                <div
                    className="car fade-in" 
                    style={{
                        position: 'absolute',
                        left: this.state.x + 'px',
                        top: this.state.y + 'px',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#101010',
                        border: '1px solid #dcc48e',
                        zIndex: 10,
                        borderRadius: '50%', // This makes the square a circle
                    }}
                ></div>
            </>
        );
    }
}


export default Car;
