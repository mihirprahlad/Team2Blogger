import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogPage from './components/BlogPage'

function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Switch>
          <Route path="/" exact />
          <Route path="/blog" component={()=><BlogPage/>}/>
          <Route path="/forum" />
          <Route path="/store" />
          <Route path="/about" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
