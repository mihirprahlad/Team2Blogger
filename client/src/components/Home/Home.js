import React from "react";
import LazyHero from 'react-lazy-hero';
const titleStyle = {
    fontSize: 60
};
const aboutTextStyle = {
    margin: "30px",
    fontSize: 24
};

export default function Home() {
    return (
        <div>
                <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" opacity={0.1} parallaxOffset={150}>
                    <h1 style={titleStyle}>Camille's Corner</h1>
                </LazyHero>
                <div>
                    <p style={aboutTextStyle}>Camille is a recent college graduate from UVA currently traveling from city to city exploring what urban life offers while taking advantage of any opportunity to get back to the great outdoors. Educated as a chemical engineer, Camille threw that into the wind to pursue software development and adventure. Exclusively working for new start-ups as a freelancer, she has been able to have extended stays in NYC, Denver, SF, Seattle, and Barcelona. She hopes to go next to Austin or London, but, in truth, with her, you never know where she'll be next. Known to be spontaneous and indecisive, Camille chose this life because it allows her to explore every option that life provides. She loves being a digital nomad because each new city brings new stories and opportunities. She never realized that documenting this way of life would garner such a large following for which she is grateful every day. Her goal is to promote adventures and positivity. One day she hopes to go to every national park. </p>
                    <p style={aboutTextStyle}>Her hobbies include hiking, climbing, yoga, snowboarding, and anything with music. She is a Virgo Libra cusp. Her favorite  parts of nature are trees, mountains, and rivers; her favorite parts of cities are music and rooftops </p>
                </div>
                {}
        </div>
    );
    
}