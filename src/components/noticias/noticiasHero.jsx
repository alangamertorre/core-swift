import React from 'react'

export default function NoticiasHero() {
    return (
        <div className="inicio-hero">
            <div className="hero-container">
                <div className="hero-copy">
                    <div className="badge">TECNOLOGÍA ABIERTA PARA EL FUTURO</div>
                    <h1 className="headline">Noticias,<br />siempre al día.</h1>
                    <p className="subtitle">
                        Aqui encntrarás todas las novedades, actualizaciónes y otras cosas que
                        te afecten. En Core Swift intentamos que el usuario siempre entienda
                        todo y esté al día de todo.
                    </p>
                    <div className="cta-buttons">
                        <div className="btn-primary link" data-link="initSoporte">Entrar al soporte</div>
                        <div className="btn-secondary link" data-link="initProductos">Ver proyectos</div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-frame">
                        <div className="merged-logo-container">
                            <img src="/logo.png" className="logo-letter" alt="Main Logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
