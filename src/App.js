import logo from './logo.svg';
import './Styles/home.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/projects';
import AboutMe from './pages/AboutMe';

function App() {
 return (
   <Router>
       <div className="App">
           <div className="content">
               <Switch>
                   <Route path="/" component={Home} exact />
                    <Route path ="/projects" component={Projects} />
                    <Route path ="/about-me" component={AboutMe} />
                   </Switch>
               </div>
           </div>
       </Router>
 );
}


export default App;