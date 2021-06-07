import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogPage from './components/BlogPage'
import Forum from "./components/Forum/Forum";
import Store from "./components/Store/Store";
import About from "./components/About/About";
import Home from "./components/Home/Home";


function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home}/>
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
