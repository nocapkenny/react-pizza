import React from "react";

import './scss/app.scss';
import Header from "./components/Header";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import FullPizza from "./pages/FullPizza";


function App() {


    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/pizza/:id" element={<FullPizza/>} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
