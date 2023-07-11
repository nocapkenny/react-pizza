import React from "react";
import {useWhyDidYouUpdate} from "ahooks";

type CategoriesProps = {
    value:number;
    onClickCategory:(index:number) => void;

}

const Categories:React.FC<CategoriesProps> = React.memo(({ value,onClickCategory })=>{
    const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']
    useWhyDidYouUpdate('Categories', { value,onClickCategory })
    return(
        <div className="categories">
            <ul>
                {categories.map((name,index)=>(
                    <li key={index}
                        onClick={()=>onClickCategory(index)}
                        className={value===index ? 'active':''}>
                        {name}
                    </li>
                ))}

            </ul>
        </div>
    )
})


export default Categories