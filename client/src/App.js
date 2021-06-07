import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogPage from './components/BlogPage'
import Forum from "./components/Forum/Forum";
import Store from "./components/Store/Store";
import About from "./components/About/About";
import LazyHero from 'react-lazy-hero';


function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
      <LazyHero imageSrc="https://wallpaperaccess.com/full/647493.jpg" 
              opacity={0.1}>
                  <h1 style={{fontFamily: "Verdana", fontSize: 40}}>The Camille Connection</h1>

              </LazyHero>
              <h1 style={{fontFamily: "Verdana", margin: "50px"}}>About</h1>
              <h2 style={{fontFamily: "Verdana", margin: "50px"}}>Content here </h2>
              {}
        <Switch>
          <Route path="/" exact />
          <Route path="/blog" component={()=><BlogPage/>}/>
          <Route path="/forum" component={Forum}/>
          <Route path="/store" component={Store}/>
          <Route path="/about" component={About}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
