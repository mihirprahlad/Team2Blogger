import headshot from './headshot.jpg';

const imageStyle = {
    margin: "20px",
    height: "350px",
    width: "525px"
};

const headerStyle = {
    margin: "30px",
    fontSize: 40
};

const textStyle = {
    margin: "30px",
    fontSize: 24
};

export default function About() {
    return (
        <div class='page-wrapper'>
            <div class='row'>
                <div class='column'>
                    <div>
                        <img src={headshot} alt="" style={imageStyle}></img>
                    </div>
                </div>
                <div class='column'>
                    <div>
                        <b style={headerStyle}>About</b>
                        <p style={textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                    </div>
                </div>
            </div>
        </div>
    );
}