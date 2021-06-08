import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Blog from './components/Blog/Blog'
import Forum from "./components/Forum/Forum";
import Store from "./components/Store/Store";
import About from "./components/About/About";
import LazyHero from 'react-lazy-hero';
import BlogPost from './components/Blog/BlogPost'

function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Switch>
          <Route path="/" exact />
          <Route path="/blog" component={()=><Blog/>}/>
          <Route path="/blogpost/:blogID" component={BlogPost}/>
          <Route path="/forum" component={Forum}/>
          <Route path="/store" component={Store}/>
          <Route path="/about" component={About}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
