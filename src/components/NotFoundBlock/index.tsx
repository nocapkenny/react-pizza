import React from "react";
//@ts-ignore
import styles from "./NotFoundBlock.module.scss"

function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1 >
                <span> 😭 🥺</span>
                <br/>
                Куда ты жмав...
            </h1>
            <p className={styles.descr}>Такой страницы не существует</p>
        </div>
    )
}

export default NotFoundBlock