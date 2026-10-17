import React from 'react'

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                {/* Corregido: Uso de llaves y backticks para la variable */}
                <img src={`/logo2.svg`} alt="Core Swift Logo" className="logo" />
            </div>
            {/* Corregido: Cambiado 'class' por 'className' */}
            <nav className="nav-links">
                <div className='nav-links-btns link' data-link="initInicio">INICIO</div>
                <div className='nav-links-btns link' data-link="initProductos">PRODUCTOS</div>
                <div className='nav-links-btns link' data-link="initSoporte">SOPORTE</div>
                <div className='nav-links-btns link' data-link="initNoticias">NOTICIAS</div>
                <button className='login-btn' type='button' aria-label='Abrir panel de usuario'>
                    <img src='/user.svg' alt='' />
                </button>
            </nav>
        </header>
    )
}
