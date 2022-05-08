import React from "react"
import Logo from "../logo"
import Styles from './styles.scss'

const Header = () => {
    return (
        <header className={Styles.header}>
            <Logo />

            <h1 className={Styles.headerTitle}>
                4Dev - Enquetes para devs
            </h1>
        </header>
    )
}

export default Header