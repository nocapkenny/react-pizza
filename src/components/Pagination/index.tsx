import React from "react";
import ReactPaginate from "react-paginate";
//@ts-ignore
import styles from './Pagination.module.scss'

type PaginationProps = {
    value:number;
    onChangePage:(page:number)=>void;
}

const Pagination:React.FC<PaginationProps> =React.memo( ( {value, onChangePage} ) => {
    return (
        <ReactPaginate className={styles.pagination}
                       breakLabel="..."
                       nextLabel=">"
                       onPageChange={(event) => onChangePage(event.selected + 1)}
                       pageRangeDisplayed={4}
                       pageCount={3}
                       previousLabel="<"
                       //@ts-ignore
                       renderOnZeroPageCount={null}
                       forcePage={value - 1}
        />
    )
})

export default Pagination