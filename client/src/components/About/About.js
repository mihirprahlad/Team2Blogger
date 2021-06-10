import Gallery from './Gallery';

// const imageStyle = {
//     margin: "20px",
//     height: "350px",
//     width: "525px"
// };

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
                        <b style={historyHeaderStyle}>History</b>
                        <p></p>
                        <p style={historyTextStyle}>Camille's Corner started back in the summer of 2019 when Camille first moved to NYC for an internship. Sitting behind a screen all day in the middle of a giant concrete jungle made her long for the proper outdoors. Hopelessly stuck between being drawn to the culture of cities and the allure of Mother Nature, Camille decided to bridge the two worlds through adventure and discovery, adopting a digital nomad life that took her across the country. The name of the blog comes from the corner in her room where Camille hung up tapestries that depicted beautiful landscapes juxtaposed against her Soho apartment. The goal of Camille's Corner is to show others that in every city, nature offers an escape, and no one has to choose only one world. </p>
                        <div style={{height:15,width:110,backgroundColor:"#4C6357",marginLeft: "-30px",}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
