import React, {createContext} from "react";

import './scss/app.scss';
import Header from "./components/Header";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {increment, decrement} from "./redux/slices/filterSlice";



export const SearchContext = createContext()

function App() {
    const [searchValue, setSearchValue] = React.useState('')


    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </SearchContext.Provider>
        </div>
    );
}


export default App;
