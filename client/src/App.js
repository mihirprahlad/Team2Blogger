import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Switch>
          <Route path="/" exact />
          <Route path="/blog" />
          <Route path="/forum" />
          <Route path="/store" />
          <Route path="/about" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
