import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';import 'semantic-ui-css/semantic.min.css'
import './css/index.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Intent from './pages/Intent';

function App() {
    return (
        <Router>
            <div className="App">
            <Routes>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route exact path='/intents' element={< Intent />}></Route>
           </Routes>
           </div>
        </Router>
    );
}

export default App;