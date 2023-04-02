import React from "react";
import { BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Navbar from "./components/jsx/Navbar.jsx";

import Home from "./components/jsx/Home.jsx"

const App = () => {
    return (
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;