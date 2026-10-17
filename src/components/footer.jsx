import React from 'react'

export default function Footer() {
    return (
        <section>
            <section className="section-action-banner">
                <div className="page-container">
                    <div className="action-banner-container">
                        <div className="action-header">
                            <h2 className="action-title">
                                ¿Listo para construir el futuro del frontend?
                            </h2>
                            <p className="action-desc">
                                Únete a nuestra comunidad en GitHub y modulos npm, así descubrirás
                                todo lo que ofrecemos.
                            </p>
                        </div>
                        <div className="action-buttons">
                            <a href="https://github.com/alangamertorre/" className="btn-action-primary">Nuestro GitHub</a>
                            <a href="https://www.npmjs.com/~aliasestudio" className="btn-action-secondary">Nuestro NPM</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-footer">
                <div className="page-container">
                    <footer className="footer-container">
                        <div className="footer-top">
                            <div className="footer-brand">
                                <p className="footer-desc">
                                    Comunidad de desarrollo orientada a crear herramientas abiertas y
                                    robustas en el ecosistema de Supabase.
                                </p>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p className="copyright">
                                © 2026 Core Swift. Código abierto bajo licencia MIT.
                            </p>
                            <p className="repo-link">
                                Repositorio: <a
                                    href="https://github.com/alangamertorre/core-swift">https://github.com/alangamertorre/core-swift</a>
                            </p>
                        </div>
                    </footer>
                </div>
            </section>
        </section>
    )
}
