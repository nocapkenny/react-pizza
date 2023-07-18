import React from "react";
//@ts-ignore
import Loadable from 'react-loadable'
import {Suspense} from "react"
import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";

//@ts-ignore
const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */'./pages/Cart'),
    loading: () => <div>Загрузка....</div>,
})

const NotFound = Loadable({
    loader:()=>import(/* webpackChunkName: "NotFound" */'./pages/NotFound'),//loadable используют, потому что реакт лейзи не поддерживает серверный рендер
    loading:()=><div>Загрузка....</div>,
})
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */"./pages/FullPizza"))

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="/cart" element={<Cart id={''}/>}/>
                    <Route path="/pizza/:id" element={
                        <Suspense fallback={<div>Загрузка....</div>}>
                            <FullPizza/>
                        </Suspense>
                    }/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
