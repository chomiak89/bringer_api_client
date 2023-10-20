import "./App.css";
import { Routes, Route } from "react-router-dom";

// import views
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TrackingView from "./views/TrackingView";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/tracking" element={<TrackingView />}></Route>
      </Routes>
    </div>
  );
}

export default App;
