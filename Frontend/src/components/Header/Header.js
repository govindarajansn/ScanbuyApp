import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {

    return (
        <header className='header'>
            <img src='/images/googleIcon.png' alt="Google book store Icon" className='imageLogo' />

            <div className='title'> Book Hub</div>
            <nav>
                <ul>
                    <li>
                        <NavLink to={"/"} >HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/books"} >LIBRARY</NavLink>
                    </li>
                </ul></nav>
        </header>
    )
}


export default Header;
