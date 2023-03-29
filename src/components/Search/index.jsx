import React from "react";

import styles from './Search.module.scss'
import {SearchContext} from "../../App";



const Search = () => {

const {searchValue,setSearchValue} = React.useContext(SearchContext)


    return (

        <div className={styles.inner}>
            <input value={searchValue} onChange={(event) =>setSearchValue(event.target.value)} className={styles.input} placeholder="Чо хочешь"/>
            <svg className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round"
                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"
                 xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            {searchValue && (
                <svg onClick={()=>setSearchValue('')} className={styles.clear} width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                <g>
                    <path d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
            </svg>
            )}
        </div>
    )
}

export default Search