import React from 'react'

export default function MisionSection() {
    return (
        <div className="mission-container">
            <div className="mission-content">
                <div className="mission-header">
                    <h3 className="section-title">Nuestra Misión</h3>
                    <h2 className="mission-title">
                        Democratizar el desarrollo frontend para todos
                    </h2>
                </div>
                <p className="mission-desc">
                    Creemos que la ingeniería web de calidad no debe estar guardada bajo
                    llave corporativa. En Core Swift, construimos librerías optimizadas y
                    listas para producción que cualquiera puede implementar en minutos.
                    Sea nobato o experimentado en programación o informática.
                </p>
                <div className="stat-counter">
                    <h4 className="stat-title">Proyectos 100% Open Source</h4>
                </div>
            </div>
            <div className="testimonials">
                <div className="testimonial-card">
                    <p className="quote">
                        "Core Swift cambió por completo cómo mi startup maneja la
                        sincronización en tiempo real. Si siguen creciendo superarán a
                        Microsoft©."
                    </p>
                    <div className="author">
                        <img src="/user.svg" alt="Carlos Mendoza" className="avatar" />
                        <div className="author-info">
                            <span className="author-name">Carlos Mendoza</span>
                            <span className="author-role">CTO, AlphaTech</span>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card">
                    <p className="quote">
                        "Contribuir a los repositorios de Core Swift ha sido una de las
                        mejores experiencias de mi carrera. El código es impecable."
                    </p>
                    <div className="author">
                        <img src="/user.svg" alt="Sofía Gaviria" className="avatar" />
                        <div className="author-info">
                            <span className="author-name">Sofía Gaviria</span>
                            <span className="author-role">Ingeniera de Software Frontend</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
