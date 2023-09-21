
import './App.css';
// import About from './Components/About';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import NoteState from './context/notes/NoteState'
import Alerts from './Components/Alerts';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      mssg: message,
      type: type
    })
    const dismiss = () => {
      setalert(null)
    }
    setTimeout(dismiss, 1000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts alert = {alert}/>
          <div className="container">
            <Routes>
              {/* <Route path="/about" element=<About /> /> */}
              <Route path="/" element=<Home  showAlert={showAlert} /> />
              <Route path="/login" element=<Login  showAlert={showAlert}/> />
              <Route path="/signup" element=<SignUp showAlert={showAlert}/> />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
