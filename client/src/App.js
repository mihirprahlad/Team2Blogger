import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function App() {
  return (
    <Router className="App">
      <main>
        <Navigation />
        <Footer />
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
