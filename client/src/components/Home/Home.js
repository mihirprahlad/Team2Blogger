import React from "react";
import LazyHero from 'react-lazy-hero';
import headshot from './headshot.jpg';

const imageStyle = {
    margin: "50px",
    height: "200px",
    width: "300px"
}

const titleStyle = {
    fontFamily: "Brush Script MT",
    fontSize: 60
};

const headerStyle = {
    fontFamily: "Verdana",
    margin: "50px",
    fontSize: 40
};

const textStyle = {
    fontFamily: "Verdana",
    margin: "50px",
    fontSize: 24
};

export default function Home() {
    return (
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" opacity={0.1} parallaxOffset={100}>
                    <h1 style={titleStyle}>The Camille Connection</h1>
                </LazyHero>
                <img src={headshot} alt="" style={imageStyle}></img>
                <b style={headerStyle}>About Me</b>

                <p style={textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                {}
        </div>
    );
    
}