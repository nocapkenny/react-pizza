import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";


const Home = ( {searchValue} ) => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId,setCategoryId] = React.useState(0)
    const [sort,setSort] = React.useState({name:'популярности(desc)', sortProperty:'rating'})
    const [currentPage,setCurrentPage] = React.useState(1)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    React.useEffect(() => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-','');
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
    }, [categoryId,sort,searchValue,currentPage]);
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(index)=>setCategoryId(index)}/>
                <Sort value={sort} onClickSort={(index)=>setSort(index)} />
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