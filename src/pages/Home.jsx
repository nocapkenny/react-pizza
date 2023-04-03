import React, {useContext} from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";


const Home = () => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage,setCurrentPage] = React.useState(1)


    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
    const {searchValue} = React.useContext(SearchContext)


    const categoryId = useSelector((state)=>(state.filter.categoryId))
    const sortType = useSelector((state)=>state.filter.sort.sortProperty)
    const dispatch = useDispatch()
    const onClickCategory = (id) =>{
        dispatch(setCategoryId(id))
    }



    React.useEffect(() => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-','');
        const category = categoryId>0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        setIsLoading(true);
        fetch(`https://640762ff862956433e6e16ff.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) => response.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
            window.scrollTo(0,0)
    }, [categoryId,sortType,searchValue,currentPage]);
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ?  skeletons : pizzas}
            </div>
            <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
        </div>
    )
}

export default Home