import React from 'react'

export default function SoporteHeader() {
    return (
        <div className="inicio-hero">
            <div className="hero-container">
                <div className="hero-copy">
                    <div className="badge">TECNOLOGÍA ABIERTA PARA EL FUTURO</div>
                    <h1 className="headline">Soporte,<br />uno innovador.</h1>
                    <p className="subtitle">
                        Soporte técnico innovador y real. No buscamos ser líderes, sino marcar la diferencia ayudándote de verdad.
                        Por eso, compartimos de forma abierta al menos el 70% de todos nuestros programas.
                    </p>
                    <div className="cta-buttons">
                        <div className="btn-primary link" data-link="initSoporte">Entrar en la Wiki</div>
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
