import React from 'react'

export default function HeroSection() {
    return (
        <div className="inicio-hero">
            <div className="hero-container">
                <div className="hero-copy">
                    <div className="badge">TECNOLOGÍA ABIERTA PARA EL FUTURO</div>
                    <h1 className="headline">Código abierto,<br />resultados reales.</h1>
                    <p className="subtitle">
                        Creamos y promovemos herramientas de desarrollo frontend de alto
                        rendimiento. Formamos una comunidad hispana para impulsar soluciones
                        modernas integradas nativamente.
                    </p>
                    <div className="cta-buttons">
                        <div href="https://github.com/alangamertorre/" className="btn-primary">Ver nuestro GitHub</div>
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
