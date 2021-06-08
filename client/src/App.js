import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Blog from './components/Blog/Blog'
import BlogPost from './components/Blog/BlogPost'
import Forum from "./components/Forum/Forum";
import Store from "./components/Store/Store";
import About from "./components/About/About";
import Home from "./components/Home/Home";
library.add(fab)

function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Footer />
        <Switch>
          <Route path="/" exact component={Home}/>
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
