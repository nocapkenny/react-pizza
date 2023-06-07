import React from "react";

type CategoriesProps = {
    value:number;
    onClickCategory:(index:number) => void;

}

const Categories:React.FC<CategoriesProps> =({ value,onClickCategory })=>{
    const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

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
}


export default Categories