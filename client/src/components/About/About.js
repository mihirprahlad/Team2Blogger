import headshot from './headshot.jpg';

const imageStyle = {
    margin: "50px",
    height: "200px",
    width: "300px"
};

const headerStyle = {
    margin: "50px",
    fontSize: 40
};

const textStyle = {
    margin: "50px",
    fontSize: 24
};

export default function About(){
    return (
            <div>
                <img src={headshot} alt="" style={imageStyle}></img>
                                <b style={headerStyle}>About Me</b>

                                <p style={textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>

            </div>



    );
    
}