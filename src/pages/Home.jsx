import React from "react";

import qs from 'qs'
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";


const Home = () => {

    // const items = useSelector((state) => state.pizza.items)
    // const status = useSelector((state) => state.pizza.status)
    const {items, status} = useSelector(selectPizzaData)

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage
        })) //попробуй сделать запрос, если ошибка то прекрати загрузку и дай фидбек

    }

    const pizzas = items.map((obj) => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock  {...obj}/></Link> );
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    const {categoryId, currentPage, searchValue} = useSelector(selectFilter)
    const sortType = useSelector((state) => state.filter.sort.sortProperty)
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    const navigate = useNavigate()


    // Если уже был 1 рендер, то проверяем url-параметры и сохраняем в редаксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [])

    // если уже был первый рендер и пришли параметры из url, то сделай запрос на бек
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage]);

    // если изменили параметры и уже был 1 рендер, то вшей в адресную строку данные
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, searchValue, currentPage])


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (
                    <div className="content__error-info">
                        <h2>Технические шоколадки :(</h2>
                    </div>)
                    :
                    (<div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}
                    </div>)
            }
            <Pagination value={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home