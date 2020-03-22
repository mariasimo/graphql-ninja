import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

const Header = () => {
    return (
        <header>
            <img src={`/book-icon.svg`}/>
            <Link to="/">
                <p className="title t3 vertical-text">Books x People</p>
            </Link>
            <img src={`/people-icon.svg`}/>
        </header>
    )
}

export default Header;