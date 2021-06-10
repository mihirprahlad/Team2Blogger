import Gallery from './Gallery';

// const imageStyle = {
//     margin: "20px",
//     height: "350px",
//     width: "525px"
// };
const aboutTextStyle = {
    marginLeft: "-30px",
    fontSize: 20
};
const historyHeaderStyle = {
    marginLeft: "-30px",
    fontSize: 40
};

const historyTextStyle = {
    marginLeft: "-30px",
    fontSize: 24
};

export default function About() {
    return (
        
        <div class='page-wrapper'>
 
            <div class='row'>
                <div class='column'>
                    <Gallery>

                    </Gallery>
                    
                </div>
                <div class='column'>
                    <div>
                        <b style={historyHeaderStyle}>About</b>
                        <p style={aboutTextStyle}>Camille is a recent college graduate from UVA currently traveling from city to city exploring what urban life offers while taking advantage of any opportunity to get back to the great outdoors. Exclusively working for new start-ups as a freelancer, she has been able to have extended stays in NYC, Denver, SF, Seattle, and Barcelona. She loves being a digital nomad because each new city brings new stories and opportunities. </p>
                        <p style={aboutTextStyle}>Camille is a Virgo Libra cusp. Her hobbies include hiking, climbing, yoga, snowboarding, and anything with music. Her favorite  parts of nature are trees, mountains, and rivers; her favorite parts of cities are music and rooftops. </p>
                        <p style={historyTextStyle}></p>
                        <div style={{height:15,width:110,backgroundColor:"#4C6357",marginLeft: "-30px",}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
