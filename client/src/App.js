import './App.css';
import LazyHero from 'react-lazy-hero';
function App() {
  return (
        <div>
            <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" 
            opacity={0.1}>
                <h1 style={{fontFamily: "Verdana", fontSize: 40}}>The Camille Connection</h1>
                
            </LazyHero>
            <h1 style={{fontFamily: "Verdana", margin: "50px"}}>About</h1>
            <h2 style={{fontFamily: "Verdana", margin: "50px"}}>Content here </h2>
            {}
        </div>
  );
}

export default App;
