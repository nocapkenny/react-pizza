import React from "react";


import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/filter/slice";
import {selectFilter} from '../redux/filter/selectors'
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/pizza/asyncActions";
import {selectPizzaData} from "../redux/pizza/selectors";
import {useAppDispatch} from "../redux/store";


const Home: React.FC = () => {

    // const items = useSelector((state) => state.pizza.items)
    // const status = useSelector((state) => state.pizza.status)
    const {items, status} = useSelector(selectPizzaData)
    const dispatch = useAppDispatch()



    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        //@ts-ignore
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                //@ts-ignore
                currentPage
            })) //попробуй сделать запрос, если ошибка то прекрати загрузку и дай фидбек

    }

    const pizzas = items.map((obj) =><PizzaBlock  {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    const {categoryId, currentPage, searchValue} = useSelector(selectFilter)
    //@ts-ignore
    const sortType = useSelector((state) => state.filter.sort.sortProperty)
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const onClickCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    },[])

    //@ts-ignore
    const onChangePage = React.useCallback((number)=>{
        dispatch(setCurrentPage(number))
    },[])
    const navigate = useNavigate()


    // Если уже был 1 рендер, то проверяем url-параметры и сохраняем в редаксе
    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1));
    //         const sort = list.find(obj => obj.sortProperty === params.sortProperty)
    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId:Number(params.category),
    //             currentPage:Number(params.currentPage),
    //             sort: sort? sort : list[0],
    //         }))
    //         isSearch.current = true
    //     }
    // }, [])

    // если уже был первый рендер и пришли параметры из url, то сделай запрос на бек
    // React.useEffect(() => {
    //     window.scrollTo(0, 0)
    //     if (!isSearch.current) {
    //         getPizzas()
    //     }
    //     isSearch.current = false
    // }, [categoryId, sortType, searchValue, currentPage]);

    // если изменили параметры и уже был 1 рендер, то вшей в адресную строку данные
    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sortType,
    //             categoryId,
    //             currentPage
    //         });
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, sortType, searchValue, currentPage])
    React.useEffect(() => {
        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])
    //
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