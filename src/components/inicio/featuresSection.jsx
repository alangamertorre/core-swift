import React from 'react'

export default function FeaturesSection() {
    return (
        <div className="inicio-features">
            <div className="features-container">
                <div className="features-header">
                    <h3 className="section-title">Qué hacemos</h3>
                    <h2 className="main-title">
                        Ecosistema de alto rendimiento para desarrolladores
                    </h2>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-holder">
                            <img src="/code.svg" alt="Code Icon" />
                        </div>
                        <h4 className="card-title">Frontend Moderno</h4>
                        <p className="card-desc">
                            Dominamos los frameworks reactivos de última generación. Optimizamos
                            la entrega de assets y proveemos arquitecturas escalables.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-holder">
                            <img src="/globe.svg" alt="Globe Icon" />
                        </div>
                        <h4 className="card-title">Open Source</h4>
                        <p className="card-desc">
                            Todo nuestro trabajo se publica de forma transparente. Colabora,
                            audita el código y contribuye a la evolución del software global.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-holder">
                            <img src="/database.svg" alt="Database Icon" />
                        </div>
                        <h4 className="card-title">Supabase Powered</h4>
                        <p className="card-desc">
                            Integración total con bases de datos en tiempo real, autenticación
                            segura y almacenamiento inmediato. Menos configuración, más
                            velocidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
